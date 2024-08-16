FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN npm install
# Install TypeScript globally
RUN npm install -g typescript
EXPOSE 3002
COPY entrypointhooks.sh /app/entrypointhooks.sh
RUN chmod +x /app/entrypointhooks.sh
EXPOSE 3002
ENTRYPOINT ["/app/entrypointhooks.sh"]