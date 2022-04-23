import {React,useContext,useState} from 'react'
import notecontent from '../context/notes/NoteContext';
import "./Notesitem.css"
import Viewnotes from './Viewnotes';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Notesitem(props) {
    const {deleting}=useContext(notecontent);
    const {note,updatenote,showAlert}=props;

    const [viewmode,setViewmode]=useState(false);
    return (
        <div className="col-md-3 my-3 big_box">
            <div className="card small_box">
                <div className="card-body notes_box">
                    <div className='heading_line'>
                        <h5 className="card-title">{note.title}</h5>
                        <button className='view_btn' onClick={()=>{setViewmode(true)}}> view</button>
                        {/* <VisibilityIcon className='view_btn' onClick={()=>{setViewmode(true)}}/> */}
                        {viewmode && <Viewnotes closemode={setViewmode} note={note}/>}
                    </div>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-edit edit_icon"  onClick={()=>{updatenote(note)}}></i>
                    <DeleteIcon className="delete_btn"  onClick={()=>{deleting(note._id);showAlert("Deleted successFully","success");}}/>
                </div>
            </div>
       </div>
    )
}
