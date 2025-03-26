import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // 1. Invio i dati al backend
            const response = await axios.post('http://localhost:3001/api/contact', formData);

            // 2. Gestione della risposta
            if (response.data.success) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' }); // Resetta il form
            }
        } catch (err) {
            // 3. Gestione degli errori
            setError('Errore durante l\'invio del messaggio. Riprova più tardi.');
            console.error('Errore:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>

                {success && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        Messaggio inviato con successo!
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your message..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}