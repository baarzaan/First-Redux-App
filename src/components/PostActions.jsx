import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteBlog, editBlog } from "../redux/actions/blogAction";

const PostActions = ({ setShowPostActions, blog }) => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [body, setBody] = useState(blog.body);

  const handleEditBlog = (e) => {
    e.preventDefault();

    try {
      if (title.trim() != "" && body.trim() != "") {
        const blogData = {
          id: blog.id,
          title,
          body,
        };

        dispatch(editBlog(blogData));
        alert("Blog edited successfully");
        setShowEditModal(false);
        setShowPostActions(false);
      } else {
        return alert("Please fill all inputs!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {!showEditModal ? (
        <div className="absolute top-9 right-0 flex flex-col justify-start items-start gap-3 bg-white p-2 rounded-md shadow-md">
          <button
            title="Close"
            onClick={() => setShowPostActions(false)}
            className="flex justify-start items-center transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-2 hover:rounded-md gap-2"
          >
            <CgClose size={20} />
          </button>

          <button
            onClick={() => setShowEditModal(true)}
            className="w-full flex justify-start items-center transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-2 hover:rounded-md gap-2 border-b border-b-[#e4e4e5]"
          >
            <FiEdit2 />
            <p>Edit</p>
          </button>

          <button
            onClick={() => dispatch(deleteBlog(blog.id))}
            className="flex justify-start items-center transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-2 hover:rounded-md gap-2"
          >
            <FiTrash />
            <p>Delete</p>
          </button>
        </div>
      ) : (
        <div
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-md"
          style={{ zIndex: 999 }}
        >
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] p-2 rounded-md bg-white flex flex-col justify-center items-center gap-4">
            <div className="flex justify-between items-center w-full">
              <button
                title="Close"
                onClick={() => setShowEditModal(false)}
                className="flex justify-start items-center transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-2 hover:rounded-md gap-2"
              >
                <CgClose size={20} />
              </button>
              <h3 className="text-lg font-bold">Edit blog</h3>
              <span></span>
            </div>

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
                onClick={handleEditBlog}
                className="text-white w-[300px] p-2 rounded-md bg-blue-700 hover:bg-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostActions;
