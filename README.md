# Distube Music Bot
Discord Bot for playing music from yt/spotify/soundcloud and other platforms.

## Features
- prefix
- yt/spotify/soundcloud native support
- easy to setup
- using distube, large community

## To Do
- more features?

## How to setup bot?
First of all, you should create your own bot at discord dev page with permissions, then invite him to the server.

```
$ git clone [repo]
$ cd [repo]
$ cd src
$ mv config-example.json config.json
$ vim config.json <- change TOKEN and CLIENTID for your own
$ cd ..
$ docker compose up
```
Done, your bot should be running and ready to play music!
