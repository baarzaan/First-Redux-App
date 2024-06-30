import BlogPage from "../pages/BlogPage";
import CreateBlogPage from "../pages/CreateBlogPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export const routes = [
  { path: "/", element: <HomePage />, isPrivate: true },

  { path: "/login", element: <LoginPage />, isPrivate: false },

  { path: "/register", element: <RegisterPage />, isPrivate: false },

  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    isPrivate: false,
  },

  { path: "/create", element: <CreateBlogPage />, isPrivate: true },

  { path: "/profile", element: <ProfilePage />, isPrivate: true },

  { path: "/blog/:blogId", element: <BlogPage />, isPrivate: true },
];
