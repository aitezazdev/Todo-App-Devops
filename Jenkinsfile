pipeline {
  agent any

  environment {
    FRONTEND_IMAGE = "mern-frontend:jenkins"
    BACKEND_IMAGE  = "mern-backend:jenkins"
    PORT           = "5000"
    MONGO_URI      = "mongodb://mongo:27017/todoApp"
  }

  stages {
    stage("Checkout Code") {
      steps {
        git url: "https://github.com/aitezazdev/Todo-App-Devops.git", branch: "main"
      }
    }

    stage('Prepare .env')   {
      steps {
        sh """
            mkdir -p backend
            cat > backend/.env <<EOF
            PORT=${PORT}
            MONGO_URI=${MONGO_URI}
            EOF
        """
      }
    }

    stage("Build Docker Images") {
      steps {
        sh '''
          echo "Building backend image ..."
          docker build -t ${BACKEND_IMAGE} ./backend

          echo "Building frontend image ..."
          docker build -t ${FRONTEND_IMAGE} ./frontend --build-arg VITE_API_URL=http://localhost:5000/api
        '''
      }
    }

    stage("Run with docker compose") {
      steps {
        sh '''
          echo "Starting MERN app with docker compose ..."
          docker-compose up -d
          
          echo "Showing running containers"
          docker ps
        '''
      }
    }
  }
}