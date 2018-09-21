FROM node:8-alpine
COPY . /app
EXPOSE 9103
ENTRYPOINT cd /app && node $ENTRY_FILE
