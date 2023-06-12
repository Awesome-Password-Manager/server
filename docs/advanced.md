# Setting up a nginx proxy
You can proxy your passctl server with nginx.
To do so, first install nginx:

## Debian/Ubuntu
```
sudo apt update
sudo apt install nginx
```

## CentOS/Fedora/RHEL
```
sudo dnf install nginx 
```

## Arch Linux
```
sudo pacman -Syy
sudo pacman -S nginx
```

After installing nginx, unlink the default config:
```
sudo unlink /etc/nginx/sites-available/default
```

Then you can create a new configuration file and 
open it:
```
sudo vim /etc/nginx/sites-available/server.config 
```

Inside this file paste the following: 
```
server {
  listen 80;
    
  server_name YOUR_DOMAIN_HERE;
    
  location / {
    proxy_pass http://localhost:SERVER_PORT_HERE;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
Change the settings needed, then you can save the
file and exit vim.

Then you can link this new configuration to 
`sites-enabled`:
```
sudo ln -s /etc/nginx/sites-available/server.config /etc/nginx/sites-enabled/server.config
```

And lastly restart and enable the nginx service:
```
sudo systemctl restart nginx
sudo systemctl enable nginx
```

Now if you visit your domain you should see the 
passctl server running.
