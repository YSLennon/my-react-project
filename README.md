# 📚 프로젝트명: Duxstagram



## 1. 프로젝트 개요

### 프로젝트 요약
이 프로젝트는 학습을 위해 작성된 **인스타그램** 카피 페이지입니다.<br>
**회원가입, 로그인, 프로필 사진** 등의 설정이 가능하며 유저 간 **팔로우**기능을 지원합니다.<br> 사진을 포함한 **게시글 작성**이 가능하고 **댓글** 기능이 있습니다.

### 프로젝트 목표
> JWT의 Access Token 및 Refresh Token을 통한 안전한 인증 구현<br>
Pool - Release를 이용한 DB 관리<br>
Redis CacheServer를 사용한 RefreshToken 관리<br>
React의 구조를 이용한 전체적인 모듈화




### 기술 스택
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
<!-- ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) -->


- **프론트엔드**: *React*
- **백엔드**: *Node.js, Express*
- **데이터베이스**: *MySQL*
- **캐시서버**: *Redis*

## 2. 기능 설명

### 핵심 기능 목록

- **사용자 관리**: 회원가입, 로그인, 프로필 사진 변경
    - 회원가입 시 **bcrypt**를 통해 hash화된 비밀번호 생성
    - 로그인 시 JWT를 이용해 **RefreshToken** 및 **AccessToken** 생성 관리
    - AccessToken 만료 시 401status를 리턴,<br>
     axiosIntercepter를 이용해 RefreshToken을 검증한 뒤 AccessToken을 재발급한다.
    - **RefreshToken**은 Redis를 이용해 효율적으로 관리된다.
    - multer를 이용해 ServerStorage에 프로필 이미지 저장
- **팔로우**: 사용자 간 팔로우를 통해 피드 리스트 변경
    - 메인 페이지에서 보여주는 리스트는 본인 및 팔로우한 유저의 피드만 보여준다.
- **피드**: 피드, 댓글 작성 및 삭제
    - multer를 이용해 ServerStorage에 피드 이미지 저장


### UI/UX 설명
> **홈 화면**:<br>
 사용자 및 팔로우한 유저의 피드리스트를 보여준다. 댓글을 바로 작성할 수 있고 상세보기 등이 가능하다.
<img src="image.png/" width="600px" style="padding:30px">


> **피드 디테일**:<br>
 피드의 상세한 정보를 보여준다. 댓글 및 게시글 내용을 표시하고 댓글의 작성이 가능하다.
<img src="image-1.png" width="600px" style="padding:30px">

> **피드 작성**:<br>
 피드를 작성한다. 사진을 먼저 고르고 게시글을 작성한다.
<img src="image-2.png" width="600px" style="padding:10px 30px">
<img src="image-3.png" width="600px" style="padding:10px 30px">

> **프로필**:<br>
 유저의 프로필을 보여준다. 본인의 경우 프로필 이미지 수정, 타인의 경우 팔로우/언팔로우가 가능하다.
<img src="image-4.png" width="600px" style="padding:10px 30px">
<img src="image-5.png" width="600px" style="padding:10px 30px">

## 3. 프로젝트 구조

<!-- ### 폴더 구조
```plaintext
📂 my-project
├── 📂 client         # React 소스 코드 (프론트엔드)
│   ├── 📂 public
│   │   └── 📂 assets # client 기본 이미지
│   └── 📂 src
│   │   └── 📂 assets # client 기본 이미지
└── 📂 server         # Node.js + Express 백엔드
    ├── 📂 config     # 환경 설정 파일
    ├── 📂 controllers
    ├── 📂 models     # MySQL 모델 정의
    └── 📂 routes     # API 라우터
``` -->
### 클라이언트-서버 구조
프론트엔드와 백엔드를 분리하여, React 클라이언트에서 Axios로 데이터를 요청하고, Express API 서버에서 응답합니다. 이를 통해 각 구성 요소가 독립적으로 개발 및 유지 관리될 수 있어 유연성과 확장성을 높였습니다.

