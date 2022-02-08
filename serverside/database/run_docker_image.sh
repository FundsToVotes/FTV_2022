#!/bin/bash

docker stop mysqldb-1.0

export ENV_LOCATION="../.env"
source ../export_env_variables.sh

docker run -d \
-p 3309:3306 \
--name mysqldb-1.0 \
-e MYSQL_DATABASE=$MYSQL_DATABASE \
-e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
serrat/ftv-mysql-1.0

