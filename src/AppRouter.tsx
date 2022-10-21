import { FC } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainScreen from "./Screens/MainScreen/MainScreen";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />}></Route>
    </Routes>
  )
};

export default AppRouter;
