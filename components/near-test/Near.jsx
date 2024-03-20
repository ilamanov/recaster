
const elementToLike = "I<3Near";

const likes = Social.index("like", elementToLike, { subscribe: true });
const userLike = context.accountId
  ? Social.index("like", elementToLike, {
      accountId: context.accountId,
      subscribe: true,
    })
  : [];

let dataLoading = likes === null || userLike === null;

const LikeButton = styled.button`
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #687076;
  font-weight: 400;
  font-size: 3rem;
  line-height: 17px;
  cursor: pointer;
  background: none;
  padding: 6px;
  transition: color 200ms;

  i {
    font-size: 3rem;
    transition: color 200ms;

    &.bi-heart-fill {
      color: #e5484d !important;
    }
  }
`;

const likeClick = () => {
  const data = {
    index: {
      like: JSON.stringify({
        key: elementToLike,
        value: "liked",
      }),
    },
  };

  Social.set(data, {
    onCommit: () => {
      setHasLike(true);
      setTotalLikes(likes.length + 1);
    },
    onCancel: () => {},
  });
};

return (<LikeButton
disabled={context.loading || dataLoading || !context.accountId}
onClick={likeClick}
>
<i
  className={`${userLike.length > 0 ? "bi-heart-fill" : "bi-heart"}`}
/>
{likes.length}
</LikeButton>)