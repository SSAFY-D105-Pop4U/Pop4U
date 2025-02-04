# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# React 프로젝트 빌드
RUN npm run build

# Production Stage
FROM nginx:alpine

# React 라우팅을 위한 Nginx 설정
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 React 파일들을 Nginx로 복사
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]