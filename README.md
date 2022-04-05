
# API SET
Express APIs for Frontend applications.
This App displays the real time information and location of the Satellites above you.<br/>
We use N2YO APIs to extract data, that data is used to calculate the real x, y, z coordinates.<br/>
URL: https://new-api-name.herokuapp.com<br/>
```
GET '/', Responds with author name:
		{
		  "title": "my-api",
		  "author": "swapnil",
		  "email": "------------",
		  "build": {---}
		}
```
```
GET '/googleTop/:{search_string}', Returns top 5 google searches for the reference string:
		{
		"message": "found",
		"data": [---]
		}
```
```
GET '/users', For API Authrisation
```
```
GET '/checkout', For API Authrisation
```
```
GET '/webhook', For API Authrisation
```
```
GET '/getapikey', Responds with API key
```
```
POST '/portefeuille', Responds with sucess status as the user is logged in the database
```
```
POST '/register', Responds with sucess status as the user is logged in the database
```
```
POST '/csvtojson', Responds with JSON version of csv document
```
```
GET '/info', Return basic author info
		{
			"author": "swapnil sharma",
			"version": "1.2",
			"message": {
					"string": "hey! greate seeing you here"
			}
		}
```
```
GET '/location/raw', Returns Satellites x, y, z coordinates
		[
			[

			-0.08245593237299025,

			0.9965443015242701,

			506.6124,

			"GALASSIA"

			],-----
		]
```
```
GET '/location',  Returns Satellites raw information
		{
		    "info": {
		        "category": "Amateur radio",
		        "transactionscount": 8,
		        "satcount": 19
		    },
		    "above": [
		        {
		            "satid": 1293,
		            "satname": "OSCAR 3",
		            "intDesignator": "1965-016F",
		            "launchDate": "1965-03-09",
		            "satlat": 2.8297,
		            "satlng": -33.6333,
		            "satalt": 881.6112
		        },---
		    ]
		}
```

## References

This uses the ‘haversine’ formula to calculate the great-circle distance between two points – that is, the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points (ignoring any hills they fly over, of course!).<br/>

**Haversine formula**:	
```
a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
c = 2 ⋅ atan2( √a, √(1−a) )
d = R ⋅ c
```
where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);<br/>
note that angles need to be in radians to pass to trig functions!<br/>
**JavaScript**:	<br/>
```
const R = 6371e3; // metres
const φ1 = lat1 * Math.PI/180; // φ, λ in radians
const φ2 = lat2 * Math.PI/180;
const Δφ = (lat2-lat1) * Math.PI/180;
const Δλ = (lon2-lon1) * Math.PI/180;

const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2)
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

const d = R * c; // in metres

const  llarToWorld  = (satlat, satlng, satalt, rad, name) => {
			x =  Math.sin(satlng) *  Math.cos(satlat)
			z =  Math.sin(satlng) *  Math.sin(satlat)
			y =  Math.cos(satlng)
			return [x , y , satalt, name]
			}
			
var  main  = (data) => {
	var  data2  =  data['above']
	var  p  = []
	data2.map((r) => {
	p.push(llarToWorld(r['satlat'],r['satlng'],r['satalt'],1,r['satname'] ))
})
	return  p;
}
```
***Note in these scripts, I generally use lat/lon for lati­tude/longi­tude in degrees, and φ/λ for lati­tude/longi­tude in radians – having found that mixing degrees & radians is often the easiest route to head-scratching bugs...***<br/>


## Getting Started with Node App

This project was bootstrapped with Express.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will relaunch if you make edits.

## Learn More

VISIT: https://nodejs.dev/learn


