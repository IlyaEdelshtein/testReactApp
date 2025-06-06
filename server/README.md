# Todo Server

This folder contains a simple Node.js server using Express and Lowdb to store todo list data.

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

## Default Credentials

On first start the database is populated with a default user:

- **Username:** `admin`
- **Password:** `admin`

You can use these credentials to log in without registering a new account.