- **Redux**<br>
 상태 관리를 위해 Redux를 사용하여, 애플리케이션의 전역 상태를 효율적으로 관리하고, 컴포넌트 간의 데이터 흐름을 단순화했습니다. 이를 통해 사용자 인터페이스의 일관성을 유지하고, 예측 가능한 상태 관리를 가능하게 했습니다.

- **JWT (JSON Web Token)**<br>
 사용자 인증을 위해 JWT를 활용하여, 사용자 로그인 및 세션 관리를 안전하게 처리했습니다. JWT를 통해 클라이언트는 서버와의 통신 시 인증 정보를 포함시켜 보안성을 높였습니다.

- **Redis 캐시 서버**<br>
리프레시 토큰 저장소로 Redis를 활용하여, 토큰의 관리 및 검증 속도를 높였습니다. 이를 통해 데이터베이스의 부하를 줄이고, 사용자 인증에 대한 응답 시간을 단축했습니다.

- **비동기 통신**<br>
 Axios를 통해 비동기 통신을 구현하여, 사용자가 페이지를 새로고침하지 않고도 데이터 업데이트를 실시간으로 반영할 수 있도록 하였습니다. 이는 사용자 경험을 향상시키는 데 중요한 역할을 합니다.

## 4. 주요 기술적 문제와 해결 방법
1. 데이터베이스 커넥션 과다 사용<br>
**문제:** 데이터베이스에 대한 동시 요청이 많아지면서 커넥션 수가 한계를 초과하여 성능 저하와 타임아웃 오류가 발생했습니다.<br>
**해결:** 커넥션 풀을 사용하여 동시 사용 가능한 커넥션 수를 제한하고, 요청 처리가 끝난 후에는 커넥션을 해제하여 리소스를 효율적으로 관리했습니다.

2. **Redis 클라이언트 인스턴스 관리**<br>
**문제:** Redis 클라이언트가 여러 번 생성되어 중복 인스턴스가 발생하고, 이로 인해 메모리 사용량이 증가하며 성능에 부정적인 영향을 미쳤습니다.<br>
**해결:** 싱글톤 패턴을 적용하여 Redis 클라이언트를 단일 인스턴스로 관리함으로써 클라이언트 인스턴스의 중복 생성을 방지하고, 메모리 사용을 최적화했습니다.

## 5. 배운 점/ 아쉬운 점
#### 아쉬운 점
- component service 등 디렉터리 구조를 나누면서 api라던가 내부 로직들을 명확히 분리해보고 싶었으나 react+express라는 새로운 구조와 처음 써보는 다양한 기술들(redis, jws, redux, etc...)을 사용하면서 효율적인 코드 분리를 하지 못한 것 같아서 아쉬웠습니다.
#### 배운 점
- 위 아쉬운 점을 경험하면서 다음 프로젝트에선 초기 로직적인 파트를 먼저 구분해서 모듈화된 코드를 먼저 작성해 개선할 계획을 세우게 되었습니다.
- 커넥션의 제한 및 릴리즈의 중요성을 깨달았고 싱글톤 패턴에 대해 더 자세히 알게되었습니다.
<!-- 
## 5. 설치 및 실행 방법
로컬 환경 설정
저장소 클론
```js
git clone https://github.com/username/my-project.git
cd my-project
```
필수 환경 설정
프로젝트 루트에 .env 파일을 생성하고, 다음과 같이 환경 변수를 설정하세요:

plaintext
코드 복사
DB_HOST=localhost
DB_USER=root
DB_PASS=password
REDIS_HOST=localhost
MySQL DB 설정
my_project.sql 파일을 통해 데이터베이스 및 테이블을 생성합니다.

의존성 설치
클라이언트:
```js
cd client
npm install
npm start
```
서버:
```js
cd server
npm install
npm node app
``` -->