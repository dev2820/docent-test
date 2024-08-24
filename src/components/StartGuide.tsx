import { useState } from "react";
import { Button } from "terra-design-system/react";
import { clsx as cx } from "clsx";

export function StartGuide({ onStart }: { onStart?: () => void }) {
  const [show, setShow] = useState<boolean>(true);

  const handleClickStart = () => {
    setShow(false);
    if (onStart) {
      onStart();
    }
  };
  return (
    <div
      className={cx(
        "fixed z-10000 w-dvw h-dvh left-0 top-0 bg-gray-200/80",
        "flex flex-col place-items-center justify-center",
        show ? "block" : "hidden"
      )}
    >
      <h3 className="text-2xl mb-4 font-bold">
        타입 도센트에 오신것을 환영합니다!
      </h3>
      <p className="text-gray-600 mb-2">
        아래 <strong>'start'</strong> 버튼을 눌러 도센트를 시작해보세요
      </p>
      <Button
        variant="filled"
        theme="primary"
        size="lg"
        onClick={handleClickStart}
      >
        🚀 Start!
      </Button>
    </div>
  );
}
