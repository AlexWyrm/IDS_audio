playersObjs = [];

var initPlayerObj = function (player) {

    var playerObj = function (player) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        this.gain = this.audioCtx.createGain();
        this.gain.connect(this.audioCtx.destination);
        this.main = $(player);
        this.play = this.main.find(".player__play");
        this.filename = this.main.find(".player__filename");
        this.equalizer = this.main.find(".player__equalizer");
        this.meta = this.main.find(".player__meta");
        this.stop = this.main.find(".player__stop");
        this.title = this.main.find(".player__title");
        this.visual = this.main.find(".player__visual");
        this.open = this.main.find(".player__open");
        this.currentPos = 0;
        this.playing = false;

        this.loadFilename = loadFilename(this);
        this.loadFile = loadFile(this);
        this.stopPlayback = stopPlayback(this);
        this.togglePlayback = togglePlayback(this);
        this.loadMetadata = loadMetadata(this);
    };

    var instance = new playerObj(player);
    playersObjs.push(instance);

    initTogglePlaybackControls(instance);
    initStopPlaybackControls(instance);
    initLoadFileControls(instance);
    initControls(instance);
    drawVisualisation(instance);
    initEqualizer(instance);
};

window.addEventListener('load', function () {
    var players = document.getElementsByClassName("player");
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        initPlayerObj(player);
    }
});