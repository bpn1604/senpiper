import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/details' element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
