pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "pavvi25"
        IMAGE_NAME = "calculator-app"
        TAG = "latest"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$TAG .'
            }
        }


        stage('Deploy Container') {
            steps {
                sh '''
                docker stop calc || true
                docker rm calc || true
                docker run -d -p 3000:3000 --name calc $DOCKERHUB_USER/$IMAGE_NAME:$TAG
                '''
            }
        }
    }

    post {
        success {
            echo 'Calculator App Deployed Successfully 🚀'
        }
        failure {
            echo 'Pipeline Failed ❌'
        }
    }
}
