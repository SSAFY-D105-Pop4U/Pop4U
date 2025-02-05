pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
        EC2_HOST = "i12d105.p.ssafy.io"
    }

    stages {
        stage('Deploy') {
            steps {
                script {
                    def deployBranch = ""
                    if (env.BRANCH_NAME == 'origin/back_develop' || env.GIT_BRANCH.contains('origin/feat/BE/Infra')) {
                        deployBranch = 'backend'
                    } else if (env.BRANCH_NAME == 'origin/front_develop') {
                        deployBranch = 'frontend'
                    }
                    
                    if (deployBranch) {
                        sshagent(['ec2-ssh-key']) {
                            sh """
                            docker-compose -f docker-compose.yml stop backend || true
                            docker-compose -f docker-compose.yml rm -f backend || true
                                                        """
                            sh """
                            docker-compose -f docker-compose.yml build --no-cache backend
                            docker-compose -f docker-compose.yml up -d --no-deps --build backend
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