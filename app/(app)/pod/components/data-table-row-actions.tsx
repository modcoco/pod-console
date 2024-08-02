"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "../data/data"
import { taskSchema } from "../data/schema"
import { useTaskStore } from '../../../../stores/taskStore';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const setTask = useTaskStore(state => state.setTask);
  // setTask(task);  // Zustand store
  // const currentTask = useTaskStore.getState().task;
  // console.log("Current task in store:", currentTask);

  const handleEditClick = () => {
    console.log("Editing task:", task);
    localStorage.setItem('task', JSON.stringify(task));
    const storedTask = localStorage.getItem('task');

    if (storedTask) {
      console.log('storedTask',JSON.parse(storedTask))
    }
    window.open('/terminal', '_blank');
  };

  const handleCopyNameClick = () => {
    navigator.clipboard.writeText(task.pod)
      .then(() => {
        console.log('Task pod copied to clipboard:', task.pod);
      })
      .catch(err => {
        console.error('Failed to copy task pod to clipboard:', err);
      });
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEditClick}>Terminal</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyNameClick}>Copy pod name</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
