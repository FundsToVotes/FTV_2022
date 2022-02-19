import pandas as pd
import time
import requests
open_secrets_url_template = (
    "http://www.opensecrets.org/api/?method=candIndustry&cid=" 
    "{}" # id goes here 
    "&cycle=2020&apikey=" 
    "{}" # api key goes here 
    "&output=json"
)
def fill_json_holes(json, size):
        for i in range(1, 10):
            json[f'industry_code{i}'] = ""
            json[f'industry_name{i}'] = ""
            json[f'indivs{i}'] = ""
            json[f'pacs{i}'] = ""
            json[f'total{i}'] = ""
def flatten_response_json(response):
    response = response["response"]["industries"]
    flattened_json = {}
    candidate_data = response["@attributes"]
    flattened_json["cand_name"] = candidate_data["cand_name"]
    flattened_json["cid"] = candidate_data["cid"]
    flattened_json["cycle"] = candidate_data["cycle"]
    flattened_json["last_updated"] = candidate_data["last_updated"]
    industry_data = response["industry"]
    if len(industry_data) > 1:
        for i, industry in enumerate(industry_data):
            industry = industry["@attributes"]
            flattened_json[f'industry_code{i}'] = industry["industry_code"]
            flattened_json[f'industry_name{i}'] = industry["industry_name"]
            flattened_json[f'indivs{i}'] = industry["indivs"]
            flattened_json[f'pacs{i}'] = industry["pacs"]
            flattened_json[f'total{i}'] = industry["total"]
        fill_json_holes(flattened_json, len(industry_data))
    else:
        # for one industry only, the json is formatted differently
        industry = industry_data["@attributes"]
        flattened_json[f'industry_code0'] = industry["industry_code"]
        flattened_json[f'industry_name0'] = industry["industry_name"]
        flattened_json[f'indivs0'] = industry["indivs"]
        flattened_json[f'pacs0'] = industry["pacs"]
        flattened_json[f'total0'] = industry["total"]
        fill_json_holes(flattened_json, 1)
        # fill in rest of json that does not exist
    return flattened_json

candidate_ids = pd.read_csv("just_crp_ids.csv", header=None)[0]
api_key = "REPLACE ME!!!!!!!"
responses = []
for candidate in candidate_ids.head(180):
    response = requests.get(open_secrets_url_template.format(candidate, api_key))
    if response.status_code == 200:
        responses.append(flatten_response_json(response.json()))
        time.sleep(1)
        
pd.DataFrame(responses).to_csv("REPLACE ME!!!!!!!!!!.csv", index=None)