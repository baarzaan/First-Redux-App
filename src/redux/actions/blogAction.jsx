import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  ADD_COMMENT_FAIL,
  BLOG_CREATE,
  BLOG_DELETE,
  BLOG_EDIT,
  BLOG_FAIL,
  BLOG_LIKE_FAIL,
  BLOG_LIKE_REQUEST,
  BLOG_LIKE_SUCCESS,
  BLOG_REQUEST,
  BLOG_SUCCESS,
  GET_BLOG_LIKES_FAIL,
  GET_BLOG_LIKES_REQUEST,
  GET_BLOG_LIKES_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
} from "../constants/blogConstants";
import { db } from "../../firebase/firebaseConfig";

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_REQUEST });

    const blogsCollection = collection(db, "blogs");
    onSnapshot(
      query(blogsCollection, orderBy("createdAt", "desc")),
      (snapshot) => {
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: BLOG_SUCCESS, payload: blogs });
      }
    );
  } catch (error) {
    dispatch({ type: BLOG_FAIL, payload: error.message });
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_REQUEST });

    const blogsCollection = collection(db, "blogs");
    await addDoc(blogsCollection, blogData);
    dispatch({ type: BLOG_CREATE, payload: blogData });
  } catch (error) {
    dispatch({ type: BLOG_FAIL, payload: error.message });
  }
};

export const deleteBlog = (blogId) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_REQUEST });

    const blogDoc = doc(db, "blogs", blogId);
    await deleteDoc(blogDoc, blogId);
    dispatch({ type: BLOG_DELETE, payload: blogData });
    console.log("Blog deleted successfully!");
  } catch (error) {
    dispatch({ type: BLOG_FAIL, payload: error.message });
  }
};

export const editBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_REQUEST });

    const blogDoc = doc(db, "blogs", blogData.id);
    await updateDoc(blogDoc, blogData);
    dispatch({ type: BLOG_EDIT, payload: blogData });
  } catch (error) {
    dispatch({ type: BLOG_FAIL, payload: error.message });
  }
};

export const toggleLike = (blog, user) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIKE_REQUEST });

    const likesCollection = collection(db, `blogs/${blog.id}/likes`);
    const likesSnapshot = await getDocs(likesCollection);
    const isLiked = likesSnapshot.docs.find(
      (like) =>
        like.data().blogId == blog.id && like.data().user.email == user.email
    );

    if (isLiked) {
      await deleteDoc(doc(likesCollection, isLiked.id));
      console.log("BLOG UNLIKED");
    } else {
      await addDoc(likesCollection, {
        blogId: blog.id,
        user,
        likedAt: new Date(),
      });
      console.log("BLOG LIKED");
    }

    const updatedLikesSnapshot = await getDocs(likesCollection);
    const updatedLikes = updatedLikesSnapshot.docs.map((doc) => doc.data());

    dispatch({
      type: BLOG_LIKE_SUCCESS,
      payload: { blogId: blog.id, likes: updatedLikes },
    });
  } catch (error) {
    dispatch({ type: BLOG_LIKE_FAIL, payload: error.message });
  }
};

export const getBlogLikes = (blogId) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_LIKES_REQUEST });

    const likesCollection = collection(db, `blogs/${blogId}/likes`);
    onSnapshot(
      query(likesCollection, orderBy("likedAt", "desc")),
      (snapshot) => {
        const likes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({
          type: GET_BLOG_LIKES_SUCCESS,
          payload: { blogId: blogId, likes },
        });
      }
    );
  } catch (error) {
    dispatch({ type: GET_BLOG_LIKES_FAIL, payload: error.message });
  }
};

export const addComment = (blogId, commentData) => async (dispatch) => {
  try {
    const commentsCollection = collection(db, `blogs/${blogId}/comments`);
    await addDoc(commentsCollection, commentData);
  } catch (error) {
    dispatch({ type: ADD_COMMENT_FAIL, payload: error.message });
  }
};

export const getComments = (blogId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COMMENT_REQUEST,
    });

    const commentsCollection = collection(db, `blogs/${blogId}/comments`);
    onSnapshot(
      query(commentsCollection, orderBy("addedAt", "desc")),
      (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: GET_COMMENT_SUCCESS, payload: comments });
      }
    );
  } catch (error) {
    dispatch({ type: GET_COMMENT_FAIL, payload: error.message });
  }
};
