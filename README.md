# Awesome Password Manager - Web Server/API
This is the web server for Awesome Password Manager.

### Setting Up
You need to specify 
- `PORT`: the port that web server will run on
- `SITE_KEY`: site key for reCAPTCHA
- `PRIV_KEY`: private key for reCAPTCHA
in your `.env` file.
- `SIMPLE`: enables simple mode, in simple
mode theres no static resources and generating
keys does not require reCAPTCHA, if your setting
this server up for your local network you can
set this option to `true`, but if your setting this server
for public use, set it to `false`
- `MAX`: Max storage size limit for one key, in chars
Then install the dependencies with `npm i`
and start the server with `npm run start`

### API Usage
#### Error codes
- 0: no errors
- 1: invalid format (something wrong with parameters)
- 2: not found
- 3: invalid request (something wrong with the data provided)
- 4: too much data (aka if char len is over the limit, see `MAX`)

#### GET `/api/ping`
Returns `{error: 0}`

#### GET `/api/get/<key>`
Returns `{error: 0, data: <data>}` if successful.
Data is stored data of the key, if theres nothing
stored `data` will be equal to `""`

#### POST `/api/set/<key>`
Post data format should be `{data: <data>}`.
Returns `{error: 0}` if successful.
Sets the stored data of the key to the data provided.
