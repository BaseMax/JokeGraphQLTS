FROM node:18-alpine3.18 AS builder

WORKDIR /app 

COPY package*.json /app/
COPY prisma /app/

RUN npm install

COPY . .

RUN npm run build

RUN npm ci --omit=dev && npm cache clean

FROM node:18-alpine3.18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/primsa ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main"]
