import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItems from './NoteItems';
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: 'default' });
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        // if(localStorage.getItem('token')){
            getNotes()
        // }else{
            // navigate("/login");
        // }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, });

    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert('Note Updated Successfully', 'success')
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* This Button Set to Display None with the Bootstrap Class d-none  */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content bg-success text-white">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control shadow" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control shadow" id="edescription" name='edescription' value={note.edescription} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control shadow" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary shadow rounded text-white" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-bg-success shadow  rounded text-white" >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4 container">
                <h2>Your Notes</h2>
                {notes.length === 0 && <p>No Notes to Display</p>}
                {notes.map((note) => {
                    return <NoteItems showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}
export default Notes;
