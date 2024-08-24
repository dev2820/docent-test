import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

// cx 함수 정의
export function cx(...classes: ClassValue[]): string {
  // clsx로 클래스 결합 후 twMerge로 병합된 클래스 반환
  return twMerge(clsx(...classes));
}
