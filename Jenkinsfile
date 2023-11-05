pipeline {
    agent any

    stages {
        stage ('Build Image') {
            steps {
                script {
                    dockerapp = docker.build("myousufhere/web-app:${env.BUILD_ID}", "-f ./app/Dockerfile ./src")
                }
            }
        }

        stage ('Push Image') {
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", "myousufhere") {
                        dockerapp.push("lastest")
                        dockerapp.push("${env.BUILD_ID}")
                    }
                
                }
            }
        }

        stage ('Deploy to Kubernetes') {
            environment {
                tag_version = "${env.BUILD_ID}"
            }
            steps {                
                withAWS(credentials: 'jenkins-credential', region: 'us-east-1') {
                    sh 'aws eks update-kubeconfig --name eks-test'
                    sh 'sed -i "s/{{tag}}/$tag_version/g" ./k8s/deployment.yaml'
                    sh 'kubectl apply -f ./k8s/deployment.yaml'
                }

            }
        }
    }
}