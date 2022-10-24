import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "635376ee3425j4e724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note1",
            "description": "Please Wake up early",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        },
        {
            "_id": "635376ee342354e724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note2",
            "description": "This is Description",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        },
        {
            "_id": "635376eet34254we724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note2",
            "description": "This is Description",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        },
        {
            "_id": "635376tee34254ee724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note2",
            "description": "This is Description",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        },
        {
            "_id": "635h376ee34254ee724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note2",
            "description": "This is Description",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        },
        {
            "_id": "635376ee3425r4ed724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note2",
            "description": "This is Description",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        },
        {
            "_id": "635376ee34254e724h1c90ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note2",
            "description": "This is Description",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        },
        {
            "_id": "635376esae34254kle724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": "Note2",
            "description": "This is Description",
            "tag": "Personal",
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);
    const [alert, setAlert] = useState(null);

    // Add a Note 
    const addNote = (title, description, tag) => {
        // TODO: API Call
        // console.log('Added')
        const note = {
            "_id": "635376edce34254kle724190ce87",
            "user": "63531905467fbd34e63b078d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-10-22T04:51:58.549Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    // Edit a Note 
    const editNote = (id, title, description, tag) => {
        // TODO: API Call
        
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
    const deleteNote = (id) => {
        // TODO: API Call
        console.log('Removed', id);
        const newNote = notes.filter((note) => {
            console.log(note);
            return note._id !== id
        })
        setNotes(newNote);
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
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;