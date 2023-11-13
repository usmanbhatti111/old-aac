#!/usr/bin/env groovy

def deployImg(){

          withCredentials([
            usernamePassword(credentialsId: '430389491185_codecommit', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')
          ]) {
            sshagent(['AAC-BE']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@18.132.234.175 '
                  git config --global credential.helper "store --file=/home/ubuntu/.git-credentials"
                  echo -e "https://$USERNAME:$PASSWORD@git-codecommit.eu-west-2.amazonaws.com/v1/repos/AAC-BE" > /home/ubuntu/.git-credentials
                  cd AAC-BE
                  git pull origin dev
                  docker compose -f docker-compose2.yml up -d --build air-services
                  docker system prune -a -f
                '
              """
            }
          }

}
return this