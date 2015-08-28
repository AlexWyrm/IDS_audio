var changeGlyph = function (player) {
    if (player.playing) {
        $(player.play).find('.glyphicon').switchClass('glyphicon-play', 'glyphicon-pause');
    } else {
        $(player.play).find('.glyphicon').switchClass('glyphicon-pause', 'glyphicon-play');
    }
};

var initControls = function (player) {
    player.setControlsDisabled = function (value) {
        var buttons = player.main.find('.player__play button, .player__stop button');
        if (value) {
            buttons.addClass('disabled');
        } else {
            buttons.removeClass('disabled');
        }
        buttons.prop('disabled', value);
    };
    player.setControlsDisabled(true);
};