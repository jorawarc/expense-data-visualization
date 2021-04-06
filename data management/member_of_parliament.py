

from bs4 import BeautifulSoup
from dataclasses import dataclass
from collections import namedtuple

EXPENSE_TYPES = ['travel', 'hospitality', 'contract']
Expenses = namedtuple('Expenses', EXPENSE_TYPES)


@dataclass
class MP:
    """ Member of Parliament"""
    name: str
    constituency: str
    caucus: str
    salaries: float
    total_travel: float
    total_hospitality: float
    total_contracts: float
    member_id: str
    travel = None
    hospitality = None
    contract = None

    def expense_urls(self, year, quarter, file):
        url_format = "{expense}/{year}/{quarter}/{member}/{file}"
        urls = [url_format.format(expense=i, year=year, quarter=quarter, member=self.member_id, file=file) for i in EXPENSE_TYPES]
        return Expenses(*urls)

    def to_dict(self):
        manifest = {'name': self.name,
                    'constituency': self.constituency,
                    'caucus': self.caucus,
                    'salaries': self.salaries,
                    'total_travel': self.total_travel,
                    'total_hospitality': self.total_hospitality,
                    'total_contracts': self.total_contracts,
                    'travel': self.travel,
                    'hospitality': self.hospitality,
                    'contract': self.contract,
                    'member_id': self.member_id}
        return manifest


def __extract_id_from_row(row):
    return row.find('a').get('href').split('/')[-1].strip()


def currency_string_to_float(string):
    return float(string.replace('$', '').replace(',', '').strip())


def format_name(name):
    last_name, first_name = name.split(',')
    first_name = first_name.replace('Hon. ', '')
    return f'{first_name.strip()} {last_name.strip()}'


def fetch_members_local(path, output_dict=False):
    mps = []
    manifest = {}
    with open(path, encoding='UTF-8') as fd:
        html = fd.read()
        soup = BeautifulSoup(html, features="html.parser")
        rows = soup.find_all(class_='expenses-main-info')
        for row in rows:
            member_id = __extract_id_from_row(row)
            name, constituency, caucus, salary, total_travel, total_hospitality, total_contract = [i.text.replace('\n', '').strip() for i in row.find_all('td')]
            if name != 'Vacant':
                mp = MP(format_name(name), constituency, caucus, currency_string_to_float(salary), currency_string_to_float(total_travel),
                        currency_string_to_float(total_hospitality), currency_string_to_float(total_contract), member_id)
                mps.append(mp)
                manifest[mp.name] = mp

    if output_dict:
        return manifest
    return mps
