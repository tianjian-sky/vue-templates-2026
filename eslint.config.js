import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat' // https://www.prettier.cn/docs/integrating-with-linters
import eslintAutoImportJson from './.eslintrc-auto-import.json' with { type: 'json' }

// https://eslint.org/docs/latest/use/configure/configuration-files
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    // flat 模式
    // https://eslint.nodejs.cn/docs/latest/use/configure/language-options#specifying-globals
    languageOptions: {
      globals: { ...globals.browser, ...eslintAutoImportJson.globals },
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  eslintConfigPrettier, // 将eslint中prettier和eslint冲突的规则关闭
])
