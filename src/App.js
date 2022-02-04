import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom'

//Pages
import { Home } from "./pages/Home";
//Components
import { LoginPopup } from './components/LoginPopup';

import { Navbar } from './components/Navbar';

import { useAuth } from './contexts/FirebaseContext';

function App() {
  const {user} = useAuth()

  if(user){
    return(<div>
      <link rel="manifest" href="/public/site.webmanifest"></link>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>)
  }else{
    return(
      <LoginPopup></LoginPopup>
    )
  }
}

export default App;
