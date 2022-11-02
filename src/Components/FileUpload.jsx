import React, {useState} from 'react';
import axios from "axios";

const FileUpload = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')

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
        setImage(e.target.files[0])
    }

    const handleApi = () => {
        //call the api
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('message', message)

        axios.post(url, formData).then(result => {
            console.log(result.data)
            console.log(formData);
            alert('success')
        })
            .catch(error => {
                alert('service error')
                console.log(error)
            })
    }

    return (
        <div>
            <div>
                <div>
                    <label>Name</label>
                </div>
                <input type="text" onChange={handleName}/> <br/>
            </div>
            <div>
                <div>
                    <label>Message</label>
                </div>
                <input type="text" onChange={handleMessage}/> <br/>
            </div>

            <div>
                <div>
                    <label> IMAGE UPLOAD</label>
                </div>
                <input type="file" onChange={handleImage}/> <br/>
                <button onClick={handleApi}>SUBMIT</button>
            </div>

        </div>
    );
}
export default FileUpload;
