import logo from '../assets/logo.svg';

export default function Sidebar({ onNavigate, active }) {
    return (
        <nav className="w-56 bg-white shadow-md flex flex-col items-center py-6">
            <img src={logo} alt="Logo" className="h-12 mb-8" />
            <ul className="w-full">
                <li>
                    <button
                        className={`w-full text-left px-6 py-3 rounded-lg transition-colors ${active === 'docs'
                            ? 'bg-blue-100 text-blue-800 font-semibold'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => onNavigate('docs')}
                    >
                        📄 Docs
                    </button>
                </li>
            </ul>
        </nav>
    );
}
