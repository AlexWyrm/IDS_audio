/*
 * DISCLAIMER: I have no knowledge of sound theory, so I have no idea how biquad filter works.
 * I didn't find any pre-made filters, so I made these as proof-of-concept. Rock equalizer especially makes
 * different sound from default equalizer.
 * */

var defaultEqualizer = function (player) {
    this.init = function () {
        player.analyser.connect(player.gain);
    };

    this.destroy = function () {
        player.analyser.disconnect();
    }
};

var jazzEqualizer = function (player) {
    this.init = function () {
        this.filter = player.audioCtx.createBiquadFilter();
        this.filter.type = 'highshelf';
        this.filter.frequency = 2000;
        this.filter.gain = 25;

        player.analyser.connect(this.filter);
        this.filter.connect(player.gain);
    };

    this.destroy = function () {
        player.analyser.disconnect();
        this.filter.disconnect();
    }
};

var rockEqualizer = function (player) {
    this.init = function () {
        this.lowRolloff = player.audioCtx.createBiquadFilter();
        this.lowRolloff.type = 'highpass';
        this.lowRolloff.frequency = 30;

        this.highRolloff = player.audioCtx.createBiquadFilter();
        this.highRolloff.type = 'lowpass';
        this.highRolloff.frequency = 16000;

        this.midAttenuation = player.audioCtx.createBiquadFilter();
        this.midAttenuation.type = 'notch';
        this.midAttenuation.frequency = 400;

        this.highPeak = player.audioCtx.createBiquadFilter();
        this.highPeak.type = 'peaking';
        this.highPeak.frequency = 8500;

        this.lowPeak = player.audioCtx.createBiquadFilter();
        this.lowPeak.type = 'peaking';
        this.lowPeak.frequency = 80;

        player.analyser.connect(this.lowRolloff);
        this.lowRolloff.connect(this.highRolloff);
        this.highRolloff.connect(this.midAttenuation);
        this.midAttenuation.connect(this.lowPeak);
        this.lowPeak.connect(this.highPeak);
        this.highPeak.connect(player.gain);
    };

    this.destroy = function () {
        player.analyser.disconnect();
        this.highPeak.disconnect();
    }
};

var equalizers = {
    'default': defaultEqualizer,
    'jazz': jazzEqualizer,
    'rock': rockEqualizer
};

var initEqualizer = function (player) {
    player.setEqualizer = function (equalizer) {
        if (player.equalizerNodes) {
            player.equalizerNodes.destroy();
        }
        player.equalizerNodes = new equalizers[equalizer](player);
        player.equalizerNodes.init();
        player.equalizer.find('.selected').removeClass('selected');
        player.equalizer.find("*[data-equalizer='" + equalizer + "']").addClass('selected');
    };
    player.equalizer.on('click', '*[data-equalizer]', function (e) {
        player.setEqualizer(e.target.getAttribute('data-equalizer'));
    });
    player.setEqualizer('default');

};