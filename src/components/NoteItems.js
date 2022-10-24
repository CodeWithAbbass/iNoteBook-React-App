import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItems = (props) => {
    const { note } = props;
    const context = useContext(NoteContext);
    const { deleteNote, editNote } = context;
    const style = {
        position: "absolute",
        top: "1.3rem",
        right: "0.5rem",
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3 bg-success text-white">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-trash-can mx-2 " style={style} onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2 " style={{ ...style, right: "2.5rem" }} onClick={() => {
                         editNote(
                            note._id,
                            note.title,
                            note.description,
                            note.tag
                            )}}>
                            </i>
                </div>
            </div>
        </div>
    );
}

export default NoteItems;
