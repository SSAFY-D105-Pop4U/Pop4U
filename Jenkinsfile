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
                            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                                cd /home/ubuntu/S12P11D105
                                git pull origin ${env.BRANCH_NAME.replace('origin/', '')}
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