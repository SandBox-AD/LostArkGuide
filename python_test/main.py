import random
import requests
import json
import logging
import os
import asyncio

file_json=os.getcwd()+'/response/demonisteTest.json'
async def test(file_log, end):
    logging.info("Number test :"+str(end))
    for i in range(0, end):
        api = requests.get("http://localhost:9000/API/Demoniste")
        if i == 0:
            with open(file_log, 'w') as outfile:
                json.dump(api.json(), outfile, indent=4)

logging.basicConfig(filename=os.getcwd()+'/python_test/log/test.log', encoding='utf-8', level=logging.DEBUG, format='%(levelname)s:%(message)s')
os.system("echo start")
asyncio.run(test(file_json,random.randint(0, 5000)))
asyncio.run(test(file_json,random.randint(0, 5000)))
os.system("echo end")