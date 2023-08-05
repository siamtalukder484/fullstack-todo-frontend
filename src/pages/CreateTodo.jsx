import axios from 'axios'
import React,{useState} from 'react'
import { Puff } from 'react-loader-spinner'

const CreateTodo = () => {

    let [loader, setLoader] = useState(false);
   let [nameerr,setnameerr] = useState("")
   let [load,setLoad] = useState(false)

    let [FormData, setFormData] = useState({
        fullname: "",
        email: "",
        department: "",
        designation: "",
        employeeid: "",

    })
    let [error, setError] = useState({
        fullname: "",
        email: "",
        department: "",
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
        setLoader(true)
        console.log(FormData);
        // try {
        //     const response = await axios.post('https://fullstack-todo-backend-5cwv.onrender.com/api/v1/todo/createtodo',{
        //         fullname: FormData.fullname,
        //         email: FormData.email,
        //         designation: FormData.designation,
        //         idnumber: FormData.employeeid
        //     })
        //     setnameerr(response.data.error)
        //     console.log(response);
        //     setLoad(!load)
        // }
        // catch (error) {
        //     console.error('Error posting data:', error);
        // }
        // setFormData({
        //     fullname: "",
        //     email: "",
        //     designation: "",
        //     employeeid: "",
        // })
        setLoader(false)
       
    }


  return (
      <div className='card_main'>
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
        <h3>Create Employee ID</h3>
        <div className='input_group'>
            <label>Name</label>
            <input name='fullname' onChange={handleForm} value={FormData.fullname} type='text' placeholder='Employee Name'/>
            <span>{nameerr}</span>
        </div>
        <div className='input_group'>
            <label>Email</label>
            <input name='email' onChange={handleForm} value={FormData.email} type='email' placeholder='Employee Email'/>
        </div>
        <div className='input_group'>
            <label>Department</label>
            <select onChange={handleForm} name='department'>
                <option>Select Department</option>
                <option value="Web & Software">Web & Software</option>
                <option value="Graphics & Multimedia">Graphics & Multimedia</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Film & Media">Film & Media</option>
            </select>
        </div>
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