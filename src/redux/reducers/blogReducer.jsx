import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
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

const initialState = {
  loading: false,
  blogs: [],
  likes: {},
  comments: [],
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
      return {
        ...state,
        loading: false,
        comments: action.payload,
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
        comments: action.payload,
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
