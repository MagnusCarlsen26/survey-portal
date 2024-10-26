FROM node:22-alpine

WORKDIR /app

COPY frontend/package*.json ./frontend/
COPY firebase/package*.json ./firebase/
COPY firebase/package-lock.json ./firebase/
COPY firebase/functions/package*.json ./firebase/functions/
COPY firebase/functions/package-lock.json ./firebase/functions/

RUN npm install --prefix ./frontend && \
    npm install --prefix ./firebase && \
    npm install --prefix ./firebase/functions

COPY ./frontend ./frontend
COPY ./firebase ./firebase

EXPOSE 3000

CMD ["npm", "run", "dev", "--prefix", "./frontend"]
