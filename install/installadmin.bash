#!/bin/bash

#Récupérer le token du root
curl -H "Accept: application/json" -H "Content-Type: application/json" -d @root.json http://localhost:3000/admin/auth/root >> token.txt

token=`cat token.txt`
echo $token
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "authorization: Bearer ${token}" -d @ditch.json http://localhost:3000/admin
curl -H "Accept: application/json" -H "Content-Type: application/json" -H "authorization: Bearer ${token}" -d @rodhes.json http://localhost:3000/admin

rm token.txt



#Enregistrer l'utilisateur