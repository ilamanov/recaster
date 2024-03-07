const fakeProps = {
  hash: "0x9f979be8e1b6d5e6cd6cbfda8c742a108e9d8007",
  timestamp: "2024-03-06T03:48:05.000Z",
  text: "Voted yes for this one. Nouns builders have the potential to do something special here.",
  author: {
      username: "seneca",
      displayName: "seneca",
      pfpUrl: "https://i.imgur.com/RMv6RmZ.gif",
  },
  embeds: [
    {
      cast: {
        hash: "0x5e173eb7042551db5e6771b0316485f74619fc11",
        timestamp: "2024-03-06T03:32:41.000Z",
        text: `Prop 509 to double the award pool for Nouns x Farcaster has passed! We now have $300k for builders to build at the intersection of Nouns & Farcaster lfg

https://www.nouns.camp/proposals/509`,
        author: {
          username: "seneca-embed",
          displayName: "seneca embed",
          pfpUrl: "https://i.imgur.com/RMv6RmZ.gif",
        },
      }
    },
    {
      embedUrl: "https://i.imgur.com/KdGLKtL.jpg"
    }
  ],
  channel: {
    imageUrl: "https://i.imgur.com/oKJnN7d.jpg",
    name: "politics"
  },
  repliesCount: 14,
  recastsCount: 3,
  likesCount: 23
}

const cast = "hash" in props ? props : fakeProps;
// const cast = fakeProps;
// const cast = props

const author = cast.author

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

function getTimeDelta(timestamp) {
  const timeElapsed = getTimeElapsed(timestamp);

  if (timeElapsed.days > 0) {
    return `${timeElapsed.days}d`;
  } else if (timeElapsed.hours > 0) {
    return `${timeElapsed.hours}h`;
  } else if (timeElapsed.minutes > 0) {
    return `${timeElapsed.minutes}m`;
  } else {
    return `${timeElapsed.seconds}s`;
  }
}

function getTimeElapsed(timestamp) {
  // Parse the given timestamp
  const pastDate = new Date(timestamp);

  // Get current date
  const currentDate = new Date();

  // Calculate difference in milliseconds
  let diff = currentDate.getTime() - pastDate.getTime();

  // Convert difference to a more readable format
  const seconds = Math.floor(diff / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
  const hours = Math.floor(minutes / 60); // Convert minutes to hours
  const days = Math.floor(hours / 24); // Convert hours to days

  // Update diff to represent the remainder for the next largest unit
  diff -= days * 24 * 60 * 60 * 1000;
  diff -= (hours % 24) * 60 * 60 * 1000;
  diff -= (minutes % 60) * 60 * 1000;
  const remainingSeconds = Math.floor(diff / 1000);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: remainingSeconds,
  };
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

  &:hover {
    text-decoration-line: none;
    color: hsl(var(--foreground));
  }
`;

const PrettyButton = styled.button`
  color: hsl(var(--muted-foreground));
  border-width: 0px;
  background-color: transparent;
  display: flex;
  gap: 0.25rem;
`;

// We define colors again on purpose. If cast colors are not defined, we want to use the default ones
const DivWithColors = styled.div`
  background-color: hsl(var(--cast-background, var(--background)));
  color: hsl(var(--cast-foreground, var(--foreground)));
`;

const embeds = cast.embeds.map(embed => {
  if ("cast" in firstEmbed) {
    return (
        <PrettyLink href={`/cast/${firstEmbed.cast.hash}`} target="_top">
          <Widget src={"recaster.testnet/widget/EmbeddedCast"} props={firstEmbed.cast} />
        </PrettyLink>
    )
  } 
  else if ("embedUrl" in firstEmbed) {
    const embedUrl = firstEmbed.embedUrl;
    if (embedUrl.startsWith("https://stream") && embedUrl.endsWith(".m3u8")) {
      return <video data-src={embedUrl} controls className="rc-video-player mt-2" style={{maxHeight: 300}}></video>;
    } else if (
      embedUrl.startsWith("https://i.imgur.com/") &&
      (embedUrl.endsWith(".png") || embedUrl.endsWith(".jpg"))
    ) {
      return <img src={embedUrl} alt="Embedded Image" className="mt-2" style={{maxHeight: 300}} />;
    }
  }
  return "unsupported embed"
});

let channel;
if (cast.channel) {
  const channelInfo = cast.channel;
  channel = (
    <div
      className="rounded-1 px-2 py-1 mt-2 d-flex gap-2 align-items-center"
      style={{
        borderWidth: 1,
        borderColor: "hsl(var(--muted-foreground))",
        width: "fit-content",
      }}
    >
      <img
        className="rounded-1"
        src={channelInfo.imageUrl}
        width={20}
        height={20}
        alt={`${channelInfo.name} channel picture`}
      />
      <p style={{color: "hsl(var(--muted-foreground))"}}>{channelInfo.name}</p>
    </div>
  );
}

return (
  <DivWithColors
    className="d-flex gap-2 p-2 rounded-2"
    style={{
      borderWidth: 1,
      borderColor: "hsl(var(--muted))",
    }}
  >
    <a href={`/${author.username}`} target="_top">
      <div>
        <img
          className="rounded-circle"
          src={`${author.pfpUrl}`}
          width="50"
          height="50"
          style={{height: 50, width: 50, maxWidth: "none"}}
          alt={`${author.username} profile picture`}
        />
      </div>
    </a>

    <div className="flex-grow-1">
      <a href={`/${author.username}`} target="_top">
        <div className="d-flex gap-2 align-items-end">
          <div className="fs-6 fw-bold" style={{color: "hsl(var(--foreground))", margin: 0}}>{author.displayName}</div>
          <div style={{color: "hsl(var(--muted-foreground))", margin: 0}}>@{
            author.username
          } • {getTimeDelta(cast.timestamp)}</div>
        </div>
      </a>

      <PrettyLink href={`/cast/${cast.hash}`} target="_top">
        <p className="text-break mb-1" style={{whiteSpace: "pre-wrap"}}>{cast.text}</p>
      </PrettyLink>
      {embeds}
      {channel}
      <div className="d-flex justify-content-between mt-4 px-4">
        <PrettyButton className="d-flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {" "}<span>{formatCompactNumber(cast.repliesCount)}</span>
        </PrettyButton>
        <PrettyButton className="d-flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
          {" "}<span>{formatCompactNumber(cast.recastsCount)}</span>
        </PrettyButton>
        <PrettyButton className="d-flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          {" "}<span>{formatCompactNumber(cast.likesCount)}</span>
        </PrettyButton>
        <PrettyButton className="d-flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
        </PrettyButton>
      </div>
    </div>
  </DivWithColors>
);
