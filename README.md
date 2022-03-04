# reboot-bot : Staff

WIP bot to add a fast reboot for devious staff (minecraft community)
uses AMP API to control ADS controlled instances
## How to install and run

- install node at https://nodejs.org/en/download/   (latest)
- clone this project into a folder
- using a terminal navigate to that folder
- run the command ``npm install``
- once that is done, run the command ``npm start``
- if you have done everything correctly you should get a message saying: `bot is ready to roll`

## Configuration

all the bot configuration is stored in a .env file
with this structure

```
DISCORD_TOKEN=
AMP_USER=
AMP_PASSWORD=
AMPIP=
```
DISCORD_TOKEN is the bot discord token

AMP_USER is the AMP username

AMP_PASSWORD is the AMP password

AMPIP is the AMP ip address + port, example: 127.0.0.1:8080

## Updating

to edit servers from context menu or add them, the file is commands/voteReboot.js

to add a new server, append this right under ``addOptions``

```
{
    label: 'Name to show in context menu',
    description: 'description of the action',
    value: 'same as label,Instance name CASE SENSITIVE',
},
```
do note that the comma at the end is important

knowing this you can edit entries aswell