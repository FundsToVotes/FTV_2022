while read -r line
do
	export $line
	echo $line
done < $ENV_LOCATION