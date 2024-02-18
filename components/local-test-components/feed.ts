import { Address } from "viem";

import { CastProps } from "../../lib/types";
import { LOCAL_TEST_COMPONENT_INNER_CAST } from "./cast";
import { COMMON_STYLES } from "./common";

export const LOCAL_TEST_COMPONENT_FEED = async (
  casts: CastProps[],
  colorTheme: string,
  screenSize: string,
  themeComponentAddress: Address
) => {
  return `
<body class="${screenSize} font-sans text-sm md:text-base antialiased w-full">
  <div class="flex flex-col gap-4 rounded-md p-4" style="background-color: hsl(var(--feed-background)); color: hsl(var(--feed-foreground));">
  LOCAL TEST
  ${casts
    .map((cast) => {
      return LOCAL_TEST_COMPONENT_INNER_CAST(cast, colorTheme, screenSize);
    })
    .join("")}
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script>
// Function to initialize HLS for a single video element
function initializeHLS(videoElement) {
  var videoSrc = videoElement.getAttribute('data-src');
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(videoElement);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      // videoElement.play();
    });
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = videoSrc;
    videoElement.addEventListener('loadedmetadata', function() {
      // videoElement.play();
    });
  }
}

function addLikeListener(likeButton) {
  var cashHash = likeButton.getAttribute('data-cast-hash');
  likeButton.addEventListener("click", async () => {
    if (top === null) {
      console.error("top is null");
    } else {
      const handleMessage = (event) => {
        const { liked } = event.data;
        window.removeEventListener("message", handleMessage);
        if (liked) {
          likeButton.textContent = "Liked";
        }
      };
  
      window.addEventListener("message", handleMessage);
  
      top.postMessage({ command: "like", cashHash: cashHash }, "*");
    }
  })
}

// Iterate over all video elements with the class 'video-player'
document.addEventListener('DOMContentLoaded', function(event) {
  var videoPlayers = document.querySelectorAll('.video-player');
  videoPlayers.forEach(initializeHLS);

  var likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(addLikeListener);    
});

 
</script>
<style>
  ${await COMMON_STYLES(themeComponentAddress, colorTheme, screenSize)}
</style>`;
};
