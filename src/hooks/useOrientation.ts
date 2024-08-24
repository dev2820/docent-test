import { useState, useEffect } from "react";

const useOrientation = () => {
  // 초기 화면 방향을 설정 (가로, 세로 여부)
  const [isPortrait, setIsPortrait] = useState(
    window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    // handleResize 함수 선언
    const handleResize = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isPortrait;
};

export { useOrientation };
