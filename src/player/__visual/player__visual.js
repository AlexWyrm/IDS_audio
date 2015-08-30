var drawVisualisation = function (player) {
    var canvas = player.visual.find('canvas').get(0);
    var width = canvas.clientWidth, height = canvas.clientHeight;
    canvas.width = width, canvas.height = height;
    var canvasCtx = canvas.getContext("2d");

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

        var sliceWidth = width / (bufferLength - 1);
        var x = 0;

        for (var i = 0; i < bufferLength - 1; i++) {

            var y = dataArray[i] / 256.0 * height;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.stroke();
    };

    draw();
};