import type { Nil } from "@/types/monad/nil";

export const isNil = (value: unknown): value is Nil => {
  return Object.is(value, null) || Object.is(value, undefined);
};
