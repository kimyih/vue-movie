# API를 이용한 영화

## 01 vue 설치

[vue.js]https://ko.vuejs.org/

```
npm create vue@latest
```

-> 터미널에 명령어 입력

```
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
-> No

✔ Add JSX Support? … No / Yes
-> Yes

✔ Add Vue Router for Single Page
 Application development? … No / Yes
-> Yes

✔ Add Pinia for state management? … No / Yes
->No

✔ Add Vitest for Unit testing? … No / Yes
->No

✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
->No

✔ Add ESLint for code quality? … No / Yes
-> Yes

✔ Add Prettier for code formatting? … No / Yes
-> Yes

✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes
-> No

Scaffolding project in ./<your-project-name>...
Done.
```

---

- 한국어

```
✔ 프로젝트명 : … <your-project-name>
✔ TypeScript 추가? … 아니오 / 예
-> 아니요

✔ JSX 지원 추가? … 아니오 / 예
-> 네

✔ 단일 페이지에 대한 부가 가치 라우터 추가
애플리케이션 개발? … 아니오 / 예
-> 네

✔ 국가 관리를 위해 Pinia를 추가하시겠습니까? … 아니오 / 예
->아니오

✔ 단위 테스트에 Vitest 추가? … 아니오 / 예
->아니오

✔ 엔드 투 엔드 테스트 솔루션 추가? … 아니오 / 사이프러스 / 나이트워치 / 극작가
->아니오

✔ 코드 품질을 위해 ESLINT를 추가하시겠습니까? … 아니오 / 예
-> 네

✔ 코드 포맷에 Pretty 추가? … 아니오 / 예
-> 네

✔ 디버깅을 위해 Vue DevTools 7 확장 기능 추가? (실험) … 아니오 / 예
-> 아니요
```

```
npm install
npm run dev
npm install sass
npm install swiper
npm install vue-router@4
```

## 빌드

```
npm run build
```

-> 빌드를 하면 웹사이트 주소를 만들 수 있음.
