var loadFile = function (player) {
    return function (file) {
        if (player.source)
            this.stopPlayback();
        var fileReader = new FileReader();
        fileReader.onload = function () {
            var audioData = fileReader.result;
            player.audioCtx.decodeAudioData(audioData, function (decodedData) {
                    if (player.source)
                        player.source.disconnect();
                    player.source = player.audioCtx.createBufferSource();
                    player.source.buffer = decodedData;
                    player.loadFilename(file);
                    player.loadMetadata(file.name.substr(file.name.lastIndexOf(".") + 1), audioData);
                    player.setControlsDisabled(false);
                },
                function (e) {
                    //todo
                });
        };
        fileReader.readAsArrayBuffer(file);
    };
};

var initLoadFileControls = function (player) {
    var input = player.open.find('input');

    player.open.on('change', 'input', function (e) {
        player.loadFile(e.target.files[0]);
    });

    player.open.on('click', 'button', function (e) {
        input.click();
        e.preventDefault();
    });

    player.main.on("dragenter", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    player.main.on("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    player.main.on("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();

        player.loadFile(e.originalEvent.dataTransfer.files[0]);
    });
};