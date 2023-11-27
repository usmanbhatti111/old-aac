#!/usr/bin/env groovy

def deployImg(){

          
            sshagent(['AAC-BE']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@18.132.234.175 '
                  cd AAC-BE
                  npm i
                  git pull origin dev
                  docker compose -f docker-compose2.yml up -d --build loyalty-program
                '
              """
            }
    

}
return this