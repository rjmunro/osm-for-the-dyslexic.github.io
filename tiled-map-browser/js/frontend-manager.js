(function(window, document, exportName, undefined) {
    "use strict";
    
    var mapCanvas = null;
    var idCanvas = null;
    
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
        idCanvas = document.createElement("canvas");
        mainElement.appendChild(mapCanvas);
        mainElement.appendChild(idCanvas);
    }
    
    /**
     * Resize Map and id canvas to full screen
     */
    function resizeAllCanvasToFullScreen(){
        // split in support method with param
        mapCanvas.style.width = "" + (viewport().width) + "px";
        mapCanvas.style.height = "" + (viewport().height) + "px";
        var context = mapCanvas.getContext("2d");
        context.canvas.width  = "" + (viewport().width) + "";
        context.canvas.height = "" + (viewport().height) + "";
        idCanvas.style.width = "" + (viewport().width) + "px";
        idCanvas.style.height = "" + (viewport().height) + "px";
        var context2 = idCanvas.getContext("2d");
        context2.canvas.width  = "" + (viewport().width) + "";
        context2.canvas.height = "" + (viewport().height) + "";
        eraseMapCanvas();
        printMessageOnMapCanvas("Function: "+"resizeAllCanvasToFullScreen" + "\n" + Date());
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
        resizeAllCanvasToFullScreen();
        window.addEventListener("resize", resizeAllCanvasToFullScreen);
        GestureManager(mapCanvas,onPan,onZoom,onIdentify);
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
