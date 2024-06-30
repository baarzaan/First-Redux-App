import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_LOGIN_FAIL } from "../../redux/constants/authConstants";
import { login } from "../../redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      if (email.trim() != "" && password.trim() != "") {
        dispatch(login(email, password));
      } else {
        alert("Please fill all inputs");
      }
    } catch (error) {
      dispatch({ type: AUTH_LOGIN_FAIL, payload: error.message });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 justify-start items-center w-[400px] p-2 rounded-md shadow-md">
        <h3 className="font-semibold">Login</h3>

        <form className="flex flex-col gap-3 justify-center items-center">
          <input
            type="email"
            placeholder="Email"
            className="w-[350px] border border-[#e4e4e5] rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex flex-col justify-end items-end gap-1">
            <input
              type="password"
              placeholder="Password"
              className="w-[350px] border border-[#e4e4e5] rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Link
              to="/forgot-password"
              className="text-blue-700 hover:text-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="text-white w-[350px] p-2 rounded-md bg-blue-700 hover:bg-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
          >
            Login
          </button>

          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 hover:text-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
