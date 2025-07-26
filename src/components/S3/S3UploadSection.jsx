import React, { useState, useCallback } from "react";
import FileItem from "../UI/FileItem";
import { useTranslation } from 'react-i18next';

export default function S3UploadSection({ bucket }) {
    const { t } = useTranslation();
    const [fileName, setFileName] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [contents] = useState([
        { id: 1, type: "folder", name: "photos" },
        { id: 2, type: "file", name: "document.pdf" },
        { id: 3, type: "file", name: "spreadsheet.xlsx" },
        { id: 4, type: "folder", name: "archives" },
        { id: 5, type: "file", name: "image.png" },
    ]);

    const handleFileChange = useCallback(e => {
        if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
            // Here you would add the actual upload logic to S3
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
            // Here you would add the actual upload logic to S3
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
                    <button className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-lg hover:bg-blue-200 text-sm transition-colors flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        New Folder
                    </button>
                    <input
                        placeholder="Search files and folders..."
                        className="border px-3 py-1.5 rounded-lg text-sm focus:outline-blue-300 flex-1 min-w-[150px]"
                    />
                    <button className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 text-sm transition-colors flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                    </button>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {contents.map(item => (
                    <FileItem key={item.id} item={item} />
                ))}
            </div>

            <div
                className={`border-2 rounded-xl p-6 text-center transition-colors ${
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
                        <div className="space-y-3">
                            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-700">
                                Selected file: <span className="font-medium truncate block">{fileName}</span>
                            </p>
                            <button
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                onClick={() => {
                                    // Here you would trigger the actual upload
                                    alert(`File "${fileName}" would be uploaded to S3 in production`);
                                }}
                            >
                                Upload to S3
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
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
                            <div>
                                <p className="text-gray-600">
                                    <span className="text-blue-600 font-medium">Click to upload</span>
                                    <span className="mx-1">or</span>
                                    drag and drop
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Max file size: 10MB</p>
                            </div>
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
}