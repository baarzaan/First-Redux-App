import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../redux/actions/blogAction";

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreateBlog = (e) => {
    e.preventDefault();

    try {
      if (title.trim() != "" && body.trim() != "") {
        const blogData = {
          title,
          body,
          user,
          createdAt: new Date(),
        };

        dispatch(createBlog(blogData));

        setTitle("");
        setBody("");
        alert("Blog created successfully!");
      } else {
        return alert("Please fill all inputs");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {user ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col justify-center items-center gap-4 w-[350px] p-2 rounded-md shadow-lg">
            <h3 className="text-lg font-bold">Create blog</h3>

            <form className="flex flex-col justify-center items-center gap-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-[300px] border border-[#e4e4e5] rounded-md p-2"
              />

              <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                className="w-[300px] border border-[#e4e4e5] rounded-md p-2"
              />

              <button
                onClick={handleCreateBlog}
                className="text-white w-[300px] p-2 rounded-md bg-blue-700 hover:bg-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>404</>
      )}
    </>
  );
};

export default CreateBlogPage;
