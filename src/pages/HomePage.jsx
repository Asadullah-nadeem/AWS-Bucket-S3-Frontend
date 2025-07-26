import React, { useState } from "react";
import Tooltip from "../components/Tooltip";
import Loader from "../components/Loader";
import useLocalStorage from "../hooks/useLocalStorage";

const TOOLTIPS = {
    accessKey: "Your AWS Access Key for programmatic access. Get from AWS IAM Console.",
    secretKey: "Your AWS Secret Access Key from AWS IAM Console.",
    region: "AWS region, e.g., us-east-1.",
    bucket: "The unique name of your S3 bucket.",
};

export default function HomePage({
                                     isConnected, setIsConnected,
                                     isLoading, setIsLoading,
                                     errorMsg, setErrorMsg,
                                     s3Info, setS3Info,
                                     showToast
                                 }) {
    const [accessKey, setAccessKey] = useLocalStorage("accessKey", "");
    const [secretKey, setSecretKey] = useLocalStorage("secretKey", "");
    const [region, setRegion] = useLocalStorage("region", "");
    const [bucket, setBucket] = useLocalStorage("bucket", "");

    const [showTip, setShowTip] = useState("");

    const handleConnect = async e => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        // Simulate network call
        setTimeout(() => {
            if (!accessKey || !secretKey || !region || !bucket) {
                setErrorMsg("All fields are required.");
                setIsLoading(false);
                return;
            }

            if (bucket === "demo-s3-bucket") {
                setIsConnected(true);
                setS3Info({ bucket });
                setIsLoading(false);
                showToast("success", "Connected to S3 bucket successfully");
            } else {
                setIsConnected(false);
                setIsLoading(false);
                setErrorMsg("❗ Error loading directory\nNetwork error: Please check your internet connection and ensure CORS is configured properly.");
                showToast("error", "Error connecting to S3. Check credentials and CORS.");
            }
        }, 1400);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setS3Info({ bucket: "" });
        showToast("error", "Disconnected from S3 bucket.");
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md px-8 py-10">
            <h1 className="text-2xl font-bold mb-2">AWS S3 Storage Integration Guide</h1>
            <section className="mb-10">
                <h2 className="text-lg font-semibold mb-4">AWS S3 Configuration</h2>
                <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleConnect} autoComplete="off">
                    <div className="relative">
                        <label className="block font-medium mb-1">Access Key ID
                            <span className="ml-1 cursor-pointer text-gray-400"
                                  onMouseEnter={() => setShowTip("accessKey")}
                                  onMouseLeave={() => setShowTip("")}>ⓘ</span>
                        </label>
                        <input
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                            type="text" value={accessKey} onChange={e => setAccessKey(e.target.value)}
                            disabled={isLoading || isConnected}
                        />
                        {showTip === "accessKey" && <Tooltip text={TOOLTIPS.accessKey} />}
                    </div>

                    <div className="relative">
                        <label className="block font-medium mb-1">Secret Access Key
                            <span className="ml-1 cursor-pointer text-gray-400"
                                  onMouseEnter={() => setShowTip("secretKey")}
                                  onMouseLeave={() => setShowTip("")}>ⓘ</span>
                        </label>
                        <input
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                            type="password" value={secretKey} onChange={e => setSecretKey(e.target.value)}
                            disabled={isLoading || isConnected}
                        />
                        {showTip === "secretKey" && <Tooltip text={TOOLTIPS.secretKey} />}
                    </div>

                    <div className="relative">
                        <label className="block font-medium mb-1">Region
                            <span className="ml-1 cursor-pointer text-gray-400"
                                  onMouseEnter={() => setShowTip("region")}
                                  onMouseLeave={() => setShowTip("")}>ⓘ</span>
                        </label>
                        <input
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                            type="text" value={region} onChange={e => setRegion(e.target.value)}
                            disabled={isLoading || isConnected}
                            placeholder="us-east-1"
                        />
                        {showTip === "region" && <Tooltip text={TOOLTIPS.region} />}
                    </div>

                    <div className="relative">
                        <label className="block font-medium mb-1">Bucket Name
                            <span className="ml-1 cursor-pointer text-gray-400"
                                  onMouseEnter={() => setShowTip("bucket")}
                                  onMouseLeave={() => setShowTip("")}>ⓘ</span>
                        </label>
                        <input
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                            type="text" value={bucket} onChange={e => setBucket(e.target.value)}
                            disabled={isLoading || isConnected}
                        />
                        {showTip === "bucket" && <Tooltip text={TOOLTIPS.bucket} />}
                    </div>

                    <div className="col-span-full flex items-center gap-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all disabled:opacity-50"
                            disabled={isConnected || isLoading}
                        >
                            {isLoading ? <Loader /> : "Connect"}
                        </button>

                        {isConnected && (
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-2 transition-all"
                                onClick={handleDisconnect}>
                                Disconnect
                            </button>
                        )}
                    </div>
                </form>

                {errorMsg && (
                    <div className="mt-2 text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded whitespace-pre-line">
                        {errorMsg}
                    </div>
                )}

                {isConnected && (
                    <div className="mt-6">
                        <div className="flex items-center gap-2 text-green-700">
                            <span className="text-2xl">✅</span>
                            Connected to S3 Bucket: <span className="font-mono">{s3Info.bucket}</span>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
