import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Tooltip from "./Tooltip";

const languages = [
    { code: 'en', flag: "🇺🇸", name: "language.english" },
    { code: 'hi', flag: "🇮🇳", name: "language.hindi" }
];

export default function Sidebar({ onNavigate, active }) {
    const { t, i18n } = useTranslation();
    const [openLangMenu, setOpenLangMenu] = useState(false);
    const menuRef = useRef(null);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setOpenLangMenu(false);
    };

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
            <div className="h-12 mb-8 mx-auto flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">S3 Bucket</span>
            </div>

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
                            <span>{t(`sidebar.${page}`)}</span>
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
              {languages.find(l => l.code === i18n.language)?.flag} {t(languages.find(l => l.code === i18n.language)?.name)}
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
                            {languages.map(({ code, flag, name }) => (
                                <li
                                    key={code}
                                    className={`cursor-pointer px-4 py-2 flex items-center gap-2 hover:bg-blue-50 ${
                                        i18n.language === code ? "font-medium text-blue-700" : ""
                                    }`}
                                    onClick={() => changeLanguage(code)}
                                    role="option"
                                    aria-selected={i18n.language === code}
                                >
                                    {flag} {t(name)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}