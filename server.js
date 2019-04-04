var express   = require('express');
server 				= express(),
port 					= process.env.PORT || 3001;

var SigTrafficPayLoad = require('sigsystem-payloads-sigtraffic');

var sigtraffic 		= {};
sigtraffic.config  	= {
										  timezone: -3,
										  sensivity: 30,
										  pendingConfig: 1,
										  workInterval1: 86400,
										  workInterval2: 86400,
	  									calibrate: 1,
	  									axis: 0,
	  									resetCount: 1,
	  									worktime: [ 
	      													{ start: 0, end: 24 }, 
	      													{ start: 0, end: 24 }, 
	      													{ start: 0, end: 24 }, 
	      													{ start: 0, end: 24 }, 
	      													{ start: 0, end: 24 }, 
	      													{ start: 0, end: 24 }, 
	      													{ start: 0, end: 24 }
	  														]
										};

server.route('/')
  .get(function(req, res) {
  	res.json('SigTraffic Server 1.0');
  })

server.route('/sigfox/uplink')
  .get(function(req, res) {
  	var payload = new SigTrafficPayLoad(req.param('data'));
  	var data 		= payload.getDataMessage();

  	switch(data.header.frame) {
  		case 6: // TRAFFIC_FRAME
  			console.log('TRAFFIC_FRAME', data);

  			res.json({ });
  		break;

  		default:
  			res.json({ });
  		break;
  	}

  	// res.json({ });    
  })

server.route('/sigfox/downlink')
  .get(function(req, res) {
  	var device 	= req.param('device');
    var payload = new SigTrafficPayLoad(req.param('data'), sigtraffic);
  	var data 		= payload.getDataMessage();

  	var result			= {};
  	result[device] 	= { downlinkData: "0000000000000000"};

  	switch(data.header.frame) {
  		case -1: //REQUEST_CONFIG
  			console.log('REQUEST_CONFIG', payload.getDownlinkData());
  			result[device].downlinkData = payload.getDownlinkPayload();
  		break; 

  		case 3: //CONFIG_REPORT_FRAME
  			console.log('CONFIG_REPORT_FRAME', payload.getDownlinkData(), payload.getDataMessage());
  			result[device].downlinkData = payload.getDownlinkPayload();
  		break;

  		default:
  			
  		break;
  	}

  	res.json(result);
  })

server.listen(port);

console.log('server started', 'port', port);
