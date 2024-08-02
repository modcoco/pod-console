"use client"

import * as React from "react"
import useSWR from 'swr';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Model, ModelType } from "../data/data"
import { Namespace, NamespaceResponse, namespaceResponseSchema } from "../data/schema";
import { data } from "autoprefixer";

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[]
  models: Model[]
  onRefresh?: (model: Model) => void; 
}

const fetcher = async (): Promise<Namespace[]> => {
  const response = await fetch('/api/namespace');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result: NamespaceResponse = await response.json();
  return namespaceResponseSchema.parse(result).data; // 解析数据并返回
};

const convertNamespaceToModel = (namespace: Namespace): Model => ({
  id: namespace.id,
  name: namespace.name,
  type: namespace.type as ModelType,
});

export function ModelSelector({types,onRefresh, ...props }: ModelSelectorProps) {

  const { data: namespaces = [], error } = useSWR('namespaceData', fetcher);

  const models = namespaces.map(convertNamespaceToModel);
  const [open, setOpen] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0])
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0])

  React.useEffect(() => {
    if (namespaces) {
      console.log('Namespaces:', namespaces);
    }
  }, [namespaces]);


  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a namespace"
            className="h-8 w-full justify-between"
          >
            {selectedModel ? selectedModel.name : "Select a namespace..."}
            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[250px] p-0">
          <HoverCard>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Namespace..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onPeek={(model) => setPeekedModel(model)}
                          onSelect={() => {
                            setSelectedModel(model)
                            setOpen(false)
                            // console.log(model.name)
                            if (onRefresh) onRefresh(model);
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface ModelItemProps {
  model: Model
  isSelected: boolean
  onSelect: () => void
  onPeek: (model: Model) => void
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model)
        }
      }
    }
  })

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
    >
      {model.name}
      <CheckIcon
        className={cn(
          "ml-auto size-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  )
}
