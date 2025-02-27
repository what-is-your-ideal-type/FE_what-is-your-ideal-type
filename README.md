# 0. 시작하기
[서비스 링크](https://what-is-your-ideal-type.vercel.app/)

```bash
# 클론 이후

$ npm i
$ npm run start
```

<br/>
<br/>

# 1. 프로젝트 개요
- 프로젝트 이름: What is your ideal type
- 프로젝트 설명: 사용자의 이상형 이미지와 프로필을 간단한 설문과 AI를 활용하여 맞춤형으로 생성해주는 서비스

<br>

# 2. 개발 환경
## Front-end
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

## Back-end / Database
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=firebase&logoColor=white)

## 컨벤션 관리
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=husky&logoColor=white)

## 버전 및 이슈관리
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## 협업 툴
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

## 서비스 배포 환경
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br>

# 3. 주요 기능

### [로그인]
- 이메일과 비밀번호를 입력하면 실시간 유효성 검사가 진행됩니다.
- 이메일 형식이 올바르지 않거나 비밀번호가 8자 미만일 경우 경고 문구가 표시됩니다.
- 현재는 Google 로그인만 지원됩니다.

| 로그인 |
|----------|
|<img width="1727" alt="image" src="https://github.com/user-attachments/assets/69743c7b-6448-426b-a3fd-35a076c1ba9f" />|

<br>


### [회원가입]
- 직접 회원가입해서 서비스를 이용할 수 있습니다.
- 각 form에는 유효성 검사를 실시합니다.

