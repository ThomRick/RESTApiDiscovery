# rest-api-discovery
An express router to expose web server api endpoints.

#Purpose

Avoid hard coding URLs in client side.

# How to use

UsersService :
```typescript
class UsersService {
  private users = [
    { id: '1', name: 'User1' },
    { id: '2', name: 'User2' },
    { id: '3', name: 'User3' }
  ];

  constructor() {}

  public getAll() {
    return this.users;
  }

  public getById(id) {
    return this.users.find(user => user.id === id);
  }
}
```

UsersController :
```typescript
class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  @Resource({key: 'users', path: '/api/users'})
  public getAll(request: Request, response: Response) {
    response.json(this.service.getAll());
  }

  @Resource({key: 'userById', path: '/api/users/:id'})
  public getById(request: Request, response: Response) {
    const id = request.params.id;
    response.json(this.service.getById(id));
  }
}
```
Server.ts :
```typescript
class ApplicationServer {
  private application: ExpressApplication = express();

  public create(): ApplicationServer {
    const controller = new UsersController();
    this.application.use(new UsersRouter(controller).create());
    this.application.use(new Router('/api').create([ controller ]));
    return this;
  }

  public start() {
    this.application.listen(8080, () => {
      console.log('application listening at port 8080');
    });
  }
}
```
main.ts :
```typescript
new ApplicationServer()
  .create()
  .start();
```

When Client made the GET /api request it will receive the api description below :
```json
{
    "_links": {
        "users": {
            "url": "/api/users",
            "templated": false
        },
        "userById": {
            "url": "/api/users/:id",
            "templated": true
        }
    },
    "_self": "/api"
}
```

# Road map

TBD