#!/bin/bash

docker stop ftv-backend-1.0

docker run -d \
-p 3308:3005 \
--name ftv-backend-1.0 \
serrat/ftv-backend-1.0

