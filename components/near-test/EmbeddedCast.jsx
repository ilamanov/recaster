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
      embedUrl: "https://i.imgur.com/SBYFZBm.jpg"
    }
  ],
}

const cast = "hash" in props ? props : fakeProps;

const author = cast.author

if (context.loading) return "Loading ...";

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

// We define colors again on purpose. If cast colors are not defined, we want to use the default ones
const DivWithColors = styled.div`
background-color: hsl(var(--cast-background, var(--background)));
color: hsl(var(--cast-foreground, var(--foreground)));
`;

return (
  <DivWithColors
    className="p-2 rounded-2"
    style={{
      borderWidth: 1,
      borderColor: "hsl(var(--muted))",
    }}
  >
    <div className="d-flex gap-2 align-items-end">
      <img
          className="rounded-circle"
          src={author.pfpUrl}
          style={{ height: 25, width: 25 }}
          alt={`${author.username} profile picture`}
      />
      <div className="fs-6 fw-bold" style={{margin: 0}}>{author.displayName}</div>
      <div style={{color: "hsl(var(--muted-foreground))", margin: 0}} >@{author.username} • {getTimeDelta(cast.timestamp)}</div>
    </div>
    <p className="text-break pt-1" style={{whiteSpace: "pre-wrap"}}>{cast.text}</p>
  </DivWithColors>
);
