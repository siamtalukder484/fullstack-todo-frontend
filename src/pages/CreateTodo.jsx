import axios from 'axios'
import React,{useState} from 'react'
import { Puff } from 'react-loader-spinner'

const CreateTodo = () => {

    let [loader, setLoader] = useState(false);
   let [nameerr,setnameerr] = useState("")
   let [departmenterr,setdepartmenterr] = useState("")
   let [load,setLoad] = useState(false)

    let [FormData, setFormData] = useState({
        fullname: "",
        email: "",
        department: "",
        designation: "",
        employeeid: "",
        blood: "",
    })
    let [error, setError] = useState({
        fullname: "",
        email: "",
        department: "",
        designation: "",
        employeeid: "",
        blood: "",
    })
    let handleForm = (e) => {
        let {name, value} = e.target
        setFormData({...FormData, [name]:value})
        setError({})
    }

    let handleSubmit = async () => {
        setLoader(true)

        try {
            const response = await axios.post('https://fullstack-todo-backend-5cwv.onrender.com/api/v1/todo/createtodo',{
                fullname: FormData.fullname,
                email: FormData.email,
                department: FormData.department,
                designation: FormData.designation,
                idnumber: FormData.employeeid,
                blood: FormData.blood
            })
            setnameerr(response.data.error)
            setLoad(!load)
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
        setFormData({
            fullname: "",
            email: "",
            department: "",
            designation: "",
            employeeid: "",
            blood: ""
        })
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
            <input name='designation' onChange={handleForm} value={FormData.designation} type='text' placeholder='Designation'/>
        </div>
        <div className='input_group'>
            <label>Employee ID</label>
            <input name='employeeid' onChange={handleForm} value={FormData.employeeid} type='number' placeholder='Employee ID'/>
        </div>
        <div className='input_group'>
            <label>Blood Group</label>
            <select onChange={handleForm} name='blood'>
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
            <label>Employee Image</label>
            <input className='file' type='file'/>
        </div>
        <div className='input_group'>
            <button onClick={handleSubmit}>Submit</button>
        </div>

    </div>
  )
}

export default CreateTodo