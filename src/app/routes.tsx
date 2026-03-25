// import { createBrowserRouter } from "react-router";
// import { LandingPage } from "./pages/LandingPage";
// import { PredictionForm } from "./pages/PredictionForm";
// import { ResultsPage } from "./pages/ResultsPage";
// import { DashboardPage } from "./pages/DashboardPage";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: LandingPage,
//   },
//   {
//     path: "/predict",
//     Component: PredictionForm,
//   },
//   {
//     path: "/results",
//     Component: ResultsPage,
//   },
//   {
//     path: "/dashboard",
//     Component: DashboardPage,
//   },
// ]);
import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { PredictionForm } from "./pages/PredictionForm";
import { ResultsPage } from "./pages/ResultsPage";
import { DashboardPage } from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/predict",
    element: <PredictionForm />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);