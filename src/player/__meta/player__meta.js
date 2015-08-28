var loadMetadata = function (player) {
    return function (fileType, buffer) {
        var meta;
        if (fileType === 'ogg') {
            meta = AudioMetadata.ogg(buffer);
        } else if (fileType == 'mp3') {
            meta = AudioMetadata.id3v2(buffer);
        }
        if (meta && (meta.title || meta.artist)) {
            player.meta.html(meta.artist + " " + meta.title);
        } else {
            player.meta.html("Can't load metadata from file");
        }
    }
};