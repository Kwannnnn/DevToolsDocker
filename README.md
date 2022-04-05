# DHI2V.So2 - Docker Project

Authors:
* Kristiyan Tenev - 449302
* Quan Nguyen - 490848

## 1. Added Persons

The following 4 persons were added to `person_controller.js` and later removed and added to the `mongo-seed` service.

```json
[
    {
        "name": "Donald Trump",
        "street": "725 Fifth Avenue",
        "city": "New York City",
        "country": "USA"
    },
    {
        "name": "Craig Bradley",
        "street": "Handelskade",
        "city": "Deventer",
        "country": "Netherlands" 
    },
    {
        "name": "Kristiyan Tenev",
        "street": "Doornenburg",
        "city": "Deventer",
        "country": "Netherlands" 
    },
    {
        "name": "Quan Nguyen",
        "street": "Brink",
        "city": "Deventer",
        "country": "Netherlands" 
    }
]
```

## 2. Mongo Seed

We created a separate `mongo-seed` service in the `docker-compose.yaml` file that depends on the mongodb container and runs on the same network, so that we can share the host attribute to properly seed the database.

The Dockerfile used to build mongo-seed copies the `persons.json` file from the local drive to the container, and then runs `mongoimport` to insert the data from the json file in the `devtools` database (which we created when creating the mongodb container), in the `person` collection:

```docker
FROM mongo:latest
COPY persons.json ./persons.json
CMD mongoimport --host mongodb --db devtools --collection person --type json --jsonArray --file /persons.json
```

## 3. Comments
After adjusting the `vue.config.js` to determine the path based on the `process.env.NODE_ENV` environment variable, this made it impossible for us to access the frontend application from localhost after running `docker compose up`.

This is due to the fact that in our `Dockerfile` we run the command `npm run build` which sets the environment variable to production, thus the path is set to `~devtools-102` instead of `/`.

To overcome this issue we slightly modified our Dockerfile to copy the dist folder to `/usr/share/nginx/html/~devtools-102`. This made it again possible to view the webpage from localhost.

## 4. Deployed website Screenshot
![Deployed Website](/doc/remote-screenshot.png)

## 5. GitLab CI/CD Pipeline Screenshot
![CI/CD Pipeline Success](/doc/ci-cd-pipeline.png)