pipeline {
  agent any

   environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
    }

  stages {
      stage('Backend Build') {
          when {
              expression { 
                  env.BRANCH_NAME == 'back_develop' || 
                  env.GIT_BRANCH.contains('feat/BE/Infra')
              }
          }
          steps {
              dir('backend/pop4u') {
                  sh """
                   docker run --rm \
                   -v "\$(pwd)":/app \
                   -w /app \
                   eclipse-temurin:23-jdk-jammy \
                   ./gradlew clean build
                   """
              }
          }
      }

      stage('Frontend Build') {
          when {
              expression { env.BRANCH_NAME == 'front_develop' }
          }
          steps {
              dir('frontend') {
                  sh 'npm install'
                  sh 'npm run build'
              }
          }
      }

      stage('Deploy') {
        steps {
            script {
                def deployBranch = env.BRANCH_NAME == 'back_develop' ? 'backend' : 
                                env.BRANCH_NAME == 'front_develop' ? 'frontend' : null
                
                if (deployBranch) {
                    sshagent(['ec2-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                                cd /home/ubuntu/S12P11D105
                                git pull origin ${env.BRANCH_NAME}
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