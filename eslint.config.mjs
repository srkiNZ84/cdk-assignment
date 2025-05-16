import prettierConfig from 'eslint-config-prettier'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, prettierConfig)
