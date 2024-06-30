import React from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";

const CommentCard = ({ comment }) => {
    const { user } = useSelector((state) => state.auth.user);

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
            <p className="text-[#969393]/75">{Date(comment.createdAt)}</p>
          </div>

          {comment.user.email === user.email && (
            <div className="">
              <button
                // onClick={() => handleSelectedBlog(blog)}
                className="flex justify-center items-center transform transition-all ease-in-out duration-300 hover:bg-[#969393]/15 rounded-full w-7 h-7 active:scale-95"
              >
                <IoIosMore size={25} />
              </button>

              {/* {showPostActions && (
                <PostActions
                  setShowPostActions={setShowPostActions}
                  blog={selectedBlog}
                />
              )} */}
            </div>
          )}
        </div>

        <div>
          <p className="whitespace-pre-wrap">{comment.comment}</p>
        </div>

        <div className="flex justify-center items-center gap-2.5">
          <button
            title="Like"
            className="transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-1 hover:rounded-full"
          >
            <HiOutlineHeart size={25} />
          </button>
        </div>

        <p className="text-[#969393]">2 likes</p>
      </div>
    </div>
  );
};

export default CommentCard;
