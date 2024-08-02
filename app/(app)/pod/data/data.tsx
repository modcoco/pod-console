import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "Running",
    label: "Running",
    icon: CheckCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]

export const types = ["Kube"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  id: string
  name: string
  type: Type
}

export const models: Model<ModelType>[] = [
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "kube-system",
    type: "GPT-3" as ModelType,
  },
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "default",
    type: "GPT-3" as ModelType,
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "volcano-system",
    type: "GPT-3" as ModelType,
  },
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "volcano-monitoring",
    type: "GPT-3" as ModelType,
  },
  {
    id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
    name: "kube-public",
    type: "Codex" as ModelType,
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "kube-node-lease",
    type: "Codex" as ModelType,
  },
]
