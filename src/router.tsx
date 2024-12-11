import { createHashRouter } from "react-router-dom";
import App from "./App";
import Home from "./Screens/Home";
import ComingSoon from "./Screens/ComingSoon";
import NowPlaying from "./Screens/NowPlaying";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);
