import App from "../index";
import Hls from "hls.js";
import Plyr from "plyr";
import isInViewport from "./isinviewport";
import throttle from "lodash/throttle";
const Players = {
  options: {
    hidePoster: false,
    forceVideoSound: true
  },
  players: [],
  init: () => {
    Players.destroy();
    const videoPlayers = document.querySelectorAll(
      ".video-player:not(.loaded)"
    );
    const options = {
      controls: ["play", "progress", "fullscreen", "mute"],
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true
      },
      iconUrl: App.root + "/assets/build/images/player.svg"
    };
    const optionsSilent = {
      controls: [""],
      autoplay: false,
      muted: true,
      // clickToPlay: false,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true
      },
      iconUrl: App.root + "/assets/build/images/player.svg"
    };
    const optionsSilentWithControls = {
      controls: ["play", "progress", "fullscreen", "mute"],
      autoplay: false,
      muted: true,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true
      },
      iconUrl: App.root + "/assets/build/images/player.svg"
    };
    for (var i = 0; i < videoPlayers.length; i++) {
      const videoElement = videoPlayers[i];
      let player, targetOptions;
      if (App.pageType != 'home' && App.isMobile) {
        if(videoElement.classList.contains('controls')) videoElement.removeAttribute("playsinline");
      } else {
        // if (App.pageType == "home" && i == 0) {
        //   videoElement.removeAttribute("poster");
        // }
      }
      if (!videoElement.classList.contains("silent")) {
        targetOptions = options;
        if (App.isMobile) targetOptions.controls = ["play-large"];
        player = new Plyr(videoElement, targetOptions);
        const playerContainer = player.elements.container.closest(
          ".player-container"
        );
        if (playerContainer) player.elements.playerContainer = playerContainer;
        player.muted = false;
        Players.players.push(player);
      } else {
        if (videoElement.classList.contains("controls")) {
          targetOptions = optionsSilentWithControls;
          if (App.isMobile) targetOptions.controls = ["play-large"];
          player = new Plyr(videoElement, targetOptions);
        } else {
          targetOptions = optionsSilent;
          if (App.isMobile) targetOptions.controls = ["play-large"];
          player = new Plyr(videoElement, targetOptions);
        }
        const playerContainer = player.elements.container.closest(
          ".player-container"
        );
        if (playerContainer) player.elements.playerContainer = playerContainer;
        player.muted = true;
        // player.play()
      }
      if (videoElement.classList.contains("force-mute"))
        player.forceMute = true;
      Players.players.push(player);
      videoElement.classList.add("loaded");
      if (Players.options.hidePoster && !App.isMobile)
        videoElement.removeAttribute("poster");
    }
    Players.prepareStream(videoPlayers);
    Players.events();
    Players.accessibility();
    if(!App.isMobile) Players.placeControls();
    if (App.pageType == 'home' || !App.isMobile) {
      Players.playInView();
      window.addEventListener(
        "scroll",
        throttle(Players.playInView, 128),
        false
      );
      window.addEventListener(
        "scroll",
        throttle(Players.placeControls, 5),
        false
      );
    }
  },
  events: () => {
    for (var i = 0; i < Players.players.length; i++) {
      const player = Players.players[i];
      if (player.elements.playerContainer) {
        player.on("playing", e => {
          player.elements.playerContainer.classList.add("video-is-playing");
        });
        player.on("pause", e => {
          player.elements.playerContainer.classList.remove("video-is-playing");
        });
      }
      player.on("click", e => {
        player.forceStop = !player.playing;
      });
    }
  },
  prepareStream: videos => {
    if (videos.length < 1) return;
    const attachStream = videoElement => {
      if (videoElement.getAttribute("data-stream") && Hls.isSupported()) {
        Players.players[i].hls = new Hls({
          minAutoBitrate: 1700000,
          startLevel: App.isMobile || App.pageType !== "project" ? 0 : -1
        });
        Players.players[i].hls.loadSource(
          videoElement.getAttribute("data-stream")
        );
        Players.players[i].hls.attachMedia(videoElement);
      }
    };
    for (var i = 0; i < videos.length; i++) {
      const videoElement = videos[i];
      attachStream(videoElement);
    }
  },
  playInView: () => {
    if (Players.players && document.querySelector(".play-on-scroll")) {
      // if (Players.players) {
      let playPromise;
      Players.players.forEach(player => {
        if (
          !player.forceStop &&
          player.media.classList.contains("play-on-scroll") &&
          isInViewport(player.media)
        ) {
          if (player.playing) return;
          if (!player.forceMute) Players.unmute(player);
          playPromise = player.play();
          if (playPromise !== undefined) {
            playPromise
              .then(function() {
                if (
                  localStorage.getItem("forceMute") !== "true" &&
                  Players.options.forceVideoSound &&
                  !player.elements.playerContainer.classList.contains("silent")
                ) {
                  localStorage.setItem("forceMute", false);
                }
              })
              .catch(function(error) {
                Players.mute(player);
                player.play();
              });
          }
        } else {
          player.pause();
        }
      });
    }
  },
  placeControls: _ => {
    Players.players.forEach(player => {
      if (!player.elements.playerContainer || !isInViewport(player.media))
        return;
      player.elements.controls.style.bottom =
        Math.max(
          0,
          player.elements.playerContainer.getBoundingClientRect().bottom -
            App.height
        ) + "px";
    });
  },
  muteAll: () => {
    for (var i = 0; i < Players.players.length; i++) {
      const player = Players.players[i];
      if (player.elements.playerContainer)
        player.elements.playerContainer.classList.add("video-is-muted");
      player.muted = true;
    }
  },
  unmute: player => {
    if (!Players.forceMute && player.muted) {
      Players.muteAll();
      player.elements.playerContainer.classList.remove("video-is-muted");
      player.muted = false;
    }
  },
  mute: player => {
    if (!player.muted) {
      player.elements.playerContainer.classList.add("video-is-muted");
      player.muted = true;
    }
  },
  accessibility: () => {
    for (var i = 0; i < Players.players.length; i++) {
      const player = Players.players[i];
      if (!player.elements.playerContainer) return;
      const playPause = player.elements.playerContainer.querySelectorAll(
        "[event-target=playpause]"
      );
      const muteBtn = player.elements.playerContainer.querySelector(
        "[event-target=mute]"
      );
      const unmuteBtn = player.elements.playerContainer.querySelector(
        "[event-target=unmute]"
      );
      const fullscreenBtn = player.elements.playerContainer.querySelector(
        "[event-target=fullscreen]"
      );
      if (playPause) {
        for (var j = 0; j < playPause.length; j++) {
          playPause[j].addEventListener("click", () => {
            if (player.playing) {
              player.forceStop = true;
            } else {
              player.forceStop = false;
            }
            player.togglePlay();
          });
        }
      }
      if (muteBtn) {
        muteBtn.addEventListener("click", () => {
          localStorage.setItem("forceMute", true);
          Players.forceMute = true;
          Players.mute(player);
        });
      }
      if (unmuteBtn) {
        unmuteBtn.addEventListener("click", () => {
          localStorage.setItem("forceMute", false);
          Players.forceMute = false;
          Players.unmute(player);
        });
      }
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", () => {
          localStorage.setItem("forceMute", false);
          Players.forceMute = false;
          player.fullscreen.enter();
          Players.unmute(player);
        });
      }
    }
  },
  destroy: _ => {
    Players.players.forEach(p => {
      p.destroy();
    });
    Players.players = [];
  }
};
export default Players;
