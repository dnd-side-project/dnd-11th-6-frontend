# 빌드 스테이지
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

# package.json만 먼저 복사
COPY package.json ./

# pnpm-lock.yaml 파일이 있으면 복사, 없으면 무시
COPY pnpm-lock.yaml* ./

# pnpm-lock.yaml 파일이 있으면 --frozen-lockfile 사용, 없으면 일반 설치
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else pnpm install; fi

COPY . .
RUN pnpm build

# 프로덕션 스테이지
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]