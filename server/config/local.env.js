'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.


module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "Angular-visualization-module-secret",
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  STORMPATH_API_KEY_ID: '2S5P7N5WVZX3VMPZWNDOJDY1W',
  STORMPATH_API_KEY_SECRET: 'Jp3Mkpx0APcRCPR+nx0MhHjO0bdL4zsrdv9kBNZgwQI',
  STORMPATH_APP_HREF: 'https://api.stormpath.com/v1/applications/6u3t7yPzRiwgQ4lpvvV6hd'
};
