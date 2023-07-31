import axios from 'axios'
import React,{useState} from 'react'

const CreateTodo = () => {

   

    let [FormData, setFormData] = useState({
        fullname: "",
        email: "",
        designation: "",
        employeeid: "",

    })
    let [error, setError] = useState({
        fullname: "",
        email: "",
        department: "",
        designation: "",
        employeeid: "",
    })
    let handleForm = (e) => {
        let {name, value} = e.target
        setFormData({...FormData, [name]:value})
        setError({})
    }

    let handleSubmit = async () => {
        
        try {
            const response = await axios.post('https://fullstack-todo-backend-5cwv.onrender.com/api/v1/todo/createtodo',{
                fullname: FormData.fullname,
                email: FormData.email,
                designation: FormData.designation,
                idnumber: FormData.employeeid
            })
            console.log(response.data);
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
        setFormData({
            fullname: "",
            email: "",
            designation: "",
            employeeid: "",
        })
       
    }


  return (
    <div className='card_main'>
        <h3>Create Employee ID</h3>
        <div className='input_group'>
            <label>Name</label>
            <input name='fullname' onChange={handleForm} value={FormData.fullname} type='text' placeholder='Employee Name'/>
        </div>
        <div className='input_group'>
            <label>Email</label>
            <input name='email' onChange={handleForm} value={FormData.email} type='email' placeholder='Employee Email'/>
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
            <input name='designation' onChange={handleForm} value={FormData.designation} type='text' placeholder='Designation'/>
        </div>
        <div className='input_group'>
            <label>Employee ID</label>
            <input name='employeeid' onChange={handleForm} value={FormData.employeeid} type='number' placeholder='Employee ID'/>
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
            <button onClick={handleSubmit}>Submit</button>
        </div>

    </div>
  )
}

export default CreateTodo