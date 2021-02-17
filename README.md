# MP Expenditure Visualization
A data visualization of MP Expenses.
The project uses data from [ourcommons.ca](https://www.ourcommons.ca/en/open-data#ExpendituresMembers) which is then process and displayed using a dockerized MERN stack.

## Usage

### Data collection
[open-data doc](./docs) provides an outline of [ourcommons.ca](https://www.ourcommons.ca/en/open-data#ExpendituresMembers) and the scripts used to download the files in bulk\
_Note: Be mindful when downloading any files_

### Visualization
The site can be viewed online at [site]() \
To run the visualization locally, docker-compose is recommended:
`docker-compose up -d` \
_Note: you must import the `data.json` file manually_
