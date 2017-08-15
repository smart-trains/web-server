#!/bin/bash

while read line
 do export "$line"
done < .env

echo MongoDB URL is configured to: $MONGO_URL
meteor
