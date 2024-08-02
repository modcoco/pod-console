import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  namespace: z.string(),
  pod: z.string(),
  container: z.string(),
  podIp: z.string(),
  podPhase: z.string(),
  containerImage: z.string(),
});

export const namespaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  resourceVersion: z.string(),
  type: z.string(),
});

export const namespaceResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.array(namespaceSchema),
});

export type Namespace = z.infer<typeof namespaceSchema>
export type NamespaceResponse = z.infer<typeof namespaceResponseSchema>
export type Task = z.infer<typeof taskSchema>
