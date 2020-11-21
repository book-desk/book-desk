export const { SECRET = 'secret', PORT = 3333 } = process.env;

export const {
  DB_USERNAME = 'username',
  DB_PASSWORD = 'password',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
} = process.env;

export const CONNECTION_STRING = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=admin`;
