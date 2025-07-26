import React, { useState, useCallback } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Documentation from "./pages/Documentation";
import Toast from "./components/UI/Toast";
import HomePage from "./pages/HomePage";
import './i18n';

export default function App() {
    const [page, setPage] = useState("home");
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [s3Info, setS3Info] = useState({ bucket: "" });
    const [toast, setToast] = useState(null);

    const showToast = useCallback((type, message) => {
        setToast({ type, message });
    }, []);

    const handleNavigate = useCallback((page) => {
        setPage(page);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar onNavigate={handleNavigate} active={page} />

            <main className="flex-1 min-h-screen pl-64">
                <div className="px-6 py-8 max-w-7xl mx-auto">
                    {toast && (
                        <Toast
                            type={toast.type}
                            message={toast.message}
                            onDismiss={() => setToast(null)}
                        />
                    )}

                    {page === "docs" ? (
                        <Documentation
                            isConnected={isConnected}
                            s3Info={s3Info}
                        />
                    ) : (
                        <HomePage
                            isConnected={isConnected}
                            setIsConnected={setIsConnected}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            s3Info={s3Info}
                            setS3Info={setS3Info}
                            showToast={showToast}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}