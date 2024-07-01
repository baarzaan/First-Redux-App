import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PostActions from "./PostActions";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import {
  getBlogLikes,
  getComments,
  toggleLike,
} from "../redux/actions/blogAction";

const BlogCard = ({ blog }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth.user);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showPostActions, setShowPostActions] = useState(false);
  const likes = useSelector(
    (state) => state.toggleLikeReducer.likes[blog.id] || []
  );
  const comments = useSelector(
    (state) => state.getCommentsReducer.comments[blog.id] || []
  );

  useEffect(() => {
    if (blog) {
      dispatch(getBlogLikes(blog.id));
      dispatch(getComments(blog.id));
    }
  }, [dispatch, blog]);

  const handleSelectedBlog = (selectedBlog) => {
    setSelectedBlog(selectedBlog);
    setShowPostActions(true);
  };

  const truncateBlogBodyText = (text, number) => {
    return text.length > number ? text.slice(0, number) + "..." : text;
  };

  const isLiked =
    Array.isArray(likes) &&
    likes.some((like) => like.user.email === user?.email);

  const createdAtDate = blog.createdAt.toDate();
  const formattedDate = createdAtDate.toLocaleString();

  return (
    <div className="blog-card relative flex px-2 py-4 shadow-lg rounded-md container mx-auto max-w-[600px]">
      <img
        src={blog.user.userImageURL}
        className="w-10 h-10 object-cover rounded-full"
        alt=""
      />

      <div className="flex flex-col justify-start items-start gap-2 w-full px-3">
        <div className="flex justify-between items-centerw w-full">
          <div className="flex flex-col gap-0.5">
            <strong>{blog.user.fullName}</strong>
            <p className="text-[#969393]/75">{formattedDate}</p>
          </div>

          {blog.user.email === user?.email && (
            <button
              title="More"
              onClick={() => handleSelectedBlog(blog)}
              className="flex justify-center items-center transform transition-all ease-in-out duration-300 hover:bg-[#969393]/15 rounded-full w-7 h-7 active:scale-95"
            >
              <IoIosMore size={22} />
            </button>
          )}

          {showPostActions && (
            <PostActions
              setShowPostActions={setShowPostActions}
              blog={selectedBlog}
            />
          )}
        </div>

        <Link to={`/blog/${blog.id}`}>
          <h2 className="text-xl font-bold">{blog.title}</h2>

          <p className="whitespace-pre-wrap">
            {location.pathname.includes("blog") ? (
              <>{blog.body}</>
            ) : (
              <>{truncateBlogBodyText(blog.body, 300)}</>
            )}
          </p>
        </Link>

        <div className="flex justify-center items-center gap-2.5">
          <button
            title={isLiked ? "Unlike" : "Like"}
            onClick={() => dispatch(toggleLike(blog, user))}
            className="flex justify-center items-center gap-1 transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-1 hover:rounded-full"
          >
            <p className="">
              {isLiked ? (
                <HiHeart size={25} color="red" />
              ) : (
                <HiOutlineHeart size={25} />
              )}
            </p>

            <p title={`${likes.length} likes`} className="text-gray-400">
              {likes.length}
            </p>
          </button>

          <Link
            title="Comments"
            to={`/blog/${blog.id}`}
            className="flex justify-center items-center gap-1 transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-1 hover:rounded-full"
          >
            <p to={`/blog/${blog.id}`} className="">
              <FaRegComment size={25} />
            </p>

            <p title={`${comments.length} comments`} className="text-gray-400">
              {comments.length}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
