import "./index.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/photos" element={<HomePage></HomePage>}></Route>
        <Route path="/photo/:id" element={<DetailsPage></DetailsPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
