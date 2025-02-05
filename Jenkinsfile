pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
        EC2_HOST = "i12d105.p.ssafy.io"
        WORKSPACE_PATH = "/var/jenkins_home/workspace/S12P11D105"
    }

    stages {
        stage('Deploy') {
            steps {
                script {
                    def deployBranch = ""
                    // GIT_BRANCH 변수만 일관되게 사용
                    if (env.GIT_BRANCH == 'origin/back_develop' || env.GIT_BRANCH.contains('origin/feat/BE/')) {
                        deployBranch = 'backend'
                    } else if (env.GIT_BRANCH == 'origin/front_develop') {
                        deployBranch = 'frontend'
                    }

                    // 디버깅
                    echo "Current branch: ${env.GIT_BRANCH}"
                    echo "Deploy branch: ${deployBranch}"
                    echo "Current workspace: ${WORKSPACE}"
                    
                    if (deployBranch) {
                        sshagent(['ec2-ssh-key']) {
                            sh """
                                scp -o StrictHostKeyChecking=no -r ${WORKSPACE}/* ubuntu@\${EC2_HOST}:~/
                            """
                            sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                                    docker-compose stop ${deployBranch} || true &&
                                    docker-compose rm -f ${deployBranch} || true &&
                                    docker-compose build --no-cache ${deployBranch} &&
                                    docker-compose up -d --no-deps --build ${deployBranch}
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