#!/bin/bash

docker stop ftv-backend-1.0
docker rm ftv-backend-1.0

docker run -d \
-p 3308:3000 \
--network todo-app --network-alias express \
--name ftv-backend-1.0 \
serrat/ftv-backend-1.0

