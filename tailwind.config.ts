
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Theme colors
				space: {
					bg: '#1A1F2C',
					primary: '#8B5CF6',
					secondary: '#D6BCFA',
					accent: '#0EA5E9'
				},
				candyland: {
					bg: '#FEF7CD',
					primary: '#F97316',
					secondary: '#FFDEE2',
					accent: '#D946EF'
				},
				underwater: {
					bg: '#D3E4FD',
					primary: '#0EA5E9',
					secondary: '#E5DEFF',
					accent: '#6E59A5'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce-small': {
					'0%, 100%': { 
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'confetti-drop': {
					'0%': { 
						transform: 'translateY(-100px) rotate(0deg)', 
						opacity: '1' 
					},
					'100%': { 
						transform: 'translateY(600px) rotate(360deg)', 
						opacity: '0' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-small': 'bounce-small 0.6s ease-in-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'confetti-drop': 'confetti-drop 3s ease-in-out forwards',
			},
			fontFamily: {
				'code': ['"JetBrains Mono"', 'monospace'],
				'emoji': ['"Noto Color Emoji"', '"Segoe UI Emoji"', '"Apple Color Emoji"', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
