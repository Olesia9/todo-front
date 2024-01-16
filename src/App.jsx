import './App.sass';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login} from './page/login/Login'
import {Header} from "./component/header/Header";
import {Home} from "./page/home/Home";
import {Registration} from "./page/registration/Registration";

function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="home-page" element={<Home />} />
              <Route path="registration" element={<Registration />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
