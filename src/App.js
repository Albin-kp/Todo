
import './App.css'
import {useState,useRef,useEffect} from "react";
import {AiOutlineFileDone} from "react-icons/ai";
import {AiFillDelete} from "react-icons/ai";
import {AiFillEdit} from "react-icons/ai";


function App() {
const[input,setInput] = useState('')
const[inputs,setInputs] = useState([])
const inputRef=useRef('null')
const[editid,setEditid]= useState(0)
useEffect(()=>{
  inputRef.current.focus();
})

const handlesubmit =(e) =>{
  e.preventDefault();
};


const addinput =( )=>{
  if(input !==''){
    setInputs([...inputs,{list:input,id:Date.now(),status:false}]) 
  console.log(inputs)
  setInput('')
  }
  if(editid){
    const editinput=inputs.find((input)=>input.id ===  editid)
    const updateinput = inputs.map((to)=>to.id=== editinput.id
    ? (to ={id:to.id,list:input})
    :(to={id:to.id,list:to.list}))
    setInputs(updateinput)
    setEditid(0)
    setInput('')
  }
}

const onDelete=(id)=>{
  setInputs(inputs.filter((to)=>to.id !==id ));
}
const oncomplete=(id)=>{
  let complete = inputs.map((list)=>{
    if(list.id === id){
    return({...list,status:!list.status})}
    return list
  }) 
  setInputs(complete)
}
const onEdit =(id) => {
  const editinput = inputs.find((to)=>to.id === id)
  
  setInput(editinput.list)
  setEditid(editinput.id)

}
  return (
    <div className="App-header">
      <h1 className="head">
        Task Manager
      </h1>
      <form  onSubmit={handlesubmit} className="t_form">
      <input className="text_fld" type="text"placeholder="Enter task" value={input} ref={inputRef} onChange={(Event)=>setInput(Event.target.value)}></input>
      <button className="btn" onClick={addinput}>{editid ? 'EDIT':'ADD'}</button>
      </form>
      <div className="list">
        <ul>
      {
        inputs.map((to)=>(
          <li className="list-items">
            <div className="list-item-list" id={to.status ? "list-item":""}>
            {to.list}
          </div>
          <span>
            <AiOutlineFileDone className="list-item-icon" id='complete'onClick={()=>oncomplete(to.id)}title="complete"/>
            <AiFillDelete className="list-item-icon" id='delete'onClick={()=>onDelete(to.id)} title="delete"/>
            <AiFillEdit className="list-item-icon" id='edit'title="edit" onClick={()=>onEdit(to.id)}/>
            </span></li>
        ))
      }
        </ul>
      </div>
    </div>
  );
}

export default App;
