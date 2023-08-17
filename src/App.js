import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";

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
          element: <About />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/projects",
          element: <Projects />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/skills",
          element: <Skills />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
