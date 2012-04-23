function IVisualizer(earth) {
    this.earth = earth;
    this.animals = [];
    this.stage = new Kinetic.Stage({
        container: "canvas",
        width: earth.board.sideLength*10,
        height: earth.board.sideLength*10
    });
    this.bg = new Kinetic.Layer();
    var bgRect = new Kinetic.Rect({
        x: 0
        , y: 0
        , width: earth.board.sideLength*10
        , height: earth.board.sideLength*10
        , fill: "#BBBBBB"
        , strokeWidth: 0
    });
    this.bg.add(bgRect);
    this.stage.add(this.bg);
}

IVisualizer.prototype.draw = function () {
    this.clearScreen();
    this.drawWorld();
    this.drawAnimals();
};

IVisualizer.prototype.clearScreen = function () {
    this.stage.clear();
    this.stage.add(this.bg);
};

IVisualizer.prototype.drawWorld = function () {
    var layer = new Kinect.Layer();
    for(var i = 0; i < this.earth.board.sideLength; i++) {
        for(var j = 0; j < this.earth.board.sideLength; j++) {
            var color = (this.earth.board.getLocale([i, j]).contents == "food") ? "#AA2222": "#222222";
            var rect = new Kinect.Rect({
                x: i*10
                , y: j*10
                , width: 10
                , height: 10
                , fill: color
                , stroke: "#000000"
                , strokeWidth: 1
            });
            layer.add(rect);
        }
    }
    this.stage.add(layer);
};

IVisualizer.prototype.drawAnimals = function() {
    var layer = new Kinect.Layer();
    for(var i = 0; i < this.animals.length; i++) {
        var animal = this.animals[i];
        var rect = new Kinect.Rect({
            x: (animal.loc[0]*10)+2
            , y: (animal.loc[1]*10)+2
            , width: 6
            , height: 6
            , fill: "#2222AA"
            , strokeWidth: 0
        });
        layer.add(rect);
    }
    this.stage.add(rect);
};