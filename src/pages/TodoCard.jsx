import axios from 'axios'
import React, { useEffect,useState } from 'react'
import socketIOClient from 'socket.io-client';
import { Puff } from 'react-loader-spinner'
import jsPDF from 'jspdf';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const ENDPOINT = 'http://localhost:5173';

const TodoCard = () => {
    let [post, setPost] = useState(null);
    let [postdelete, setPostdelete] = useState("");
    let [editdata, setEditdata] = useState({});
    let [editmodal, setEditmodal] = useState(false);
    let [loader, setLoader] = useState(false);
    let [load, setLoad] = useState(false);



    let [FormData, setFormData] = useState({
        editid: "",
        fullname: "",
        email: "",
        designation: "",
        employeeid: "",
        blood: "",
    })

// get all todo
    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT);
        const fetchData = async () => {
            let response = await axios.get('http://localhost:8000/api/v1/todo/getalltodo')
            setPost(response.data)
        }
        fetchData()
    },[load])
    
// delete a single todo
let handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/v1/todo/deletetodo`,{
        headers:{
            id:id
        }
    }).then((res)=>{
        setPostdelete(res.data.message);
        setLoad(!load)
    })
}


let handleEdit = (item) => {
    setEditmodal(true)
    setFormData({
        editid: item._id,
        fullname: item.fullname,
        email: item.email,
        department: item.department,
        designation: item.designation,
        employeeid: item.idnumber,
        blood: item.blood,
        avater: item.avater
    });
}


let handleCalcelModal =()=>{
    setEditmodal(false)
    setEditdata();
}


let handleUpdateForm = (e) => {
    let {name, value} = e.target
    setFormData({...FormData, [name]:value})
}
  

let handleUpdateTodo = async () => {
    setLoader(true)
    console.log(FormData);
    const updatetodo = await axios.put("http://localhost:8000/api/v1/todo/updatetodo",{
        fullname: FormData.fullname,
        email: FormData.email,
        department: FormData.department,
        designation: FormData.designation,
        idnumber: FormData.employeeid,
        blood: FormData.blood,
    },{
        headers:{
            id:FormData.editid
        }
    })
    setEditmodal(false)
    setLoader(false)
    
}

let handleDownload = async (item) => {

    const pdf = new jsPDF();
    const imgData = item.avater;
    pdf.addImage(imgData, 'JPEG', 10, 70, 50, 50);
    pdf.text(`Name: ${item.fullname}`, 10, 10);
    pdf.text(`Email: ${item.email}`, 10, 20);
    pdf.text(`Department: ${item.department}`, 10, 30);
    pdf.text(`Designation: ${item.designation}`, 10, 40);
    pdf.text(`Employee ID: ${item.idnumber}`, 10, 50);
    pdf.text(`Blood Group: ${item.blood}`, 10, 60);

    pdf.save('employee_info.pdf');
}


  return (
    <>
    <div className='item_main'>
         {loader &&
            <div className='todo_loader'>
                <Puff
                height="100"
                width="100"
                radius={1}
                color="#fff"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>
          }
        {editmodal &&
        <div className='update_todo'>
            <button onClick={handleCalcelModal} className='cancel'>Cancel</button>
            <div className='update_todo_main'>
                <h3>Update Employee ID</h3>
                <div className='input_group'>
                    <img style={{width:"100px"}} src={FormData.avater}/>
                </div>

                <div className='input_group'>
                    <label>Name</label>
                    <input onChange={handleUpdateForm} name='editid' value={FormData.editid} type='hidden'/>
                    <input onChange={handleUpdateForm} name='fullname' value={FormData.fullname} type='text' placeholder='Employee Name'/>
                    <span></span>
                </div>
                <div className='input_group'>
                    <label>Email</label>
                    <input onChange={handleUpdateForm} name='email' value={FormData.email} type='email' placeholder='Employee Email'/>
                </div>
                <div className='input_group'>
                    <label>Department</label>
                    <select onChange={handleUpdateForm} name='department' value={FormData.department}>
                        <option value="null">Select Department</option>
                        <option value="Web & Software">Web & Software</option>
                        <option value="Graphics & Multimedia">Graphics & Multimedia</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Film & Media">Film & Media</option>
                    </select>
                </div>
                <div className='input_group'>
                    <label>Designation</label>
                    <input onChange={handleUpdateForm} name='designation' value={FormData.designation} type='text' placeholder='Designation'/>
                </div>
                <div className='input_group'>
                    <label>Employee ID</label>
                    <input onChange={handleUpdateForm} name='employeeid' value={FormData.employeeid} type='number' placeholder='Employee ID'/>
                </div>
                <div className='input_group'>
                    <label>Blood Group</label>
                    <select onChange={handleUpdateForm} name='blood' value={FormData.blood}>
                        <option>Select Blood</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
                <div className='input_group'>
                    <button onClick={handleUpdateTodo}>Update</button>
                </div>
            </div>
        </div>
        }
        {
           post && post.map(item=>(
                <div className='item' key={item._id}>
                    <img style={{width:"50%"}} src={item.avater}/>
                    <h3>Name: {item.fullname}</h3>
                    <h4>Email: {item.email}</h4>
                    <p>Department: {item.department}</p>
                    <h4>Designation: {item.designation}</h4>
                    <p>Employee ID: {item.idnumber}</p>
                    <p>Blood Group: {item.blood}</p>
                    <button onClick={()=>handleDelete(item._id)}>Delete</button>
                    &nbsp;
                    <button onClick={()=>handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDownload(item)}>Download</button>
                </div>
            ))
        }
                {/* <div className='input_group'>
                    <label>Employee Image</label>
                    <input className='file' type='file'/>
                </div> */}
    </div>
    </>
  )
}

export default TodoCard