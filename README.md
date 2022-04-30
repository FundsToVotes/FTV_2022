# Funds To Votes 2022
This repository will contain both front end and serverside code for the continuation of the Funds To Votes project made by the UW iSchool capstone team Water Coolers. This README is still under construction as we continue to develop and create our project.

## Purpose

This is the second version of Funds to Vote project. We are expanding on the work done by the previous team to modernize the old codebase while at the same time adding a new feature: the congressperson comparison tool.

## Lifecycle

Development will end June 1st. After this date we will no longer be updating the website.

## Current Infrastructure

Currently, we are hosting everything on Digital Ocean. We have three docker containers and one Chron job in our droplet:

- One is a clientside react app
- One is an express app
- One is a mysql server
- The chron job updates our bill data daily

## Contributing
To contribute, please create your own work in a branch and submit a pull request.

## Continuation
We hope that this project may be further developed by future iSchool capstone teams. Below are some things we wish that we had done and some ideas for continuation

1. Placheolder
2. Placeholder

# Other

## A note on .sh scripts line endings
It is highly recommended to use LF line endings for .sh scripts. This makes Linux distributions able to execute these scripts, as well as bash/git bash. You can change line endings by clicking the bottom right corner of the VSCode editor where it says CRLF or LF. If it says LF, you're good to go! LF vs CRLF can cause bugs that are hard to squish because the error messages are vague.

## Building
In order to build each docker container, there are build sh scripts that you can run from your terminal to dockerize your microservices. 

### Running things locally
Just run the code as you have learned to. The order of operations for running stuff is:

- Mysql database
- Express app
- React app

Running the microservices in this manner will make your life a whole lot easier. 

### Running things in docker
***USE EITHER WSL OR GITBASH OR ANY BASH TERMINAL FOR THIS. IDK WHY POWERSHELL IS ANNOYING AND UNABLE TO RUN BASH SCRIPTS*** 

To build and run stuff in docker, use the `_build_and_run.sh` scripts that exist in the root of the microservice you want to run. Be sure to be in the directory that these exist in! 


## Deploying
We deployed all our code to a digital ocean droplet. This droplet is running all of our docker containers, thus, it is super easy to update our docker images and then re-run them. 

To deploy code, i HIGHLY recommend using a WSL linux distribution, it made my life a whole lot easier. Learn more about WSL on [pureinfotech.com](https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/). I was using a windows 10 machine, I don't have experience with Mac computers, but iirc, they are closer to linux boxes, so if you have a mac computer you can probably ignore this.

For deployment, I EXCLUSIVELY worked in linux, so if you are using powershell, I'm not exactly sure how these scripts will work for you.

### ANYWAYS
This is a longwinded way to say: ***"use the `_upgrade_and_deploy_*.sh` scripts"***

These scripts will build and push a docker container of your work on your machine, then it will push it to docker hub, then finally pull and run it in a droplet. You will need to replace the ip address in the script to one you have permission to access.

## Help
This website was super helpful for deploying and setting up website infrastructure:
 https://drstearns.github.io/tutorials/

# Notes from the Developers

## Thomas

The BIGGEST learning curve for me was learning how to use bash scripts to make life easier. I recommend that everyone get a basic understanding of these scripts and how to run them. Bash scripts are OP and so is docker.

Using Mysql workbench is super nice to see if there is any issue with data as well!

Also, if you decide to redo or add to the API, be sure to use a folder/route with v2 to help with organization. 

## Carson

## Olivia

## Hailey

## Contact information
Olivia Victorino - ovictor@uw.edu

Carson Bryant - caronab@uw.edu

Thomas Serrano - serrat@uw.edu

Hailey Meister - hmeister@uw.edu

Please feel free to reach out to us if you have any questions!