import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import FormDesigner from "./core-design/container/FormDesigner";
import FormRenderer from "./core-form/FormRenderer";
import AdenaDesigner from "./Pages/AdenaDesigner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AdenaDesigner />} />
          <Route path="design/:id" element={<FormDesigner />} />
          <Route
            path="view/:id"
            element={<FormRenderer/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
