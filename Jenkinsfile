pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/envydiace/hello-nodejs.git'
            }
        }
        stage('Build') {
            steps {
                withDockerRegistry(credentialsId: '5fb122d7-bc66-4942-bfc2-405f66502464', url: 'https://hub.docker.com/') {
                    sh 'docker build -t envydiace/test-jenkins:v1.0.0 .'
                    sh 'docker push envydiace/test-jenkins:v1.0.0 .'
                }
            }
        }
    }
}