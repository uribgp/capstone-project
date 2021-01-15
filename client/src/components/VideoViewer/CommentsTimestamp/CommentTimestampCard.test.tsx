import React, { ReactElement } from "react";
import { shallow, mount, render } from "enzyme";
import CommentTimestampCard from "./CommentTimestampCard";

it("expect to render card component.", () => {
  expect(
    shallow(
      <CommentTimestampCard
        username="pontus"
        id={4}
        onDownvoteClick={() => null}
        voteStatus="upvoted"
        timestamp={15}
        isToggled={false}
        avatar="hej.jpg"
        onClick={() => null}
        onUpvoteClick={() => null}
        hasVerifiedIcon={false}
        comment="Nice lift"
        formatted_timestamp="00:15"
        score={0}
      />
    )
  ).toMatchSnapshot();
});
