module.exports = {
  env: {
    // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: '@babel/eslint-parser', // 解析器
  extends: [
    // 继承的规则 [扩展]
    'eslint:recommended',
    "plugin:jsx-a11y/recommended",
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:prettier/recommended',
  ],
  parserOptions: {
    // 解析器配置
    requireConfigFile: false,
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      presets: ["@babel/preset-react"],
    }
  },
  overrides: [],
  plugins: [
    // 插件
    "jsx-a11y",
    'react',
    'react-hooks',
  ],
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    // "prettier/prettier": 2, // 不符合 prettier 规则的代码，要进行错误提示

    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0, // TODO: remove later
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    'react/static-property-placement': 0,
    'react/no-find-dom-node': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks

    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    // label-has-for has been deprecated
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 0,
    // "comma-dangle": ["error", "always-multiline"],
    'comma-dangle': 0,
    'consistent-return': 0, // TODO: remove later
    'no-param-reassign': 0, // TODO: remove later
    'no-underscore-dangle': 0,
    // for (let i = 0; i < len; i++)
    'no-plusplus': 0,
    // https://eslint.org/docs/rules/no-continue
    // labeledLoop is conflicted with `eslint . --fix`
    'no-continue': 0,
    // ban this for Number.isNaN needs polyfill
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
    // 'quotes': ["error", "single"]
    "no-unused-vars": 'off',
    "no-debugger": 1
  },
};
