import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom'

//Pages
import { Home } from "./pages/Home";
import { Category } from "./pages/Category"

//Components
import { LoginPopup } from './components/LoginPopup';

import { Navbar } from './components/Navbar';

import { useAuth } from './contexts/FirebaseContext';
import { Favourites } from './pages/Favourites';
import { AllCategorys } from './pages/AllCategorys';
import { DatabaseContextProvider } from './contexts/FirestoreContext';
import { CategoryContextProvider } from './contexts/CategoryContext';

function App() {
  const {user} = useAuth()


  
  if(user){
    return(<DatabaseContextProvider><CategoryContextProvider>
      <div className=' h-screen bg-stone-200 '>
      <link rel="manifest" href="/public/site.webmanifest"></link>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category></Category>} />
      <Route path="/all" element={<AllCategorys></AllCategorys>} />
      <Route path="/favourites" element={<Favourites></Favourites>} />
    </Routes>
    </div>
      </CategoryContextProvider></DatabaseContextProvider>
    )
  }else{
    return(
      <LoginPopup></LoginPopup>
    )
  }
}

export default App;
