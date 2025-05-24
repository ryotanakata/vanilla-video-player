import { getDataDom } from "https://cdn.jsdelivr.net/npm/@datadomjs/datadom@1.0.2/dist/index.js";

// ビデオのタイトルを取得する関数
const getVideoTitle = (url) => {
  const filename = decodeURIComponent(url.split("/").pop());

  return filename.replace(/\.[^/.]+$/, "");
};

// 時間フォーマット用の関数
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

// ビデオを再生する関数
const playVideo = async () => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    await video.play();
  } catch (error) {
    console.error("ビデオの再生エラー:", error);
  }
};

// ビデオを一時停止する関数
const pauseVideo = () => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    video.pause();
  } catch (error) {
    console.error("ビデオの一時停止エラー:", error);
  }
};

// ビデオの再生状態をトグルする関数
const togglePlayPause = async () => {
  try {
    const { video } = getDataDom({
      video: "ビデオ要素",
      playPauseButton: "再生/一時停止ボタン",
    });

    video.paused ? await video.play() : video.pause();
  } catch (error) {
    console.error("ビデオの再生/一時停止エラー:", error);
  }
};

// ビデオを巻き戻す関数
const rewindVideo = () => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    video.currentTime = Math.max(0, video.currentTime - 10);
  } catch (error) {
    console.error("ビデオの巻き戻しエラー:", error);
  }
};

// ビデオを早送りする関数
const forwardVideo = () => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  } catch (error) {
    console.error("ビデオの早送りエラー:", error);
  }
};

// ビデオのミュート/ミュート解除をトグルする関数
const toggleMuteUnmute = () => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    video.muted = !video.muted;
    video.dispatchEvent(new Event("mutedchange"));
  } catch (error) {
    console.error("ミュート/ミュート解除エラー:", error);
  }
};

// ビデオのループ再生オン/オフをトグルする関数
const toggleLoopUnloop = () => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    video.loop = !video.loop;
    video.dispatchEvent(new Event("loopchange"));
  } catch (error) {
    console.error("ビデオの再生/一時停止エラー:", error);
  }
};

// ビデオを全画面表示にする関数
const fullScreenVideo = async () => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    await video.requestFullscreen();
  } catch (error) {
    console.error("全画面表示要求エラー:", error);
  }
};

const pictureInPictureVideo = async () => {
  try {
    if (!document.pictureInPictureEnabled) return;

    const { video } = getDataDom({ video: "ビデオ要素" });

    await video.requestPictureInPicture();
  } catch (error) {
    console.error("ピクチャーインピクチャー要求エラー:", error);
  }
};
// ビデオをリピート再生する関数
const repeatVideo = () => {
  try {
    const { video, repeatCheckbox } = getDataDom({
      video: "ビデオ要素",
      repeatCheckbox: "リピート再生チェックボックス",
    });

    if (!repeatCheckbox.checked) return;

    video.currentTime = 0;
    video.play();
  } catch (error) {
    console.error("ビデオのリピート再生エラー:", error);
  }
};

// ビデオの再生速度を変更する関数
const changeSpeedVideo = ({ target }) => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });

    video.playbackRate = target.value;
  } catch (error) {
    console.error("ビデオの再生速度変更エラー:", error);
  }
};

// ビデオの再生速度を上げる関数
const upSpeedVideo = () => {
  try {
    const { video, speedSelect } = getDataDom({
      video: "ビデオ要素",
      speedSelect: "再生速度セレクトボックス",
    });
    const currentIndex = [...speedSelect.options].findIndex(
      (option) => parseFloat(option.value) === video.playbackRate
    );
    const newIndex = Math.min(currentIndex + 1, speedSelect.options.length - 1);

    video.playbackRate = parseFloat(speedSelect.options[newIndex].value);
  } catch (error) {
    console.error("ビデオの再生速度上昇エラー:", error);
  }
};

// ビデオの再生速度を下げる関数
const downSpeedVideo = () => {
  try {
    const { video, speedSelect } = getDataDom({
      video: "ビデオ要素",
      speedSelect: "再生速度セレクトボックス",
    });
    const currentIndex = [...speedSelect.options].findIndex(
      (option) => parseFloat(option.value) === video.playbackRate
    );
    const newIndex = Math.max(currentIndex - 1, 0);

    video.playbackRate = parseFloat(speedSelect.options[newIndex].value);
  } catch (error) {
    console.error("ビデオの再生速度下降エラー:", error);
  }
};

// ビデオの音量を制御する関数
const controlVolume = ({ target }) => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });
    const volume = target.value;

    video.volume = volume;
    target.style.setProperty("--volume", `${volume * 100}%`);
  } catch (error) {
    console.error("ビデオの音量を制御エラー:", error);
  }
};

// ビデオの音量を上げる関数
const upVolume = () => {
  try {
    const { video, volumeRange } = getDataDom({
      video: "ビデオ要素",
      volumeRange: "音量調節  レンジ",
    });

    video.volume = Math.min(1, parseFloat(volumeRange.value) + 0.1);
    volumeRange.value = video.volume;
  } catch (error) {
    console.error("ビデオの音量変更エラー:", error);
  }
};

