// Usage: <Toast type="success" message="Connected!" />
export default function Toast({ type, message }) {
    const colors = type === 'success'
        ? 'bg-green-500'
        : 'bg-red-500';
    return (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded text-white shadow-lg ${colors} animate-fade-in`}>
            {type === 'success' ? '✅' : '❗'} {message}
        </div>
    );
}
