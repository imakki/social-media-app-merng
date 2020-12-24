import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../component/PostCard";

import { AuthContext } from "../context/auth";
import PostForm from "./PostForm";
import { FETCH_POST_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POST_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data?.getPosts &&
          data?.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
