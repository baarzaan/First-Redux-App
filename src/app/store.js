import { applyMiddleware, combineReducers, createStore } from "redux";
import { forgotPasswordReducer, getUserReducer, loginReducer, logoutReducer, registerReducer } from "../redux/reducers/authReducer";
import { thunk } from "redux-thunk";
import { addCommentReducer, createBlogReducer, deleteBlogCommentReducer, deleteBlogReducer, editBlogCommentReducer, editBlogReducer, getBlogsReducer, getCommentsReducer, toggleCommentLikeReducer, toggleLikeReducer } from "../redux/reducers/blogReducer";

const rootReducer = combineReducers({
    auth: combineReducers({
        user: getUserReducer,
        login: loginReducer,
        register: registerReducer,
        forgotPassword: forgotPasswordReducer,
        logout: logoutReducer,
    }),

    blogs: getBlogsReducer,
    createBlog: createBlogReducer,
    deleteBlog: deleteBlogReducer,
    editBlog: editBlogReducer,
    toggleLikeReducer: toggleLikeReducer,
    addCommentReducer: addCommentReducer,
    getCommentsReducer: getCommentsReducer,
    toggleCommentLikeReducer: toggleCommentLikeReducer,
    deleteBlogCommentReducer: deleteBlogCommentReducer,
    editBlogCommentReducer: editBlogCommentReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;