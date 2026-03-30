import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import ResumePage from "./pages/ResumePage";
import StartProjectPage from "./pages/StartProjectPage";
import { AboutPage } from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "portfolio/:slug", element: <CaseStudyPage /> },
      { path: "resume", element: <ResumePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "start-project", element: <StartProjectPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
