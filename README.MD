# Searchblox d3js-visualization

### Install Node

```sh
curl -sL https://rpm.nodesource.com/setup | bash -
yum install -y nodejs
npm install -g grunt-cli
npm install -g bower

```

### Install g++

g++ is required for some node modules compilation

```sh
sudo yum install gcc-c++
```

### Install phantomjs

phantomjs is required for server side image export

Follow link http://www.bonusbits.com/wiki/HowTo:Install_PhantomJS_on_CentOS

Also install font package

```sh
yum install urw-fonts
```

###Setup/Run project

##### Clone project
```sh
git clone https://github.com/searchblox/d3js-visualization.git
```

##### download dependencies
```sh
bower install --allow-root
npm install
```

##### run server in background
```sh
nohup grunt serve --force & 
```
### Stormpath Settings

#### Configuration
Create an account on http://www.stormpath.com
Create an application.
Replace following stormpath API application properties in server/config/local.env.js with that of your Application.

```
  STORMPATH_API_KEY_ID: '62DXM2KQZT51XPSUD1W9I7WZH',
  STORMPATH_API_KEY_SECRET: 'CuCqd1myqVbUBkyzg70Qpv4qwTL/fsqY+MUqmfh0GN0',
  STORMPATH_APP_HREF: 'https://api.stormpath.com/v1/applications/1o0G22UUCLY9RnKpxwC9qE'
```

#### Adding a new company
First create an Application if not already. For adding a new company create a new Directory in it with the company name. Also create a group with name 'Viewer' in it. Currently the rights are only to Viewer group for viewing visualization.

Goto Directories -> Your Directory name and set following key values in custom data.

collectionId=[Companys CollectionId] for e.g. collectionId=1

logoUrl=[Companys logo url] for e.g. logoUrl=http://www.searchblox.com/wp-content/uploads/2013/03/retina_header_logo1.gif

#### Password reset return url
For setting password reset go to Directories -> Your Company Directory name -> Workflows -> Password reset tab and change link base url.

This is the url which user will get in email for reseting his password after he clicks on forgot password.
