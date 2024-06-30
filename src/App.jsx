import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/Routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserOnLoad } from "./redux/actions/authAction";
import Header from "./components/Header";
import { getBlogs } from "./redux/actions/blogAction";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOnLoad());
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isPrivate ? (
                <PrivateRoutes>{route.element}</PrivateRoutes>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
