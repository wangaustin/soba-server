# soba-server
soba backend, built with Express.js, Node.js, and mongoDB.

[Front end](https://github.com/kyleburgess2025/soba)

**Both the front end and the back end must be concurrently running for soba to properly work.**

## Set Up

### Connect to mongoDB

First, replace "USERNAME" and "PASSWORD" in *index.js* respectively with your own if you are a user 
to the existing cluster I have created on mongoDB Atlas.

If you'd like to connect to your own cluster, copy the connection string from your cluster and paste it there.

---
### Starting the Server

In the terminal, run the following to install packages
```
npm i
```
Then, run the following to start the server
```
npm run dev
```
