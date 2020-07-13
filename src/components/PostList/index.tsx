/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { number } from 'prop-types';

import fetchPostsData from '../../utils/fetchPostsData';
import fetchCommentsData, { Comment } from '../../utils/fetchCommentsData';

import {
  Container,
  TitleContainer,
  List,
  CommentsContainer,
  CommentsContainerList,
} from './styles';

const postsResource = fetchPostsData();
const commentsResource = fetchCommentsData();

const PostList: React.FC = () => (
  <Container>
    <TitleContainer>
      <h1>Suspense Feed</h1>
      <FaReact size={35} />
    </TitleContainer>
    <Suspense
      fallback={
        Array.from(Array(10).keys()).map((i) => (
          <SkeletonLoader
            key={i}
            width="720px"
            height="155px"
            background="rgba(0, 0, 0, 0.2)"
            style={{
              marginTop: '65px',
            }}
          />
        ))
}
    >
      <PostListDetails />
    </Suspense>
  </Container>
);

const PostListDetails: React.FC = () => {
  const posts = postsResource.posts.read();
  return (
    <List>
      {posts?.map((post) => (
        <li
          key={post.id}
        >
          <h2>{post.author.name}</h2>
          <article>
            <h3>{post.title}</h3>
            <p>
              {post.body}
            </p>
          </article>

          <hr />

          <Suspense
            fallback={<span>loading comments...</span>}
          >
            <CommentDetails
              postId={post.id}
            />
          </Suspense>
        </li>
      ))}
    </List>
  );
};

interface CommentDetailsProps {
  postId: number
}

const CommentDetails: React.FC<CommentDetailsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[] | undefined>([]);
  const [isCommentsVisible, setCommentsVisible] = useState(false);

  useEffect(() => {
    if (isCommentsVisible) {
      const commentsData = commentsResource.comments.read();
      const filtredComments = commentsData?.filter((comment) => comment.postId === postId);
      setComments(filtredComments);
    }
  }, [isCommentsVisible, postId]);

  return (
    <>
      <CommentsContainer>
        <button
          type="button"
          onClick={() => setCommentsVisible(true)}
        >
          See comments
        </button>
      </CommentsContainer>

      <CommentsContainerList
        isDisplayed={isCommentsVisible}
      >
        {comments?.map((comment) => (
          <li
            id="comment-listItem"
            key={comment.id}
          >
            <h4>{comment.comment_author.email}</h4>
            <p>{comment.body}</p>
          </li>
        ))}
      </CommentsContainerList>
    </>

  );
};
CommentDetails.propTypes = {
  postId: number.isRequired,
};

export default PostList;
