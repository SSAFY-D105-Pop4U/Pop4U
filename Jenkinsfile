pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
        EC2_HOST = "i12d105.p.ssafy.io"
        WORKSPACE_PATH = "/var/jenkins_home/workspace/S12P11D105"
    }

    stage('application.yml download') {
        steps {
            withCredentials([file(credentialsId: 'application.yml', variable: 'dbConfigFile')]) {
                script {
                    sh 'cp $dbConfigFile backend/pop4u/src/main/resources/application.yml'
                }
            }
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def deployBranch = ""
                    
                    if (env.GIT_BRANCH == 'origin/back_develop' || env.GIT_BRANCH.contains('origin/feat/BE/')) {
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
            echo 'Pipeline Successful'
        }
        failure {
            echo 'Pipeline Failed'
        }
    }
}