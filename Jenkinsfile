@Library('lisk-jenkins') _
pipeline {
  agent { node { label 'darwin' } }
  stages {
    stage('Build dependencies') {
      steps {
        script {
          nvm(getNodejsVersion()) {
            sh '''
            echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile
            source ~/.bash_profile
            npm uninstall mobile-protect  --legacy-peer-deps
            npm install --legacy-peer-deps && npm run link
            export LANG=en_US.UTF-8 && export GEM_HOME=$HOME/.gem && export PATH=$GEM_HOME/bin:$PATH
            gem install cocoapods --user-install && npx pod-install
            '''
          }
        }
      }
    }
    stage('Create Detox build and run end to end tests') {
        steps {
          script {
            nvm(getNodejsVersion()) {
              sh '''
              cp env.test.json env.json
              npx react-native start &
              
              npx detox build --configuration ios.debug
              npx detox test --configuration ios.debug --cleanup --headless --record-logs all
              kill -9 %1
              '''
            }
          }
        }
      }
    stage('Run ESLint') {
      steps {
        nvm(getNodejsVersion()) {
          sh 'npm run lint'
        }
      }
    }
    stage('Run unit tests') {
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
        } catch (err) {
          println "Could not report coverage statistics:\n${err}"
        }
      }
    }
  }
}
