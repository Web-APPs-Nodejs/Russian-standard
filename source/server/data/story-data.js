/* globals module */

'use strict';

module.exports = (models) => {
    let Story = models.Story;

    return {
        addStory(author, title, body, category, pictureUrl) {
            let story = new Story({
                author,
                title,
                body,
                category,
                pictureUrl
            });

            return new Promise((resolve, reject) => {
                story.save((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        getAllStories() {
            return new Promise((resolve, reject) => {
                Story.find((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        getStoriesByPage(page) {
            page = page || 1;
            const pageSize = 12;

            return new Promise((resolve, reject) => {
                Story.find({ hidden: false })
                    .skip((page - 1) * pageSize)
                    .sort({ 'createdOn': -1 })
                    .limit(pageSize)
                    .exec((err, res) => {
                        if (err) {
                            return reject(err);
                        }
                        
                        Story.count({ hidden: false }, (err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            let result = {
                                stories: res,
                                count
                            };

                            return resolve(result);
                        });
                    });
            });
        }
    };
};