import { Route, Routes } from "react-router-dom";
import CardDetails from "./Pages/CardPage/CardDetails";
import MainPage from "./Pages/MainPage/MainPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/movies/:imdbID" element={<CardDetails />}></Route>
      </Routes>
    </>
  );
};

export default App;
