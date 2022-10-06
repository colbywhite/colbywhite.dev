const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	theme: {
		extend: {
			fontFamily: {
				sans: ['Segoe UI', 'Inter', ...defaultTheme.fontFamily.sans],
				serif: ['Butler', ...defaultTheme.fontFamily.serif]
			},
			colors: {
				'ws-blue': {
					100: '#E6F0FF',
					200: '#BFDAFF',
					300: '#99C3FF',
					400: '#4D97FE',
					500: '#006AFE',
					600: '#005FE5',
					700: '#004098',
					800: '#003072',
					900: '#00204C'
				}
			}
		}
	},
	plugins: [],
	content: ['src/**/*.njk', 'src/**/*.js']
}
