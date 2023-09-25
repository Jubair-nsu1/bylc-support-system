#  Dockerfile for Node Express Backend
FROM node

# Create App Directory
WORKDIR /app

# Install Dependencies
COPY package.json .

RUN npm install

COPY . .

# Exports
EXPOSE 1337

CMD ["npm", "run", "dev"]