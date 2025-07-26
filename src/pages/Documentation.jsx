import React from "react";
import S3UploadSection from "../components/S3UploadSection";

export default function Documentation({ isConnected, s3Info }) {
    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md px-8 py-10">
            <section className="mb-10">
                <h2 className="text-lg font-semibold mb-3">Setup Your S3 Bucket</h2>
                <p className="mb-2">
                    Step 1: <strong>Configure CORS Policy</strong>
                </p>
                <ol className="list-decimal pl-6 mb-3 text-gray-700">
                    <li>Go to your AWS S3 Console</li>
                    <li>Select your bucket → go to the <b>Permissions</b> tab</li>
                    <li>Scroll down to <b>Cross-origin resource sharing (CORS)</b></li>
                    <li>Click <b>Edit</b> and paste the configuration below:</li>
                </ol>
                <pre className="bg-gray-100 rounded p-3 text-xs overflow-x-auto mb-3">
{`[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["https://demo.com"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]`}
        </pre>
                <p className="mb-2">
                    Step 2: <strong>Required IAM Permissions</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>s3:GetObject</li>
                    <li>s3:PutObject</li>
                    <li>s3:ListBucket</li>
                    <li>s3:DeleteObject</li>
                </ul>
            </section>

            {isConnected && s3Info?.bucket && (
                <S3UploadSection bucket={s3Info.bucket} />
            )}
        </div>
    );
}
