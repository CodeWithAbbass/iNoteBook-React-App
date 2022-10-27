import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const [note, setNote] = useState({ title: '', description: '', tag: '' });
    const context = useContext(NoteContext);
    const { addNote } = context;
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: '', description: '', tag: 'default' });
        props.showAlert('Note Added Successfully', 'success')
    }
    const onChange = (e) => {
        // console.log('Onchange');
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container mt-5">
                <h2 className=''>Your Plan For Today?</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-success " onClick={handleAdd}>Add Note</button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;
