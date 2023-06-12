# API Documentation
## Error codes
- 0: no errors
- 1: not found
- 2: invalid request (something wrong with the data provided)
- 3: too much data (character limit exceeded, see [config.md](docs/config.md))
- 4: auth error (provided password is wrong)

## GET `/api/ping`
If everything is working fine, returns
```
{ error: 0 }
```
If something is wrong, the server is most
likely gonna crash and you won't get any answer.

## GET `/api/get/<key>`
Returns the vault associated with the `<key>`
in the following format:
```
{ error: 0, vault: "<data>" }
```
- `<data>`: encrypted vault data

If the vault does not exists, returns:
```
{ error: 1 }
```
## POST `/api/gen`
Generates a vault and returns the vault key.

Body format should be:
```
{ pass: pass }
```
- `<pass>`: Server password specified in the `config.json`

If successful returns:
```
{ error: 0, key: "<key>" }
```

If the provided password does not match with the server 
password, returns:
```
{ error: 4 }
```

## POST `/api/set/<key>`
Sets the data of the vault associated with the `<key>`
to the data provided in the body

Body format should be:
```
{ pass: "<pass>", vault: "<data>" }
```
- `<pass>`: server password, specified in the `config.json`
- `<data>`: vault data will be set to `<data>`

If successful, returns: 
```
{ error: 0 }
```

If the vault does not exists returns:
```
{ error: 1 }
```

If the body is not in the expected format, returns:
```
{ error: 2 }
```

If the `<data>` is over the server limit, returns:
```
{ error: 3 }
```

If the provided password does not match with the server 
password, returns:
```
{ error: 4 }
```
