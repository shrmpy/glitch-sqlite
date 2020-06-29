
FROM node:14.4-buster
ENV PATH=$PATH:.:/root
ENV PORT=3000

# try to mimic glitch env
WORKDIR /root
COPY . .
RUN mkdir /root/.data ;\
    npm install 

EXPOSE $PORT
CMD ["npm", "start"]

