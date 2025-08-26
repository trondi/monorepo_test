# Turborepo 모노레포 프로젝트

이 프로젝트는 Turborepo를 사용한 모노레포 구조로, 여러 애플리케이션과 공통 패키지를 효율적으로 관리합니다.

## 프로젝트 구조

```
monorepo/
├── apps/
│   ├── web/          # 메인 웹 애플리케이션 (포트 3000)
│   └── admin/        # 관리자 대시보드 (포트 3001)
├── packages/
│   ├── ui/           # 공통 UI 컴포넌트
│   ├── shared/       # 공통 유틸리티, 타입
│   └── tsconfig/     # 공통 TypeScript 설정
├── turbo.json        # Turborepo 설정
└── package.json      # 루트 package.json
```

## 주요 특징

- **별도 URL 배포**: 각 앱이 독립적인 Docker 컨테이너로 배포되어 다른 URL에서 실행
- **폐쇄망 지원**: 
  - `npm ci --prefer-offline` 사용
  - Docker 멀티스테이지 빌드로 최적화
  - Next.js standalone 모드로 자체 포함된 빌드
- **GitHub Actions CI/CD**: 변경된 앱만 선택적으로 배포
- **공통 패키지 공유**: UI 컴포넌트와 유틸리티를 여러 앱에서 재사용

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
# 모든 앱 동시 실행
npm run dev

# 특정 앱만 실행
npm run dev --filter=web
npm run dev --filter=admin
```

### 3. 빌드

```bash
# 모든 앱 빌드
npm run build

# 특정 앱만 빌드
npm run build --filter=web
npm run build --filter=admin
```

## 사용 가능한 스크립트

- `npm run dev` - 모든 앱의 개발 서버 실행
- `npm run build` - 모든 앱 빌드
- `npm run lint` - 모든 패키지 린팅
- `npm run type-check` - 모든 패키지 타입 검사
- `npm run clean` - 빌드 캐시 정리

## 앱별 접근

- **웹 앱**: http://localhost:3000
- **관리자 앱**: http://localhost:3001

## Docker 배포

각 앱은 독립적인 Docker 컨테이너로 빌드됩니다:

```bash
# 웹 앱 Docker 빌드
docker build -f apps/web/Dockerfile -t web-app .

# 관리자 앱 Docker 빌드
docker build -f apps/admin/Dockerfile -t admin-app .
```

## CI/CD

GitHub Actions를 통해 자동화된 CI/CD가 설정되어 있습니다:

- **CI**: 코드 변경 시 빌드, 린팅, 타입 검사
- **Deploy**: 변경된 앱만 선택적으로 Docker 이미지 빌드 및 배포

## 패키지 구조

### @repo/ui
공통 UI 컴포넌트 패키지
- Button
- Card

### @repo/shared
공통 유틸리티 및 타입 패키지
- 유틸리티 함수 (날짜 포맷, 통화 포맷 등)
- 공통 타입 정의

### @repo/tsconfig
공통 TypeScript 설정 패키지
- base.json: 기본 TypeScript 설정
- nextjs.json: Next.js 앱용 설정