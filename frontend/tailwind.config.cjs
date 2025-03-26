module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    output: 'frontend/public/styles/tailwind.css', // Percorso personalizzato

    theme: {
        extend: {},
    },
    plugins: [],
}