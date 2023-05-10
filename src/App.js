import './App.css';
import ListTour from "./component/ListTour";
import Nav from "./component/Nav";
import Create from "./component/Create";
import Update from "./component/Update";
import Views from "./component/Views";import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Nav/>
          <Routes>
              <Route path={"/"} element={<ListTour/>}></Route>
              <Route path={"/create"} element={<Create/>}></Route>
              <Route path={"/update/:id"} element={<Update/>}></Route>
              <Route path={"/views/:id"} element={<Views/>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
