import "./style.css";
import { startWebcam } from "./video";

const $soundVideo = document.getElementById("for-sound");
if ($soundVideo) {
  ($soundVideo as HTMLVideoElement).volume = 0.5;
}

startWebcam();
