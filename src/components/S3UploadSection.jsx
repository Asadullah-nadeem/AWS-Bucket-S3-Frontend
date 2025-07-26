import React, { useState } from "react";

export default function S3UploadSection({ bucket }) {
    const [fileName, setFileName] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [contents] = useState([
        { type: "folder", name: "photos" },
        { type: "file", name: "notes.txt" },
    ]);

    const handleFileChange = e => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    const onDrag = e => {
        e.preventDefault();
        setDragActive(true);
    };
    const onDrop = e => {
        e.preventDefault();
        setDragActive(false);
        // handle upload...
        setFileName("upload-demo-file.txt");
    };

    return (
        <div className="mt-8 border-t pt-8">
            <div className="flex items-center gap-3 mb-5">
                <nav className="flex items-center space-x-1 text-gray-600">
                    <span>/</span>
                    <span className="font-mono text-blue-700">{bucket}</span>
                </nav>
                <button className="ml-auto bg-blue-100 text-blue-700 px-4 py-1 rounded hover:bg-blue-200 text-sm">New Folder</button>
                <input placeholder="Search files and folders..." className="border px-3 py-1 rounded text-sm focus:outline-blue-300" />
                <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 text-sm">Filter</button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                {contents.map((item, idx) => (
                    <div key={idx}
                         className="flex flex-col items-center bg-gray-50 px-4 py-3 rounded shadow-sm border cursor-pointer transition hover:bg-gray-100"
                    >
                        {item.type === "folder" ? "📁" : "📄"}
                        <span className="mt-1 text-xs">{item.name}</span>
                    </div>
                ))}
            </div>

            <div
                className={`border-2 rounded-lg p-5 text-center ${dragActive ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-300"}`}
                onDragOver={onDrag}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
            >
                <input
                    type="file"
                    className="hidden"
                    id="s3FileInput"
                    onChange={handleFileChange}
                />
                <label htmlFor="s3FileInput" className="block cursor-pointer">
                    {fileName ? (
                        <span>Selected file: <b>{fileName}</b></span>
                    ) : (
                        <span>No file chosen<br />Drop files here or <span className="underline text-blue-600">click to upload</span></span>
                    )}
                </label>
            </div>
        </div>
    );
}
