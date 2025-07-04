import React from 'react'
import GadgetArticle from './Components/GadgetArticle'
import CommentForm from './Components/CommentForm'
import CommentsSection from './Components/CommentsSection.jsx'
import ArticleNavBar from './Components/ArticleNavBar.jsx'

const PostLayout = () => {
  return (
    <div>
      <GadgetArticle/>
      <ArticleNavBar/>
      <CommentsSection/>
      <CommentForm/>

    </div>
  )
}

export default PostLayout
