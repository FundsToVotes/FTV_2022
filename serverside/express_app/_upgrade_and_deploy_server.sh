# build, push and deploy a database image to digital ocean
source _build_docker_image.sh
docker push serrat/ftv-backend-1.0
# I want to pull the newest image we made and then run it with my script.
ssh root@143.244.184.161 'cd serverside; docker pull serrat/ftv-backend-1.0; bash -s' < _run_docker_image.sh