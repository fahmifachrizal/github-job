# Github-Job

To use this project please install all dependencies (client and server)

User to login available at /server/seeders/Users.json

## Server
### Installing Server Dependencies

To install server dependencies please follow this command
```
npm install
npm sequelize-cli db:create
npm sequelize-cli db:migrate
npm sequelize-cli db:seed:all
```

### Adding JWT Secret

For JsonWebToken to function properly we need to add token secret in .env file (copied from .env.template)
```
TOKEN_SECRET='YOUR SECRET'
```

### Running Backend Side (Development mode)
```
npm run dev
```

## Client
### Installing Client Dependencies

To install server dependencies please follow this command
```
npm install
```

### Running Frontend Side (Development mode)
```
npm run dev
```
