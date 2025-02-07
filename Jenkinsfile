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
                    
                    if (deployBranch) {
                        sshagent(['ec2-ssh-key']) {
                        sh """
                            scp -o StrictHostKeyChecking=no -r ${WORKSPACE_PATH}/* ubuntu@\${EC2_HOST}:~/
                            ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                cd ~
                                docker-compose down
                                docker-compose up -d --build
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