/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
@Library('lisk-jenkins') _
pipeline {
  agent { node { label 'lisk-mobile' } }
  stages {
    stage ('Build Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage ('Run Eslint') {
      steps {
        sh 'npm run test:format'
      }
    }
    stage ('Run Unit Tests') {
      steps {
        sh '''
        npm run test:react-native
        '''
      }
    }
  }
  post {
    success {
      script {
        if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
          previous_build = currentBuild.getPreviousBuild()
          if (previous_build != null && previous_build.result == 'FAILURE') {
            build_info = getBuildInfo()
            liskSlackSend('good', "Recovery: build ${build_info} was successful.")
          }
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
