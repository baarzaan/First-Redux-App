import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { CiLogout } from "react-icons/ci";
import { logout } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const { blogs } = useSelector((state) => state.blogs);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userBlogs = blogs.filter((blog) => blog.user.email == user?.email);

  return (
    <>
      {user ? (
        <div className="pt-[30px]">
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="w-[95%] mx-auto rounded-md shadow-lg h-[200px] flex flex-col justify-center items-center gap-5">
              <div className="mr-auto ml-0 px-2">
                <button
                  title="Logout"
                  onClick={handleLogout}
                  className="transform transition-all ease-in-out duration-300 active:scale-95 hover:bg-[#969393]/15 p-1 rounded-full"
                >
                  <CiLogout size={25} />
                </button>
              </div>

              <div className="flex flex-col justify-center items-center gap-3">
                <img
                  src={user.userImageURL}
                  className="w-16 h-16 rounded-full object-cover"
                  alt=""
                />
                <h2 className="text-xl font-bold">{user.fullName}</h2>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
              <h2 className="text-xl font-bold">
                My blogs ({userBlogs.length})
              </h2>

              <div className="flex flex-col justify-center items-center gap-3">
                {userBlogs.length == 0 && (
                  <h3 className="text-lg font-semibold">
                    You don't have any blogs yet.
                  </h3>
                )}

                {userBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfilePage;
