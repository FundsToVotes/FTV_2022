import requests
import os
import time
import mysql.connector
# NOTE: DO I CARE ENOUGH TO MAKE SOME SORT OF DATA PRUNING FROM PREVENTING MY DATABASE FROM GROWING INFINETELY?
# THE TRUTH COME OUT!!! IDK IF I AM !! Team after us: consider that question. Idk if I am worrying too much 
# but >inb4 20gb of data, but like, there's no way it gets that big, right???
# also the more data we have, the slower the insert bc of the unique query thingie... JUST SAYING!!

def assign_opensecrets_data(primary_subject):
    return {
         "Health":                                          ["H", "Health", "Health"],
         "Government Operations and Politics":              ["Z", "Joint Candidate Cmtes", "Joint Candidate Cmtes"],
         "International Affairs":                           ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"],
         "Congress":                                        ["Z", "Joint Candidate Cmtes", "Joint Candidate Cmtes"],
         "Crime and Law Enforcement":                       ["P", "Labor", "Labor"],
         "Taxation":                                        ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"],
         "Armed Forces and National Security":              ["D", "Defense", "Defense"],
         "Public Lands and Natural Resources":              ["E", "Energy/Nat Resource", "Energy & Natural Resources"],
         "Education":                                       ["W", "Other", "Other"],
         "Transportation and Public Works":                 ["M", "Transportation", "Transportation"],
         "Immigration":                                     ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"],
         "Science, Technology, Communications":             ["C", "Communic/Electronics", "Communications/Electronics"],
         "Labor and Employment":                            ["P", "Labor", "Labor"],
         "Commerce":                                        ["N", "Misc Business", "Misc Business"],
         "Environmental Protection":                        ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"],
         "Finance and Financial Sector":                    ["F", "Finance/Insur/RealEst", "Finance, Insurance & Real Estate"],
         "Energy":                                          ["E", "Energy/Nat Resource", "Energy & Natural Resources"],
         "Civil Rights and Liberties, Minority Issues":     ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"],
         "Agriculture and Food":                            ["A", "Agribusiness", "Agribusiness"],
         "Native Americans":                                ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"],
         "Economics and Public Finance":                    ["F", "Finance/Insur/RealEst", "Finance, Insurance & Real Estate"],
         "Law":                                             ["K", "Lawyers & Lobbyists", "Lawyers & Lobbyists"],
         "Housing and Community Development":               ["C", "Construction", "Construction"],
         "Emergency Management":                            ["W", "Other", "Other"],
         "Social Welfare":                                  ["P", "Labor", "Labor"],
         "Sports and Recreation":                           ["N", "Misc Business", "Misc Business"],
         "Foreign Trade and International Finance":         ["N", "Misc Business", "Misc Business"],
         "Families":                                        ["Y", "Unknown", "Unknown"],
         "Arts, Culture, Religion":                         ["W", "Other", "Other"],
         "Water Resources Development":                     ["E", "Energy/Nat Resource", "Energy & Natural Resources"],
         "Animals":                                         ["A", "Agribusiness", "Agribusiness"]
    }.get(primary_subject, ["Z", "PROBLEM", "PROBLEM"])
     
def find_vote_information(bill_slug, congress_number, chamber):
    response = requests.get(f'https://api.propublica.org/congress/v1/{congress_number}/bills/{bill_slug}.json', headers=headers_dict)
    if response.ok and response.json()["status"] == "OK":
        if len(response.json()["results"][0]["votes"]) > 0:
            for vote in response.json()["results"][0]["votes"]:
                if vote["chamber"].lower() == chamber.lower():
                    vote_url = vote["api_url"]
                    return parse_voter_data(vote_url)
    return None

def parse_voter_data(vote_url):
    response = requests.get(vote_url, headers=headers_dict)
    if response.ok and response.json()["status"] == "OK":
        vote_dict = {}
        for position in response.json()["results"]["votes"]["vote"]["positions"]:
            vote_dict[position["member_id"]] = position["vote_position"]
        return {"vote_dict":vote_dict, "raw_response": response.json()["results"]["votes"]["vote"], "vote_uri": vote_url}
    return None

def parse_voter_data(vote_url):
    response = requests.get(vote_url, headers=headers_dict)
    if response.ok and response.json()["status"] == "OK":
        vote_dict = {}
        for position in response.json()["results"]["votes"]["vote"]["positions"]:
            vote_dict[position["member_id"]] = position["vote_position"]
        return {"vote_dict":vote_dict, "raw_response": response.json()["results"]["votes"]["vote"], "vote_uri": vote_url}
    return None


headers_dict = {
    'X-API-key': os.environ["PROPUBLICA_API_KEY"]
}
chambers = [
    "senate",
    "house"
]
congress_numbers = [117, 118, 119] # this means we can do at least 3 cycles xd
currentest_congress = 0

