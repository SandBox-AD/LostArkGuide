import requests
import json
import logging
logging.basicConfig(filename='python_test/log/test.log', encoding='utf-8', level=logging.DEBUG)
for i in range(0,3000):
    api = requests.get("http://localhost:9000/API/Demoniste")
    if i == 0:
        with open('response/demonisteTest.json', 'w') as outfile:
            json.dump(api.json(), outfile)
    if api.status_code == 200:
        logging.info(api.status_code)
    else :
        logging.warning(api.status_code)
