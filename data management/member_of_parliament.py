

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
    salaries: str
    total_travel: str
    total_hospitality: str
    total_contracts: str
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


def fetch_members_local(path, output_dict=False):
    mps = []
    manifest = {}
    with open(path, 'r') as fd:
        html = fd.read()
        soup = BeautifulSoup(html, features="html.parser")
        rows = soup.find_all(class_='expenses-main-info')
        for row in rows:
            member_id = __extract_id_from_row(row)
            data = [i.text.replace('\n', '').strip() for i in row.find_all('td')]
            data.append(member_id)
            mp = MP(*data)
            mps.append(mp)
            manifest[mp.name] = mp

    if output_dict:
        return manifest
    return mps
