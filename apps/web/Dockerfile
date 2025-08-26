# 멀티 스테이지 빌드로 폐쇄망 환경 최적화
FROM node:18-alpine AS base

# 의존성만 설치하는 단계
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 루트와 앱의 package.json 복사
COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/*/

# 의존성 설치 (폐쇄망을 위한 오프라인 모드)
RUN npm install --prefer-offline --no-audit

# 빌더 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Turbo를 사용하여 웹 앱만 빌드
RUN npm run build --filter=web

# 런타임 단계
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./public

# 빌드된 앱 복사
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/web/server.js"]
