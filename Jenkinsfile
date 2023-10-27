#!/usr/bin/env groovy
def gv
pipeline{
    agent any
    stages{
        stage('Init'){
            steps{
                script{
                    gv=load 'script.groovy'
                }
            }
        }
        
        stage('Deploy_Img'){
            steps{
                script{
                    gv.deployImg()

                }
            }
        }
    }
}