// ビデオの音量を下げる関数
const downVolume = () => {
  try {
    const { video, volumeRange } = getDataDom({
      video: "ビデオ要素",
      volumeRange: "音量調節レンジ",
    });

    video.volume = Math.max(0, parseFloat(volumeRange.value) - 0.1);
    volumeRange.value = video.volume;
  } catch (error) {
    console.error("ビデオの音量変更エラー:", error);
  }
};

// ビデオの進行状況を制御する関数
const controlProgress = ({ target }) => {
  try {
    const { video } = getDataDom({ video: "ビデオ要素" });
    const progress = target.value;

    video.currentTime = (video.duration * progress) / 100;
    target.style.setProperty("--progress", `${progress}%`);
  } catch (error) {
    console.error("ビデオの進行状況を制御エラー:", error);
  }
};

// プレビューキャプチャを更新する関数
const showPreviewCapture = (e) => {
  try {
    const { video, previewCapture, previewTime, progressRange } = getDataDom({
      video: "ビデオ要素",
      previewCapture: "プレビューキャプチャ",
      previewTime: "プレビュー時間",
      progressRange: "進行状況レンジ",
    });
    const rect = progressRange.getBoundingClientRect();
    const progress = ((e.clientX - rect.left) / rect.width) * 100;
    const time = (video.duration * progress) / 100;

    previewTime.textContent = formatTime(time);
    previewCapture.currentTime = time;
    previewCapture.parentElement.style.setProperty(
      "--progress",
      `${progress}%`
    );
    previewCapture.parentElement.style.display = "block";
  } catch (error) {
    console.error("プレビューキャプチャのエラー:", error);
  }
};

// プレビューキャプチャを非表示にする関数
const hidePreviewCapture = () => {
  try {
    const { previewCapture } = getDataDom({
      previewCapture: "プレビューキャプチャ",
    });

    previewCapture.parentElement.style.display = "none";
  } catch (error) {
    console.error("プレビューキャプチャの非表示エラー:", error);
  }
};

// 再生速度のセレクトボックスを更新する関数
const updateSpeedSelect = () => {
  try {
    const { video, speedSelect } = getDataDom({
      video: "ビデオ要素",
      speedSelect: "再生速度セレクトボックス",
    });
    const currentIndex = [...speedSelect.options].findIndex(
      (option) => parseFloat(option.value) === video.playbackRate
    );

    if (currentIndex !== -1) speedSelect.selectedIndex = currentIndex;
  } catch (error) {
    console.error("再生速度セレクトボックスの更新エラー:", error);
  }
};

// 再生プログレスバーを更新する関数
const updateProgressBar = () => {
  try {
    const { video, progressRange } = getDataDom({
      video: "ビデオ要素",
      progressRange: "進行状況レンジ",
    });
    const { currentTime, duration } = video;
    const progress = (currentTime / duration) * 100;

    progressRange.value = progress;
    progressRange.style.setProperty("--progress", `${progress}%`);
  } catch (error) {
    console.error("ビデオの進行状況更新エラー:", error);
  }
};

// 再生時間を更新する関数
const updateDurationTime = () => {
  try {
    const { video, durationSpan } = getDataDom({
      video: "ビデオ要素",
      durationSpan: "再生時間span",
    });
    const { duration } = video;

    durationSpan.textContent = formatTime(duration);
  } catch (error) {
    console.error("ビデオの再生時間更新エラー:", error);
  }
};

// 再生時間を更新する関数
const updateProgressTime = () => {
  try {
    const { video, currentTimeSpan } = getDataDom({
      video: "ビデオ要素",
      currentTimeSpan: "現在の時間span",
    });
    const { currentTime } = video;

    currentTimeSpan.textContent = formatTime(currentTime);
  } catch (error) {
    console.error("ビデオの進行状況更新エラー:", error);
  }
};

// ビデオの再生状態を更新する関数
const updatePlayPauseState = () => {
  try {
    const { video, playPauseButton } = getDataDom({
      video: "ビデオ要素",
      playPauseButton: "再生/一時停止ボタン",
    });

    playPauseButton.setAttribute(
      "aria-label",
      video.paused ? "再生" : "一時停止"
    );
    playPauseButton.setAttribute(
      "aria-pressed",
      video.paused ? "false" : "true"
    );
    playPauseButton.querySelector("span").textContent = video.paused
      ? "play_arrow"
      : "pause";
  } catch (error) {
    console.error("再生状態の更新エラー:", error);
  }
};

// 音量調節レンジを更新する関数
const updateVolumeRange = () => {
  try {
    const { video, volumeRange, muteCheckbox } = getDataDom({
      video: "ビデオ要素",
      volumeRange: "音量調節レンジ",
      muteCheckbox: "ミュートチェックボックス",
    });

    volumeRange.value = muteCheckbox.checked ? video.volume : 0;
    volumeRange.style.setProperty("--volume", `${volumeRange.value * 100}%`);
  } catch (error) {
    console.error("音量調節レンジの更新エラー:", error);
  }
};

export {
  getVideoTitle,
  playVideo,
  pauseVideo,
  togglePlayPause,
  rewindVideo,
  forwardVideo,
  toggleMuteUnmute,
  toggleRepeatUnrepeat,
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
  updateDurationTime,
  updateProgressTime,
  updatePlayPauseState,
  updateVolumeRange,
  showPreviewCapture,
  hidePreviewCapture,
};
