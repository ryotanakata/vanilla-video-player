import { getDataDom } from "https://cdn.jsdelivr.net/npm/@datadomjs/datadom@1.0.2/dist/index.js";
import {
  getVideoTitle,
  togglePlayPause,
  rewindVideo,
  toggleLoopUnloop,
  toggleMuteUnmute,
  forwardVideo,
  fullScreenVideo,
  pictureInPictureVideo,
  repeatVideo,
  changeSpeedVideo,
  upSpeedVideo,
  downSpeedVideo,
  controlVolume,
  upVolume,
  downVolume,
  controlProgress,
  updateSpeedSelect,
  updateProgressBar,
  updateProgressTime,
  updateDurationTime,
  updatePlayPauseState,
  updateVolumeRange,
  updateLoopUnloopState,
  updateMuteUnmuteState,
  showPreviewCapture,
  hidePreviewCapture,
} from "./control.js";

const elements = {
  video: "ビデオ要素",
  title: "タイトル",
  playPauseButton: "再生/一時停止ボタン",
  rewindButton: "巻き戻しボタン",
  muteButton: "ミュートボタン",
  loopButton: "ループボタン",
  forwardButton: "早送りボタン",
  fullScreenButton: "全画面ボタン",
  pictureInPictureButton: "ピクチャーインピクチャーボタン",
  speedSelect: "再生速度セレクトボックス",
  volumeRange: "音量調節レンジ",
  progressRange: "進行状況レンジ",
  currentTimeSpan: "現在の時間span",
  durationSpan: "再生時間span",
  previewCapture: "プレビューキャプチャ",
};

try {
  const {
    video,
    title,
    playPauseButton,
    rewindButton,
    forwardButton,
    muteButton,
    loopButton,
    fullScreenButton,
    pictureInPictureButton,
    speedSelect,
    progressRange,
    volumeRange,
    previewCapture,
  } = getDataDom(elements);

  // プレビューキャプチャの初期化
  previewCapture.src = video.src;

  // ブラウザ非対応機能のボタン非表示
  pictureInPictureButton.hidden = !document.pictureInPictureEnabled;
  fullScreenButton.hidden = !document.fullscreenEnabled;

  // メタデータ関連
  title.textContent = getVideoTitle(video.src);
  video.addEventListener("loadedmetadata", updateDurationTime, { once: true });
  video.readyState >= HTMLMediaElement.HAVE_METADATA && updateDurationTime();

  // 再生状態の更新
  video.addEventListener("timeupdate", updateProgressBar);
  video.addEventListener("timeupdate", updateProgressTime);

  // 再生制御
  video.addEventListener("ended", repeatVideo);
  video.addEventListener("play", updatePlayPauseState);
  video.addEventListener("pause", updatePlayPauseState);
  video.addEventListener("volumechange", updateVolumeRange);
  video.addEventListener("mutedchange", updateMuteUnmuteState);
  video.addEventListener("loopchange", updateLoopUnloopState);
  video.addEventListener("ratechange", updateSpeedSelect);

  // ユーザー操作
  playPauseButton.addEventListener("click", togglePlayPause);
  rewindButton.addEventListener("click", rewindVideo);
  forwardButton.addEventListener("click", forwardVideo);
  muteButton.addEventListener("click", toggleMuteUnmute);
  loopButton.addEventListener("click", toggleLoopUnloop);
  fullScreenButton.addEventListener("click", fullScreenVideo);
  pictureInPictureButton.addEventListener("click", pictureInPictureVideo);
  speedSelect.addEventListener("change", changeSpeedVideo);
  progressRange.addEventListener("input", controlProgress);
  progressRange.addEventListener("change", controlProgress);
  progressRange.addEventListener("mousemove", showPreviewCapture);
  progressRange.addEventListener("mouseleave", hidePreviewCapture);
  volumeRange.addEventListener("input", controlVolume);

  // キーボード操作
  document.addEventListener("keydown", (e) => {
    if (e.key === "]") upSpeedVideo();
    if (e.key === "[") downSpeedVideo();
    if (e.key === "ArrowLeft") rewindVideo();
    if (e.key === "ArrowRight") forwardVideo();
    if (e.key === "ArrowUp") upVolume();
    if (e.key === "ArrowDown") downVolume();
    if (e.key === " ") togglePlayPause();
    if (e.key === "f") fullScreenVideo();
    if (e.key === "p") pictureInPictureVideo();
    if (e.key === "l") toggleLoopUnloop();
    if (e.key === "m") toggleMuteUnmute();
  });
} catch (error) {
  console.error("ビデオプレーヤーの初期化エラー:", error);
}
