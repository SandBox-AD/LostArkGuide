import requests
import json
import logging
import os
import asyncio


async def test():
    for i in range(0,3000):
        api = requests.get("http://localhost:9000/API/Demoniste")
        if i == 0:
            with open('response/demonisteTest.json', 'w') as outfile:
                json.dump(api.json(), outfile)

logging.basicConfig(filename='python_test/log/test.log', encoding='utf-8', level=logging.DEBUG)
os.system("echo start")
asyncio.run(test())
asyncio.run(test())
os.system("echo end")