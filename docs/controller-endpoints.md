# Controller Endpoints
Node JS backend controller acting as processing intermediary for the mongodb

## Usage
All data requests must include a json payload structured as follows
```
{
   filter: {caucus: [red, blue, green, ...], _id: [member...]},
   expense: {hospitality: 0, travel: 0 ...} // excludes feilds
}
```

Request responses use an enveloped structure as follows:
```
{
    [
        {MP: ...}, 
        {MP: ...}, ... 
    ]
}
```