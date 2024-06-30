import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth.user);
  const { blogs } = useSelector((state) => state.blogs);

  return (
    <>
      {user ? (
        <div className="flex flex-col gap-5 py-7 justify-center items-center">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomePage;
