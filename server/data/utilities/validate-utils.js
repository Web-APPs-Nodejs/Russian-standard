/**
 * Created by admin on 3.12.2016 г..
 */
/* globals module Promise*/

'use strict';

var validateCategoryName = function(category) {
    const defaultCategory = 'ski';

    var _category = defaultCategory;

    if((category == undefined) || (category == null)){

        return _category;
    }
    if(!(category === '')){
        _category = category;
    }

    return _category;
};

var validatePictureObject = function(pictureObj, req) {

    // TODO remove before production :)
    // console.log(JSON.stringify(req.headers));
    // {
    //     "host":"localhost:8081",
    //     "connection":"keep-alive",
    //     "cache-control":"max-age=0",
    //     "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    //     "upgrade-insecure-requests":"1",
    //     "user-agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.107 Safari/537.36",
    //     "accept-encoding":"gzip, deflate, sdch",
    //     "accept-language":"en-US,en;q=0.8,et;q=0.6"
    // }
    //
    // http://localhost:3001/res/images/default-image.png
    const defaultPicture = { src: 'http://' + req.headers.host + '/res/images/default-image.png' };

    var _picture = defaultPicture;

    if((pictureObj == undefined) || (pictureObj == null)){

        return _picture;
    }
    if(!pictureObj.hasOwnProperty('src')){

        return _picture;
    }
    if(!(pictureObj.src === '')){
        _picture.src = pictureObj.src;
    }

    return _picture;
};

var isValidCommentBodyString = function(commentBody) {

    if((commentBody == undefined) || (commentBody == null)){

        return Promise.resolve(false);
    }
    if(!(commentBody === '')){

        return Promise.resolve(false);
    }
    if(!(commentBody.length() > 200)){

        return Promise.resolve(false);
    }

    return Promise.resolve(true);
};

module.exports.validate = {
    categoryName: validateCategoryName,
    pictureObject: validatePictureObject,
    isValidCommentBodyString: isValidCommentBodyString
};

