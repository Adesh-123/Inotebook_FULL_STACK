import {React,useContext,useEffect,useRef,useState} from 'react'
import Notesitem from './Notesitem';
import notecontent from '../context/notes/NoteContext';
import Addnotes from './Addnotes'
import { useHistory } from 'react-router';

export default function Notes(props) {
    let history=useHistory();
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });
    const content=useContext(notecontent);
    const {notes,getAllNote,Editnote}=content;
    useEffect(() => {
        if(localStorage.getItem('token')) {
          getAllNote();
        }
        else{
            history.push("/login");}
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const updatenote=(currentNote)=>{
        ref.current.click();
        setNote({
            id:currentNote._id,
            etitle:currentNote.title,
            edescription:currentNote.description,
            etag:currentNote.tag
        })
    }
    const handleClick = (e) => {
        Editnote(note.id,note.etitle,note.edescription,note.etag);
        refclose.current.click();
        props.showAlert("Updated successfully" ,"success")
    };
  
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
        <div>
            <Addnotes showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className="my-3">
                                    <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        aria-describedby="emailHelp"
                                        value={note.etitle}
                                        onChange={onChange}
                                        minLength={5}
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                        required
                                    />
                                    </div>
                  </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
           <div className= "row my-3">
            <div className="container mx-2" style={{color:"white",fontSize:"28px",display:"flex"}}>
            {notes.length ===0 && "OPPS! No notes is created"}
            </div>
            {notes.map((note)=>{
            return <Notesitem showAlert={props.showAlert} updatenote={updatenote} key={note._id} note={note}/>;
            })}
            </div> 
        </div>
        </>
    )
}
