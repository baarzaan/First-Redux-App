import { applyMiddleware, combineReducers, createStore } from "redux";
import { forgotPasswordReducer, getUserReducer, loginReducer, logoutReducer, registerReducer } from "../redux/reducers/authReducer";
import { thunk } from "redux-thunk";
import { addCommentReducer, createBlogReducer, deleteBlogReducer, editBlogReducer, getBlogsReducer, getCommentsReducer, toggleLikeReducer } from "../redux/reducers/blogReducer";

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
    getComments: getCommentsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;