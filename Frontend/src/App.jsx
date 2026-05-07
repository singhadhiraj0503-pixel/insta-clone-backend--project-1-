import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context";
import { RouterProvider } from "react-router-dom";
import { PostContextProvider } from "./features/posts/post.context";

const App = () => {
  return (
    <div>
      {/* <AuthProvider>
        <AppRoutes />
      </AuthProvider> */}

      <AuthProvider>
        <PostContextProvider>
          <RouterProvider router={AppRoutes} />
        </PostContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
