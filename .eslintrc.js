module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'vue/comment-directive': 'off',
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", //배포 때 콘솔 있으면 에러
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //"prettier/prettier":['error',프리티어의 속성]
    "prettier/prettier": [
      "error",
      // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
      // https://prettier.io/docs/en/options.html
      {
        endOfLine: 'auto',
        singleQuote: true, //문자열이 항상 작은 따음표
        semi: true, // 세미콜론 필수 
        useTabs: true,
        tabWidth: 2,
        trailingComma: 'all', //후행쉼표 가능 
        printWidth: 80, //한줄 80자 이상 안됨 
        bracketSpacing: true, // 객체 리터럴에서 대괄호 사이의 공백 인쇄
        arrowParens: 'avoid', //화살표 함수 매개변수 괄호 표시 생략
      },
    ],
  },
}