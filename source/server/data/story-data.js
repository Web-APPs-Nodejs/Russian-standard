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
            const pageSize = 8;

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
        },
        getStoryById(storyId) {
            return new Promise((resolve, reject) => {
                Story.findOne({ _id: storyId }, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        likeOrDislikeStory(storyId, user) {
            return new Promise((resolve, reject) => {
                Story.findOne({ _id: storyId }, (error, story) => {
                    if (error) {
                        return reject(error);
                    }

                    if (!story.likes.includes(user.username)) {
                        story.likes.push(user.username);
                    }
                    else {
                        let index = story.likes.indexOf(user.username);
                        story.likes.splice(index, 1);
                    }

                    story.save((err, res) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }

                        return resolve(res);
                    });
                });
            });
        },
        deleteStory(storyId) {
            return new Promise((resolve, reject) => {
                Story.findOne({ _id: storyId }, (err, story) => {
                    story.hidden = true;
                    story.save((error, res) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(res);
                    });
                });
            });
        }
    };
};