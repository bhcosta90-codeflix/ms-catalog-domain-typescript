FROM node:14.15.4-slim

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && tail -f /dev/null"]