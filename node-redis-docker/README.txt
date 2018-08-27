Invoke-Item C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe


# https://kubernetes.io/docs/tutorials/hello-minikube/#create-your-node-js-application

& minikube docker-env


# Physical Server
--------------------
cd node-web && npm install && npm start

docker build -t hello-node:v1 node-web




# Native docker run
-----------
docker run --rm -t -p hello-node:v1 


# docker compose run
-----------
docker-compose build
docker-compose up 
docker-compose up -d 

docker-compose down



# Kubernetes run
-----------

# local  registry
---
& minikube docker-env
docker build -t hello-node:v1 node-web

kubectl run hello-node --image=hello-node:v1 --port=8080 --image-pull-policy=Never
kubectl get deployments
kubectl expose deployment hello-node --type=LoadBalancer
minikube service hello-node

kubectl delete service hello-node
kubectl delete deployment hello-node


# shared  registry [docker hub]
---
docker tag hello-node:v1 m7dock/hello-node:v1
docker push m7dock/hello-node:v1 





kubectl run hello-node --image=m7dock/hello-node:v1 --port=8080 
kubectl get deployments
kubectl expose deployment hello-node --type=LoadBalancer
minikube service hello-node




-- update

docker build -t hello-node:v2 node-web
docker tag hello-node:v2 m7dock/hello-node:v2
docker push m7dock/hello-node:v1 


kubectl set image deployment/hello-node hello-node=m7dock/hello-node:v2


