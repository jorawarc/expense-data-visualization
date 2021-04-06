# House of Commons Open Data
Data collection from [ourcommons.ca](https://www.ourcommons.ca/en/open-data#ExpendituresMembers)

## Data Collection
Base URL: `https://www.ourcommons.ca/ProactiveDisclosure/<language>/members/` \
`language = {en, fr}`

### Endpoints

Summary
```
/<year>/<quarter>/<type>
type = {csv, xml}
```

Expenses
```
/<expense type>/<year>/<quarter>/<member id>
expense type = {hospitality, travel, contracts}
```

## Scripts

name | purpose 
:---: | :---: |
`data_collection.py` | asynchronously collect data and save as csv 
`member_of_parliament.py` | definition of MP data structure 
`data_cleaning.py` | structure data for json 


## MongoDB Representation
```
MP {
    name: str,
    member id: str,
    salaries: float,
    constituency: str,
    caucus: str,
    total_travel: float,
    total_hospitality: float,
    total_contracts: float,
    travel: list,
    hospitality: list,
    contracts: list,
}
```