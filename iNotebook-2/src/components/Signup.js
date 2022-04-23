import React, {useState} from 'react'
import { useHistory} from 'react-router-dom';

const Signup = (props) => {
    const history=useHistory();
 const [credential, setCredential] = useState({name:"",email:"",password:"",cpassword:""})
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,password,email}=credential;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,password,email}),
          });
          const json = await response.json();
          if(json.sucess){
              localStorage.setItem('token',json.authtoken);
            //   console.log(localStorage.getItem('token'));
              history.push('/Home');
              props.showAlert("Account created sucessfully","success")
          }
          else  props.showAlert("Invalid detail","danger")
    }
     const onchange=(e)=>{
        setCredential({ ...credential, [e.target.name]: e.target.value });
     }

    return (
        <div className="container" style={{width:"600px",color:"white"}}>
             <h1 className="mt-3">Create Account to use iNotebook</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
               <label htmlFor="name">Username</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onchange}/>
            </div>
            <div className="form-group my-4">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
                <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group my-4">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onchange} minLength={5} required/>
            </div>
            <div className="form-group my-4">
                <label htmlFor="cpassword">confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
}

export default Signup