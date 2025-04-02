# 테마 변환 계산기

Next.js로 개발된 인터랙티브 계산기 웹 애플리케이션입니다. 기본적인 계산 기능과 함께 다양한 테마 변환 기능을 제공합니다.

## 주요 기능

### 기본 계산기 기능
- 덧셈, 뺄셈, 곱셈, 나눗셈 등 기본 산술 연산
- 소수점 계산 지원
- 입력값 지우기(DEL) 및 초기화(AC) 기능

### 테마 변환 기능
- 시간대별 자동 테마 변경 (아침/저녁)
- 계산 결과에 따른 테마 변경:
  - 100 이상의 결과: 특별 테마
  - 0 미만의 결과: 다크 테마
  - 그 외: 시간대별 테마
- 수동 테마 전환 버튼

## 기술 스택
- Next.js 15
- React 19
- TypeScript
- CSS Variables 활용한 테마 구현
- React Context API로 상태 관리

## 설치 및 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 모드 실행
npm start
```

## 주의사항
이 프로젝트는 Next.js 13 이상의 App Router 구조를 사용하며, 클라이언트 컴포넌트와 서버 컴포넌트 개념을 적용합니다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
