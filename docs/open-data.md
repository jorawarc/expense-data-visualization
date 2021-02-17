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

name | purpose | notes
:---: | :---: | :---:
`data_collection.py` | asynchronously collect data and save as csv | _utf-8 to unicode conversion artifacts_
`member_of_parliament.py` | definition of MP data structure | _NA_
`data_cleaning.py` | structure data for json | utf-8 to unicode conversion artifacts


## MongoDB Representation
```
MP {
    name: str,
    member id: str,
    salaries: int,
    constituency: str,
    caucus: str,
    travel: list,
    hospitality: list,
    contracts: list,
}
```