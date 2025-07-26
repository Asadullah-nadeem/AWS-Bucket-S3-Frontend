export default function Tooltip({ text }) {
    return (
        <div className="absolute z-50 left-full ml-2 px-3 py-1 bg-black text-white text-xs rounded shadow-lg">
            {text}
        </div>
    );
}
