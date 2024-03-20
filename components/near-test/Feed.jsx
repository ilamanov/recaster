const fakeProps = {
  casts: [
    {
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
          }
      ]
    },
  ]
}

const feed = "casts" in props ? props : fakeProps;

if (context.loading) return "Loading ...";

// We define colors again on purpose. If cast colors are not defined, we want to use the default ones
const DivWithColors = styled.div`
background-color: hsl(var(--feed-background, var(--background)));
color: hsl(var(--feed-foreground, var(--foreground)));
`;

return (
  <DivWithColors
    className="p-3 rounded-2 d-flex flex-column gap-4"
  >
    {feed.casts.map((cast) => {
      return <Widget src={"recaster.testnet/widget/Cast"} props={{
        ...cast,
        appUrl: props.appUrl,
        onLike: () => props.onLike(cast.hash),
      }} />;
    })}
  </DivWithColors>
);
