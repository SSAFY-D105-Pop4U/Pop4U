pipeline {
    agent any
    
    environment {
        MYSQL_ROOT_PASSWORD = credentials('MYSQL_ROOT_PASSWORD')
        MYSQL_DATABASE = credentials('MYSQL_DATABASE')
        MYSQL_USER = credentials('MYSQL_USER')
        MYSQL_PASSWORD = credentials('MYSQL_PASSWORD')
        MONGO_INITDB_ROOT_USERNAME = credentials('MONGO_INITDB_ROOT_USERNAME')
        MONGO_INITDB_ROOT_PASSWORD = credentials('MONGO_INITDB_ROOT_PASSWORD')
        MONGO_INITDB_DATABASE = credentials('MONGO_INITDB_DATABASE')
        SPRING_PROFILES_ACTIVE = credentials('SPRING_PROFILES_ACTIVE')
    }

    stages {
        stage('Deploy') {
            steps {
                script {
                    def deployBranch = ""
                    def containerName = ""
                    
                    if (env.GIT_BRANCH == 'origin/back_develop' || env.GIT_BRANCH.contains('origin/feat/BE/')) {
                        deployBranch = 'backend'
                        containerName = 'spring-backend'
                    } else if (env.GIT_BRANCH == 'origin/front_develop') {
                        deployBranch = 'frontend'
                        containerName = 'react-frontend'
                    }
                    
                    if (deployBranch) {
                        sshagent(['ec2-ssh-key']) {
                            // .env 파일 생성
                            sh """
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cat > .env << EOL
                                    MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
                                    MYSQL_DATABASE=${MYSQL_DATABASE}
                                    MYSQL_USER=${MYSQL_USER}
                                    MYSQL_PASSWORD=${MYSQL_PASSWORD}
                                    MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
                                    MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
                                    MONGO_INITDB_DATABASE=${MONGO_INITDB_DATABASE}
                                    SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
                                    EOL
                                '
                            """
                            sh """
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    rm -rf *
                                '
                                scp -o StrictHostKeyChecking=no -r ${WORKSPACE}/* ubuntu@\${EC2_HOST}:~/
                                ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_HOST} '
                                    cd ~
                                    docker-compose down
                                    docker rm -f ${containerName} || true
                                    docker-compose build --no-cache ${deployBranch}
                                    docker-compose up -d --no-deps --build ${deployBranch}
                                '
                            """
                        }
                    }
                }
            }
        }
    }
}