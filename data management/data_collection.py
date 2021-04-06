# data_collection.py

import os
import httpx
import asyncio
import logging
import aiofiles
from member_of_parliament import EXPENSE_TYPES, fetch_members_local

# Config
# noinspection PyArgumentList
logging.basicConfig(filename=f'output.log', encoding='utf-8', level=logging.DEBUG, filemode='w')

# Fixed parameters
BASE_URL = 'https://www.ourcommons.ca/ProactiveDisclosure/en/members/{}'
FILE_NAME_FORMAT = '{name}_{expense_type}_{year}_{quarter}.{file_type}'
YEAR = '2021'
QUARTER = '2'
FILE_TYPE = 'csv'

# Consts
LIMITS = httpx.Limits(max_connections=10)
DATA_DIR = './data'


async def __get_file(filename, url_ref):
    files = set(os.listdir(DATA_DIR))
    if filename in files:
        logging.info(f' - SKIPPING: {filename} file already exists')
    else:
        url = BASE_URL.format(url_ref)
        async with httpx.AsyncClient(limits=LIMITS) as client:
            logging.debug(f'- FETCHING: {url}')
            response = await client.get(url)
            response.raise_for_status()
            async with aiofiles.open(os.path.join(DATA_DIR, filename), 'wb') as fd:
                logging.info(f' - SAVING: {filename} to disk...')
                await fd.write(response.content)


async def get_single_mp_data(mp):
    file_names = [FILE_NAME_FORMAT.format(name=mp.name.replace(', ', '_'), expense_type=i, year=YEAR,
                                          quarter=QUARTER, file_type=FILE_TYPE) for i in EXPENSE_TYPES]

    params = zip(file_names, [*mp.expense_urls(YEAR, QUARTER, FILE_TYPE)])
    logging.info(f"BEGIN {mp.name}...")

    try:
        await asyncio.gather(*[__get_file(file, ref) for file, ref in params])
    except Exception as e:
        logging.error(f'{mp.name} - {e}')


async def main():
    mps = fetch_members_local('mp.html')
    for i in mps:
        print(f"Gathering data on {i.name}")
        await get_single_mp_data(i)

    print("Done")

if __name__ == '__main__':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())  # Windows async compatibility
    asyncio.run(main())
