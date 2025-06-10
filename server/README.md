# Todo Server

This folder contains a simple Node.js server using Express and Lowdb to store
user accounts and todo list data. Each user keeps their own tasks in the
database.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server listens on port `4000` by default.

The database is stored in the `db.json` file inside this folder and will be created automatically on first run.
Tasks are stored inside each user object, so every user has their own `tasks`
array and `nextTaskId` counter.

## Default Credentials

On first start the database is populated with a default user:

- **Username:** `admin`
- **Password:** `admin`

You can use these credentials to log in without registering a new account.

Both the register and login endpoints respond with:

```json
{ "token": "...", "userId": 1, "username": "admin" }
```
