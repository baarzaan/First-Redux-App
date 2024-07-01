import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  deleteBlogComment,
  editBlogComment,
} from "../redux/actions/blogAction";

const CommentActions = ({ setShowCommentActions, selectedComment }) => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [comment, setComment] = useState(selectedComment.comment.comment);

  const handleEditComment = (e) => {
    e.preventDefault();

    try {
      if (comment.trim() != "") {
        const commentData = {
          id: selectedComment.comment.id,
          comment,
        };

        dispatch(editBlogComment(selectedComment.blogId, commentData));
        alert("Comment edited successfully");
        setShowEditModal(false);
        setShowCommentActions(false);
      } else {
        return alert("Please enter your comment");
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
            onClick={() => setShowCommentActions(false)}
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
            onClick={() =>
              dispatch(
                deleteBlogComment(
                  selectedComment.blogId,
                  selectedComment.comment.id
                )
              )
            }
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
          <div className="edit absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] p-2 rounded-md bg-white flex flex-col justify-center items-center gap-4">
            <div className="flex justify-between items-center w-full">
              <button
                title="Close"
                onClick={() => setShowEditModal(false)}
                className="flex justify-start items-center transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-2 hover:rounded-md gap-2"
              >
                <CgClose size={20} />
              </button>
              <h3 className="text-lg font-bold">Edit comment</h3>
              <span></span>
            </div>

            <form className="flex flex-col justify-center items-center gap-3">
              <textarea
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="edit-content w-[300px] border border-[#e4e4e5] rounded-md p-2"
              />

              <button
                onClick={handleEditComment}
                className="edit-content text-white w-[300px] p-2 rounded-md bg-blue-700 hover:bg-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
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

export default CommentActions;
