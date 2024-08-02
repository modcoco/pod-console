"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/(app)/pod/components/data-table-view-options"

import { priorities, statuses, models, types, Model } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { ModelSelector } from "./model-selector"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  onRefresh?: (namespace: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  onRefresh
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const handleModelSelect = (model: Model) => {
    if (onRefresh) onRefresh(model.name);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <ModelSelector types={types} models={models} onRefresh={handleModelSelect} />
        <Input
          placeholder="Filter pods..."
          value={(table.getColumn("pod")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("pod")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("podPhase") && (
          <DataTableFacetedFilter
            column={table.getColumn("podPhase")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
