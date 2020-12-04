import React, { useEffect, useState } from "react";
import {useAuth} from '../../contexts/authContext';
import { Link
    // , useHistory 
} from "react-router-dom";
import firebase from '../../firebase';

export default function NoteList() {
    const {currentUser} = useAuth()
    // const history = useHistory();
    const [notes, setNotes] = useState([]);
    useEffect(()=>{
        firebase.firestore().collection("notes").onSnapshot((snapshot)=>{
            let allNotes = []
            snapshot.docs.map(doc=>{
                if(doc.data().noteOwner===currentUser.uid)
                allNotes.push(doc.data());
            })
            setNotes(allNotes);
        })
    },[])
    const handleClickOnNote = (id) => {
        // history.push(`/notelist/${id}`);
        console.log("note no",id);
    };

    return (
    <>
      <div className="row" style={{ justifyContent: "space-around" }}>
        <h1 style={{ marginTop: "1rem", textAlign: "center" }}>
          All Your Notes
        </h1>
      </div>
      <Link
        className="btn btn-success ml-4"
        style={{ float: "right", margin: "0.5rem" }}
        to="/addnote"
      >
        + Add new note
      </Link>
      <div style={{ margin: "1rem" }}>
        {notes.length ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name of note taker </th>
                <th scope="col">Date of note </th>
                <th scope="col">Note Description</th>
              </tr>
            </thead>
            <tbody>
              {notes.length
                ? notes.map((note, index) => (
                    <tr key={index} onClick={() => handleClickOnNote(index)}>
                      <td className="bg-warning" scope="row">
                        {index + 1}
                      </td>
                      <td className="bg-warning">{note.noteTakerName}</td>
                      <td className="bg-warning">{note.dataOfNote}</td>
                      <td className="bg-warning">{note.noteDescription}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        ) : (
          <label>There is any note in the list till now</label>
        )}
      </div>
    </>
  );
}
