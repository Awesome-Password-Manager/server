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
Will be documented soon...
