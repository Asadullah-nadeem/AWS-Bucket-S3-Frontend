import React from "react";

export default function Tooltip({ text }) {
    return (
        <div className="absolute z-50 left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded shadow-lg max-w-xs w-[220px] transition-opacity">
            <div className="relative">
                <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                {text}
            </div>
        </div>
    );
}