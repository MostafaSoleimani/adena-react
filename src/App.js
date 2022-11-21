import {
  BrowserRouter, Link, Route,
  Routes
} from "react-router-dom";
import "./App.css";
import FormDesigner from "./core-design/container/FormDesigner";
import AdenaDesigner from "./Pages/AdenaDesigner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Link to="design">Go To Design</Link>}
        ></Route>
        <Route path="design" element={<AdenaDesigner />} />
        <Route path="design/:id" element={<FormDesigner />} />
        <Route
          path="engine"
          element={<h1> Engine is not implemented yet</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
