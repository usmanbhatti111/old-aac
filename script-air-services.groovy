#!/usr/bin/env groovy

def deployImg(){

          
            sshagent(['AAC-BE']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@18.132.234.175 '
                  cd AAC-BE
                  echo "Before git pull"
                  git pull origin dev
                  echo "After git pull"
                  docker compose -f docker-compose2.yml up -d --build air-services
                  docker system prune -a -f
                '
              """
            }
    

}
return this