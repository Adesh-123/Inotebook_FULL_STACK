import {React,useState,useEffect} from 'react'

export default function Subscribe() {
   const [count,setCount] =useState(0);
   
//    useEffect(() =>{
//        //   document.title=`you have clicked ${count}`
//        document.body.style.backgroundColor = "red";
//     },[count===3])
    // useEffect(() =>{
    //     //   document.title=`you have clicked ${count}`
    //     document.body.style.backgroundColor = "yellow";
    // },[count===2])
    useEffect(() =>{
        document.body.style.backgroundColor = "white";
    },[])
    return (
        <div>
            <h1>total number of click is {count}</h1>
            <button type="button" className="btn btn-primary btn-lg" onClick={()=>setCount(count+1)}>Large button</button>
        </div>
    )
}
