var loadFilename = function (player) {
    return function (file) {
        player.filename.html(file.name);
    };
};