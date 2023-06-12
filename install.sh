#!/bin/bash

##################################
# Passctl guided install script  #
#       github.com/passctl       #
##################################
####### SEE docs/guided.md ####### 

# color codes
RED="\e[1;31m"
GREEN="\e[1;32m"
BLUE="\e[36m"
RESET="\e[0m"

if (( $EUID == 0 )); then 
        echo -e "$RED Do NOT run this script as root\n Just make sure you are in sudoers $RESET"
        exit
fi


echo -e "$GREEN Welcome to passctl installer script $RESET"

if ! command -v apt &> /dev/null ; then
        echo -e "$RED This script only supports debian based systems $RESET"
        exit
fi

echo -e "$BLUE Installing dependencies... $RESET"
# assuming that sudo is installed
sudo apt update
sudo apt install npm 
echo -e "$GREEN Done! $RESET"
echo -e "$BLUE Installing NPM dependencies... $RESET"
npm i
echo -e "$GREEN Done! $RESET"

echo "{" > config.json
echo "$BLUE Time to configure the server $RESET"
read -p "$BLUE What port should the server listen on? $RESET" port 
echo '\t"port": $port,' >> config.json
read -p "$BLUE What should be the max vault size? (0 for none) $RESET" max
echo '\t"vault-max": $max,' >> config.json
read -p "$BLUE What should the server password be? $RESET" pass
pass=$(echo -n $pass | sha512sum)
pass=$(echo ${pass// /})
pass=$(echo ${pass//-/})
echo '\t"pass": "$pass"' >> config.json
echo "}" >> config.json
echo "$GREEN Configuration is done! $RESET"

echo "$BLUE Installing pm2... $RESET"
npm install pm2 -g 
echo "$GREEN Done! $RESET"
echo "$BLUE Starting the server... $RESET"
pm2 start index.js 
echo "$GREEN Done! $RESET"

echo "$GREEN Connect your server at: localhost:$port $RESET"
echo "########################################################"
echo "$GREEN To see the server status:$RESET pm2 list"
echo "$GREEN To restart the server:$RESET pm2 restart <id>"
echo "$GREEN To stop the server:$RESET pm2 stop <id>"
echo "########################################################"
echo "$GREEN Installation is completed"
echo "$GREEN Thank you for using passctl, have a nice day! $RESET"
