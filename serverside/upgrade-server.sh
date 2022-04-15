docker pull serrat/ftv-mysql-1.0
docker pull serrat/ftv-backend-1.0

export ENV_LOCATION="/root/serverside/.env"
source ~/serverside/export_env_variables.sh

docker stop mysqldb-1.0
docker rm mysqldb-1.0

docker run -d \
-p 3309:3306 \
--name mysqldb-1.0 \
-e MYSQL_DATABASE=$MYSQL_DATABASE \
-e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
serrat/ftv-mysql-1.0


docker stop ftv-backend-1.0
docker rm ftv-backend-1.0

docker run -d \
-p 3308:3005 \
--name ftv-backend-1.0 \
serrat/ftv-backend-1.0
