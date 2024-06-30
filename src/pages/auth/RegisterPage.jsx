import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_REGISTER_FAIL } from "../../redux/constants/authConstants";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import { register } from "../../redux/actions/authAction";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

  const [userImage, setUserImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleUploadImage = async () => {
    try {
      const storageRef = ref(storage, `${userImage.name}`);
      await uploadBytes(storageRef, userImage);
      const userImageURL = await getDownloadURL(storageRef);
      return userImageURL;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (
        userImage &&
        fullName.trim() != "" &&
        email.trim() != "" &&
        password.trim() != ""
      ) {
        let userImageURL = null;
        if (userImage) {
          userImageURL = await handleUploadImage();
        }

        const userData = {
          userImageURL,
          fullName,
          email,
          password,
          createdAt: new Date(),
          lastLogin: new Date(),
        };
        dispatch(register(userData));
      } else {
        return alert("Please fill all inputs");
      }
    } catch (error) {
      dispatch({ type: AUTH_REGISTER_FAIL, payload: error.message });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 justify-start items-center w-[400px] p-2 rounded-md shadow-md">
        <h3 className="font-semibold">Register</h3>

        <form className="flex flex-col gap-3 justify-center items-center">
          <input
            type="file"
            accept="image/*"
            className="w-[350px] border border-[#e4e4e5] rounded-md p-2"
            onChange={(e) => setUserImage(e.target.files[0])}
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-[350px] border border-[#e4e4e5] rounded-md p-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-[350px] border border-[#e4e4e5] rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-[350px] border border-[#e4e4e5] rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            onClick={handleRegister}
            className="text-white w-[350px] p-2 rounded-md bg-blue-700 hover:bg-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
          >
            Register
          </button>

          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:text-blue-800 active:scale-95 transform transition-all ease-in-out duration-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
