import { useEffect, useRef, useState } from "react";
import { getBackWebCamStream } from "./utils/webcam";
import { isFailed } from "./utils/predicate";
import { Button, Dialog } from "terra-design-system/react";
import { StartGuide } from "./components/StartGuide";
import output from "@/assets/output.webm"
import sample from "@/assets/sample.mp4"
import { useOrientation } from "./hooks/useOrientation";
import { cx } from "@/utils/cx"
import { ErrorGuide } from "./components/ErrorGuide";

function App() {
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isError, setIsError] = useState(false);
  const isPortrait = useOrientation()
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
      setIsError(true)
      return;
    }
    setIsReady(true)
    webCamRef.current.srcObject = stream.value;
  };

  useEffect(() => {
    startWebCam();
  },[]);

  const handleChangeErrorDialogOpenChange = (e: { open: boolean | ((prevState: boolean) => boolean); }) => {
    setIsErrorDialogOpen(e.open);
  }

  const handleStart = () => {
    setIsStarted(true)

    setTimeout(()=>{
      docentRef.current?.play()    
      soundRef.current?.play()    
    },1000)
  }

  return (
    <>
      <video
        id="webcam"
        autoPlay
        playsInline
        className={cx("object-cover", isPortrait ? 'h-screen' : 'w-screen')}
        ref={webCamRef}
      ></video> 
      <video
        src={output}
        width={isPortrait ? "100%" : "400"}
        height="100%"
        playsInline
        className={cx("absolute bottom-0 right-0 transition-opacity duration-1000", isStarted ? 'opacity-1': 'opacity-0')}
        ref={docentRef}
        ></video>
      <video
        id="for-sound"
        src={sample}
        width="600"
        height="100%"
        className="hidden"
        ref={soundRef}
      ></video>
      {isReady && !isStarted && <StartGuide onStart={handleStart}/>}
      {isError && <ErrorGuide className="fixed left-0 top-0 w-screen h-screen" />}
      <Dialog.Root open={isErrorDialogOpen} onOpenChange={handleChangeErrorDialogOpenChange}>
        <Dialog.Content className="p-4">
          <Dialog.Title className="mb-4 text-red-500">Error</Dialog.Title>
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
