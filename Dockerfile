FROM node:18-alpine AS deps
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:18-alpine AS builder
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:18-alpine AS runner
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY package.json pnpm-lock.yaml ./

CMD ["pnpm", "start"]