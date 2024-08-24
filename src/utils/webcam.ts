import { monad } from "./monad";

// 웹캠 스트림을 요청하는 함수
export async function getBackWebCamStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        // facingMode: { exact: "environment" },
      },
    });
    return monad.success(stream);
  } catch (err) {
    console.error("웹캠을 불러오는 중 오류 발생:", err);
    return monad.failed(err as Error);
  }
}
