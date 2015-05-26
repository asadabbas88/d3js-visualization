Install Node
============

curl -sL https://rpm.nodesource.com/setup | bash -
yum install -y nodejs
npm install -g grunt-cli
npm install -g bower



Setup/Run project
=================

-- Clone project 
git clone https://gitlab.com/Webxity/d3js-visualization.git

-- download dependencies
bower install --allow-root
npm install

-- run server in background
nohup grunt serve --force & 