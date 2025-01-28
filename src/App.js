// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './component/Crud/index';
import AddItems from './component/Crud/AddItems/index'
import GetItems from './component/Crud/GetItems/index'
// import About from './About';
// import Contact from './Contact';

const App = () => {
  return (
    <Router>
      <div>
        {/* Define your navigation bar or menu here if needed */}
        <Routes>
          <Route path="/" element={<GetItems />} />
          <Route path="/add" element={<AddItems />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
