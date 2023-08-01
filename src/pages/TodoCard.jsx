import axios from 'axios'
import React, { useEffect,useState } from 'react'
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5173';

const TodoCard = () => {
    let [post, setPost] = useState(null);
    let [postdelete, setPostdelete] = useState("");
    let [editdatea, setEditdata] = useState({});
    let [editmodal, setEditmodal] = useState(false);
    

    
    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT);
        const fetchData = async () => {
            let response = await axios.get('https://fullstack-todo-backend-5cwv.onrender.com/api/v1/todo/getalltodo')
            setPost(response.data)
        }
        fetchData()
    },[])
    

let handleDelete = (id) => {
    axios.delete(`https://fullstack-todo-backend-5cwv.onrender.com/api/v1/todo/deletetodo`,{
        headers:{
            id:id
        }
    }).then((res)=>{
        setPostdelete(res.data.message);
    })
}

let handleEdit = (item) => {
    setEditmodal(true)
    setEditdata(item);
}

console.log(editdatea);
let handleCalcelModal =()=>{
    setEditmodal(false)
    setEditdata();
}
      


  return (
    <div className='item_main'>
        {editmodal &&
        <div className='update_todo'>
            <button onClick={handleCalcelModal} className='cancel'>Cancel</button>
            <div className='update_todo_main'>
                <h3>Update Employee ID</h3>
                <div className='input_group'>
                    <label>Name</label>
                    <input name='fullname' value={editdatea.fullname} type='text' placeholder='Employee Name'/>
                    <span></span>
                </div>
                <div className='input_group'>
                    <label>Email</label>
                    <input name='email' value={editdatea.email} type='email' placeholder='Employee Email'/>
                </div>
                {/* <div className='input_group'>
                    <label>Department</label>
                    <select name='department'>
                        <option name='department' value="others" autoFocus>Others</option>
                        <option name='department' value="Web & Software">Web & Software</option>
                        <option name='department' value="Graphics & Multimedia">Graphics & Multimedia</option>
                        <option name='department' value="Digital Marketing">Digital Marketing</option>
                        <option name='department' value="Cyber Security">Cyber Security</option>
                        <option name='department' value="Film & Media">Film & Media</option>
                    </select>
                </div> */}
                <div className='input_group'>
                    <label>Designation</label>
                    <input name='designation' value={editdatea.designation} type='text' placeholder='Designation'/>
                </div>
                <div className='input_group'>
                    <label>Employee ID</label>
                    <input name='employeeid' value={editdatea.idnumber} type='number' placeholder='Employee ID'/>
                </div>
                    {/* <div className='input_group'>
                    <label>Blood Group</label>
                    <select>
                        <option autoFocus>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                    </select>
                </div> */}
                {/* <div className='input_group'>
                    <label>Employee Image</label>
                    <input className='file' type='file'/>
                </div> */}
                <div className='input_group'>
                    <button >Update</button>
                </div>
            </div>
        </div>
        }
        {
           post && post.map(item=>(
                <div className='item' key={item._id}>
                    <h3>Name: {item.fullname}</h3>
                    <h4>Email: {item.email}</h4>
                    <h4>Designation: {item.designation}</h4>
                    <p>Employee ID: {item.idnumber}</p>
                    <button onClick={()=>handleDelete(item._id)}>Delete</button>
                    &nbsp;
                    <button onClick={()=>handleEdit(item)}>Edit</button>
                </div>
            ))
        }
       
    </div>
  )
}

export default TodoCard