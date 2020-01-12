pipeline {
    parameters {
        string(name: 'DOCKER_IMAGE', defaultValue: "yxyshuai123/blossom-backend")
    }

    environment {          
        DOCKER_IMAGE_WITH_TAG = "${params.DOCKER_IMAGE}:${currentBuild.number}"
    }

    agent {
        label 'docker'
    }

    stages {
        stage('Build and Unit Test') {
            steps {
                echo 'Building and Testing ...'
                sh 'docker build -t ${DOCKER_IMAGE_WITH_TAG} .'
            }
        }
        stage('Publish Docker Image') {
            when {
                branch "master"
            }
            steps {
                echo 'Publishing ...'
                sh 'docker push ${DOCKER_IMAGE_WITH_TAG}'
            }
        }
        stage('Deploy to Test Environment') {
            when {
              branch "master"
            }
            steps {
                echo 'Deploying ...'
                # TODO
            }
        }
        stage('Deploy to Staging Environment') {
            when {
              branch "master"
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                echo 'Deploying ...'
                // TODO
            }
        }
        stage('Deploy to Test Environment') {
            when {
              branch "master"
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                echo 'Deploying ...'
                // TODO
            }
        }
    }
}
