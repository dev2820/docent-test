import { cx } from "@/utils/cx";
import type { ComponentProps } from "react";

export type ErrorGuideProps = ComponentProps<"div">;
export function ErrorGuide({ className, ...props }: ErrorGuideProps) {
  return (
    <div
      className={cx(
        "flex flex-col place-items-center justify-center",
        "p-4",
        className
      )}
      {...props}
    >
      <h3 className="text-center font-bold text-3xl mb-8 text-red-500">
        Oops...
      </h3>
      <p className="text-gray-500 whitespace-pre text-center">
        카메라가 준비되지 않아 화면을 보여줄 수 없어요.
        <br /> 모바일 환경에서 다시 시도해 보세요.
      </p>
    </div>
  );
}
