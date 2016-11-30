/**
 * Created by admin on 28.11.2016 г..
 */
/*globals module*/

'use stict';

class ProfilePicture{
    constructor(src, alt){

        // TODO validate
        if(src == null || src === '' || src == undefined){
            src = 'http://www.freelanceme.net/Images/default%20profile%20picture.png';
        }
        if(alt == null || alt == undefined){
            alt = '';
        }
        this._src = src;
        this._alt = alt;
    }

    get Src() {
        return this._src;
    }

    get Alt() {
        return this._alt;
    }

    get getHtmlElement(){
        var htmlElementToReturn = '<img src="' + this._src + '" alt="' + this._alt + '">';

        return htmlElementToReturn;
    }

}

module.exports.ProfilePicture = ProfilePicture;