| 회원가입 |
|----------|
|![회원가입 validation](https://github.com/user-attachments/assets/8510266d-b8b7-4981-8c9f-1c4131d59c37)|

<br>



### [설문 조사]
- 사용자의 이상형을 찾기 위한 간단한 설문을 진행합니다.

| 설문조사 |
|----------|
|![설문조사](https://github.com/user-attachments/assets/3bc35d0c-8ef2-4f7d-9a95-9a0fc5b362e7)|


<br>


### [결과 로딩 페이지]
- OpenAI API에 요청을 보낸 후 응답이 도착할 때까지 대기하는 페이지입니다.
- 이미지와 프로필 요청을 병렬로 진행합니다.

| 결과 로딩 페이지 |
|----------|
|![이미지 생성](https://github.com/user-attachments/assets/dc5185ac-6b4b-47f1-9c67-321b4fd46c07)|

<br>



### [이미지 생성]
- 설문 결과를 바탕으로 AI가 이상형 이미지를 생성합니다.

| 결과화면 |
|----------|
|<img width="1728" alt="스크린샷 2025-02-27 오후 7 01 53" src="https://github.com/user-attachments/assets/746c0781-d9f6-48a8-b9b7-27896a552e25" />|

<br>

### [이미지 최적화]
- 생성된 이미지를 최적화하여 데이터베이스에 저장합니다.
- CDN을 활용하여 빠르게 로드할 수 있으며, 저장 공간을 절약할 수 있습니다.

| 결과 로딩 페이지 |
|----------|
|![이미지 최적화](https://github.com/user-attachments/assets/5dfde7c1-8e1b-4f1e-8b7b-b697234ace94)|




### [프로필 생성]
- 생성된 이미지를 기반으로 맞춤형 프로필을 생성합니다.

| 프로필 생성 |
|----------|
|![image](https://github.com/user-attachments/assets/4048db96-ae43-4c65-9848-95ef66f56d4c)|


<br>

### [이미지 저장]
- 생성한 이미지를 내 기기에 저장할 수 있습니다.
- 파일 형식은 webp입니다

| 결과 공유 |
|----------|
|![이미지 저장 3](https://github.com/user-attachments/assets/44cdf6b9-7168-4c6e-a59b-40180bcb163c)|

<br>

### [결과 공유]
- 생성된 결과를 링크 공유 혹은 카카오톡 공유를 할 수 있습니다.

| 결과 공유 |
|----------|
|![이미지저장2](https://github.com/user-attachments/assets/ea557250-24a4-4918-a2c5-13228cf731a2)|

<br>

### [마이 페이지]
- 생성된 이미지와 프로필은 마이 페이지에 저장됩니다.
- 비로그인 사용자가 로그인하면 자동으로 마이 페이지에 저장됩니다.

| 마이 페이지 |
|----------|
|<img width="1728" alt="스크린샷 2025-02-20 오후 8 26 03" src="https://github.com/user-attachments/assets/db08dcc9-8131-4bd2-9f8a-c629d59a7945" />|

<br>

### [비밀번호 찾기]
- Firebase의 비밀번호 초기화 서비스를 이용하여 비밀번호를 재설정할 수 있습니다.
- 입력한 이메일로 인증 메일이 전송되며, 확인 버튼을 누르면 초기화가 완료됩니다.

<table>
    <tr>
        <th colspan="3">비밀번호 찾기</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/773a6456-9ebe-470a-9ac6-6ad0b47290ca" width="100%"></td>
        <td><img src="https://github.com/user-attachments/assets/2c4acdee-4953-4a56-a748-6df46d78240b" width="100%"></td>
        <td><img src="https://github.com/user-attachments/assets/93995d23-a94a-4955-b528-3f61f0e82238" width="100%"></td>
    </tr>
</table>


<br>


# 4. 프로젝트 구조

- 페이지 기반 라우팅을 적용하여 아키텍처를 설계했습니다.
- 도메인, 커스텀 훅, 유틸 함수, UI 등을 분리하여 관심사를 분리하고 재사용성을 높였습니다.

```
idealType
├─ .env
├─ .eslintrc.js
├─ .prettierrc
├─ .storybook
│  ├─ main.ts
│  └─ preview.ts
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ images
│     ├─ Lock_light.png
│     ├─ Message_light.png
│     ├─ chervon_left.png
│     ├─ google.png
│     ├─ icon-photo.png
│     ├─ icon-share.png
│     ├─ kakao.png
│     ├─ kakaoshare.png
│     ├─ naver.png
│     └─ spin.gif
├─ src
│  ├─ App.tsx
│  ├─ components
│  │  ├─ functional
│  │  │  ├─ convert-to-webp.ts
│  │  │  ├─ email-verification-modal.tsx
│  │  │  ├─ error-boudary.tsx
│  │  │  ├─ find-password-modal.tsx
│  │  │  ├─ kakao-share.tsx
│  │  │  ├─ landing-route.tsx
│  │  │  ├─ navigate-to-survey-props.tsx
│  │  │  └─ prevent-default-wrapper.tsx
│  │  ├─ ui
│  │  │  ├─ button
│  │  │  │  ├─ button-group.tsx
│  │  │  │  └─ button.tsx
│  │  │  ├─ card
│  │  │  │  ├─ card-content.tsx
│  │  │  │  ├─ card-description.tsx
│  │  │  │  └─ card.tsx
│  │  │  ├─ dropdown.tsx
│  │  │  ├─ error-message.tsx
│  │  │  ├─ flexbox.tsx
│  │  │  ├─ gridbox.tsx
│  │  │  ├─ header.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ loading-screen.tsx
│  │  │  ├─ main.tsx
│  │  │  ├─ modal
│  │  │  │  ├─ modal-backdrop.tsx
│  │  │  │  ├─ modal-content.tsx
│  │  │  │  ├─ modal-footer.tsx
│  │  │  │  └─ modal.tsx
│  │  │  ├─ picture.tsx
│  │  │  ├─ progressbar.tsx
│  │  │  └─ text.tsx
│  │  └─ utils
│  │     ├─ cookies.ts
│  │     ├─ post-migration.ts
│  │     ├─ survey.ts
│  │     └─ validation.ts
│  ├─ contexts
│  │  └─ auth-context.tsx
│  ├─ firebase.ts
│  ├─ global.d.ts
│  ├─ index.css
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ gender-select.tsx
│  │  ├─ generate.tsx
│  │  ├─ home.tsx
│  │  ├─ mypage.tsx
│  │  ├─ result.tsx
│  │  ├─ signup.tsx
│  │  └─ survey.tsx
│  ├─ pages.ts
│  ├─ reset.css
│  ├─ services
│  │  ├─ auth
│  │  │  ├─ login-with-email.ts
│  │  │  ├─ login-with-google.ts
│  │  │  ├─ logout.ts
│  │  │  └─ signup-with-email.ts
│  │  ├─ count-service.ts
│  │  ├─ image-generate.ts
│  │  ├─ profile-generate.ts
│  │  ├─ save-result-url-to-firebase.ts
│  │  └─ upload-image-to-firebase.ts
│  ├─ setup-test.ts
│  ├─ stories
│  │  ├─ Button.stories.tsxㅁ
│  │  ├─ FlexBox.stories.tsx
│  │  ├─ Header.stories.tsx
│  │  └─ Input.stories.tsx
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ vercel.json
└─ vite.config.ts
```

<br>

# 5. 트러블 슈팅 및 협업 히스토리

- Issues: https://github.com/what-is-your-ideal-type/FE_what-is-your-ideal-type/issues?q=is%3Aissue%20state%3Aclosed <br>

- Pull Request: https://github.com/what-is-your-ideal-type/FE_what-is-your-ideal-type/pulls?q=is%3Apr+is%3Aclosed <br>

- Wiki: https://github.com/what-is-your-ideal-type/FE_what-is-your-ideal-type/wiki/Button-Components-%EC%82%AC%EC%9A%A9%EB%B2%95


<br>

# 6. 팀원 소개 및 후기

| [김세연](https://github.com/sennydayk) | [김주희](https://github.com/JHeeKimm)| [염정호](https://github.com/joshyeom)|
|----------|----------|----------|
| ![https://github.com/sennydayk](https://github.com/user-attachments/assets/1d09700a-8d71-4a6e-81d8-36da12544436) | ![https://github.com/JHeeKimm](https://github.com/user-attachments/assets/af6f44cd-964e-46b0-b534-d387d7863532) | ![https://github.com/joshyeom](https://github.com/user-attachments/assets/72108728-02ec-42b1-928d-bdf7c3535af6) |
| (후기작성) | (후기작성) | (후기작성) |
