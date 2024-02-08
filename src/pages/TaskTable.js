import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//import { GlobalContext } from '../context/globalContext'
import { useDispatch, useSelector } from 'react-redux'
import { verifyJWT } from '../verifyJWT'

const TaskTable = () => {
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { accessToken } = useSelector(state => state.authState)

    useEffect(() => {
  
      const getData = async () => {
        try{
          //Fetchitng data from Api
          const data = await fetch('https://jsonplaceholder.typicode.com/todos')
          //Converted to json
          const jsonData = await data.json()
          //Getting 6 items from array of data
          const slicedItems = jsonData.slice(0, 6)
          //console.log(slicedItems)
          setUserData(slicedItems)
        }catch(error){
          console.log(error)
        }
      }
      getData()
    },[])

    useEffect(() => {
      if(accessToken === null){
        navigate('/login')
      }
      if(accessToken){
        verifyJWT(accessToken, dispatch)
      }
    },[navigate, accessToken, dispatch])
  
    return (
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>USER ID</th>
            <th>TITLE</th>
            <th>COMPLETED</th>
          </tr>
        </thead>
        <tbody>
            {
              userData.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.userId}</td>
                    <td>{item.title}</td>
                    <td className={`${item.completed ? 'greenColor' : 'redColor'}`}>{item.completed ? 'YES' : 'NO'}</td>
                  </tr>
              ))
            }
        </tbody>
      </table>
    );
}

export default TaskTable