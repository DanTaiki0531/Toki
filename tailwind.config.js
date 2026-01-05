/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#8B7355',
                secondary: '#E8DDD3',
                accent: '#D4A574',
                'bg-light': '#FAF8F6',
                'text-primary': '#2C2420',
                'card-bg': '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
