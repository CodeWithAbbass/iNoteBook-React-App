import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';


const About = () => {
  const a = useContext(NoteContext);  // Here is We use NoteContext From NoteContext.js Directly. 
  return (
    <div className="my-5">
      This is About of {a.name}
    </div>
  );
}

export default About;
