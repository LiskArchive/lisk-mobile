@Library('lisk-jenkins') _
pipeline {
  agent { node { label 'lisk-mobile' } }
  stages {
    stage ('Build dependencies') {
      steps {
        script{
          nvm(getNodejsVersion()) {
            sh 'npm ci'
          }
        }
      }
    }
    stage ('Run ESLint') {
      steps {
        nvm(getNodejsVersion()) {
          sh 'npm run test:format'
        }
      }
    }
    stage ('Run unit tests') {
      steps {
        nvm(getNodejsVersion()) {
          sh 'npm run test'
        }
      }
    }
  }
  post {
    success {
      script {
        previous_build = currentBuild.getPreviousBuild()
        if (previous_build != null && previous_build.result == 'FAILURE') {
          build_info = getBuildInfo()
          liskSlackSend('good', "Recovery: build ${build_info} was successful.")
        }
      }
    }
    failure {
      script {
        build_info = getBuildInfo()
        liskSlackSend('danger', "Build ${build_info} failed (<${env.BUILD_URL}/console|console>, <${env.BUILD_URL}/changes|changes>)\n")
      }
    }
  }
}
