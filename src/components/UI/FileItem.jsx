import React from 'react';

export default function FileItem({ item }) {
    return (
        <div className="flex flex-col items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group">
            <div className="text-3xl mb-2">
                {item.type === "folder" ? (
                    <span className="text-yellow-500">📁</span>
                ) : (
                    <span className="text-blue-500">📄</span>
                )}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 truncate w-full text-center">
        {item.name}
      </span>
            <span className="text-xs text-gray-400 mt-1">
        {item.type === "folder" ? "Folder" : "File"}
      </span>
        </div>
    );
}