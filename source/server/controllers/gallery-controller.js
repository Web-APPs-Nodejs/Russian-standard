/* globals module require */

'use strict';

const characterEscaper = require('../utils/character-escaper');

module.exports = (data) => {
    return {
        getGalleryPage(req, res) {
            const page = +req.query.page || 1;
            let totalPagesCount;
            let pageSize = 12;

            data.getGalleryImagesByPage(page)
                .then(photosObj => {
                    totalPagesCount = Math.ceil(photosObj.count / pageSize);
                    res.render('gallery/gallery', { galleryImages: photosObj.photos, page, totalPagesCount, user: req.user });
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        },
        getAddGalleryPhotoPage(req, res) {
            if (req.isAuthenticated()) {
                res.render('gallery/add-photo', { user: req.user });
            }
            else {
                res.render('auth-not-authorised-page', { user: req.user });
            }
        },
        addGalleryPhoto(req, res) {
            Object.keys(req.body)
                .forEach(key => {
                    req.body[key] = characterEscaper(req.body[key]);
                });

            data.addGalleryPhoto(req.body.url, req.body.title, req.user.username, req.body.category)
                .then(success => {  
                    let query = {
                        addedPhotos: req.user.addedPhotos || []
                    };

                    query.addedPhotos.push(success._id);
                    data.updateUserInfo(req.user, query);
                    
                    res.status(201).json(success);   
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        },
        getSinglePhotoPage(req, res) {
            let imageId = req.params.id;

            data.getGalleryPhotoById(imageId)
                .then((image) => {
                    res.render('gallery/single-photo-page', { user: req.user, image });
                })
                .catch((err) => {
                    console.log(err);

                    res.status(404).json('No such item found!');
                });
        }
    };
};