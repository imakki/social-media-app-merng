import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";

import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "../context/auth";

import { FETCH_POST_BY_ID } from "../util/graphql";
import LikeButton from "../component/LikeButton";
import DeleteButton from "../component/DeleteButton";

const SinglePost = (props) => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const { data: { getPost } = {} } = useQuery(FETCH_POST_BY_ID, {
    variables: { postId },
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading...</p>;
  } else {
    console.log(getPost);
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    function deletePostCallback() {
      props.history.push("/");
    }

    postMarkup = (
      <Grid className="single-post-container">
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              float="right"
              size="small"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>
                  {formatDistanceToNow(new Date(createdAt), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post!!")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={postId} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

export default SinglePost;
