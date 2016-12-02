/* globals module require */

'use strict';

const characterEscaper = require('../utils/character-escaper');

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
            Object.keys(req.body)
                .forEach(key => {
                    req.body[key] = characterEscaper(req.body[key]);
                });

            data.addGalleryPhoto(req.body.url, req.body.title, req.user.username, req.body.category)
                .then(success => {
                    res.status(201).json(success);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    };
};