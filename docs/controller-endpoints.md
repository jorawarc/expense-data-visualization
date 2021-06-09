# Controller Endpoints
Node JS backend controller acting as processing intermediary for the mongodb

## Usage

```
POST /fetch

{
    value: mp_id
}

Response
{
    {MP Object}
}
```

```
GET /top-spenders

Response
{
    cacus: {{spender}, {spender}, {spender}} # sort desc
    ...
}

```


```
GET /sum-group

Response
{
  [
    {
        _id: cacaus,
        total_travel,
        total_contracts,
        total_hospitality
    }, ...
  ]
}
```

```
GET /avg-group

Response
{
  [
    {
        _id: cacaus,
        avg_travel,
        avg_contracts,
        avg_hospitality
    }, ...
  ]
}
```

```
GET /fetch-transactions

Response
{
    travel: [{date, total}, ...],
    hospitality: [...],
    contract: [...]
}
```

```
GET /sum-total

Response
{
    total
}
```

```
GET /members

Response
{
    [{name, value}, ...]
}

```