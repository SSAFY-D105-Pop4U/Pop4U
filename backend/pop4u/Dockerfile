# Java 23 버전
FROM eclipse-temurin:23-jdk-alpine

ENV JAVA_HOME /opt/java/openjdk
ENV PATH $PATH:$JAVA_HOME/bin
# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 설정
ENV JAVA_HOME=/opt/java/openjdk
ENV PATH $PATH:$JAVA_HOME/bin

# Gradle 빌드 파일 복사
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# 소스 코드 복사
COPY src ./src

# Gradle 빌드
RUN chmod +x gradlew
RUN ./gradlew build -x test

# JAR 파일을 실행
ENTRYPOINT ["java", "-jar", "/app/build/libs/pop4u-0.0.1-SNAPSHOT.jar"]