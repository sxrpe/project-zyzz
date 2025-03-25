export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold text-purple-600 mb-3">Our Story</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We're a passionate team of developers dedicated to building amazing web experiences
                        with modern technologies. Our mission is to create efficient, beautiful, and
                        user-friendly applications.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {['React', 'Tailwind', 'TypeScript'].map((tech) => (
                        <div key={tech} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-blue-500 font-bold">{tech[0]}</span>
                            </div>
                            <h3 className="font-semibold text-gray-800">{tech}</h3>
                            <p className="text-sm text-gray-600 mt-1">Expert Level</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}