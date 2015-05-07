'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.


module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "Angular-visuliztion-module-secret",
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  STORMPATH_API_KEY_ID: '62DXM2KQZT51XPSUD1W9I7WZH',
  STORMPATH_API_KEY_SECRET: 'CuCqd1myqVbUBkyzg70Qpv4qwTL/fsqY+MUqmfh0GN0',
  STORMPATH_APP_HREF: 'https://api.stormpath.com/v1/applications/2tHDuNzRqL2CbJdBDPupZQ'
};
