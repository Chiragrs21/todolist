import './App.css';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import About from './components/About'
import Home from './components/Home';
import Statecontext from './context/statecontext';

function App() {
  return (
    <>
      <Statecontext>
        <Nav />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </div>
      </Statecontext>
    </>
  );
}

export default App;
