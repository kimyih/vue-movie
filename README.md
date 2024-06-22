# API를 이용한 영화 사이트 만들기 

 https://movie-vue-kyh.web.app

## 📣 첫세팅 하기

<details>
 <summary> ❗️ 초기세팅 접기/펼치기</summary>
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

<details>
 <summary> 🔥 Firebase 세팅 접기/펼치기</summary>
 <div markdown="1">

### 첫시작

01. 사이트 접속    
https://firebase.google.com/?_gl=1*jnj97q*_up*MQ..*_ga*Mzg0OTEyNDUyLjE3MTg4NTIyMzk.*_ga_CW55HF8NVT*MTcxODg1MjIzOS4xLjAuMTcxODg1MjIzOS4wLjAuMA..&hl=ko&authuser=1

02.  시작하기 클릭    
![image](https://github.com/kimyih/vue-movie/assets/163376151/692c6351-d89c-41e7-a448-ab4402c1d019)

03. 새 프로젝트 만들기 -> 프로젝트명 입력 (중복되지 않게 설정)
![image](https://github.com/kimyih/vue-movie/assets/163376151/f8cff8aa-3d6c-4d88-aef1-fd129662d300)

04. 계정 선택 / 로그인

### Firebase 호스팅 설정

```
sudo npm install -g firebase-tools
```
-> Firebase 호스팅으로 사이트를 호스팅하려면 Firebase CLI(명령줄 도구)가 필요합니다.

```
firebase login
```
-> 구글에 로그인 

```
firebase init
```
-> 프로젝트 시작 

Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? 
->Yes

```
 Hosting: Configure files for Firebase 
Hosting and (optionally) set up GitHub Action deploys
```
-> 선택   

[Project Setup]
First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: movie-vue-kyh (Movie-vue-kyh)
i  Using project movie-vue-kyh (Movie-vue-kyh)


```
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
✔  Wrote dist/404.html
? File dist/index.html already exists. Overwrite? No
i  Skipping write of dist/index.html
```
한국어
``` 
? 공용 디렉토리로 무엇을 사용하시겠습니까? dist
? 단일 페이지 앱으로 구성(모든 URL을 /index.html로 다시 작성)? 아니요
? GitHub로 자동 빌드 및 배포 설정? 아니요
✔ dist/404.html 작성
? 파일 dist/index.html이 이미 있습니다. 덮어쓰기?아니오
dist/index.html 쓰기 생략
```

```
firebase deploy
```
-> 명령어 입력하면 완료
  
 </div>
</details>

## 개요 
Movie Chart는 최신 영화, 인기 영화, 장르별 영화를 쉽게 검색하고 확인 할 수 있는 웹 애플리케이션입니다.    
이 프로젝트는 Vue.js 를 사용하여 개발되었으며, TMDb API 를 사용해 영화 데이터 및 방송 정보를 가져옵니다.     

<br>

## 스크린샷 

![image](https://github.com/kimyih/vue-movie/assets/163376151/59bad778-6f72-4602-9d31-2d3f1cae36b8)


- 처음 들어왔을 때 뜨는 메인 화면 입니다.       
  큰 배너로 지금 상영중인 작품들의 정보를 제공하며, 자동 슬라이드 형식입니다.

  <br>

![image](https://github.com/kimyih/vue-movie/assets/163376151/85766581-8b24-4b84-baec-3b5c223241a7)

- 바로 아래 카테고리가 총 3개가 있습니다.   
Popular / Top Rated / Latest 총 3가지의 메뉴로 클릭시 바로 변경되어 정보를 알 수 있습니다.

<br>

![image](https://github.com/kimyih/vue-movie/assets/163376151/85f35f24-7119-4929-97c9-ec3772f3d0ce)

- 영화를 클릭하면, 영화 제목, 평점, 개요, 트레일러, 감독, 주요 출연진들의 정보를 알 수 있습니다.

<br>

![image](https://github.com/kimyih/vue-movie/assets/163376151/a80fd4f3-dc96-47b6-a0c9-7e80ec81ffbc)

- 출연진을 클릭하면 출연진의 정보와 sns 그리고 출연작품들을 알 수 있습니다.
  출연 작품을 클릭해도 작품 정보가 뜹니다

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






