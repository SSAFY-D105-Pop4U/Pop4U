# Java 23 버전 사용
FROM eclipse-temurin:23-jdk-jammy

ENV JAVA_HOME /opt/java/openjdk
ENV PATH $PATH:$JAVA_HOME/bin
# 작업 디렉토리 설정
WORKDIR /app

# Gradle 빌드 파일 복사
COPY ./backend/pop4u/build.gradle .
COPY ./backend/pop4u/settings.gradle .

# 소스 코드 복사
COPY ./backend/pop4u/src ./src

# Gradle 빌드
RUN ./gradlew build -x test

# JAR 파일을 실행
ENTRYPOINT ["java", "-jar", "/app/build/libs/pop4u-0.0.1-SNAPSHOT.jar"]