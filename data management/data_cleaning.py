# data_cleaning.py

import csv
import json
from pathlib import Path
from member_of_parliament import fetch_members_local, EXPENSE_TYPES


DATA_DIR = './data'


def csv_to_dict(file):
    with open(file, 'r') as fd:
        fd.readline()  # skip first line comment
        reader = csv.DictReader(fd)
        return list(reader)


def __field_str_to_int(mp):
    fields = ['salaries', 'total_travel', 'total_hospitality', 'total_contracts']
    for i in fields:
        value = float(getattr(mp, i).replace('$', '').replace(',', ''))
        setattr(mp, i, value)
    return mp


def set_int_type_manifest(manifest):
    for k, v in manifest.items():
        mp = __field_str_to_int(v)
        manifest[k] = mp
    return manifest


def parse_files(files):
    manifest = fetch_members_local('mp.html', output_dict=True)
    manifest = set_int_type_manifest(manifest)
    key_format = '{ln}, {fn}'
    for file in files:
        last_name, first_name, expense_type, year, quarter = file.with_suffix('').name.split('_')
        expenses = csv_to_dict(file)

        key = key_format.format(ln=last_name, fn=first_name)
        setattr(manifest[key], expense_type, expenses)
    return [v.to_dict() for _, v in manifest.items()]


def main():
    files = Path(DATA_DIR).glob('**/*')
    m = parse_files(files)
    with open('data.json', 'w') as fd:
        json.dump(m, fd)


if __name__ == '__main__':
    main()
