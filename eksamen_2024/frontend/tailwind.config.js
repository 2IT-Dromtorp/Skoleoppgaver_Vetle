module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                text: "hsl(var(--text))",
                background: "hsl(var(--background))",
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                accent: "hsl(var(--accent))",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
