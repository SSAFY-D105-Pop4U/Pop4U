pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
        EC2_HOST = "i12d105.p.ssafy.io"
        WORKSPACE_PATH = "/var/jenkins_home/workspace/S12P11D105"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('credentials download') {
            when {
                expression { env.GIT_BRANCH == 'origin/back_develop' }
            }

        stage('application.yml download') {
            steps {
                withCredentials([file(credentialsId: 'application-yml', variable: 'dbConfigFile')]) {
                    script {
                        sh 'cp -f $dbConfigFile backend/pop4u/src/main/resources/application.yml'
                    }
                }
                withCredentials([file(credentialsId: '.env', variable: 'envFile')]) {
                    script {
                        // 각 디렉토리에 .env 파일 복사
                        sh "cp -f $envFile backend/pop4u/.env"
                        sh "cp -f $envFile ai-server/life-four-cuts/.env"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def deployBranch = ""

                    if (env.GIT_BRANCH == 'origin/back_develop') {
                        deployBranch = 'backend'
                        containerName = 'spring-backend'

                    } else if (env.GIT_BRANCH == 'origin/front_develop') {
                        deployBranch = 'frontend'
                        containerName = 'react-frontend'
                    }

                    // 디버깅
                    echo "Current branch: ${env.GIT_BRANCH}"
                    echo "Deploy branch: ${deployBranch}"
                    echo "Current workspace: ${WORKSPACE}"

                    if (deployBranch == 'frontend') {
                        sshagent(['ec2-ssh-key']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    rm -rf ${deployBranch} || true
                                '
                                scp -o StrictHostKeyChecking=no -r ${WORKSPACE}/frontend ${WORKSPACE}/docker-compose.yml ubuntu@\${EC2_HOST}:~/
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    docker-compose stop ${deployBranch} || true
                                    docker rm -f ${containerName} || true
                                    docker-compose build --no-cache ${deployBranch}
                                    docker-compose up -d --build ${deployBranch}
                                '
                            """
                        }
                    } else if (deployBranch == 'backend') {
                    
                    if (deployBranch) {
                        sshagent(['ec2-ssh-key']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    rm -rf ${deployBranch} || true
                                '
                                scp -o StrictHostKeyChecking=no -r ${WORKSPACE}/* ubuntu@\${EC2_HOST}:~/
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    docker-compose stop ${deployBranch} fastapi || true
                                    docker rm -f ${containerName} life-four-cuts || true
                                    docker-compose build --no-cache ${deployBranch} fastapi
                                    docker-compose up -d --build ${deployBranch} fastapi
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
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good',
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name}), ${env.GIT_BRANCH}\n(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/ciw46xyw1td98yepnryh9yagjc',
                channel: 'd105-ci-cd-alert'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger',
                message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name}), ${deployBranch}\n(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/ciw46xyw1td98yepnryh9yagjc',
                channel: 'd105-ci-cd-alert'
                )
            }
        }
    }
}
