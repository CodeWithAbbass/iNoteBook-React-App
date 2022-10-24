import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const [note, setNote] = useState({ title: '', description: '', tag: 'defualt' });
    const context = useContext(NoteContext);
    const { addNote } = context;
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (e) => {
        console.log('Onchange');
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container mt-5">
                <h2 className=''>Your Plan For Today?</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={onChange} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-success " onClick={handleAdd}>Add Note</button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;
