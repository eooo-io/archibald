# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV NODE_ENV=development
EXPOSE 5174
CMD ["npm", "run", "docs:dev", "--", "--host", "--port", "5174"]
