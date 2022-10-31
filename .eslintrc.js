module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:prettier/recommended', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {},
};
