import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  BLOG_COMMENT_LIKE_FAIL,
  BLOG_COMMENT_LIKE_REQUEST,
  BLOG_COMMENT_LIKE_SUCCESS,
  BLOG_CREATE,
  BLOG_DELETE,
  BLOG_EDIT,
  BLOG_FAIL,
  BLOG_LIKE_FAIL,
  BLOG_LIKE_REQUEST,
  BLOG_LIKE_SUCCESS,
  BLOG_REQUEST,
  BLOG_SUCCESS,
  DELETE_BLOG_COMMENT_FAIL,
  DELETE_BLOG_COMMENT_REQUEST,
  DELETE_BLOG_COMMENT_SUCCESS,
  EDIT_BLOG_COMMENT_FAIL,
  EDIT_BLOG_COMMENT_REQUEST,
  EDIT_BLOG_COMMENT_SUCCESS,
  GET_BLOG_COMMENT_LIKE_FAIL,
  GET_BLOG_COMMENT_LIKE_REQUEST,
  GET_BLOG_COMMENT_LIKE_SUCCESS,
  GET_BLOG_LIKES_FAIL,
  GET_BLOG_LIKES_REQUEST,
  GET_BLOG_LIKES_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
} from "../constants/blogConstants";

const initialState = {
  loading: false,
  blogs: [],
  likes: {},
  comments: {},
  commentLikes: {},
  error: null,
};

export const getBlogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        blogs: [],
        error: null,
      };

    case BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
        error: null,
      };

    case BLOG_FAIL:
      return {
        ...state,
        loading: false,
        blogs: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case BLOG_CREATE:
      return {
        ...state,
        blogs: action.payload,
      };

    case BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case BLOG_DELETE:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      };

    case BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const editBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case BLOG_EDIT:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      };

    case BLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const toggleLikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOG_LIKES_REQUEST:
    case BLOG_LIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BLOG_LIKES_SUCCESS:
    case BLOG_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: {
          ...state.likes,
          [action.payload.blogId]: action.payload.likes,
        },
      };
    case GET_BLOG_LIKES_FAIL:
    case BLOG_LIKE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const addCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_COMMENT_SUCCESS:
      const { blogId, comments } = action.payload;
      return {
        ...state,
        loading: false,
        comments: {
          ...state.comments,
          [blogId]: comments,
        },
      };

    case ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const getCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: {
          ...state.comments,
          [action.payload.blogId]: action.payload.comments,
        },
      };

    case GET_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const toggleCommentLikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOG_COMMENT_LIKE_REQUEST:
    case BLOG_COMMENT_LIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BLOG_COMMENT_LIKE_SUCCESS:
    case BLOG_COMMENT_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        commentLikes: {
          [action.payload.blogId]: {
            ...state.commentLikes[action.payload.blogId],
            [action.payload.commentId]: action.payload.likes,
          },
        },
      };

    case GET_BLOG_COMMENT_LIKE_FAIL:
    case BLOG_COMMENT_LIKE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const deleteBlogCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_BLOG_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BLOG_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload.commentId
        ),
      };

    case DELETE_BLOG_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const editBlogCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_BLOG_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EDIT_BLOG_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.map((comment) =>
          comment.id == action.payload.commentId
            ? { ...comment, comment: action.payload.commentData.comment }
            : comment
        ),
      };

    case EDIT_BLOG_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
