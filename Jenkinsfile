pipeline {
    agent any

    environment {
        EC2_HOST = "i12d105.p.ssafy.io"
        WORKSPACE_PATH = "/var/jenkins_home/workspace/S12P11D105"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Copy Configuration Files') {
            when {
                expression { env.GIT_BRANCH == 'origin/back_develop' }
            }
            steps {
                script {
                    // application.yml 복사
                    withCredentials([file(credentialsId: 'application-yml', variable: 'dbConfigFile')]) {
                        sh 'cp -f $dbConfigFile backend/pop4u/src/main/resources/application.yml'
                    }

                    // .env 파일 복사
                    withCredentials([file(credentialsId: '.env', variable: 'envFile')]) {
                        sh "cp $envFile ${WORKSPACE}/.env"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (env.GIT_BRANCH == 'origin/back_develop') {
                        // Backend 및 FastAPI 배포
                        sshagent(['ec2-ssh-key']) {
                            sh """
                                # 기존 서비스 중지 및 컨테이너 제거
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    docker-compose stop backend fastapi || true
                                    docker rm -f spring-backend life-four-cuts || true
                                '

                                # 파일 전송
                                scp -o StrictHostKeyChecking=no -r ${WORKSPACE}/* ubuntu@\${EC2_HOST}:~/

                                # 서비스 재시작
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    docker-compose build --no-cache backend fastapi
                                    docker-compose up -d backend fastapi

                                    # 로그 확인
                                    sleep 10
                                    docker logs life-four-cuts
                                '
                            """
                        }
                    } else if (env.GIT_BRANCH == 'origin/front_develop') {
                        // Frontend 배포
                        sshagent(['ec2-ssh-key']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    docker-compose stop frontend || true
                                    docker rm -f react-frontend || true
                                '
                                scp -o StrictHostKeyChecking=no -r ${WORKSPACE}/frontend ${WORKSPACE}/docker-compose.yml ubuntu@\${EC2_HOST}:~/
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    docker-compose build --no-cache frontend
                                    docker-compose up -d frontend
                                '
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Name = Author_ID.substring(1)
                mattermostSend (
                    color: 'good',
                    message: "${env.JOB_NAME}의 Jenkins ${env.BUILD_NUMBER}번째 빌드:\n${Name}카이가 ${env.GIT_BRANCH}에서 빌드를 성공했습니다!\n(<${env.BUILD_URL}|상세 보기>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/ciw46xyw1td98yepnryh9yagjc',
                    channel: 'd105-ci-cd-alert'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Name = Author_ID.substring(1)
                mattermostSend (
                    color: 'danger',
                    message: "${env.JOB_NAME}의 Jenkins ${env.BUILD_NUMBER}번째 빌드:\n${Name}카이가 ${env.GIT_BRANCH}에서 빌드를 실패했습니다...\n(<${env.BUILD_URL}|상세 보기>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/ciw46xyw1td98yepnryh9yagjc',
                    channel: 'd105-ci-cd-alert'
                )
            }
        }
    }
}