// src/components/S3/S3FileUploader.js
import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Loader from "../UI/Loader";

export default function S3FileUploader({
                                           isConnected,
                                           onDisconnect,
                                           bucketName
                                       }) {
    const { t } = useTranslation();
    const { displayMode } = useDisplayMode();
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
    const fileInputRef = React.useRef(null);

    // Get dual language text with fallback to English
    const getDualText = (key) => {
        const enText = t(key, { lng: 'en' }) || key;
        const hiText = t(key, { lng: 'hi' });

        if (displayMode === 'dual' && hiText) {
            return `${enText} / ${hiText}`;
        } else if (displayMode === 'hi' && hiText) {
            return hiText;
        }
        return enText;
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
        }
    };

    // Handle drag events
    const handleDragEvents = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    // Handle file drop
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            setFiles(droppedFiles);
        }
    }, []);

    // Upload files to S3 (mock implementation)
    const uploadFiles = async () => {
        if (files.length === 0) return;

        setIsUploading(true);

        try {
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real app, you would use AWS SDK here
            console.log('Uploading files:', files);

            // Show success message
            alert(getDualText('upload.success'));

            // Reset after upload
            setFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            alert(`${getDualText('upload.error')}: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle disconnect confirmation
    const handleDisconnectClick = () => {
        setShowDisconnectConfirm(true);
    };

    const handleDisconnectConfirm = (confirm) => {
        setShowDisconnectConfirm(false);
        if (confirm) {
            onDisconnect();
            alert(getDualText('disconnect.success'));
        }
    };

    // Connection success message
    useEffect(() => {
        if (isConnected) {
            alert(getDualText('connection.success'));
        }
    }, [isConnected]);

    if (!isConnected) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                {getDualText('connection.required')}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Connection status */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
                <div className="text-green-700">
                    ✅ {getDualText('connection.active')}: <span className="font-bold">{bucketName}</span>
                </div>
                <button
                    onClick={handleDisconnectClick}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                    {getDualText('disconnect.button')}
                </button>
            </div>

            {/* File upload area */}
            <div
                className={`border-2 rounded-xl p-8 text-center transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'
                }`}
                onDragEnter={handleDragEvents}
                onDragOver={handleDragEvents}
                onDragLeave={handleDragEvents}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    id="fileUpload"
                    onChange={handleFileChange}
                    multiple
                />

                <label htmlFor="fileUpload" className="cursor-pointer">
                    {files.length > 0 ? (
                        <div className="space-y-4">
                            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <div className="space-y-2">
                                <p className="text-gray-700 font-medium">
                                    {getDualText('upload.selected')}:
                                </p>
                                <ul className="max-h-40 overflow-y-auto">
                                    {files.map((file, index) => (
                                        <li key={index} className="text-sm text-gray-600 truncate">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setFiles([])}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    {getDualText('upload.clear')}
                                </button>

                                <button
                                    type="button"
                                    onClick={uploadFiles}
                                    disabled={isUploading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isUploading && <Loader />}
                                    {isUploading ? getDualText('upload.uploading') : getDualText('upload.button')}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <div>
                                <p className="text-gray-600">
                  <span className="text-blue-600 font-medium">
                    {getDualText('upload.click')}
                  </span>
                                    <span className="mx-1">{getDualText('upload.or')}</span>
                                    {getDualText('upload.drag')}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {getDualText('upload.limit')}
                                </p>
                            </div>
                        </div>
                    )}
                </label>
            </div>

            {/* Disconnect confirmation dialog */}
            {showDisconnectConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {getDualText('disconnect.confirm.title')}
                        </h3>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => handleDisconnectConfirm(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                {getDualText('disconnect.confirm.cancel')}
                            </button>
                            <button
                                onClick={() => handleDisconnectConfirm(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                {getDualText('disconnect.confirm.no')}
                            </button>
                            <button
                                onClick={() => handleDisconnectConfirm(true)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                {getDualText('disconnect.confirm.yes')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}