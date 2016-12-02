/* globals module */

'use strict';

module.exports = (models) => {
    let galleryImage = models.GalleryImage;

    return {
        getAllGalleryImages() {
            return new Promise((resolve, reject) => {
                galleryImage.find((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        addGalleryPhoto(url, title, author, category) {
            return new Promise((resolve, reject) => {
                let image = new galleryImage({
                    url,
                    title,
                    author,
                    category
                });

                image.save((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        }
    };
};