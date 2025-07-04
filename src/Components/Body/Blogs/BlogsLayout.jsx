import React from 'react'
import PostsLayout from './Posts/PostsLayout'
import { Outlet } from 'react-router'

const BlogsLayout = () => {
  return (
    <div>
    <Outlet/>
    </div>
  )
}

export default BlogsLayout