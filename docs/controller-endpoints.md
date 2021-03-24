# Controller Endpoints
Node JS backend controller acting as processing intermediary for the mongodb

## Usage

```
POST /fetch

{
   filter: {caucus: [red, blue, green, ...], _id: [member...]},
   expense: {hospitality: 0, travel: 0 ...} // excludes feilds
}

Response
{
    [
        {MP: ...}, 
        {MP: ...}, ... 
    ]
}
```

```
GET /sum-group

Response
{
  [
    {
        "_id": cacaus,
        "total_travel": float,
        "total_contracts": float,
        "total_hospitality": float
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
        "_id": cacaus,
        "avg_travel": float,
        "avg_contracts": float,
        "avg_hospitality": float
    }, ...
  ]
}
```