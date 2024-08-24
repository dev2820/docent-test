import { useEffect, useRef, useState } from "react";
import { getBackWebCamStream } from "./utils/webcam";
import { isFailed } from "./utils/predicate";
import { Button, Dialog } from "terra-design-system/react";
import { StartGuide } from "./components/StartGuide";

function App() {
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const webCamRef = useRef<HTMLVideoElement>(null);
  const soundRef = useRef<HTMLVideoElement>(null);
  const docentRef = useRef<HTMLVideoElement>(null);

  const startWebCam = async () => {
    if (!webCamRef.current) {
      return;
    }

    const stream = await getBackWebCamStream();

    if (isFailed(stream)) {
      setIsErrorDialogOpen(true);
      console.log("?")
      return;
    }
    webCamRef.current.srcObject = stream.value;
  };

  useEffect(() => {
    startWebCam();
  },[]);

  const handleChangeErrorDialogOpenChange = (e: { open: boolean | ((prevState: boolean) => boolean); }) => {
    console.log(e.open)
    setIsErrorDialogOpen(e.open);
  }

  const handleStart = () => {
    docentRef.current?.play()    
    soundRef.current?.play()    
  }

  return (
    <>
      <video
        id="webcam"
        autoPlay
        playsInline
        className="w-screen h-screen"
        ref={webCamRef}
      ></video>
      <video
        src="./src/assets/output.webm"
        width="400"
        height="100%"
        playsInline
        className="absolute bottom-0 right-0"
        ref={docentRef}
        ></video>
      <video
        id="for-sound"
        src="./src/assets/sample.mp4"
        width="600"
        height="100%"
        className="hidden"
        ref={soundRef}
      ></video>
      <StartGuide onStart={handleStart}/>
      <Dialog.Root open={isErrorDialogOpen} onOpenChange={handleChangeErrorDialogOpenChange}>
        <Dialog.Content className="p-4">
          <Dialog.Title className="mb-4">Error</Dialog.Title>
          <Dialog.Description className="mb-4">
            카메라가 감지되지 않습니다. 모바일 환경에서 다시 시도해 보세요
          </Dialog.Description>
          <div className="flex flex-row-reverse">
          <Dialog.CloseTrigger asChild>
            <Button>Close</Button>
          </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export default App;
