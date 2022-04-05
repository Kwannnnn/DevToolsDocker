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

## 3. Deployed website Screenshot
![Deployed Website](/doc/remote-screenshot.png)

## 4. GitLab CI/CD Pipeline Screenshot
![CI/CD Pipeline Success](/doc/ci-cd-pipeline.png)