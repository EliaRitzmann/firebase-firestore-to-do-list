import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom'

//Pages
import { Home } from "./pages/Home";
import { Category } from "./pages/Category"

//Components
import { LoginPopup } from './components/LoginPopup';

import { Navbar } from './components/Navbar';

import { useAuth } from './contexts/FirebaseContext';
import { Favorites } from './pages/Favorites';
import { AllCategorys } from './pages/AllCategorys';

function App() {
  const {user} = useAuth()


  
  if(user){
    return(<div>
      <link rel="manifest" href="/public/site.webmanifest"></link>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category></Category>} />
      <Route path="/all" element={<AllCategorys></AllCategorys>} />
      <Route path="/favorites" element={<Favorites></Favorites>} />
    </Routes>
    </div>)
  }else{
    return(
      <LoginPopup></LoginPopup>
    )
  }
}

export default App;
