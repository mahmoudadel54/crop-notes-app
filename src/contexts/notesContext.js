import React, {createContext, useContext, useEffect, useState} from 'react'
import firebase from '../firebase';

const NotesContext = createContext();

export default function NotesProvider(props) {

    const [notes, setNotes] = useState([]);
    useEffect(()=>{
        let allNotes = [];
        firebase
        .firestore()
        .collection("notes")
        .onSnapshot(async(snapshot) => {
           await snapshot.docs.map((doc) => {
                let note = doc.data();
                // debugger
                allNotes.push(note);
            });
        })

       setNotes(allNotes);
    },[])
    const value = {
        notes,
        setNotes
    }

    return (
        <NotesContext.Provider value={value}>
            {props.children}
        </NotesContext.Provider>
    )
}

//instead notesContext in components
export function useNotes() {
    return useContext(NotesContext);
}
