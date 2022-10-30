import { FC } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainScreen from "./Screens/MainScreen/MainScreen";
import TestListScreen from "./Screens/TestListScreen/TestListScreen";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/test" element={<TestListScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />}></Route>
    </Routes>
  )
};

export default AppRouter;
