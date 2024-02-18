import { Address } from "viem";

import { UserSummaryProps } from "../../lib/types";
import { COMMON_STYLES } from "./common";

export const LOCAL_TEST_COMPONENT_USER_SUMMARY = async (
  userSummary: UserSummaryProps,
  colorTheme: string,
  screenSize: string,
  themeComponentAddress: Address
) => {
  return `
<body class="${screenSize} font-sans text-sm md:text-base antialiased w-full p-3">
  <div class="flex gap-2 py-5 px-3 rounded-md border-2 shadow-md" style="background-color: hsl(var(--user-summary-background));">
    <div>
      <img
        class="rounded-full"
        src="${userSummary.pfp.url}"
        width="50"
        height="50"
        style="height: 50px; width: 50px;"
        alt="${userSummary.username} profile picture"
      />
    </div>
    <div class="flex justify-between items-start min-w-0 flex-[1]">
      <div class="flex flex-col gap-[2px]">
        <div>
          <h3 class="text-lg font-bold">${userSummary.displayName} - LOCAL TEST</h3>
          <div class="flex gap-8 text-muted-foreground">
            <p>@${userSummary.username}</p>
            <p>fid: ${userSummary.fid}</p>
          </div>
        </div>
        <p>${userSummary.profile.bio.text}</p>
        <div class="flex gap-6">
          <a href="/${userSummary.username}/following" target="_top">
            <strong>${userSummary.followingCount}</strong> Following
          </a >
          <a href="/${userSummary.username}/followers" target="_top">
            <strong>${userSummary.followerCount}</strong> Followers
          </a >
        </div>
      </div>
      <div class="flex gap-4">
        <button id="follow-button" class="rounded-md bg-muted text-muted-foreground p-2 border-2 shadow-sm" style="background-color: hsl(var(--button-primary)); color: hsl(var(--button-primary-foreground));">Follow</button>
        <button id="share-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg></button>
    </div>
  </div>
</body>
<script>
  document.addEventListener("DOMContentLoaded", (event) => {
    const shareButton = document.getElementById("share-button");
    shareButton.addEventListener("click", async () => {
      const url = window.location.protocol + "//" + window.location.hostname + "/${userSummary.username}";
      await navigator.clipboard.writeText(url);
      shareButton.textContent = "Copied!";
    })

    const followButton = document.getElementById("follow-button");
    followButton.addEventListener("click", async () => {
      if (top === null) {
        console.error("top is null");
      } else {
        const handleMessage = (event) => {
          const { followed } = event.data;
          window.removeEventListener("message", handleMessage);
          if (followed) {
            followButton.textContent = "Following";
          }
        };
    
        window.addEventListener("message", handleMessage);
    
        top.postMessage({ command: "follow", fid: ${userSummary.fid} }, "*");
      }
    })
  })
</script>
<style>
  ${await COMMON_STYLES(themeComponentAddress, colorTheme, screenSize)}
</style>`;
};
