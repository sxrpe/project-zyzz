export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Zyzz App</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Features</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✅ React 18 with TypeScript</li>
                            <li>🚀 Vite Build System</li>
                            <li>💅 Tailwind CSS v3</li>
                            <li>🔀 React Router v6</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">Quick Start</h2>
                        <p className="text-gray-600 mb-4">
                            Get started by editing the pages in the
                            <code className="bg-gray-100 px-2 py-1 rounded ml-1">src/pages</code> directory.
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}