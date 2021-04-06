# data_cleaning.py

import csv
import json
from pathlib import Path
from member_of_parliament import fetch_members_local, EXPENSE_TYPES


DATA_DIR = './data'


def csv_to_dict(file):
    with open(file, encoding='utf-8') as fd:
        fd.readline()  # skip first line comment
        reader = csv.DictReader(fd)
        return list(reader)


def __transaction_str_to_int(transaction):
    if 'Total' in transaction:
        if len(transaction['Total']):
            transaction['Total'] = float(transaction['Total'])
        else:
            transaction['Total'] = 0.00
    return transaction


def parse_files(files):
    manifest = fetch_members_local('mp.html', output_dict=True)
    for file in files:
        name, expense_type, year, quarter = file.with_suffix('').name.split('_')
        expenses = list(map(__transaction_str_to_int, csv_to_dict(file)))

        setattr(manifest[name], expense_type, expenses)
    return [v.to_dict() for _, v in manifest.items()]


def main():
    files = Path(DATA_DIR).glob('**/*')
    m = parse_files(files)
    with open('data.json', 'w', encoding='utf-8') as fd:
        json.dump(m, fd)


if __name__ == '__main__':
    main()
