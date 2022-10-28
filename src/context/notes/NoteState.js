import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    const [alert, setAlert] = useState(null);

    // GetAll Note 
    const getNotes = async () => {
        // const url = 'api/notes/fetchallnotes';
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add a Note 
    const addNote = async (title, description, tag) => {
        const url = 'api/notes/addnote';
        const response = await fetch(`${host}/${url}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Edit a Note 
    const editNote = async (id, title, description, tag) => {
        const url = 'api/notes/updatenote';
        await fetch(`${host}/${url}/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });

    
        // Logic Edit Note to Client 
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    // Delete a Note 
    const deleteNote = async (id) => {
        const url = 'api/notes/deletenote';
        await fetch(`${host}/${url}/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        const newNote = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNote);
        showAlert('Note Deleted Successfuly', 'Success');
    }

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
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote,getNotes,alert, setAlert, showAlert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;