# API를 이용한 영화 사이트 만들기 



## 세팅 하기 

<details>
 <summary>초기세팅 접기/펼치기</summary>
 <div markdown="1">

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


환경 변수 설정   
```
VITE_APP_API_KEY=your_tmdb_api_key
```

## 빌드

```
npm run build
```

-> 빌드를 하면 웹사이트 주소를 만들 수 있음.

  
 </div>
</details>

## 개요 
Movie Chart는 최신 영화, 인기 영화, 장르별 영화를 쉽게 검색하고 확인 할 수 있는 웹 애플리케이션입니다.    
이 프로젝트는 Vue.js 를 사용하여 개발되었으며, TMDb API 를 사용해 영화 데이터를 가져옵니다.     

<br>

## 스크린샷 

![image](https://github.com/kimyih/vue-movie/assets/163376151/d60e90fb-5cee-4eaf-b458-02219c3e682b)
![image](https://github.com/kimyih/vue-movie/assets/163376151/85766581-8b24-4b84-baec-3b5c223241a7)
![image](https://github.com/kimyih/vue-movie/assets/163376151/076180f1-0b6b-434f-8596-1763ecde2ca3)
![image](https://github.com/kimyih/vue-movie/assets/163376151/44bf4ac8-0ab3-4928-8ba8-17910cc746db)
![image](https://github.com/kimyih/vue-movie/assets/163376151/09316409-496a-4548-9c4e-d7872c34f071)


<br>

## 주요 기능
- 최신 영화, 인기 영화, 높은 평점 영화를 확인할 수 있는 기능
- 장르별 영화 목록을 볼 수 있는 기능
- 특정 영화의 상세 정보를 확인할 수 있는 기능
- 출연진의 상세 정보를 확인할 수 있는 기능
- 출연진의 주요 작품을 확인할 수 있는 기능

<br>

## 사용된 기술

- Vue.js : 사용자 인터페이스를 구축하기 위한 프레임 워크
- Vue.Router : 라우팅을 관리하기 위한 라이브러리
- Axios: API를 호출하기 위한 HTTP 클라이언트
- TMDb API : 영화 데이터 제공 






