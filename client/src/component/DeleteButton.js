import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_POST_QUERY } from "../util/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      let newData = [...data.getPosts];
      newData = newData.filter((post) => post.id !== postId);
      console.log(newData);
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPosts: {
            newData,
          },
        },
      });
      if (callback) {
        callback();
      }
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
