/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {

    }
  },
  daisyui: {
    themes: ['pastel',
      {
        testTheme: {

          "primary": "#A5953F",

          "secondary": "#7FA033",

          "accent": "#00755F",

          "neutral": "#4B4737",

          "base-100": "#FCF1CA",

          "info": "#E168C4",

          "success": "#00A995",

          "warning": "#FFB47C",

          "error": "#BE5944",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};