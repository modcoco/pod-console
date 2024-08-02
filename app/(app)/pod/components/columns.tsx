"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pod" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.pod)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[360px] truncate font-medium">
            {row.getValue("pod")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "container",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Container" />
    ),
    cell: ({ row }) => <div className="w-[160px]">{row.getValue("container")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "podIp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IP" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("podIp")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "podPhase",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("podPhase")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "containerImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => <div className="w-[280px]">{row.getValue("containerImage")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
