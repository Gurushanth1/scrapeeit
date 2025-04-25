import React from 'react';
import { FaTrash } from "react-icons/fa";

const Table = ({ items, onDelete, onOpen }) => {
    if (!items || items?.length === 0) {
        return (
            <div className="    p-8 text-center">
                <p className="text-gray-500">No content extracted yet. Try adding a URL above.</p>
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center'>
        <div className="text-white rounded-lg border  overflow-hidden ">
            <div className="overflow-x-auto max-w-5xl">
                <table className="w-full">
                    <thead className=" border-b ">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added on</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-notion-border">
                        {items.map((item) => {

                            const data = item.data
                            const summary = data.summary
                            const keyPoints = data.keyPoints
                            return (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-700 cursor-pointer"
                                    onClick={() => onOpen(item)}
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-sm  truncate max-w-md">{summary}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                        {item.created_at.split('T')[0]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            size="icon"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(item.id);
                                            }}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default Table;