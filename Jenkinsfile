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

        stage('application.yml download') {
            steps {
                withCredentials([file(credentialsId: 'application-yml', variable: 'dbConfigFile')]) {
                    script {
                        sh 'cp -f $dbConfigFile backend/pop4u/src/main/resources/application.yml'
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
                                    docker-compose stop ${deployBranch} || true
                                    docker rm -f ${containerName} || true
                                    docker-compose build --no-cache ${deployBranch}
                                    docker-compose up -d --build ${deployBranch}
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
                message: "Jenkins ${env.BUILD_NUMBER}번째 빌드:\n${env.JOB_NAME}의 ${Author_ID}(${Author_Name})님께서 ${env.GIT_BRANCH}에서 빌드 성공했습니다. \n(<${env.BUILD_URL}|상세 보기>)",
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
                message: "Jenkins ${env.BUILD_NUMBER}번째 빌드:\n${env.JOB_NAME}의 ${Author_Name}(${Author_ID})님께서 ${env.GIT_BRANCH}에서 빌드 실패했습니다. \n(<${env.BUILD_URL}|상세 보기>)",
                endpoint: 'https://meeting.ssafy.com/hooks/ciw46xyw1td98yepnryh9yagjc',
                channel: 'd105-ci-cd-alert'
                )
            }
        }
    }
}