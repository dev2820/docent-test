import { monad } from "./monad";
import { IS_DEV } from "@/constants/env"

// 웹캠 스트림을 요청하는 함수
export async function getBackWebCamStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: IS_DEV ? "user":"environment",
        height: { min: 1024, ideal: 1280, max: 1920 },
        width: { min: 576, ideal: 720, max: 1080 },
      },
    });
    return monad.success(stream);
  } catch (err) {
    console.error("웹캠을 불러오는 중 오류 발생:", err);
    return monad.failed(err as Error);
  }
}
