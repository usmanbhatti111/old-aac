#!/usr/bin/env groovy
def gv
properties([
    parameters([
        choice(
            name: 'MICROSERVICE',
            choices: ['Air-Services', 'Common-Feature', 'Cron', 'Gateway', 'Loyalty-Program', 'Marketing', 'Operations', 'Org-Admin', 'Sales', 'Super-Admin', 'User-Account'],
            description: '***Choose the microservice which you want to run***'
        )
    ])
])

pipeline{
    agent any
    environment{
        VERSION="1.1.1"

    }
    stages{
        stage('Initialization'){
            steps{
                script{
                    switch(params.MICROSERVICE){
                        case 'Air-Services':
                            gv=load 'script-air-services.groovy'
                            break
                        case 'Common-Feature':
                            gv=load 'script-common-feature.groovy'
                            break
                        case 'Cron':
                            gv=load 'script-cron.groovy'
                            break
                        case 'Gateway':
                            gv=load 'script-gateway.groovy'
                            break
                        case 'Loyalty-Program':
                            gv=load 'script-loyalty-program.groovy'
                            break
                        case 'Marketing':
                            gv=load 'script-marketing.groovy'
                            break
                        case 'Operations':
                            gv=load 'script-operations.groovy'
                            break
                        case 'Org-Admin':
                            gv=load 'script-org-admin.groovy'
                            break
                        case 'Sales':
                            gv=load 'script-sales.groovy'
                            break
                        case 'Super-Admin':
                            gv=load 'script-super-admin.groovy'
                            break
                        case 'User-Account':
                            gv=load 'script-user-account.groovy'
                            break
                        default:
                           error "Invalid Microservice Choice!"
                    }
                }
            }
        }
        stage('Deploying Image'){
            steps{
                script{
                    gv.deployImg()
                }
            }
        }
    }
}