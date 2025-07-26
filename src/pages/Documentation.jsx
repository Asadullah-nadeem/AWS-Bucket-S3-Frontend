import React from "react";
import S3UploadSection from "../components/S3/S3UploadSection";

const CORS_CONFIG = `[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
        "AllowedOrigins": ["https://demp.com"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
    }
]`;

const IAM_PERMISSIONS = [
    "s3:GetObject",
    "s3:PutObject",
    "s3:ListBucket",
    "s3:DeleteObject"
];

export default function Documentation({ isConnected, s3Info }) {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">S3 Integration Documentation</h1>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Configure Your S3 Bucket</h2>

                    <div className="mb-6">
                        <h3 className="font-medium mb-2 flex items-center">
                            <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2">1</span>
                            Configure CORS Policy
                        </h3>
                        <ol className="list-decimal pl-8 mb-3 text-gray-700 space-y-1">
                            <li>Go to your AWS S3 Console</li>
                            <li>Select your bucket → go to the <b>Permissions</b> tab</li>
                            <li>Scroll down to <b>Cross-origin resource sharing (CORS)</b></li>
                            <li>Click <b>Edit</b> and paste the configuration below:</li>
                        </ol>
                        <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto mt-3 border border-gray-200">
                            {CORS_CONFIG}
                        </pre>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2 flex items-center">
                            <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2">2</span>
                            Required IAM Permissions
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                            {IAM_PERMISSIONS.map((permission, index) => (
                                <li key={index} className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                                    {permission}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {isConnected && s3Info?.bucket && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Files to Your Bucket</h2>
                        <S3UploadSection bucket={s3Info.bucket} />
                    </section>
                )}
            </div>
        </div>
    );
}