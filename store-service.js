const fs = require('fs');
let items = [];
let categories = [];


function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/items.json', 'utf8', (err, data) => {
            if (err) {
                reject("unable to read items file");
                return;
            }

            items = JSON.parse(data);

            fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                if (err) {
                    reject("unable to read categories file");
                    return;
                }

                categories = JSON.parse(data);
                resolve();
            });
        });
    });
}


function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length === 0) {
            reject("no results returned");
        } else {
           
            const itemsWithCategories = items.map(item => {
                const category = categories.find(cat => cat.id === item.category);
                return { ...item, categoryName: category ? category.category : 'Unknown' };
            });
            resolve(itemsWithCategories);
        }
    });
}


function getPublishedItems() {
    return new Promise((resolve, reject) => {
        let publishedItems = items.filter(item => item.published === true);

        if (publishedItems.length === 0) {
            reject("no results returned");
        } else {
           
            const itemsWithCategories = publishedItems.map(item => {
                const category = categories.find(cat => cat.id === item.category);
                return { ...item, categoryName: category ? category.category : 'Unknown' };
            });
            resolve(itemsWithCategories);
        }
    });
}


function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("no results returned");
        } else {
            resolve(categories);
        }
    });
}

module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};
