---
title: mpi4py wrapper
description: mpi4py wrapper
date: '2024-1-31'
cover: 'mpi4py.png'
tags:
  - python
published: true
---

An effective method to enhance the efficiency of Python programs is through parallelization.
In Python, there are two main approaches to parallelization: multiprocessing and mpi4py.
Multiprocessing leverages the concept of a process pool to conveniently allocate tasks, but it operates solely on a single machine.
Mpi4py adheres to the MPI (Message Passing Interface) standard, 
allowing it to run across multiple node servers. 
This article introduces the mpi4py wrapper, designed to simplify its use.

For the sake of simplicity, let's assume we need to execute multiple independent tasks.
We distribute these tasks to processes evenly.
```python
import logging
import sys
import time

import numpy as np
from mpi4py import MPI

logging.basicConfig(
    level=logging.INFO,
    stream=sys.stdout,
    format="%(asctime)s - %(levelname)s - %(message)s",
)


def split_task(N):
    """
    Split tasks for MPI
    """
    comm = MPI.COMM_WORLD
    size = comm.Get_size()
    rank = comm.Get_rank()
    if rank <= N % size:
        start = (N // size + 1) * rank
    else:
        start = rank * (N // size) + (N % size)
    if rank + 1 <= N % size:
        end = (N // size + 1) * (rank + 1)
    else:
        end = (rank + 1) * (N // size) + (N % size)
    return start, end


def MPI_run_tasks_equal_distribution(func, args, show_progress=False):
    """
    Run tasks in MPI
    """
    startTime = time.time()
    comm = MPI.COMM_WORLD
    size = comm.Get_size()
    rank = comm.Get_rank()
    Ntask = len(args)
    # dirupt the order of tasks
    if rank == 0:
        index = np.arange(Ntask)
        np.random.shuffle(index)
    else:
        index = None
    # broadcast the index
    index = comm.bcast(index, root=0)
    args = [args[i] for i in index]
    # Equal distribution of tasks
    start, end = split_task(Ntask)
    results = []
    for i in range(start, end):
        if not isinstance(args[i], tuple):
            result = func(args[i])
        else:
            result = func(*args[i])
        if not isinstance(result, tuple):
            result = (result,)
        if show_progress and rank == 0:
            currentTime = time.time()
            elapsedTime = currentTime - startTime
            remainingTime = elapsedTime / (i + 1 - start) * (end - i - 1)
            elapsedTime = "%d:%02d:%02d" % (
                elapsedTime // 3600,
                elapsedTime % 3600 // 60,
                elapsedTime % 60,
            )
            remainingTime = "%d:%02d:%02d" % (
                remainingTime // 3600,
                remainingTime % 3600 // 60,
                remainingTime % 60,
            )
            logging.info(
                "Root progress %.2f%%, elapsed time %s, remaining time %s"
                % ((i + 1 - start) / (end - start) * 100, elapsedTime, remainingTime)
            )
        results.append(result)
    results_list = comm.gather(results, root=0)
    if rank == 0:
        results = []
        for i in range(size):
            results.extend(results_list[i])
        # restore the order of results
        results = [results[i] for i in np.argsort(index)]
        results = [list(row) for row in zip(*results)]
    results = comm.bcast(results, root=0)
    return results
```

The `split_task` function divides the tasks evenly among the processes.
The `MPI_run_tasks_equal_distribution` function wraps the MPI process.
An example of using the wrapper is shown below.
```python
def single_task(i):
    return i**2

args = list(range(10))
results = MPI_run_tasks_equal_distribution(single_task, args)
if MPI.COMM_WORLD.Get_rank() == 0:
    logging.info("Results: %s" % results)
```

To run the code, use the following command:
```bash
mpiexec -n 4 python main.py
```
The results are as follows:
```bash
[[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]]
```

For tasks with multiple arguments and return values,
the `MPI_run_tasks_equal_distribution` function can be used as follows:
```python
def single_task_1(i, j):
    return i**2, j**2, i + j

args = [(i, i + 1) for i in range(10)]
results = MPI_run_tasks_equal_distribution(single_task_1, args)
if MPI.COMM_WORLD.Get_rank() == 0:
    print(results)
```

The results are as follows:
```bash
[[0, 1, 4, 9, 16, 25, 36, 49, 64, 81], [1, 4, 9, 16, 25, 36, 49, 64, 81, 100], [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]]
```

Since all the tasks are independent,
the `MPI_run_tasks_equal_distribution` function should achieve linear speedup
if all tasks take the same amount of time to complete.
However, if the time taken by each task varies,
a better approach is to designate tasks to processes dynamically.
This can be achieved by using the `MPI_run_tasks_root_distribution` function.
```python
def MPI_run_tasks_root_distribution(func, args, show_progress=False):
    """
    Run tasks in MPI where the root process distributes tasks to worker processes.
    """
    startTime = time.time()
    comm = MPI.COMM_WORLD
    size = comm.Get_size()
    rank = comm.Get_rank()
    Ntask = len(args)
    results = [None] * Ntask
    if rank == 0:
        status = MPI.Status()
        send_count = 0
        recv_count = 0
        # send initial tasks
        for i in range(1, size):
            comm.send(i - 1, dest=i, tag=i - 1)
            send_count += 1
        # receive results and send new tasks
        while recv_count < Ntask:
            result = comm.recv(source=MPI.ANY_SOURCE, tag=MPI.ANY_TAG, status=status)
            if not isinstance(result, tuple):
                result = (result,)
            results[status.Get_tag()] = result
            recv_count += 1
            if show_progress and status.Get_source() == 1:
                currentTime = time.time()
                elapsedTime = currentTime - startTime
                remainingTime = elapsedTime / recv_count * (Ntask - recv_count)
                elapsedTime = "%d:%02d:%02d" % (
                    elapsedTime // 3600,
                    elapsedTime % 3600 // 60,
                    elapsedTime % 60,
                )
                remainingTime = "%d:%02d:%02d" % (
                    remainingTime // 3600,
                    remainingTime % 3600 // 60,
                    remainingTime % 60,
                )
                logging.info(
                    "Root progress %.2f%%, elapsed time %s, remaining time %s"
                    % (recv_count / Ntask * 100, elapsedTime, remainingTime)
                )
            if send_count < Ntask:
                comm.send(send_count, dest=status.Get_source(), tag=send_count)
                send_count += 1
        results = [list(row) for row in zip(*results)]
        # send stop signal
        for i in range(1, size):
            comm.send(None, dest=i, tag=Ntask)
    else:
        while True:
            status = MPI.Status()
            # receive tasks
            task = comm.recv(source=0, tag=MPI.ANY_TAG, status=status)
            if status.Get_tag() == Ntask:
                break
            # run tasks
            task = args[status.Get_tag()]
            if not isinstance(task, tuple):
                result = func(task)
            else:
                result = func(*task)
            # send results
            comm.send(result, dest=0, tag=status.Get_tag())
    results = comm.bcast(results, root=0)
    return results
```

Below is an example of using the `MPI_run_tasks_root_distribution` function.
```python
def single_task_1(i, j):
    return i**2, j**2, i + j
args = [(i, i + 1) for i in range(10)]
results = MPI_run_tasks_root_distribution(single_task_1, args)
if MPI.COMM_WORLD.Get_rank() == 0:
    print(results)
```

The results are as follows:
```bash
[[0, 1, 4, 9, 16, 25, 36, 49, 64, 81], [1, 4, 9, 16, 25, 36, 49, 64, 81, 100], [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]]
```

With the two functions provided, python programs can be parallelized with ease.