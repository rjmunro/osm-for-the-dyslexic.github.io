(function(window, document, exportName, undefined) {
    "use strict";
    
    var mapCanvas = null;
    var idCanvas = null;
    var buttonsDiv = null;
    var buttonGoBack = null;
    var buttonMenu = null;
    var buttonHelp = null;
    var buttonVoice = null;
    
    
    function onPan(deltaX,deltaY){
        redrawMapCanvas();
        printMessageOnMapCanvas("Function: "+"onPan(" + deltaX + "," + deltaY + ")\n" + Date());
    }
    
    function onZoom(deltaZ){
        redrawMapCanvas();
        printMessageOnMapCanvas("Function: "+"onZoom(" + deltaZ +")\n" + Date());    
    }
    
    function onIdentify(canvasPosX,canvasPosY){
        redrawMapCanvas();
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
        
        buttonGoBack = document.createElement("div");
        buttonGoBack.id = "button-go-back";

        buttonMenu = document.createElement("div");
        buttonMenu.id = "button-menu";

        buttonHelp = document.createElement("div");
        buttonHelp.id = "button-help";

        buttonVoice = document.createElement("div");
        buttonVoice.id = "button-voice";
        
        buttonsDiv.appendChild(buttonGoBack);
        buttonsDiv.appendChild(buttonMenu);
        buttonsDiv.appendChild(buttonHelp);
        buttonsDiv.appendChild(buttonVoice);
        mainElement.appendChild(buttonsDiv);
        
        mainElement.appendChild(idCanvas);
        mainElement.appendChild(mapCanvas);
    }
    
    /**
     * Resize Map and id canvas to full screen
     */
    function arrangeGui(){
        var buttonsDimension = 80; // todo: make dynamic
        var viewportWidth = parseInt(""+viewport().width,10);
        var viewportHeight = parseInt(""+viewport().height,10);
        
        var mapWidth = viewportWidth;
        var mapHeight = viewportHeight;
        var buttonWidth = viewportWidth;
        var buttonHeight = viewportHeight;
        var buttonTop = 0;
        var buttonLeft = 0;
        var availableSpace = 0;
        var gapsSpace = 0;
        var minGapSpace = 0;
        
        if (viewportWidth > viewportHeight){
            // buttons on right
            mapWidth -= buttonsDimension;
            buttonWidth = buttonsDimension;
            buttonLeft = mapWidth;
            availableSpace = viewportHeight;
            
        } else {
            // buttons on bottom
            mapHeight -= buttonsDimension;
            buttonHeight = buttonsDimension;
            buttonTop = mapHeight;
            availableSpace = viewportWidth;
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
        redrawMapCanvas();
        buttonsDiv.style.height = "" + buttonHeight + "px";
        buttonsDiv.style.width = "" + buttonWidth + "px";
        buttonsDiv.style.top = "" + buttonTop + "px";
        buttonsDiv.style.left = "" + buttonLeft + "px";
        
        buttonGoBack.style.height = "" + (buttonsDimension) + "px";
        buttonGoBack.style.width = "" + (buttonsDimension) + "px";
        buttonMenu.style.height = "" + (buttonsDimension) + "px";
        buttonMenu.style.width = "" + (buttonsDimension) + "px";
        buttonHelp.style.height = "" + (buttonsDimension) + "px";
        buttonHelp.style.width = "" + (buttonsDimension) + "px";
        buttonVoice.style.height = "" + (buttonsDimension) + "px";
        buttonVoice.style.width = "" + (buttonsDimension) + "px";
        
        gapsSpace = availableSpace - (4 * buttonsDimension);
        minGapSpace = Math.floor(gapsSpace/4.0);
        
        switch(gapsSpace%5) {
            case 0:
                // all gaps same dimension
            break;
            case 1:
                // central gap + 1
            break;
            case 2:
                // first and last gap + 1
            break;
            case 3:
                // first last and central gap + 1
            break;
            case 4:
                // first, second forth fifth gap +1
                //code block
            break;
            default:
                // should never happen, all gaps same dimension
        }        
        
        
        printMessageOnMapCanvas("Function: "+"arrangeGui" + "\n" + Date());
    }
    
    /**
     * Support method to completly erase the map canvas
     */
    function redrawMapCanvas(){
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
