@Library('lisk-jenkins') _

def npm_ci() {
  // work around issue with npm 6 and react native
  // https://github.com/EdgeApp/edge-react-gui/issues/271
  nvm('8.9.3') {
    // ci did not exist in npm 5.5.1
    sh '''
    npm install
    git checkout package-lock.json
    '''
  }
  nvm(getNodejsVersion()) {
    sh '''
    npm ci
    npm run link
    '''
  }
}

pipeline {
  agent none
  stages {
    stage('Parallel wrapper') {
      failFast true
      parallel {
        stage('Linux') {
          agent { label 'lisk-mobile' }
          stages {
            stage('Build dependencies') {
              steps {
                npm_ci()
              }
            }
            stage('Run ESLint') {
              steps {
                nvm(getNodejsVersion()) {
                  sh 'npm run test:format'
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
                } catch(err) {
                  println "Could not report coverage statistics:\n${err}"
                }
              }
            }
          }
        }
        stage('Darwin') {
          agent { label 'darwin' }
          stages {
            stage('Build dependencies') {
              steps {
                sh '''
                if stat /Library/Fonts/BasierCircle-* > /dev/null ; then
                  cp /Library/Fonts/BasierCircle-* src/assets/fonts/basierCircle/
                fi
                if stat /Library/Fonts/Gilroy-* > /dev/null ; then
                  cp /Library/Fonts/Gilroy-* src/assets/fonts/gilroy/
                fi
                '''
                npm_ci()
              }
            }
            stage('Build e2e tests') {
              steps {
                nvm(getNodejsVersion()) {
                  sh 'npm run test:build-e2e-release'
                }
              }
            }
            stage('Run e2e tests') {
              options { timeout(time: 10, unit: 'MINUTES') }
              steps {
                nvm(getNodejsVersion()) {
                  sh 'PATH=/usr/local/bin:$PATH npm run test:e2e-release'
                }
              }
            }
          }
        }
      }
    }
  }
  post {
    fixed {
      script {
        build_info = getBuildInfo()
        liskSlackSend('good', "Recovery: build ${build_info} was successful.")
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
// vim: filetype=groovy
