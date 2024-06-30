import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions/authAction";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const { loading, error } = useSelector((state) => state.auth.forgotPassword);

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleForgotPassword = (e) => {
    e.preventDefault();

    try {
      if (email.trim() != "") {
        dispatch(forgotPassword(email));
      } else {
        return alert("Please enter your email");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 justify-start items-center w-[400px] p-2 rounded-md shadow-md">
        <div className="w-full flex justify-between items-center">
          <Link
            title="Back to login"
            to="/login"
            className="transform transition-all ease-in-out duration-300 hover:bg-[#969393]/15 rounded-full p-1 active:scale-95"
          >
            <IoIosArrowBack size={25} />
          </Link>
          <h3 className="font-semibold">Forgot Password</h3>
          <span></span>
        </div>

        <form className="flex flex-col gap-3 justify-center items-center">
          <input
            type="email"
            placeholder="Email"
            className="w-[350px] border border-[#e4e4e5] rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="cursor-pointer text-white w-[350px] p-2 rounded-md bg-blue-700 hover:bg-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
          >
            Send Reset Password Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
