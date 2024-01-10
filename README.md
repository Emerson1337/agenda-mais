# Clean architecture and Clean code concepts

# **Coffees and Teas listing website**

You can list all Coffees and Teas previously created on the app’s database.

Focus: clean code, clean architecture, tests, commit patterns, and documentation.

# **Next steps**

Add visual components for product creation and list new coffees and teas stored, like a modal sending a `formData` to the API built.

# **Technologies used**

ReactJS using NextJS, Node through NestJS, Jest for testing, Axios, HTML, and CSS, Typeorm, Docker and Docker-compose, Husky and Lintstaged to prevent failures would be sent to the GitHub repository and Git.

# **Database used**

PostgreSQL

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

   //2. run the docker-compose (you will get the API, the frontend, and
   //also the database running). You won't need Node or any dependency installed
   //locally. Changes in code are reflected inside the container (bind mount)
   docker-compose up

   //3. In another terminal guide run migrations to create tables (don't forget)
   npm run typeorm run migration:run
   ```

1. The traditional way

```jsx
1. Install node on your machine (v16.20.0 is highly recommended)
2. Go inside frontend and backend folders and run respectively "npm i"
3. Remember to copy, paste and rename the .env.example file to .env
4. Inside the backend folder, run: backend > npm run typeorm run migration:run
5. Run the script to init the database inside: backend > scripts > start-dev-db.sh
6. Open two terminal guides
	The first one on frontend, run: > npm run dev
	The second one on backend, run: > npm run start:dev
```

Once the app is running, we will have:

API: localhost:3000
Frontend app: localhost:4000
database: localhost:5432

# **Endpoints:**

The API will run on [localhost](http://localhost) on 3000 port: localhost:3000/endpoints

`GET /coffees`

`POST /coffee`

`GET /teas`

`POST /tea`

![image](https://github.com/andersongomes/banksystem/assets/58860863/3a709146-119e-43d1-95dd-0dc48a4ee35c)

# **Concepts applied:**

**Front end part**

- [x] Path mapping
- [x] Endpoints centralizer
- [x] Clean Architecture (pattern used by default)
- [x] Gitmoji to commits (https://gitmoji.dev/)
- [x] Refactor current code
  - [x] Remove any types

**Back end part**

- [x] Path mapping
- [x] Clean Architecture
- [x] Clean code
- [x] Separate jest settings to the config file
- [x] Husky and lint-staged configuration
  - [x] Apply lint before sending changes (required code without eslint errors)
  - [x] Run tests before each commit
- [x] Test Drive Development (TDD)
- [x] Gitmoji to commits (https://gitmoji.dev/)
- [x] Add environment variables
- [x] List coffee/tea products
- [x] Create tea/coffee products

# **Git pattern applied**

Gitmoji has been used for commitment patterns. Each emoji has a helpful description that you can check by installing a simple extension on VSCODE. Official website (https://gitmoji.dev/).

That’s a really complete and useful pattern. And beautiful!

Messages:

![image](https://github.com/andersongomes/banksystem/assets/58860863/896ef84a-aa4a-4aaa-b966-77bbaa51d04d)

![image](https://github.com/andersongomes/banksystem/assets/58860863/4606b650-c642-41f7-85a1-c19d66d29f65)

![image](https://github.com/andersongomes/banksystem/assets/58860863/25371cca-c537-4c73-991f-e2ec9595cc29)

![image](https://github.com/andersongomes/banksystem/assets/58860863/e903d3ba-9245-4a64-9b89-841fa5386712)

![image](https://github.com/andersongomes/banksystem/assets/58860863/f59af23c-052c-49b6-b4b5-3d72d8ba3a55)

![image](https://github.com/andersongomes/banksystem/assets/58860863/4c658dc5-9b50-4ec6-a160-0522a23cdc93)

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

[Challenge API.postman_collection.json](https://drive.google.com/file/d/1Krw5LTfuwPm7rWxmEKNvK8cXNo5VM-hy/view?usp=sharing)
