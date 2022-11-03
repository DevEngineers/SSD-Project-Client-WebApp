import React, {useState} from 'react';
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';

const CreateMessage = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [file, setFile] = useState('')
    const navigate = useNavigate();

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }
    const handleMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    const handleImage = (e) => {
        console.log(e.target.files)
        setFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        //call the api
        const url = 'https://jsonplaceholder.typicode.com/photos'

        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', name)
        formData.append('message', message)

        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post(url, formData, {
            headers: headers
        }).then(result => {
            console.log(result.data)
            console.log(formData);
            alert('Message Succesfully Created')
            navigate('/messages');
        })
            .catch(error => {
                alert('Service Error')
                console.log(error)
            })
    }

    return (
        <div className={"w-full px-80 pt-10 h-screen"}>
            <h1 className={"py-5 text-center text-3xl font-bold"}>Staff Messenger</h1>
            <div className={"bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4"}>
                <div className={"mb-4"}>
                    <label className={"block text-gray-700 text-sm font-bold mb-2"}>Name</label>
                    <input type="text" onChange={handleName}
                           className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>
                </div>
                <div className={"mb-6"}>
                    <label className={"block text-gray-700 text-sm font-bold mb-2"}>Message</label>
                    <input type="text" onChange={handleMessage}
                           className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>
                </div>

                <div className={"mb-4"}>
                    <label className={"block text-gray-700 text-sm font-bold mb-2"}> File Upload</label>
                    <input type="file" onChange={handleImage}
                           className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>
                    <div className={"pt-6"}>
                        <button onClick={handleSubmit}
                                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}>SUBMIT
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
export default CreateMessage;
