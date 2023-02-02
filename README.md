# poprev
node, express and mongodb

# Configuration

- npm install
- create a .env file
- Inside d dotenv file, we need: PORT, JWT_SECRETE, JWT_LIFETIME
- npm start

# ENDPOINTS

- /auth/register - Register User
- /auth/login - Login User

## These endpoints below require authorization: Bearer token
- /project - POST project ot token
- /project - GET all project or token
- /transaction - GET all logged-in user transaction(s)
- /transaction/:id - where id is the project id, POST buy a token
- /transaction/:id - where id is the project id, GET all tokens bought for a project
- /transaction/tran/:id - where id is the transaction id, Get a transaction record
