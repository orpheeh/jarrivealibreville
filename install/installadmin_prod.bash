#!/bin/bash

#Récupérer le token du root
curl -H "Accept: application/json" -H "Content-Type: application/json" -d @root.json http://jarrivealibreville.com/admin/auth/root >> token.txt

token=`cat token.txt`
echo $token
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "authorization: Bearer ${token}" -d @ditch.json http://jarrivealibreville.com/admin
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "authorization: Bearer ${token}" -d @rodhes.json http://jarrivealibreville.com/admin

rm token.txt



#Enregistrer l'utilisateur