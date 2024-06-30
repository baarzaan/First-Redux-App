import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  AUTH_GET_USER_REQUEST,
  AUTH_GET_USER_SUCCESS,
  AUTH_GET_USER_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAIL,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
} from "../constants/authConstants";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const getUserOnLoad = () => (dispatch) => {
  try {
    dispatch({
      type: AUTH_GET_USER_REQUEST,
    });

    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.email);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          currentUser = userSnapshot.data();
          dispatch({ type: AUTH_GET_USER_SUCCESS, payload: currentUser });
        }
      } else {
        dispatch({ type: AUTH_GET_USER_FAIL, payload: "User not found" });
      }
    });
  } catch (error) {
    dispatch({
      type: AUTH_GET_USER_FAIL,
      payload: error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_LOGIN_REQUEST,
    });

    const userDoc = doc(db, "users", email);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(userDoc, {
        lastLogin: new Date(),
      });
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: userSnapshot.data(),
      });
      console.log("LOGGED IN SUCCESSFULLY");
    } else {
      return alert("User not found");
    }
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_FAIL, payload: error.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_FORGOT_PASSWORD_REQUEST });

    const userDoc = doc(db, "users", email);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      await sendPasswordResetEmail(auth, email);
      dispatch({ type: AUTH_FORGOT_PASSWORD_SUCCESS, payload: email });
      alert("Password reset link sent to your email successfully!");
    } else {
      return alert("User not found");
    }
  } catch (error) {
    dispatch({ type: AUTH_FORGOT_PASSWORD_FAIL, payload: error.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_REGISTER_REQUEST,
    });

    const userDoc = doc(db, "users", userData.email);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      await setDoc(userDoc, userData);
      dispatch({
        type: AUTH_REGISTER_SUCCESS,
        payload: userSnapshot.data(),
      });
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: userSnapshot.data(),
      });
      console.log("User created successfully!");
    } else {
      return alert("User already exists");
    }
  } catch (error) {
    dispatch({ type: AUTH_REGISTER_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_LOGOUT_REQUEST,
    });

    await signOut(auth);
    dispatch({
      type: AUTH_LOGOUT_SUCCESS,
      payload: null,
    });
    dispatch({
      type: AUTH_GET_USER_SUCCESS,
      payload: null,
    });
    console.log("Logged out successfully!");
  } catch (error) {
    dispatch({ type: AUTH_LOGOUT_FAIL, payload: error.message });
  }
};
