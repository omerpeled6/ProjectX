import { z } from "zod";

export const CounterSchema = z.object({
  _id: z.string(),
  count: z.number(),
});

export const CounterResponseSchema = z.object({
  counter: CounterSchema,
});

export type Counter = z.infer<typeof CounterSchema>;
export type CounterResponse = z.infer<typeof CounterResponseSchema>;
