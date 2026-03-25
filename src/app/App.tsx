// import { RouterProvider } from "react-router";
// import { router } from "./routes";
// import { Toaster } from "./components/ui/sonner";

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//       <Toaster />
//     </>
//   );
// }

// export default App;
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;