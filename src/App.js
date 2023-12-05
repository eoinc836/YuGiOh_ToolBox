import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './navbar/NavBar';
import SmallWorld from './SmallWorld';
import Search from './Search';
import './App.css';
function App() {
    return (
        <div className='app'>
        <Router>
            <div className='navbar'>
            <NavBar/>
            </div>
            <Routes>
                <Route exact path="/" element={<Search />} />
                <Route path="/SmallWorld" element={<SmallWorld />} />
            </Routes>
        </Router>
        </div>
    );
}
 
export default App;