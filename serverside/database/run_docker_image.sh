#!/bin/bash

docker stop mysqldb

export ENV_LOCATION="../.env"
source ../export_env_variables.sh

docker run -d \
-p 3308:3306 \
--name mysqldb \
-e MYSQL_DATABASE=$MYSQL_DATABASE \
-e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
serrat/ftv-mysql

