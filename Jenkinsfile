@Library('lisk-jenkins') _
pipeline {
  agent { node { label 'lisk-mobile' } }
  stages {
    stage ('Build dependencies') {
      steps {
        script{
          nvm(getNodejsVersion()) {
            sh '''
            npm ci
            npm run link
            '''
          }
        }
      }
    }
    stage ('Run ESLint') {
      steps {
        nvm(getNodejsVersion()) {
          sh 'npm run lint'
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
    always {
      junit 'coverage/jest/junit.xml'

      cobertura autoUpdateHealth: false,
        autoUpdateStability: false,
        coberturaReportFile: 'coverage/jest/cobertura-coverage.xml',
        conditionalCoverageTargets: '80, 0, 0',
        failUnhealthy: false,
        failUnstable: false,
        fileCoverageTargets: '80, 0, 0',
        lineCoverageTargets: '80, 0, 0',
        maxNumberOfBuilds: 0,
        methodCoverageTargets: '80, 0, 0',
        onlyStable: false,
        sourceEncoding: 'ASCII'

      script {
        try {
          nvm(getNodejsVersion()) {
            withCredentials([string(credentialsId: 'lisk-mobile-coveralls-token', variable: 'COVERALLS_REPO_TOKEN')]) {
              sh 'cat coverage/jest/lcov.info |./node_modules/.bin/coveralls'
            }
          }
        } catch(err) {
          println "Could not report coverage statistics:\n${err}"
        }
      }
    }
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
