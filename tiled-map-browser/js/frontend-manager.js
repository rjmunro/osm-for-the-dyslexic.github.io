(function(window, document, exportName, undefined) {
    "use strict";
    
    var mapCanvas = null;
    var idCanvas = null;
    var buttonsDiv = null;
    
    function onPan(deltaX,deltaY){
        eraseMapCanvas();
        printMessageOnMapCanvas("Function: "+"onPan(" + deltaX + "," + deltaY + ")\n" + Date());
    }
    
    function onZoom(deltaZ){
        eraseMapCanvas();
        printMessageOnMapCanvas("Function: "+"onZoom(" + deltaZ +")\n" + Date());    
    }
    
    function onIdentify(canvasPosX,canvasPosY){
        eraseMapCanvas();
        printMessageOnMapCanvas("Function: "+"onIdentify(" + canvasPosX + "," + canvasPosY + ")\n" + Date());
    }
    
    /**
     * viewport height and width
     * support method
     */
    function viewport() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    }

    /**
     * Create Map canvas and Id canvas
     */
    function createChilds(mainElementId){
        var mainElement = document.getElementById(mainElementId);
        mapCanvas = document.createElement("canvas");
        mapCanvas.id = "map-canvas";
        idCanvas = document.createElement("canvas");
        idCanvas.id = "id-canvas";
        buttonsDiv = document.createElement("div");
        buttonsDiv.id = "buttons-div";
        mainElement.appendChild(buttonsDiv);
        mainElement.appendChild(idCanvas);
        mainElement.appendChild(mapCanvas);
    }
    
    /**
     * Resize Map and id canvas to full screen
     */
    function arrangeGui(){
        // split in support method with param
        var buttonsDimension = 40;
        var viewportWidth = viewport().width;
        var viewportHeight = viewport().height;
        
        var mapWidth = viewportWidth;
        var mapHeight = viewportHeight;
        var buttonWidth = viewportWidth;
        var buttonHeight = viewportHeight;
        var buttonTop = 0;
        var buttonLeft = 0;
        
        
        if (viewportWidth > viewportHeight){
            // buttons on right
            mapWidth -= buttonsDimension;
            buttonWidth = buttonsDimension;
            buttonLeft = mapWidth;
            
        } else {
            // buttons on bottom
            mapHeight -= buttonsDimension;
            buttonHeight = buttonsDimension;
            buttonTop = mapHeight;
        }
        
        mapCanvas.style.width = "" + mapWidth + "px";
        mapCanvas.style.height = "" + mapHeight + "px";
        var context = mapCanvas.getContext("2d");
        context.canvas.width  = "" + mapWidth + "";
        context.canvas.height = "" + mapHeight + "";
        idCanvas.style.width = "" + mapWidth + "px";
        idCanvas.style.height = "" + mapHeight + "px";
        var context2 = idCanvas.getContext("2d");
        context2.canvas.width  = "" + mapWidth + "";
        context2.canvas.height = "" + mapHeight + "";
        eraseMapCanvas();
        buttonsDiv.style.height = "" + buttonHeight + "px";
        buttonsDiv.style.width = "" + buttonWidth + "px";
        buttonsDiv.style.top = "" + buttonTop + "px";
        buttonsDiv.style.left = "" + buttonLeft + "px";
        
        printMessageOnMapCanvas("Function: "+"arrangeGui" + "\n" + Date());
    }
    
    /**
     * Support method to completly erase the map canvas
     */
    function eraseMapCanvas(){
        var context = mapCanvas.getContext("2d");
        context.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    }
    
    /**
     * Support method to write a (debug) message on map canvas
     */
    function printMessageOnMapCanvas(message){
        var lines = message.split("\n");
        var context=mapCanvas.getContext("2d");
        context.font="20px Arial";
        for (var i = 0; i < lines.length; i++) {
            context.fillText(lines[i],10,50+i*25);
        } 
    }    
    
    /**
     * Main method of the module FrontendManager
     */
    function FrontendManager(mainElementId) {
        createChilds(mainElementId);
        arrangeGui();
        window.addEventListener("resize", arrangeGui);
        GestureManager(mapCanvas,onPan,onZoom,onIdentify);
        //MapManager(mapCanvas)
        return;
    }
    
    // export
    if (typeof define == "function" && define.amd) {
        define(function() {
            return FrontendManager;
        });
    } else if (typeof module != "undefined" && module.exports) {
        module.exports = FrontendManager;
    } else {
        window[exportName] = FrontendManager;
    }    
})(window, document, "FrontendManager");    
