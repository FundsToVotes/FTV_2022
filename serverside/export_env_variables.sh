#!/bin/bash
while read -r line
do
	export $line
done < $ENV_LOCATION