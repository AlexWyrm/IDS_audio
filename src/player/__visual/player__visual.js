var drawVisualisation = function (player) {
    var canvas = player.visual.find('canvas');
    var width = canvas.width(), height = canvas.height();
    var canvasCtx = canvas.get()[0].getContext("2d");

    player.analyser.fftSize = 2048;
    var bufferLength = player.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    if (player.drawVisual) {
        window.cancelAnimationFrame(player.drawVisual);
    }

    canvasCtx.clearRect(0, 0, width, height);

    var draw = function () {
        player.drawVisual = requestAnimationFrame(draw);

        player.analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, width, height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = width * 1.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * height / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(width, height / 2);
        canvasCtx.stroke();
    };

    draw();
};