import { getDataDom } from "https://cdn.jsdelivr.net/npm/@datadomjs/datadom@1.0.2/dist/index.js";
import {
  getVideoTitle,
  togglePlayPause,
  rewindVideo,
  forwardVideo,
  toggleMuteUnmute,
  toggleLoopUnloop,
  fullScreenVideo,
  pictureInPictureVideo,
  changeSpeedVideo,
  upSpeedVideo,
  downSpeedVideo,
  changeVolume,
  upVolume,
  downVolume,
  changeProgress,
  showPreviewCapture,
  hidePreviewCapture,
  updateSpeedSelect,
  updateProgressBar,
  updateDurationTime,
  updateProgressTime,
  updatePlayPauseState,
  updateVolumeRange,
  updateLoopUnloopState,
  updateMuteUnmuteState,
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
  const el = getDataDom(elements);

  // プレビューキャプチャの初期化
  el.previewCapture.src = el.video.src;

  // ブラウザ非対応機能のボタン非表示
  el.pictureInPictureButton.hidden = !document.pictureInPictureEnabled;
  el.fullScreenButton.hidden = !document.fullscreenEnabled;

  // メタデータ関連
  el.title.textContent = getVideoTitle(el.video.src);
  el.video.addEventListener("loadedmetadata", updateDurationTime, {
    once: true,
  });
  el.video.readyState >= HTMLMediaElement.HAVE_METADATA && updateDurationTime();

  // 再生状態の更新
  el.video.addEventListener("timeupdate", updateProgressBar);
  el.video.addEventListener("timeupdate", updateProgressTime);
  el.video.addEventListener("play", updatePlayPauseState);
  el.video.addEventListener("pause", updatePlayPauseState);
  el.video.addEventListener("volumechange", updateVolumeRange);
  el.video.addEventListener("mutedchange", updateMuteUnmuteState);
  el.video.addEventListener("loopchange", updateLoopUnloopState);
  el.video.addEventListener("ratechange", updateSpeedSelect);

  // ユーザー操作
  el.playPauseButton.addEventListener("click", togglePlayPause);
  el.rewindButton.addEventListener("click", rewindVideo);
  el.forwardButton.addEventListener("click", forwardVideo);
  el.muteButton.addEventListener("click", toggleMuteUnmute);
  el.loopButton.addEventListener("click", toggleLoopUnloop);
  el.fullScreenButton.addEventListener("click", fullScreenVideo);
  el.pictureInPictureButton.addEventListener("click", pictureInPictureVideo);
  el.speedSelect.addEventListener("change", changeSpeedVideo);
  el.progressRange.addEventListener("input", changeProgress);
  el.progressRange.addEventListener("change", changeProgress);
  el.progressRange.addEventListener("mousemove", showPreviewCapture);
  el.progressRange.addEventListener("mouseleave", hidePreviewCapture);
  el.volumeRange.addEventListener("input", changeVolume);

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
