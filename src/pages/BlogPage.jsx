import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { addComment } from "../redux/actions/blogAction";
import CommentCard from "../components/CommentCard";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const { user } = useSelector((state) => state.auth.user);
  const { blogs } = useSelector((state) => state.blogs);
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.getComments.comments);

  const getBlog = () => {
    const foundBlog = blogs.find((blog) => blog.id == blogId);
    // console.log({foundBlog});
    setBlog(foundBlog);
  };

  useEffect(() => {
    getBlog();
  }, [blogs, blogId]);

  return (
    <>
      {user && blog ? (
        <div className="flex flex-col container mx-auto max-w-[600px] gap-6 p-4">
          <BlogCard blog={blog} />

          {/* Blog Comments */}
          <div className="flex flex-col justify-center items-center gap-3 w-full">
            <div className="flex gap-3 w-full">
              <img
                src={user.userImageURL}
                className="w-10 h-10 object-cover rounded-full"
                alt=""
              />

              <div className="flex flex-col justify-start items-start gap-2 w-full">
                <strong>{user.fullName}</strong>

                <div className="flex flex-col justify-end items-end gap-1.5 w-full">
                  <textarea
                    placeholder="Comment"
                    className="w-full p-2 border border-[#969393]/50 rounded-md"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button
                    className={`rounded-full w-[75px] p-2 ${
                      comment.trim() == ""
                        ? "bg-black/50 cursor-not-allowed"
                        : "transform transition-all ease-in-out duration-300 active:scale-95 bg-black text-white"
                    }`}
                    disabled={comment.trim() == ""}
                    onClick={() => {
                      dispatch(
                        addComment(blog.id, {
                          comment,
                          user,
                          addedAt: new Date(),
                        })
                      );
                      setComment("");
                      console.log("Comment added");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
          </div>
        </div>
      ) : (
        <>Blog not found</>
      )}
    </>
  );
};

export default BlogPage;
