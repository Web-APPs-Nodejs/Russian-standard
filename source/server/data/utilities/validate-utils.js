/**
 * Created by admin on 3.12.2016 г..
 */
/* globals module Promise*/

'use strict';

var validateCategory = function(category) {
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

var validatePicture = function(pictureObj) {
    const defaultPicture = { src: '/res/images/default-picture.png' };

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

module.exports.validate = {
    category: validateCategory,
    picture: validatePicture
};

