import React, { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentLikes,
  toggleLikeComment,
} from "../redux/actions/blogAction";
import CommentActions from "./CommentActions";

const CommentCard = ({ comment, blogId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const commentLikes = useSelector(
    (state) =>
      state.toggleCommentLikeReducer.commentLikes[blogId]?.[comment.id] || []
  );
  const [selectedComment, setSelectedComment] = useState(null);
  const [showCommentActions, setShowCommentActions] = useState(false);

  useEffect(() => {
    if (blogId && comment.id) {
      dispatch(getCommentLikes(blogId, comment.id));
    }
  }, [dispatch, blogId, comment.id]);

  const isCommentLiked =
    Array.isArray(commentLikes) &&
    commentLikes.some((like) => like.user.email === user?.email);

  const handleSelectedComment = (selectedComment) => {
    setSelectedComment(selectedComment);
    setShowCommentActions(true);
  };

  const createdAtDate = comment.addedAt.toDate();
  const formattedDate = createdAtDate.toLocaleString();

  return (
    <div className="relative flex px-2 py-4 shadow-lg rounded-md container mx-auto max-w-[600px]">
      <img
        src={comment.user.userImageURL}
        className="w-10 h-10 object-cover rounded-full"
        alt=""
      />

      <div className="flex flex-col justify-start items-start gap-2 w-full px-3">
        <div className="flex justify-between items-centerw w-full">
          <div className="flex flex-col gap-0.5">
            <strong>{comment.user.fullName}</strong>
            <p className="text-[#969393]/75">{formattedDate}</p>
          </div>

          {comment.user.email === user?.email ||
          comment.blogAuthor === user?.email ? (
            <div title="More" className="">
              <button
                onClick={() => handleSelectedComment({ blogId, comment })}
                className="flex justify-center items-center transform transition-all ease-in-out duration-300 hover:bg-[#969393]/15 rounded-full w-7 h-7 active:scale-95"
              >
                <IoIosMore size={22} />
              </button>

              {showCommentActions && (
                <CommentActions
                  setShowCommentActions={setShowCommentActions}
                  selectedComment={selectedComment}
                />
              )}
            </div>
          ) : null}
        </div>

        <div>
          <p className="whitespace-pre-wrap">{comment.comment}</p>
        </div>

        <button
          onClick={() => dispatch(toggleLikeComment(blogId, comment.id, user))}
          className="flex justify-center items-center gap-0.5 transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-1 hover:rounded-full"
        >
          <p className="">
            {isCommentLiked ? (
              <HiHeart title="Unlike" size={25} color="red" />
            ) : (
              <HiOutlineHeart title="Like" size={25} />
            )}
          </p>

          <p title={`${commentLikes.length} likes`} className="text-[#969393]">
            {commentLikes.length}
          </p>
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
