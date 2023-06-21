# Passctl - Web Server/API
This is the web server for passctl.

## Deploy (Manual)
### Install the [dependencies](docs/depens.md) first!
To deploy the passctl API server:
1. Clone this repository
2. Create a file called config.json
3. Edit the `config.json`, all the
configuration settings are explained in 
in [docs/config.md](docs/config.md) 
5. Run `npm i`
6. Install [pm2](https://www.npmjs.com/package/pm2)
7. Run `pm2 start index.js`
8. 🎉 and its done! You now have a 
running passctl server.

## Advanced
For advanced stuff like setting up a nginx proxy,
see [docs](docs/advanced.md)

## API Documention
Passctl server is really lightweight since it 
just acts like a database for your keys (passwords).

You can learn about the API in the [docs](docs/api.md).


