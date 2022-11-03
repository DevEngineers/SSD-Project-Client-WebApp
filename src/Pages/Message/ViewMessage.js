import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function ViewMessage() {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;

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
                        <td className="py-4 px-6 flex gap-2">
                            <button
                                className={"py-2 bg-blue-500 hover:bg-blue-700 px-5 text-white rounded-lg"}> Edit
                            </button>
                            <button className="py-2 px-5 text-white bg-red-500 hover:bg-red-700 rounded-lg"> Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}