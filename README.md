SigTraffic Server
===================================

SigTraffic sigfox server for testing.

## Installation

### [Node.js](http://nodejs.org/):

~~~
git clone https://github.com/Sigmais/SigTraffic-Server.git 
cd SigTraffic-Server
npm install
npm start
~~~

## Usage

You can test the server accessing the follow links

* device = 43CDADA
* base URL = http://127.0.0.1:3001

- **CONFIG_REPORT_FRAME** = /sigfox/downlink?device=43CDADA&data=030205
- **REQUEST_CONFIG** = /sigfox/downlink?device=43CDADA&data=00
- **TRAFFIC_FRAME** = /sigfox/uplink?device=43CDADA&data=2E0200000700002C0200222A
