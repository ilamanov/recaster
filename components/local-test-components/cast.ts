import { Address } from "viem";

import { CastProps } from "../../lib/types";
import { COMMON_STYLES } from "./common";
import { COMMENT_ICON, HEART_ICON, REPEAT_ICON, SHARE_ICON } from "./icons";

export const LOCAL_TEST_COMPONENT_CAST = async (
  cast: CastProps,
  colorTheme: string,
  screenSize: string,
  themeComponentAddress: Address
) => {
  return `
<body class="${colorTheme} md font-sans text-sm md:text-base antialiased w-full">
  ${LOCAL_TEST_COMPONENT_INNER_CAST(cast, colorTheme, screenSize)}
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

export const LOCAL_TEST_COMPONENT_INNER_CAST = (
  cast: CastProps,
  colorTheme: string,
  screenSize: string
) => {
  let embed = "";
  if (cast.embeds.length > 0) {
    const firstEmbed = cast.embeds[0];
    if ("cast" in firstEmbed) {
      embed = `<a href="/cast/${firstEmbed.cast.hash}" target="_top">
        ${LOCAL_TEST_COMPONENT_EMBED_CAST(
          firstEmbed.cast,
          colorTheme,
          screenSize
        )}
      </a>`;
    } else if ("embedUrl" in firstEmbed) {
      const embedUrl = firstEmbed.embedUrl;
      if (embedUrl.startsWith("https://stream") && embedUrl.endsWith(".m3u8")) {
        embed = `
            <video data-src="${embedUrl}" class="video-player mt-2 max-h-[300px]" controls></video>
          `;
      } else if (
        embedUrl.startsWith("https://i.imgur.com/") &&
        (embedUrl.endsWith(".png") || embedUrl.endsWith(".jpg"))
      ) {
        embed = `<img src="${embedUrl}" class="mt-2 max-h-[300px]" alt="Embedded Image" />`;
      }
    }
  }

  let channel = "";
  if (cast.channel) {
    const channelInfo = cast.channel;
    channel = `
  <div class="rounded-sm border border-muted-foreground px-2 py-1 mt-2 flex gap-2 items-center w-fit">
      <img
      class="rounded-sm"
      src="${channelInfo.imageUrl}"
      width="20"
      height="20"
      alt="'${channelInfo.name}' channel picture"
      />
      <p class="text-muted-foreground">${channelInfo.name}</p>
  </div>
  `;
  }

  const author = cast.author;

  return `
  <div class="flex gap-2 border-b border-muted p-2 rounded-md border-2" style="background-color: hsl(var(--cast-background)); color: hsl(var(--cast-foreground));">
    <a href="/${author.username}" target="_top">
      <div>
        <img
          class="rounded-full"
          src="${author.pfpUrl}"
          width="50"
          height="50"
          style="height: 50px; width: 50px;"
          alt="${author.username} profile picture"
        />
      </div>
    </a>
    <div class="min-w-0 flex-[1]">
      <a href="/${author.username}" target="_top">
        <div class="flex gap-2 items-end">
          <h3 class="text-lg font-bold">${author.displayName}</h3>
          <p class="text-muted-foreground">@${
            author.username
          } • ${cast.timeDelta}</p>
        </div>
      </a>

      <a href="/cast/${cast.hash}" target="_top">
        <p class="whitespace-pre-wrap break-words pt-[2px]">${cast.text}</p>
      </a>
      ${embed}
      ${channel}
      <div class="flex justify-between mt-4 text-muted-foreground px-4">
        <button class="flex gap-1">${COMMENT_ICON()} <span>${cast.repliesCount}</span></button>
        <button class="flex gap-1">${REPEAT_ICON()} <span>${cast.recastsCount}</span></button>
        <button class="flex gap-1 like-button" data-cast-hash="${cast.hash}">${HEART_ICON()} <span>${cast.likesCount}</span></button>
        <button class="flex gap-1">${SHARE_ICON()}</button>
      </div>
    </div>
  </div>
  `;
};

const LOCAL_TEST_COMPONENT_EMBED_CAST = (
  cast: CastProps,
  colorTheme: string,
  screenSize: string
): string => {
  let embed = "";
  if (cast.embeds.length > 0) {
    const firstEmbed = cast.embeds[0];
    if ("cast" in firstEmbed) {
      embed = LOCAL_TEST_COMPONENT_EMBED_CAST(
        firstEmbed.cast,
        colorTheme,
        screenSize
      );
    }
  }

  return `
        <div class="p-3 mt-2 border border-muted-foreground rounded-md">
          <div class="flex gap-2 items-end">
            <img
                class="rounded-full"
                src="${cast.author.pfpUrl}"
                style="width: 25px; height: 25px;"
                alt="${cast.author.username} profile picture"
            />
            <h3 class="text-lg font-bold">${cast.author.displayName}</h3>
            <p class="text-muted-foreground">@${cast.author.username} • ${cast.timeDelta}</p>
          </div>
          <p class="whitespace-pre-wrap break-words pt-[2px]">${cast.text}</p>
          ${embed}
        </div>
        `;
};
