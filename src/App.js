import "./App.css";
// import AuthenticationPage from "./pages/AuthenticationPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ResetPassword from "./pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword/:token",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
