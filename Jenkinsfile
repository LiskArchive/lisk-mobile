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
            npm install -g yarn
            yarn remove mobile-protect
            yarn && yarn run link
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
              # Install jq
              echo "Installing jq..."
              wget -O jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64
              chmod +x ./jq
              sudo mv jq /usr/local/bin
              
              # Run the update_device.sh script
              echo "Running the update_device.sh script..."
              chmod +x ./update_device.sh
              ./update_device.sh

              # Setup and run tests
              cp env.test.json env.json
              npx react-native start &

              # Using a device UDID might not be required after running the script,
              # but if it is, make sure to update this with the correct UDID 
              # after running the update_device.sh script.
              open -a Simulator &

              # The line below should also be adjusted based on the device selected by the script
              /usr/bin/xcrun simctl spawn F084BDF1-55E5-4E4C-B4D6-70AA1DA5D41F log stream --level debug --style compact --predicate 'process == "LiskQA"' &
              
              yarn detox build --configuration ios.debug
              yarn detox test --configuration ios.debug --cleanup --headless --record-logs all
              kill -9 %1
              '''
            }
          }
        }
      }

    stage('Run ESLint') {
      steps {
        nvm(getNodejsVersion()) {
          sh 'yarn run lint'
        }
      }
    }
    stage('Run unit tests') {
      steps {
        nvm(getNodejsVersion()) {
          sh 'yarn run test'
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
