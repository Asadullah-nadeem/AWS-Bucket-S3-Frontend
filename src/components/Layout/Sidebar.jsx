import React from "react";
import logo from "../assets/react.svg";

const countries = [
    { flag: "🇺🇸", name: "English" },
    { flag: "🇮🇳", name: "Hindi" },
];

export default function Sidebar({ onNavigate, active }) {
    const [lang, setLang] = React.useState("English");
    const [openLangMenu, setOpenLangMenu] = React.useState(false);

    return (
        <nav className="w-56 bg-white shadow-md flex flex-col items-center py-6">
            <img src={logo} alt="Logo" className="h-12 mb-8" />

            <ul className="w-full mb-6">
                <li>
                    <button
                        className={`w-full text-left px-6 py-3 rounded-lg transition-colors ${
                            active === "home"
                                ? "bg-blue-100 text-blue-800 font-semibold"
                                : "hover:bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => onNavigate("home")}
                    >
                        Home
                    </button>
                </li>
                <li>
                    <button
                        className={`w-full text-left px-6 py-3 rounded-lg transition-colors ${
                            active === "docs"
                                ? "bg-blue-100 text-blue-800 font-semibold"
                                : "hover:bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => onNavigate("docs")}
                    >
                        Docs
                    </button>
                </li>
            </ul>

            {/* Language Selector */}
            <div className="relative w-full px-6">
                <button
                    className="w-full flex items-center justify-between px-4 py-2 border rounded-lg hover:bg-gray-100"
                    onClick={() => setOpenLangMenu(!openLangMenu)}
                    aria-expanded={openLangMenu}
                    aria-haspopup="listbox"
                >
          <span>
            {countries.find(({ name }) => name === lang)?.flag} {lang}
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
                        className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-auto focus:outline-none"
                        role="listbox"
                    >
                        {countries.map(({ name, flag }) => (
                            <li
                                key={name}
                                className={`cursor-pointer px-4 py-2 flex items-center gap-2 hover:bg-blue-100 ${
                                    lang === name ? "font-semibold text-blue-800" : ""
                                }`}
                                onClick={() => {
                                    setLang(name);
                                    setOpenLangMenu(false);
                                }}
                                role="option"
                                aria-selected={lang === name}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        setLang(name);
                                        setOpenLangMenu(false);
                                    }
                                }}
                            >
                                {flag} {name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}
