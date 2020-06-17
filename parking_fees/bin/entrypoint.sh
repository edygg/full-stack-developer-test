#!/bin/sh
cmd="$@"

export DEBUG=parking_fees:*
export MONGO_STR_CONN=mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@$MONGO_INITDB_HOST:$MONGO_INITDB_PORT/$MONGO_INITDB_DATABASE?authSource=admin

# make sure MongoDB is ready to accept connections
until nc -z $MONGO_INITDB_HOST $MONGO_INITDB_PORT
do
  echo "Waiting for MongoDB to accept connections"
  sleep 1;
done
# node /app/bin/seeds.js
exec $cmd