#!/bin/bash

docker stop ftv-frontend-1.0
docker rm ftv-frontend-1.0

docker run -d \
-p 3307:3000 \
--name ftv-frontend-1.0 \
serrat/ftv-frontend-1.0

