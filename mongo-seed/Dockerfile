FROM mongo:latest
COPY persons.json ./persons.json
CMD mongoimport --host mongodb --db devtools --collection person --type json --jsonArray --file /persons.json
