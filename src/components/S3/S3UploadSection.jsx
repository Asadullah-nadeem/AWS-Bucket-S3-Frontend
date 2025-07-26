import React, { useState, useCallback } from "react";
import FileItem from "../UI/FileItem";

export default function S3UploadSection({ bucket }) {
    const [fileName, setFileName] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [contents] = useState([
        { id: 1, type: "folder", name: "photos" },
        { id: 2, type: "file", name: "notes.txt" },
    ]);

    const handleFileChange = useCallback(e => {
        if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
        }
    }, []);

    const handleDragEvents = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(e => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files?.[0]) {
            setFileName(e.dataTransfer.files[0].name);
        }
    }, []);

    return (
        <div className="mt-8 border-t pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <nav className="flex items-center space-x-1 text-gray-600 truncate">
                    <span>/</span>
                    <span className="font-mono text-blue-700 truncate">{bucket}</span>
                </nav>

                <div className="flex flex-wrap gap-2 sm:ml-auto">
                    <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded hover:bg-blue-200 text-sm transition-colors">
                        New Folder
                    </button>
                    <input
                        placeholder="Search files and folders..."
                        className="border px-3 py-1 rounded text-sm focus:outline-blue-300 flex-1 min-w-[150px]"
                    />
                    <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 text-sm transition-colors">
                        Filter
                    </button>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {contents.map(item => (
                    <FileItem key={item.id} item={item} />
                ))}
            </div>

            <div
                className={`border-2 rounded-lg p-6 text-center transition-colors ${
                    dragActive
                        ? "border-blue-500 bg-blue-50 border-solid"
                        : "border-dashed border-gray-300"
                }`}
                onDragEnter={handleDragEvents}
                onDragOver={handleDragEvents}
                onDragLeave={handleDragEvents}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="hidden"
                    id="s3FileInput"
                    onChange={handleFileChange}
                />
                <label
                    htmlFor="s3FileInput"
                    className="block cursor-pointer p-2"
                >
                    {fileName ? (
                        <p className="text-gray-700">
                            Selected file: <span className="font-medium truncate block">{fileName}</span>
                        </p>
                    ) : (
                        <div className="space-y-2">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round" />
                            </svg>
                            <p className="text-gray-600">
                                <span className="underline text-blue-600 font-medium">Click to upload</span>
                                <span className="mx-1">or</span>
                                drag and drop
                            </p>
                            <p className="text-xs text-gray-500">Max file size: 10MB</p>
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
}