import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useAuth} from '../../contexts/authContext';
import firebase from '../../firebase'
import './style.css'

export default function AddNoteForm() {
  const { currentUser} = useAuth()
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    noteTakerName: "",
    dataOfNote: "",
    noteDescription: "",
  });

  const { register, handleSubmit, errors } = useForm();

  const handleChange = (e) => {
    console.log(currentUser);
      console.log(e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const onSubmit = async (data) => {
    console.log("Submit", data);
    alert("Successfully note added");
    firebase.firestore().collection('notes').add({
      noteTakerName:formValues.noteTakerName,
      dataOfNote:formValues.dataOfNote,
      noteDescription:formValues.noteDescription,
      noteOwner:currentUser.uid
    })
    history.push("/notelist");
  };
  return (
    <>
      {/* <!-- main --> */}
      <div className="signup-form-wrapper">
          <div>
        <h1>Add New Crop Note</h1>

        {/* <Link className="btn btn-warning" to="/notelist"> Notes List </Link> */}
          </div>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label-inputs" htmlFor="noteTakerName">
                Note Taker Name:{" "}
              </label>
              <input
                ref={register({
                  required: true,
                })}
                className="text noteTakerName form-control"
                type="text"
                name="noteTakerName"
                placeholder="name of note taker"
                value={formValues.noteTakerName}
                onChange={handleChange}
              />
              {/* required error */}
              {errors.noteTakerName &&
                errors.noteTakerName.type === "required" && (
                  <p className="errorMsg">* This is field required</p>
                )}
              <div className="form-group">

              <label className="label-inputs" htmlFor="dataOfNote">
                Date of note:{" "}
              </label>
              <input
                ref={register({ required: true })}
                className="form-control"
                type="date"
                name="dataOfNote"
                placeholder="Date of note"
                value={formValues.dataOfNote}
                onChange={handleChange}
              />
              {/* required error */}
              {errors.dataOfNote && errors.dataOfNote.type === "required" && (
                <p className="errorMsg">* This is field required</p>
              )}
</div>
              <label className="label-inputs" htmlFor="noteDescription">
                Description of note :{" "}
              </label>
              {/* <textarea
                
              /> */}
              <div className="form-group">
                {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  ref={register({ required: true })}
                  name="noteDescription"
                  placeholder="Date of note"
                  value={formValues.noteDescription}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              {/* required error */}
              {errors.dataOfNote && errors.dataOfNote.type === "required" && (
                <p className="errorMsg">* This is field required</p>
              )}

              <input type="submit" value="Add New Note" />
            </form>
          </div>
        </div>
      </div>
    
    </>
  );
}
