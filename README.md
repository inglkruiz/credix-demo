

# Credix Demo

This repository has been scaffolded using [Nrwl Nx](https://nx.dev).

## Install dependencies

The project uses [yarn](https://yarnpkg.com) as dependency manager. Once you have installed `yarn`, you can install the dependencies of this repository by running the following command:

```bash
yarn
```

## Run the project locally

### Postgres DB

Copy/Paste the file `.env`, rename it to `.env.local`, and replace the content of the file with the following environment variables.

```txt
POSTGRES_PORT=5432
POSTGRES_USER=credix
POSTGRES_PASSWORD=credixpw
POSTGRES_DB=credix

PGADMIN_DEFAULT_EMAIL=dev@credix.finance
PGADMIN_DEFAULT_PASSWORD=credixpw
PGADMIN_PORT=5050

API_POSTGRES_HOST=localhost
API_HOST=localhost
API_PORT=3333

APP_HOST=localhost
APP_PORT=4200
NEXT_PUBLIC_API_URL=http://localhost:3333/api

```

Open a terminal and start the Database.

```bash
docker compose --env-file ./.env.local up --detach
```

In the same terminal run the db-schema app for generating the DB schema.

```bash
yarn nx run db-schema:serve:production
```

Kill the process after it finishes.

### Web App

Open a new terminal and start the Web App.

```bash
yarn nx serve app
```

### API

Open a new terminal and start the Web App.

```bash
yarn nx serve api
```

You can save some time and clicks if you are using VSCode, just run the Task Develop > [.vscode/tasks.json](.vscode/tasks.json)

Now you're ready to go:

* The Web App runs on http://localhost:4200
* The API runs on http://localhost:3333/api You can explore the OpenAPI documentation at http://localhost:3333/api/docs
* PgAdmin runs on http://localhost:5050 Use the password you set at `PGADMIN_DEFAULT_PASSWORD` for accessing the UI.
