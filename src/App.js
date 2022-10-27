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
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (AlertMessage, AlertType) => {
    setAlert({
      message: AlertMessage,
      type: AlertType,
    });
    setTimeout(() => {
      setAlert(alert);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert  Alert={alert}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert}/>} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showAlert={showAlert}/>} />
              <Route path='/signup' element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
