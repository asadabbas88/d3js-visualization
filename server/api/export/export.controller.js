'use strict';

var phantom = require('phantom');
var fs = require('fs');

exports.exportAsImage = function (req, res) {


    phantom.create(function (ph) {
        ph.createPage(function (page) {
			page.set('viewportSize',{
			  // 20px was added as it was cutting some part on right in word cloud
			  width: parseInt(req.body.width) + 20,
			  height: 387
			});
            page.set('onLoadFinished', function (status) {
                var outputFile = '/tmp/temp'+new Date().getTime()+'.' + req.body.format;
                page.render(outputFile, function(finished){
               		res.download(outputFile, req.body.filename + '.' + req.body.format, function(err){
				  		if (err) {
						    console.log('Error in downloading file: ' + err);
				  		}else{
				  			fs.unlink(outputFile);
				  		}
				  	});
                    ph.exit();
                });
            });
            page.set('content', req.body.html);
        });
    });
};
