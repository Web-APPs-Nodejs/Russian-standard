/* globals module */

'use strict';

module.exports = (models) => {
    let GalleryImage = models.GalleryImage;

    return {
        getGalleryImagesByPage(page) {
            page = page || 1;
            const pageSize = 12;

            return new Promise((resolve, reject) => {
                GalleryImage.find()
                    .skip((page - 1) * pageSize)
                    .sort({ 'createdOn': -1 })
                    .limit(pageSize)
                    .exec((err, res) => {
                        if (err) {
                            return reject(err);
                        }

                        GalleryImage.count((err, count) => {
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
                GalleryImage.find((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        addGalleryPhoto(url, title, author, category) {
            return new Promise((resolve, reject) => {
                let image = new GalleryImage({
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
        },
        getGalleryPhotoById(id) {
            return new Promise((resolve, reject) => {
                GalleryImage.findOne({ _id: id }, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        }
    };
};