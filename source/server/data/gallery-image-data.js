/* globals module */

'use strict';

module.exports = (models) => {
    let galleryImage = models.GalleryImage;

    return {
        getGalleryImagesByPage(page) {
            page = page || 1;
            const pageSize = 12;

            return new Promise((resolve, reject) => {
                galleryImage.find()
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .exec((err, res) => {
                        if (err) {
                            return reject(err);
                        }

                        galleryImage.count((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            let result = {
                                photos: res,
                                count
                            };

                            return resolve(result);
                        });
                    });
            });
        },
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
                        console.log(err);
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        }
    };
};