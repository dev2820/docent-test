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
        "fixed z-10000 w-screen h-screen left-0 top-0 bg-gray-200/80",
        "flex place-items-center justify-center",
        show ? "block" : "hidden"
      )}
    >
      <Button onClick={handleClickStart}>Start!</Button>
    </div>
  );
}
