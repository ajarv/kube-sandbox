
#https://kubernetes.io/docs/reference/kubectl/cheatsheet/#interacting-with-running-pods


kubectl create -f redis-onenode-deployment.yaml
kubectl logs -f POD_NAME


kubectl create -f redis-onenode-service.yaml
kubectl get service



kubectl create -f https://gist.githubusercontent.com/ajarv/ce9576c00aa1aff456f9d0bcd2e6583e/raw/aa30bba194225a28552468e2ea5c3ab262b5fe71/redis-onenode-controller.yaml

kubectl create -f https://gist.githubusercontent.com/ajarv/af01cafc83934b80556ef382d4d1e7a7/raw/54b82e4f13e6eb014a294785e43e1f25c1fbcab3/go-101-app-controller.yaml


kubectl get pod 



kubectl create -f  d0.yaml
kubectl describe deployment go-app

