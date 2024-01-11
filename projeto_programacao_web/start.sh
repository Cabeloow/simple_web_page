#!/bin/sh

case $1 in
    'install') install=1 ;;
    'mssql') mssql=1 ;;
 esac

if [ $mssql ]
then
    echo "*** Instalando o container docker mssql ***"
    docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=g30v2n3@jul12" -p 1433:1433 --net mySubNet --ip 172.0.0.10 mcr.microsoft.com/mssql/server:2022-latest
fi

if [ $install ]
then
    echo "*** Atualizado o container docker ***"
    docker build -t projeto_programacao_web ./
    docker stop web
    docker rm web
    docker run --name web -d --net mySubNet --ip 172.0.0.9 -p 5000:5000 projeto_programacao_web
fi
    echo "*** atualizado arquivos no docker ***"
    docker stop web
    docker rm web
    docker run --name web --net mySubNet --ip 172.0.0.9 -p 5000:5000 projeto_programacao_web
fi

exit 0

# docker network create -d bridge minha-network
# docker logs web -n 40
# docker exec –it web /bin/bash
# docker cp . web:/app/

#docker network create \
#  --driver=bridge \
#  --subnet=172.0.0.0/24 \
#  --ip-range=172.0.0.3/24 \
#  --gateway=172.0.0.2 \
#  mySubNet

