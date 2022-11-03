import axios from "axios";
import React from "react";
import {AiFillDelete} from 'react-icons/Ai';
import {AiFillEdit} from 'react-icons/Ai';

const URI = "https://jsonplaceholder.typicode.com/posts";
export default function ViewMessage() {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(URI).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;

    const removeUser = async (id) => {
        try {
            const res = await axios.delete(`${URI}/${id}`)
            console.log('Message successfully deleted.')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="overflow-x-auto relative pt-10 px-10">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {post.map((post) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {post.title}
                        </th>
                        <td className="py-4 px-6">
                            {post.body}
                        </td>
                        <td className="py-4 px-6">
                            {post.id}
                        </td>
                        <td className="py-4 px-6 flex gap-5">
                            <button
                                className={"text-2xl"}>
                                <AiFillEdit/>
                            </button>
                            <button className="text-2xl hover:bg-gray-200  text-red-500 rounded-lg"
                                    onClick={() => removeUser(post.id)}><AiFillDelete/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}