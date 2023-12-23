function display(src) {
  var audio = new Audio('../static/connect.wav');
  let img = new Image();
  
  img.src = src;

  console.log(img.width, img.height, img.width / img.height, Math.round(4 / img.width * img.height))

  img.onload = () => {
    const autogen = new headbreaker.Canvas('canvas', {
      // width: screen.width, height: screen.height,
      width: window.innerWidth, height: window.innerHeight,
      pieceSize: 75, proximity: 20,
      borderFill: 75*0.3-13.5, strokeWidth: 1.5,
      lineSoftness: 0.18, image: img,
    });

    autogen.adjustImagesToPuzzleHeight();
    if (!Math.round(img.width / img.height) > img.width / img.height) autogen.adjustImagesToPuzzleWidth();

    autogen.autogenerate({
      horizontalPiecesCount: 4,
      verticalPiecesCount: Math.round(4 / img.width * img.height)
    });
    autogen.shuffleGrid();
    autogen.draw();

    autogen.onConnect((_piece, figure, _target, targetFigure) => {
      // play sound
      audio.play();

      // paint borders on click
      // of conecting and conected figures
      figure.shape.stroke('yellow');
      targetFigure.shape.stroke('yellow');
      autogen.redraw();

      setTimeout(() => {
        // restore border colors
        // later
        figure.shape.stroke('black');
        targetFigure.shape.stroke('black');
        autogen.redraw();
      }, 200);
    });

    autogen.onDisconnect((it) => {
      audio.play();
    });

    autogen.attachSolvedValidator();
    autogen.onValid(() => {
      console.log('Solved!')
    })
  }

}