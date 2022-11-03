import React, {useState} from 'react';
import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillDelete} from 'react-icons/Ai';
import logo from '/src/Assets/Images/clubhouse-icons.jpg';
import headerlogo from '/src/Assets/Images/icons8-wechat-48.png';

/* configuring options to display toast message */
const options = {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    autoClose: 3000,
    closeButton: false
}
const URI = "https://jsonplaceholder.typicode.com/posts";
const Message = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [file, setFile] = useState('')
    const [post, setPost] = React.useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(URI).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;

    const removeUser = async (id) => {
        const URI = "https://jsonplaceholder.typicode.com/posts";
        try {
            const res = await axios.delete(`${URI}/${id}`)
            alert('Message Deleted Succesfully')
            console.log('Message successfully deleted.')
            window.location.reload(false);
        } catch (error) {
            alert(error)
        }

    }

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }
    const handleMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    const handleFile = (e) => {
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
            // navigate('/messages');
        })
            .catch(error => {
                alert('Service Error')
                toast.error("Something went wrong!! Try again.", options)
                console.log(error)
            })
        toast.success("Message Send Successfully", options)

    }


    return (
        <div className={"h-full bg-gray-900"}>
            <ToastContainer/>
            <div className={"grid grid-cols-2  place-content-center relative px-20 gap-2"}>
                <div className={"col-span-1 "}>
                    <h1 className={"py-5 text-3xl font-bold text-white text-right "}>Fortis</h1>
                </div>
                <div className={"col-span-1 pt-5"}>
                    <img className={""} src={headerlogo} alt="headerLogo"/>
                </div>
            </div>
            <div className={"grid grid-cols-5 pt-5"}>
                {/*Container 1*/}
                <div className={"col-span-2 px-2"}>
                    <div className={"bg-white shadow-md rounded px-8 pb-2 mb-4 "}>
                        <div className={"mb-4 pt-5"}>
                            <label className={"block text-gray-700 text-sm font-bold mb-2"}>Name</label>
                            <input type="text" onChange={handleName} placeholder={"Nimal"}
                                   className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>
                        </div>
                        <div className={"mb-6"}>
                            <label className={"block text-gray-700 text-sm font-bold mb-2"}>Message</label>
                            <input type="text" onChange={handleMessage} placeholder={"Write Your Message here..."}
                                   className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>
                        </div>

                        <div className={"mb-10"}>
                            <label className={"block text-gray-700 text-sm font-bold mb-2"}> File Upload</label>
                            <input type="file" onChange={handleFile}
                                   className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>
                            <div className={"pt-6"}>
                                <button onClick={handleSubmit}
                                        className={"bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}>SEND
                                </button>

                            </div>

                        </div>
                        <div className="items-center   rounded-md h-80 mb-5">
                            <img className={""} src={logo} alt="Logo"/>
                        </div>

                    </div>
                </div>
                {/*Container 2*/}
                <div className={"col-span-3 px-2 overflow-auto  h-screen"}>
                    <div className={"bg-white shadow-md rounded "}>
                        <div className="relative pt-2 px-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Message
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        File
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Delete
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {post.map((post) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-600">
                                        <td scope="row"
                                            className="py-4 px-6">
                                            {post.title}
                                        </td>
                                        <td className="py-4 px-6">
                                            {post.body}
                                        </td>
                                        <td className="py-4 px-6">
                                            {post.id}
                                        </td>
                                        <td className="py-4 px-6 flex">
                                            <button
                                                className="text-2xl   text-red-900  pl-3 py-5"
                                                onClick={() => removeUser(post.id)}><AiFillDelete/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
}
export default Message;
