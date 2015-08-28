var stopPlayback = function (player) {
    return function () {
        if (player.playing) {
            player.source.stop(0);
            player.source.disconnect();
            player.playing = false;
            changeGlyph(player);
        }
        player.currentPos = 0;
    }
};

var initStopPlaybackControls = function (player) {
    player.stop.on('click', 'button', player.stopPlayback);
};