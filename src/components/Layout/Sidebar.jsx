import React, { useState, useRef, useEffect } from "react";
import logo from "src/assets/react.svg";
import Tooltip from "./Tooltip.jsx";

const languages = [
    { id: 1, flag: "🇺🇸", name: "English" },
    { id: 2, flag: "🇮🇳", name: "Hindi" },
];

export default function Sidebar({ onNavigate, active }) {
    const [lang, setLang] = useState("English");
    const [openLangMenu, setOpenLangMenu] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenLangMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="w-64 bg-white shadow-md flex flex-col py-6 h-full fixed">
            <img
                src={logo}
                alt="Company Logo"
                className="h-12 mb-8 mx-auto"
            />

            <ul className="w-full mb-6 px-4">
                {["home", "docs"].map((page) => (
                    <li key={page} className="mb-1">
                        <button
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                                active === page
                                    ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500"
                                    : "hover:bg-gray-50 text-gray-700"
                            }`}
                            onClick={() => onNavigate(page)}
                        >
                            <span className="capitalize">{page}</span>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-auto px-4 w-full">
                <div className="relative" ref={menuRef}>
                    <button
                        className="w-full flex items-center justify-between px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenLangMenu(!openLangMenu)}
                        aria-expanded={openLangMenu}
                        aria-haspopup="listbox"
                    >
                        <span>
                            {languages.find(l => l.name === lang)?.flag} {lang}
                        </span>
                        <svg
                            className={`h-4 w-4 transition-transform ${
                                openLangMenu ? "rotate-180" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {openLangMenu && (
                        <ul
                            className="absolute z-10 bottom-full mb-2 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1"
                            role="listbox"
                        >
                            {languages.map(({ id, name, flag }) => (
                                <li
                                    key={id}
                                    className={`cursor-pointer px-4 py-2 flex items-center gap-2 hover:bg-blue-50 ${
                                        lang === name ? "font-medium text-blue-700" : ""
                                    }`}
                                    onClick={() => {
                                        setLang(name);
                                        setOpenLangMenu(false);
                                    }}
                                    role="option"
                                    aria-selected={lang === name}
                                >
                                    {flag} {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}