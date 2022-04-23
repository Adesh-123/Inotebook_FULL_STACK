import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialState = [];
  const [notes, setNotes] = useState(initialState);

  //  GET ALL NOTES OF USER
  const getAllNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(localStorage.getItem('token'))
    setNotes(json);
  };

  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
   const json= await response.json();
  //  console.log(json);
    setNotes(notes.concat(json));
  };

  // deleting note
  const deleting = async (id) => {
    const response =await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    })
    const afterdeletenode = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(afterdeletenode);
  };

  // edit note
  const Editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
     let newnotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      let element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(newnotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, getAllNote, addnote, deleting, Editnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
