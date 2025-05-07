pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '--- Start Checkout Stage ---'
                checkout scm
                echo '--- Finish Checkout Stage ---'
            }
        }
        stage('Info') {
            steps {
                echo '--- Start Info Stage ---'
                echo "Git Commit: ${GIT_COMMIT}"
                echo "Git Tag: ${PAYLOAD_TAGNAME}"
                echo "Trigger Event : ${x_github_event}"
                echo "Trigger Action : ${PAYLOAD_ACTION}"
                echo '--- Finish Info Stage ---'
            }
        }
        stage('Check Trigger Event') {
            when {
                not {
                    anyOf {
                        allOf {
                            environment name: 'x_github_event', value: 'release'
                            environment name: 'PAYLOAD_ACTION', value: 'released'
                        }
                        allOf {
                            environment name: 'x_github_event', value: 'release'
                            environment name: 'PAYLOAD_ACTION', value: 'created'
                        }
                        allOf {
                            environment name: 'x_github_event', value: 'release'
                            environment name: 'PAYLOAD_ACTION', value: 'published'
                        }
                    }
                }
            }
            steps {
                script {
                    currentBuild.result = 'ABORTED'
                    error("Aborting Build Process")
                }
            }
        }
        stage('Build') {
            environment {
                IMAGE_NAME = "demo_netflix_nextjs"
            }
            steps {
                    echo '--- Start Build Stage ---'
                    echo "IMAGE_NAME : ${IMAGE_NAME}"
                    echo "PAYLOAD_TAGNAME : ${PAYLOAD_TAGNAME}"
                    sh '''
                        BUILD_ARGS=$(awk '{ sub ("\\\\$", " "); printf " --build-arg %s", $0  } END { print ""  }' /var/jenkins_envfile/.env.demo-netflix-nextjs)
                        echo "Build Args: RUN"
                        docker build -t ${IMAGE_NAME}:${PAYLOAD_TAGNAME} --platform linux/amd64 ${BUILD_ARGS} --no-cache .
                    '''
                    echo '--- Finish Build Stage ---'
            }
        }
        stage('Deploy') {
             environment {
                SERVER_USERNAME = "root"
                SERVER_PORT = "2233"
                SERVER_IPADDRESS = "46.250.230.7"
                SSH_SCRIPT = """
                    cd project && \
                    sudo IMAGE_TAG=${PAYLOAD_TAGNAME} docker compose -f docker-compose.demo_netflix.yaml -f docker-compose.main.yaml up -d demo_netflix_nextjs nginx
                """
            }
            steps {
                echo '--- Start Deploy Stage ---'
                sshagent(credentials:['SSH-WAREEASY']){
                    sh "ssh -o StrictHostKeyChecking=no ${SERVER_USERNAME}@${SERVER_IPADDRESS} -p ${SERVER_PORT} '${SSH_SCRIPT}'"
                }
                echo '--- Finish Deploy Stage ---'
            }
        }
        
    }
    post { 
        always { 
           echo '--- STOP ---'
        }
    }
}