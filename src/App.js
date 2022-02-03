import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom'

//Pages
import { Home } from "./pages/Home";
//Components
import { LoginPopup } from './components/LoginPopup';
//Firebase Auth
import { useAuth } from "./contexts/FirebaseContext";
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';


function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <link rel="manifest" href="/public/site.webmanifest"></link>
      <LoginPopup trigger={user == null} />
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
