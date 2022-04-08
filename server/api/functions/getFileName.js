module.exports = function(data) {
    const mimeTypesExtArray = {
        'image/bmp': '.bmp',
        'image/gif': '.gif',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/svg+xml': '.svg',
        'image/tiff': '.tif'
    };

    const fileExt = mimeTypesExtArray[data.body.picType];
    const fileName = data.body.userName + '_' + data.body.userId;

    return fileName + fileExt;
}