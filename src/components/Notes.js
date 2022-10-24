import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItems from './NoteItems';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes} = context;
    return (
        <>
        <AddNote/>
        <div className="row my-4">
            <h2 className=''>Your Notes</h2>
            {notes.map((note) => {
                return (
                    <NoteItems key={note._id} note={note} />
                )
            })}
        </div>
        </>
    );
}

export default Notes;
