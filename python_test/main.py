import requests
import json
x = ['']
for i in range(0,3000):
    if i == 0:
        with open('json_data.json', 'w') as outfile:
            json.dump(requests.get("http://localhost:9000/API/Demoniste").json(), outfile)
    x.append(requests.get("http://localhost:9000/API/Demoniste").status_code)