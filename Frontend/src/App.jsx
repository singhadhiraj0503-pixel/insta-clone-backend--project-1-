import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <AuthProvider>
        <AppRoutes />
      </AuthProvider> */}

      <AuthProvider>
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </div>
  );
};

export default App;
