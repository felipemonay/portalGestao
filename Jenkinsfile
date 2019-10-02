#!groovy

pipeline{
	agent none
	stages{
		stage('Des'){
			when{
				branch 'dev'
			}
			agent {node{label 'DES'}}
			steps{
				checkout scm					
				sh "npm install"
				sh "ng build --build-optimizer --aot --output-hashing=all --extract-css=true"
				sh "cp -R /opt/jenkins/workspace/gestao.rededecisao.com_dev/dist/* /var/www/des.gestao.rededecisao.com/dist"
			}		
		}
		stage('Hom'){
			when{
				branch 'hom'
			}
			agent{node{label 'hom.rededecisao.com'}}
			steps{
				checkout scm
				sh "npm install"
				sh "ng build --configuration=homologacao --build-optimizer --aot --output-hashing=all --extract-css=true"
				sh "cp -R /opt/jenkins/workspace/gestao.rededecisao.com_hom/dist/* /var/www/hom.gestao.rededecisao.com/dist"	
			}
		}
		stage('Prod'){
			when{
				branch 'master'
			}
			agent{node{label 'gestao.rededecisao.com'}}
			steps{
				checkout scm
				sh "npm install"
				sh "ng build --prod --build-optimizer --aot --output-hashing=all --extract-css=true"
				sh "cp -R /opt/jenkins/workspace/gestao.rededecisao.com_master/dist/* /var/www/html/dist/"		
			}
		}
	}
}