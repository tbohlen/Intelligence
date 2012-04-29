function IVisualizer(earth) {
    this.earth = earth;
    this.animals = [];
    this.stage = new Kinetic.Stage({
        container: "canvas"
        , width: earth.board.sideLength*10
        , height: earth.board.sideLength*10
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
    var layer = new Kinetic.Layer();
    for(var i = 0; i < this.earth.board.sideLength; i++) {
        for(var j = 0; j < this.earth.board.sideLength; j++) {
            var color = (this.earth.board.getLocale([i, j]).contents == "food") ? "#AA2222": "#222222";
            var rect = new Kinetic.Rect({
                x: i*20
                , y: j*20
                , width: 20
                , height: 20
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
    var layer = new Kinetic.Layer();
    for(var i = 0; i < this.animals.length; i++) {
        var animal = this.animals[i];
        var rect = new Kinetic.Rect({
            x: (animal.loc[0]*20)+4
            , y: (animal.loc[1]*20)+4
            , width: 12
            , height: 12
            , fill: "#2222AA"
            , strokeWidth: 0
        });
        layer.add(rect);
    }
    this.stage.add(layer);
};