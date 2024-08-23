// 웹캠 스트림을 요청하는 함수
export async function startWebcam() {
  const video = document.getElementById("webcam") as HTMLVideoElement;
  try {
    // 웹캠 스트림을 요청
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "environment",
      },
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("웹캠을 불러오는 중 오류 발생:", err);
  }
}
