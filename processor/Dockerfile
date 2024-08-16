FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN npm install
# Install TypeScript globally
RUN npm install -g typescript
CMD ["npm", "run", "start"]