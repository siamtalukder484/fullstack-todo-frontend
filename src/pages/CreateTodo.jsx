import axios from 'axios'
import React,{useState} from 'react'
import { Puff } from 'react-loader-spinner'

const CreateTodo = () => {

    let [loader, setLoader] = useState(false);
   let [nameerr,setnameerr] = useState("")
   let [departmenterr,setdepartmenterr] = useState("")
   let [load,setLoad] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null);

   const { VITE_SOCKET_ENDPOINT } = import.meta.env;
   console.log(VITE_SOCKET_ENDPOINT);

    let [FormInfo, setFormInfo] = useState({
        fullname: "",
        email: "",
        department: "",
        designation: "",
        employeeid: "",
        blood: "",
        avater: ""
    })
    let [error, setError] = useState({
        fullname: "",
        email: "",
        department: "",
        designation: "",
        employeeid: "",
        blood: "",
        avater: ""
    })
    let handleForm = (e) => {
        let {name, value} = e.target
        setFormInfo({...FormInfo, [name]:value})
        setError({})
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };


    let handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault()
        let data = new FormData();
        data.append('avater', selectedFile);
        data.append('fullname', FormInfo.fullname);
        data.append('email', FormInfo.email);
        data.append('department', FormInfo.department);
        data.append('designation', FormInfo.designation);
        data.append('idnumber', FormInfo.employeeid);
        data.append('blood', FormInfo.blood);

        try {
            const response = await axios.post('http://localhost:8000/api/v1/todo/createtodo',data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            }
            )
            console.log(response);
            setnameerr(response.data.error)
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
        setFormInfo({
            fullname: "",
            email: "",
            department: "",
            designation: "",
            employeeid: "",
            blood: "",
            avater: ""
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h3>Create Employee ID</h3>
            <div className='input_group'>
                <label>Name</label>
                <input name='fullname' onChange={handleForm} value={FormInfo.fullname} type='text' placeholder='Employee Name'/>
                <span>{nameerr}</span>
            </div>
            <div className='input_group'>
                <label>Email</label>
                <input name='email' onChange={handleForm} value={FormInfo.email} type='email' placeholder='Employee Email'/>
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
                <input name='designation' onChange={handleForm} value={FormInfo.designation} type='text' placeholder='Designation'/>
            </div>
            <div className='input_group'>
                <label>Employee ID</label>
                <input name='employeeid' onChange={handleForm} value={FormInfo.employeeid} type='number' placeholder='Employee ID'/>
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
                    <option value="AB-">C+</option>
                    <option value="AB-">C-</option>
                </select>
            </div>
            <div className='input_group'>
                <label>Employee Image</label>
                <input onChange={handleFileChange} name='avater' className='file' type='file'/>
            </div>
            <div className='input_group'>
                <button type='submit'>Submit</button>
            </div>
        </form>

    </div>
  )
}

export default CreateTodo