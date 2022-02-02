import { UserAuthContextProvider } from "./contexts/FirebaseContext";
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from 'react-router-dom'

import { Home } from "./pages/Home";



function App() {
  return (
    <UserAuthContextProvider>
      <link rel="manifest" href="/public/site.webmanifest"></link>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
      </UserAuthContextProvider>
  );
}

export default App;
