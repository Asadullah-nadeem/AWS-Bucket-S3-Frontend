import React, { useState, useRef } from "react";
import Loader from "../components/UI/Loader";
import Tooltip from "../components/Layout/Tooltip";
import { useTranslation } from 'react-i18next';

const TOOLTIPS = {
    accessKey: "Your AWS Access Key for programmatic access. Get from AWS IAM Console.",
    secretKey: "Your AWS Secret Access Key from AWS IAM Console.",
    region: "AWS region, e.g., us-east-1.",
    bucket: "The unique name of your S3 bucket.",
};

// AWS S3 Service Mock (Replace with real SDK in production)
const AWSService = {
    async connect({ accessKey, secretKey, region, bucket }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate different error scenarios
                if (!accessKey || !secretKey || !region || !bucket) {
                    return reject(new Error("All fields are required"));
                }

                if (!/^[a-z0-9.-]+$/.test(bucket)) {
                    return reject(new Error("Invalid bucket name. Use lowercase letters, numbers, hyphens (-), and periods (.)"));
                }

                if (!/^[a-z]{2}-[a-z]+-\d$/.test(region)) {
                    return reject(new Error("Invalid region format. Example: us-east-1"));
                }

                if (accessKey.length < 20 || !/^[A-Z0-9]{20,}$/.test(accessKey)) {
                    return reject(new Error("Invalid Access Key format"));
                }

                if (secretKey.length < 40) {
                    return reject(new Error("Invalid Secret Key format"));
                }

                // Simulate successful connection
                resolve({
                    bucket,
                    region,
                    success: true,
                    message: `Connected to ${bucket} in ${region}`
                });
            }, 1500);
        });
    }
};

export default function HomePage({
                                     isConnected, setIsConnected,
                                     isLoading, setIsLoading,
                                     errorMsg, setErrorMsg,
                                     s3Info, setS3Info,
                                     showToast
                                 }) {
    const [accessKey, setAccessKey] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [region, setRegion] = useState("");
    const [bucket, setBucket] = useState("");
    const [showTip, setShowTip] = useState("");
    const timeoutRef = useRef(null);
    const { t } = useTranslation();

    const handleConnect = async e => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        try {
            const result = await AWSService.connect({
                accessKey,
                secretKey,
                region,
                bucket
            });

            setIsConnected(true);
            setS3Info({ bucket, region });
            setIsLoading(false);
            showToast("success", result.message);
        } catch (error) {
            setIsConnected(false);
            setIsLoading(false);
            setErrorMsg(error.message);
            showToast("error", error.message);
        }
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setS3Info({ bucket: "", region: "" });
        setAccessKey("");
        setSecretKey("");
        setRegion("");
        setBucket("");
        showToast("info", "Disconnected from S3 bucket.");
    };

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('home.title')}</h1>
                    <p className="text-gray-600">
                        {t('home.description')}
                    </p>
                </header>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
                        AWS S3 Configuration
                    </h2>

                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                        onSubmit={handleConnect}
                        autoComplete="off"
                    >
                        {[
                            { id: "accessKey", label: "Access Key ID", value: accessKey, setter: setAccessKey, type: "password" },
                            { id: "secretKey", label: "Secret Access Key", value: secretKey, setter: setSecretKey, type: "password" },
                            { id: "region", label: "Region", value: region, setter: setRegion, placeholder: "us-east-1" },
                            { id: "bucket", label: "Bucket Name", value: bucket, setter: setBucket }
                        ].map((field) => (
                            <div key={field.id} className="relative">
                                <label
                                    htmlFor={field.id}
                                    className="block font-medium mb-2 text-gray-700"
                                >
                                    {field.label}
                                    <span
                                        className="ml-1.5 cursor-pointer text-gray-400 inline-flex"
                                        onMouseEnter={() => setShowTip(field.id)}
                                        onMouseLeave={() => setShowTip("")}
                                        aria-label="More information"
                                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                                </label>
                                <input
                                    id={field.id}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                                    type={field.type || "text"}
                                    value={field.value}
                                    onChange={e => field.setter(e.target.value)}
                                    disabled={isLoading || isConnected}
                                    placeholder={field.placeholder || ""}
                                />
                                {showTip === field.id && <Tooltip text={TOOLTIPS[field.id]} />}
                            </div>
                        ))}

                        <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70"
                                disabled={isConnected || isLoading}
                            >
                                {isLoading && <Loader />}
                                {isLoading ? "Connecting..." : t('home.connectButton')}
                            </button>

                            {isConnected && (
                                <button
                                    type="button"
                                    className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
                                    onClick={handleDisconnect}
                                >
                                    {t('home.disconnectButton')}
                                </button>
                            )}
                        </div>
                    </form>

                    {errorMsg && (
                        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span>{errorMsg}</span>
                            </div>
                        </div>
                    )}

                    {isConnected && (
                        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center text-green-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>
                  Connected to S3 Bucket: <span className="font-mono bg-blue-50 px-2 py-1 rounded">{s3Info.bucket}</span> in <span className="font-mono bg-blue-50 px-2 py-1 rounded">{s3Info.region}</span>
                </span>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}