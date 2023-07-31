import axios from 'axios'
import React, { useEffect,useState } from 'react'
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5173';

const TodoCard = () => {
    let [post, setPost] = useState(null);

    
    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT);
        const fetchData = async () => {
            let response = await axios.get('https://fullstack-todo-backend-5cwv.onrender.com/api/v1/todo/getalltodo')
            setPost(response.data)
        }
        fetchData()
    },[])
    

    console.log(post);
      


  return (
    <div className='item_main'>
        {
           post && post.map(item=>(
                <div className='item'>
                    <h3>Name: {item.fullname}</h3>
                    <h4>Email: {item.email}</h4>
                    <h4>Designation: {item.designation}</h4>
                    <p>Employee ID: {item.idnumber}</p>
                </div>
            ))
        }
       
    </div>
  )
}

export default TodoCard