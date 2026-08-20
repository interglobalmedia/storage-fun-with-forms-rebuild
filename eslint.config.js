import js from '@eslint/js'
import { importX } from 'eslint-plugin-import-x'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default [
	js.configs.recommended,
	importX.flatConfigs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'no-unused-vars': 'off',
			'no-console': 'off',
			'import-x/named': 'off',
			'import-x/no-extraneous-dependencies': [
				'error',
				{ devDependencies: true },
			],
		},
	},
	{
		files: ['vite.config.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		ignores: ['dist/', 'coverage/'],
	},
	eslintPluginPrettierRecommended,
]
