# BookDesk Server

## Running MongoDB on Docker

`docker pull mongo`

`docker run -d  --name bookdesk-mongodb  -p 27888:27017 -e MONGO_INITDB_ROOT_USERNAME=bookdeskadmin -e MONGO_INITDB_ROOT_PASSWORD=bookdesksecret mongo`