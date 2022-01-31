import { UserAuthContextProvider } from "./contexts/FirebaseContext";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'

import { Home } from "./pages/Home";



function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
      </UserAuthContextProvider>
  );
}

export default App;