if __name__ == "__main__":

    member_data = []
    for chamber in chambers:
        for congress_number in congress_numbers:
            time.sleep(3)
            response = requests.get(f"https://api.propublica.org/congress/v1/{congress_number}/{chamber}/members.json", headers=headers_dict)
            if response.ok and response.json()["status"] != 'ERROR':
                members = response.json()["results"][0]["members"]
                if len(members) > 0:
                    currentest_congress = congress_number if congress_number > currentest_congress else currentest_congress
                for member in members:
                    member_data.append({"name": f"{member['first_name']} {member['last_name']}", "chamber": chamber, "congress_no": congress_number, "id":member["id"]})
            else: 
                print("idk if this year exists lmaooo")

    for member in member_data:
        mydb = mysql.connector.connect(
            host="localhost",
            port=3309,
            user="root", 
            password="secret",
            database="ftvBackEnd"
        )
        cursor = mydb.cursor()
        query = """
        INSERT IGNORE INTO
            congressperson(id, name, congress_number, senate)
        VALUES 
            (%s, %s, %s, %s)
        """
        cursor.execute(query, (member["id"], member["name"], member["congress_no"], member["chamber"] == 'senate'))
        mydb.commit()
        mydb.close()
        

    vote_data = []
    for offset in range(0, 100, 20):
        print("offset: ", offset)
        for chamber in chambers:
            response = requests.get(f'https://api.propublica.org/congress/v1/{currentest_congress}/{chamber}/bills/{"active" if chamber.lower == "house" else "passed"}.json?offset={offset}', headers=headers_dict)
            if response.ok and response.json()["status"] == "OK":
                bills = response.json()["results"][0]["bills"]
                for bill in bills:
                    bill_data = {}
                    vote_information = find_vote_information(bill["bill_slug"], currentest_congress, chamber)
                    bill_data["vote_information"] = vote_information
                    if vote_information:
                        bill_data["vote_date"] = vote_information["raw_response"]["date"]
                        bill_data['bill_slug'] = bill['bill_slug']
                        bill_data['bill_id'] = bill['bill_id']
                        bill_data['bill_number'] = vote_information['raw_response']['bill']['number']
                        bill_data['sponsor_id'] = bill["sponsor_id"]
                        bill_data['sponsor_uri'] = bill['sponsor_uri']
                        bill_data['bill_uri'] = bill['bill_uri']
                        bill_data['title'] = bill['title']
                        bill_data['latest_action'] = vote_information['raw_response']['bill']['latest_action']
                        bill_data['short_title'] = bill['short_title']
                        bill_data['primary_subject'] = bill['primary_subject']
                        bill_data["opensecrets_sector_data"] = assign_opensecrets_data(bill["primary_subject"])
                        vote_data.append(bill_data)

            for vote in vote_data:
                bill_insert_query = """
                INSERT IGNORE INTO 
                    bill(id, bill_slug, bill_number, sponsor_id,
                        sponsor_uri, bill_uri, title,
                        latest_action, short_title, primary_subject,
                        opensecrets_sector_prefix, opensecrets_sector,
                        opensecrets_sector_long)
                VALUES
                    (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s)
                """
                mydb = mysql.connector.connect(
                    host="localhost",
                    port=3309,
                    user="root", 
                    password="secret",
                    database="ftvBackEnd"
                )
                cursor = mydb.cursor()
                cursor.execute(bill_insert_query, (
                    vote['bill_id'],
                    vote['bill_slug'],
                    vote['bill_number'],
                    vote['sponsor_id'],
                    vote['sponsor_uri'],
                    vote['bill_uri'],
                    vote['title'],
                    vote['latest_action'],
                    vote['short_title'],
                    vote['primary_subject'],
                    vote["opensecrets_sector_data"][0],
                    vote["opensecrets_sector_data"][1],
                    vote["opensecrets_sector_data"][2]
                ))
                mydb.commit()
                # vote sesh
                cursor.execute('select * from vote_session where date=%s and bill_id=%s', (vote["vote_date"], vote["bill_id"]))
                if len(cursor.fetchall()) < 1:
                    vote_session_query = """
                    INSERT IGNORE INTO 
                        vote_session(date, senate, bill_id)
                    VALUES
                        (%s, %s, %s)
                    """
                    cursor.execute(vote_session_query, (vote["vote_date"], vote["vote_information"]["raw_response"]["chamber"] == "Senate", vote["bill_id"]))
                    vote_id = cursor.lastrowid
                    votes = vote["vote_information"]["vote_dict"]
                    vote_query = """
                    INSERT IGNORE INTO 
                        vote (congressperson_id, vote_session_id, position)
                    VALUES 
                        (%s, %s, %s)
                    """
                    for vote_response in votes:
                        cursor.execute(vote_query, (vote_response, vote_id, votes[vote_response]))
                mydb.commit()
                mydb.close()