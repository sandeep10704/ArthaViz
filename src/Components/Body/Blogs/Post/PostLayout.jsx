import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import GadgetArticle from './Components/GadgetArticle';
import CommentForm from './Components/CommentForm';
import CommentsSection from './Components/CommentsSection.jsx';
import ArticleNavBar from './Components/ArticleNavBar.jsx';
import { fetchSinglePostById } from '../../../../store/singlePostSlice.js';
import LoadingScreen from "../../../CommonComponents/LoadingScreen";

const PostLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: post, loading, error } = useSelector((state) => state.singlePost);

  useEffect(() => {
    dispatch(fetchSinglePostById(id));
  }, [dispatch, id]);

  if (loading) return <LoadingScreen text="Loading post..." />;
  if (error) return <p>Error: {error}</p>;
  if (!post) return null;

  return (
    <div>
      <GadgetArticle data={post.articleData} />
      <ArticleNavBar
        categories={post.categories}
        previousArticle={post.previousArticle}
        nextArticle={post.nextArticle}
      />
      <CommentsSection comments={post.comments} />
      <CommentForm id={id} />
    </div>
  );
};

export default PostLayout;
