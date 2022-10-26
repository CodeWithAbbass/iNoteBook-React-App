import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NoteContext from './context/notes/NoteContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  let message = 'This is Message'
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={message} type={'success'}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
