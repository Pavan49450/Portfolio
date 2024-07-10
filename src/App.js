import "./App.css";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import "./input.css";

import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/about",
          element: <AboutMe />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects",
          element: <Projects />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects/:id",
          element: <ProjectDetail />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/skills",
          element: <Skills />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/services",
          element: <Services />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
