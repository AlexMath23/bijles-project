# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /Backend

# Copying package.json and package-lock.json files
COPY Backend/package*.json ./

RUN apt-get update -y && apt-get install -y openssl

# Installing dependencies
RUN npm install

# Copying the rest of the files in our project
COPY Backend/ ./

# Building 
RUN npm run build

# Starting our application
CMD [ "node", "dist/index.js" ]

# Exposing server port
EXPOSE 5000