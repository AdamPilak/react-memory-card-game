import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Play from "./pages/Play";
import History from "./pages/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/play",
    element: (
      <Layout>
        <Play />
      </Layout>
    ),
  },
  {
    path: "/history",
    element: (
      <Layout>
        <History />
      </Layout>
    ),
  },
]);

export default router;
