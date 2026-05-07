// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./features/auth/pages/Login";
// import Register from "./features/auth/pages/Register";

// const AppRoutes = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<h1>Welcome to the App !</h1>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default AppRoutes;
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
]);

export default AppRouter;
