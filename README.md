# Agendazap project guide

# **Database used**

MongoDB

# **Requirements to run the project**

There are two ways to run the project:

Obs: it might take some time by the first time.

For these two ways, you have to run `npm install` on the source of the project `./` .

- Frontend
- backend
- package.json

run npm install here.

1. You will only need Docker and Docker-compose installed on your local machine.

   Commands needed:

   ```jsx
   //1. env variables (on frontend and backend)
   remember to copy, paste and rename the .env.example file to .env
   
   //2. env variables (on frontend and backend)
   run
   yarn

   //3. configure husky
   run
   yarn prepare

   //3. run the docker-compose (you will get the API, the frontend, and
   //also the database running). You won't need Node or any dependency installed
   //locally. Changes in code are reflected inside the container (bind mount)
   docker-compose up
   ```

Once the app is running, we will have:

API: localhost:3000
Frontend app: localhost:4000
database: localhost:27017

# **Errors prevention**

We have on the app Husky and Lintstaged configured. It means: any commit sending a broken service already covered by a test won’t be accepted to go to the repository. And also a “lint” command is run to fix and detect problems related to coding out the pattern.

examples while the development process:

![image](https://github.com/andersongomes/banksystem/assets/58860863/6f173c45-57e0-464f-986f-e603f97f4371)

![image](https://github.com/andersongomes/banksystem/assets/58860863/fb92d583-6dc1-4979-8874-6e894291841f)

# **Troubleshooting:**

Node version problem (required v16.20.0)

```jsx
Error: error:0308010C:digital envelope routines::unsupported
```

If you get problems with the crypt version when you try to run the app on a container

- Remember to delete `node_modules` folders from the backend and frontend if you are using an OS different from Linux before to run for the first time the docker-compose up command.

# **Postman collection for API endpoints:**
- Soon
