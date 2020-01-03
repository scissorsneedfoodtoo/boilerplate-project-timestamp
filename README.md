# APIs and Microservices 1: Timestamp Microservice

### User stories:
1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)`. Note that the Unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (`"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be set to the equivalent of `new Date()` to get the current timestamp.
4. If the date string is **valid** the API should return a JSON response with the Unix timestamp and UTC string for that date. Example: `{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
5. If the date string is invalid the API should return the following response: `{"error" : "Invalid Date" }`

#### Example usage:
* [project url]/api/timestamp/2015-12-15
* [project url]/api/timestamp/1450137600000

#### Example output:
* { "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }