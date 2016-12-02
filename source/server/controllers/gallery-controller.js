/* globals module */

'use strict';

module.exports = (data) => {
    return {
        getGalleryPage(req, res) {
            data.getAllGalleryImages()
                .then(galleryImages => {
                    res.render('gallery/gallery', { galleryImages: galleryImages, user: req.user });
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        },
        getAddGalleryPhotoPage(req, res) {
            res.render('gallery/add-photo', { user: req.user });
        },
        addGalleryPhoto(req, res) {            
            data.addGalleryPhoto(req.body.url, req.body.title, req.user.username, req.body.category)
                .then(console.log)
                .catch(console.log);
        }
    };
};