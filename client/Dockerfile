FROM node:8.1
RUN useradd -ms /bin/bash admin
EXPOSE 3000
COPY app /app
WORKDIR /app
RUN npm install
USER admin
CMD ["node", "app.js"]