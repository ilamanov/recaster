const fakeProps = {
    pfp: { url: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA" },
    username: "dwr.eth",
    custodyAddress: "0x1234567890",
    displayName: "Dan Romero",
    fid: 3,
    profile: { bio: { text: "Working on Farcaster and Warpcast." } },
    followingCount: 2500,
    followerCount: 149440,
    mutualFollows: [
      {
        pfp: { url: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA" },
        username: "dwr.eth",
        displayName: "Dan Romero",
        fid: 3,
        profile: { bio: { text: "Working on Farcaster and Warpcast." } },
        followingCount: 2500,
        followerCount: 149440,
      },
      {
        pfp: { url: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA" },
        username: "dwr.eth",
        displayName: "Dan Romero",
        fid: 3,
        profile: { bio: { text: "Working on Farcaster and Warpcast." } },
        followingCount: 2500,
        followerCount: 149440,
      }
    ]
}

const userSummary = "pfp" in props ? props : fakeProps;

const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

if (context.loading) return "Loading ...";

function formatCompactNumber(number) {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
}

const PopoverItem = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 0.25rem 0.5rem;

  &:hover {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    cursor: pointer;
  }
`;

const PrettyLink = styled.a`
  color: hsl(var(--foreground));
`;

// We define colors again on purpose. If user-summary colors are not defined, we want to use the default ones
const DivWithColors = styled.div`
  background-color: hsl(var(--user-summary-background, var(--background)));
  color: hsl(var(--user-summary-foreground, var(--foreground)));
`;

let mutualFollowsString;
if (userSummary.mutualFollows !== undefined) {
  mutualFollowsString = `Followed by${userSummary.mutualFollows.slice(0, 3).map((user, index) => (
    ` @${user.username}`
  )).join(",")}`

  if (userSummary.mutualFollows.length > 3) {
    mutualFollowsString += ` and ${userSummary.mutualFollows.length - 3} more you know`
  }
}

return (
  <DivWithColors
    className="p-3 rounded-2"
    style={{
      borderWidth: 1,
      boxShadow: "var(--box-shadow-md)"
    }}
  >
    <div className="d-flex gap-3">
      <div>
        <img
          className="rounded-circle"
          src={userSummary.pfp.url}
          width="50"
          height="50"
          style={{height: 50, width: 50, maxWidth: "none"}}
          alt={`${userSummary.username} profile picture`}
        />
      </div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex flex-column" style={{gap: 10}}>
            <div>
              <h3 className="mb-0 fs-6 fw-bold">{userSummary.displayName}</h3>
              <div style={{color: "hsl(var(--muted-foreground))"}}>
                @{userSummary.username} <span className="ms-2">fid: {userSummary.fid}</span>
              </div>
            </div>
            <p className="mb-0">{userSummary.profile.bio.text}</p>
            <div className="d-flex gap-3">
              <PrettyLink href={`/${userSummary.username}/following`} target="_top">
                <strong>{formatCompactNumber(userSummary.followingCount)}</strong> Following
              </PrettyLink >
              <PrettyLink href={`/${userSummary.username}/followers`} target="_top">
                <strong>{formatCompactNumber(userSummary.followerCount)}</strong> Followers
              </PrettyLink >
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className="rounded-2 p-2"
              style={{
                backgroundColor: "hsl(var(--muted))",
                color: "hsl(var(--muted-foreground))",
                // We define these again on purpose. If user-summary colors are not defined, we want to use the default ones
                backgroundColor: "hsl(var(--button-primary))",
                color: "hsl(var(--button-primary-foreground))",
                borderWidth: 1,
                boxShadow: "var(--box-shadow-sm)"
              }}
              onClick={() => {
                const callback = props.onFollow;
                if (callback) {
                  callback();
                }
              }}
            >
              Follow
            </button>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "hsl(var(--foreground))",
                    color: "hsl(var(--user-summary-foreground))",
                    borderWidth: 0
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </Popover.Trigger>
              <Popover.Content>
                <DivWithColors
                  className="fs-6 border-1 rounded-2 d-flex flex-column gap-2"
                >
                  <PopoverItem 
                    onClick={() => clipboard.writeText(`${props.appUrl || ""}/${userSummary.username}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg><span>Copy link to profile</span>
                  </PopoverItem>
                  <PopoverItem 
                    onClick={() => setDetailsDialogOpen(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg><span>About</span>
                  </PopoverItem>
                </DivWithColors>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
        <div className="mt-3">
          {userSummary.mutualFollows !== undefined && (
            userSummary.mutualFollows.length === 0 ? <div style={{color: "hsl(var(--muted-foreground))"}}>Not followed by anyone you know</div> : (
              <a href={`/${userSummary.username}/mutual-followers`} target="_top" style={{color: "hsl(var(--muted-foreground))"}}>
                <div className="d-flex gap-2 align-items-center">
                  <div className="d-flex" style={{gap: 2}}>
                    {userSummary.mutualFollows.slice(0, 3).map((user, index) => (
                      <img
                        key={index}
                        className="rounded-circle"
                        src={user.pfp.url}
                        width="30"
                        height="30"
                        style={{height: 30, width: 30}}
                        alt={`${user.username} profile picture`}
                      />
                    ))}
                  </div>
                  <div>
                    {mutualFollowsString}
                  </div>
                </div>
              </a>
            )
          )}
        </div>
      </div>
    </div>

    <Dialog.Root open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
      <Dialog.Overlay
        className="position-fixed z-3 opacity-75"
        style={{backgroundColor: "hsl(var(--background))", inset: 0}}
      />
      <Dialog.Content
        className="position-fixed start-50 top-50 z-3 grid w-100 translate-middle gap-4"
        style={{
          maxWidth: "60ch",
          borderWidth: 1,
        }}
      >
        <DivWithColors className="p-4">
          <div className="fw-bold mb-2">Custody address</div>
          <div>{userSummary.custodyAddress}</div>
        </DivWithColors>
        <Dialog.Close 
          className="position-absolute"
          style={{right: "1rem", top: "1rem"}}
          asChild
        >
          <button
            style={{
              backgroundColor: "transparent",
              color: "hsl(var(--foreground))",
              color: "hsl(var(--user-summary-foreground))",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  </DivWithColors>
);
