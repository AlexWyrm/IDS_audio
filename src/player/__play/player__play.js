var togglePlayback = function (player) {
    return function () {
        if (!player.playing) {
            player.startPos = player.audioCtx.currentTime;
            var oldSource = player.source;
            player.source = player.audioCtx.createBufferSource();
            player.source.buffer = oldSource.buffer;
            player.source.loop = true;
            player.source.connect(player.analyser);
            player.source.start(0, player.currentPos % player.source.buffer.duration);
            player.playing = true;
        } else {
            player.source.stop(0);
            player.source.disconnect();
            player.currentPos += player.audioCtx.currentTime - player.startPos;
            player.playing = false;
        }
        changeGlyph(player);
    };
};

var initTogglePlaybackControls = function (player) {
    player.play.on('click', 'button', player.togglePlayback);
};
