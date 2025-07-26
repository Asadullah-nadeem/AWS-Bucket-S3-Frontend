import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Documentation from "./pages/Documentation";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
    const [page, setPage] = useState("docs");
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [s3Info, setS3Info] = useState({ bucket: "" }); // for display
    const [toast, setToast] = useState(null);

    function showToast(type, message) {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar onNavigate={setPage} active={page} />
            <main className="flex-1 px-6 py-8">
                {toast && <Toast type={toast.type} message={toast.message} />}
                {page === "docs" ? (
                    <Documentation />
                ) : (
                    <HomePage
                        isConnected={isConnected}
                        setIsConnected={setIsConnected}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                        setS3Info={setS3Info}
                        s3Info={s3Info}
                        showToast={showToast}
                    />
                )}
            </main>
        </div>
    );
}
