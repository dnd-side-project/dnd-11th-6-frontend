FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json ./

RUN pnpm install --no-lockfile

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]