# Endpoint Documentation

|  Route |  Method | Params  | Example output  |
|---|---|---|---|
| v1/topten  | GET  | `cid`: String<BR> OR `name`: String REQUIRED<br> `cycle`: Int OPTIONAL | [{<br>&nbsp;&nbsp;&nbsp; "industry_name": "Misc Business",<br>&nbsp;&nbsp;&nbsp; "industry_code": "N12",<br>&nbsp;&nbsp;&nbsp; "indivs": 100,<br>&nbsp;&nbsp;&nbsp; "pacs":0,<br>&nbsp;&nbsp;&nbsp; "total": 100, <br>&nbsp;&nbsp;&nbsp; "last_updated": "03/22/2021<br>}]|
| v1/addressRepresentative  | GET  | `address`: String REQUIRED<br>Zip code or City, State or full address  | {<br>&nbsp;&nbsp;&nbsp;"officials": [{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"office":"U.S. Senator",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"party": "Democratic Party",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":"Maria Cantwell", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"photoUrl":"url.jpg"<br>&nbsp;&nbsp;&nbsp;}]<br>} |
| v1/representativeDetails  | GET  | `firstName`: String REQUIRED<br>`lastName`: String REQUIRED<br>OR<BR>`fullName`: String REQUIRED  | ![schema for representativeDetails](./images/representativeDetails.png) |
|   |   |   ||
|   |   |   ||