import BaseLayout from "@/layouts/BaseLayout";
import Notfound404 from "@/pages/Notfoud404/Notfound404";
import SinglePostpage from "@/pages/Singlepost/SinglePostpage";
import { Outlet, type RouteObject } from "react-router-dom";

const articlesRoutes = {
  path: "/articles",
  element: (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
  children: [
    {
      path: "/articles/:slug/single-read",
      id: "article",
      element: <SinglePostpage />,
    },
    {
      path: "/articles/*",
      id: "articles-404",
      element: <Notfound404 />,
    },
  ],
} satisfies RouteObject;

export default articlesRoutes;
