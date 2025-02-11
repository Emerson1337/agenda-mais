# AgendaMais project guide

# **Database used**

MongoDB

# **Requirements to run the project**

Obs: it might take some time by the first time.

# **DATABASE**

1. On the root of the project, run:

```
yarn db:dev
```

if it is your first time running the database, it might close due to volumes folder missing. If it happens, run
the command again.

Once you have the container running, you need to set the replicate option because of prisma needs it.

With the container running, do:

```
# list containers running
$ docker ps

# enter in the db container
$ docker exec -it <container_id> bash

# enter in mongosh inside the container
$ mongosh

# paste it
$ rs.initiate({_id: "rs0", members: [{_id: 0, host: "127.0.0.1:27017"}] })
```

Close the bash by typing exit multiple times. Once on your bash, restart the container:

```
docker restart <container_id>
```

If you did once, only `yarn db:dev` should be enough.

# **BACKEND**

Make sure you copy and paste .env.example with right values.

- Setup

run the following commands:

```
$ yarn install

# to run the app
$ yarn start:dev
```

# **FRONTEND**

Make sure you copy and paste .env.example with right values.

- Setup

run the following commands:

```
$ yarn install

# to run the app
$ yarn dev
```

At the end, you will have:

API: localhost:3000

Frontend app: localhost:4000

database: localhost:27017

# **Errors prevention**

We have on the app Husky and Lintstaged configured. It means: any commit sending a broken service already covered by a test won’t be accepted to go to the repository. And also a “lint” command is run to fix and detect problems related to coding out the pattern.

# **Troubleshooting:**

Database problems

If you get this

```jsx
Error: NotYetInitialized: Cannot use non-local read concern until replica set is finished initializing.
```

Means the replicate set is not configured on your container, so you must open the container, go inside mongosh and run:

```
# paste it
$ rs.initiate({_id: "rs0", members: [{_id: 0, host: "127.0.0.1:27017"}] })
```

# **Postman collection for API endpoints:**

- Soon

# Infrastructure

Technologies

[] Ec2
  [] Load balancers
  [] Target groups
  [] VPC for Elastic IP
[] Route 53
[] Certificate Manager
[] S3 Bucket