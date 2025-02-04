pipeline {
   agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH.split('/')[-1]}"
    }

   stages {
       stage('Check Branch') {
           steps {
               script {
                   env.BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
               }
           }
       }

       stage('Backend Build') {
           when {
               expression { env.BRANCH_NAME == 'back_develop' || 
                            env.GIT_BRANCH.contains('feat/BE/Infra')
           }
           steps {
               dir('backend/pop4u') {
                   sh 'chmod +x gradlew'
                   sh './gradlew clean build'
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
                   if (env.BRANCH_NAME == 'back_develop') {
                       sshagent(['ec2-ssh-key']) {
                           sh """
                               ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                                   cd /home/ubuntu/S12P11D105
                                   git pull origin back_develop
                                   docker-compose up -d --build backend
                               '
                           """
                       }
                   } else if (env.BRANCH_NAME == 'front_develop') {
                       sshagent(['ec2-ssh-key']) {
                           sh """
                               ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                                   cd /home/ubuntu/S12P11D105
                                   git pull origin front_develop
                                   docker-compose up -d --build frontend
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