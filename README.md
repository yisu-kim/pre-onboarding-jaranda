<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://jaranda.kr/">
    <img src="https://user-images.githubusercontent.com/37607373/133915758-1e45a4e4-17ab-4077-8f0b-d8c48a65bf21.jpg" alt="mrcamel logo" width=150 />
  </a>

  <h3 align="center">사용자 메뉴 권한을 제어하는 관리자 페이지</h3>
  
  <p align="center">
    프리온보딩 코스 Jaranda 기업 과제
    <br />
    <br />
    <a href="https://jaranda.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/six-sense/jaranda">Original Team Repo</a>
  </p>
</p>

**Demo Login Info**

- 관리자: admin1 / admin123!
- 사용자: user1 / user123!

<br>

<!-- Assignment Requirements -->
<details>
  <summary>📋 과제 요구사항 보기</summary>
  <div markdown="1">

#### 회원가입 페이지

아래 정보를 입력받아 회원가입 페이지를 구현하고 로그인/로그아웃 기능을 구현해주세요.

- 이름
- 주소 (팝업을 이용해서 입력받음)
- 신용카드 정보 (팝업을 이용해서 입력받음)
- 나이

1.  관리자 로그인을 하면 등록한 계정 정보를 아래 방법을 이용하여 시각화 해 주세요.

    - 테이블 Component 페이지 만들기
    - Data Table 구현
    - 페이지네이션 구현
    - 검색기능 구현

2.  정보는 로컬 저장소 등 자유롭게 저장해도 됩니다.
3.  주소는 다음에서 제공하는 입력창을 사용해도 무방합니다.
4.  관리자 계정은 임의로 정의해도 됩니다.

#### 관리자 페이지

다양한 메뉴를 가지고 있는 홈페이지 관리자 페이지를 구현해 주세요.

1. 계정, 비밀번호만 입력하면 로그인이 되어야 합니다.
2. 로그인 된 계정은 자신에게 허용된 메뉴만 보여야 합니다.
3. 관리자는 계정을 임의로 생성할 수 있고 계정별로 볼 수 있는 메뉴를 설정할 수 있습니다.
4. 관리자 계정은 임의로 정의해도 됩니다.
5. 정보는 로컬 저장소 등 자유롭게 저장해도 됩니다.
6. 메뉴는 임의대로 정의해도 되며 메뉴를 선택했을 때 나오는 화면에는 메뉴명이 출력되면 됩니다.
7. 관리자 로그인을 하면 등록한 계정 정보를 아래 방법을 이용하여 시각화 해 주세요.

   - 테이블 Component 페이지 만들기
   - Data Table 구현
   - 페이지네이션 구현
   - 검색기능 구현

  </div>
</details>

## About The Project

### 로그인 페이지

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/133926140-17de0d3d-2984-4bb2-970f-413a69912bf5.gif" alt="project signin page screenshot" height=600 />
</p>

### 회원가입 페이지

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/133926166-88a8dd4b-cee5-4a0a-ad25-c0256b785d6c.gif" alt="project signup page screenshot" height=600 />
</p>

### 관리자 페이지

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/133926178-e358d229-ae26-45d4-97c1-7b1bd8754e55.gif" alt="project admin page screenshot" height=600 />
</p>

### Built With

- React
- React Router
- styled-components

## Getting Started

### Installation

To install packages:

```sh
npm install
```

To serve the app:

```sh
npm start
```

## Features

> 제가 개발에 참여한 기능은 ✅로 표시했습니다.

1. 회원 가입

   - 아이디, 비밀번호, 이름, 나이, 주소, 신용카드 등록을 통한 회원 가입 기능
   - 아이디 중복 검사, 비밀번호 확인, 이름과 나이에 대한 유효성 검증
   - 주소 등록은 다음 API 활용
   - ✅ React Portals를 활용한 모달 컴포넌트로 신용카드 정보를 입력받는 팝업 구현
   - ✅ 신용카드 입력 정보(카드번호, 이름, 유효기간, CVC) 검증

2. 로그인

   - 아이디, 패스워드 유효성 검사
   - 유효성 검사 후 존재하는 유저 인증 후 token 발급
   - 발급된 token으로 admin, user 페이지 이동

3. 관리자

   - localStorage에 존재하는 userData 출력
   - 검색기능으로 name, userId에서 키워드 검색
   - localStorage에 존재하는 userId의 menuItem 수정 가능
   - 관리자 혹은 유저로 계정 추가

4. 내비게이션 바

   - ✅ Public/Private Route로 페이지 접근 제어 기능 구현
   - ✅ 로그인 전에만 로그인, 회원가입 페이지 접근 가능
   - ✅ 로그인 후에는 사용자는 허가된 메뉴만 볼 수 있고 이동 가능
   - Not Found 페이지

## Members

- [yisu-kim](https://github.com/yisu-kim)
- [kwak-bs](https://github.com/kwak-bs)
- [yh1120](https://github.com/yh1120)
- [tTab1204](https://github.com/tTab1204)
- [UlongChaS2](https://github.com/UlongChaS2)
- [hurima90-kim](https://github.com/hurima90-kim)
- [Telling-Y](https://github.com/Telling-Y)
- [chyeon97](https://github.com/chyeon97)
