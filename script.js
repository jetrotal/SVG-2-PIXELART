
var createHTMLmenu = function() {

        var opts = [

            { optName: "SVG Size", val: "sizeVal", realVal: "realSizeVal", min: 1, max: 200, step: .5, type: "range", id: "sizeRange", value: 100 },
            { type: 'hr' },
            { optName: "Pixel Resolution", val: "resVal", min: 1, max: 100, step: .5, type: "range", id: "resolutionRange", value: 25 },
            { optName: "Snap 2 Pixel-Perfect Grid", val: "snapPixels", type: "checkbox", id: "snapPixels", divId: "snapper", value: false },
            { type: 'hr' },
            { optName: "Borders Thickness", val: "thVal", min: 0, max: 255, step: 1, type: "range", id: "thicknessRange", value: 127 },
            { optName: "Borders Aliasing", val: "alVal", min: 0, max: 255, step: 1, type: "range", id: "aliasingRange", value: 255 },
            { type: 'hr' },
            { optName: "Background Color", val: "bgColor", type: "color", id: "bgColor", color: "#008000" },
            { type: 'hr' },
            { optName: "Outer Stroke Color", val: "stkColor", type: "color", id: "stkColor", color: "#2c2c2c" },
            { optName: "Stroke Thickness", val: "stkVal", min: 0, max: 100, step: .5, type: "range", id: "strokeRange", value: 255 },
            { type: 'hr' },
            { optName: "Render Engine", val: "renderEngine", type: "select", id: "renderEngine", options: [{ name: "Draft - Faster", value: 0 }, { name: "Accurate - Slower", value: 1 }] },
            { type: 'hr' },
            { optName: "Randomize Settings", val: "randomizeSettings", type: "button", func: "randomizeSettings()" },
            { type: 'hr' },
            { optName: "🡅 Upload SVG File", val: "fileInput", type: "button", func: "fileInput.click()" },
            { type: 'hr' },

        ];


        var tagTemplates = function(opt) {
                return {
                    "range": `<button onclick="updateSVGcanvas('current', '${opt.val}')"> ↶ </button><div>
                    <p>${opt.optName} <span id="${opt.val}"></span>${opt.realVal| opt.val=="stkVal" ? '%':''} <span id="${opt.realVal ? opt.realVal:''}"></span></p>
                    <input type="${opt.type}" min="${opt.min}" max="${opt.max}" step="${opt.step}" value="${opt.value}" id="${opt.id}"></input>
                    </div>`,

                    "checkbox": `<div id="${opt.divId}">
                    <input style="margin:10px" type="${opt.type}" id="${opt.id}" name="renderEngine" checked="" onclick="updateSVGcanvas('current', '${opt.val}')">
                    <span>${opt.optName}</span>
                    </div>`,

                    "select": `<button onclick="updateSVGcanvas('current', '${opt.val}')"> ↶ </button>
                    <div>
                    <p>${opt.optName} </p>
                    <select style="width:100%" id="${opt.id}" onchange="updateSVGcanvas('current')">
                    ${opt.options ? (function fun(){
                        var str="";
                        opt.options.forEach(function(opt){
                            console.log(opt);
                            str+=`<option value="${opt.value}">${opt.name}</option>`
                        });
                        return str;
                    })():''}
                    </select><p style="font-size:5px">&nbsp;</p>
                    </div>`,

                    "button":`<button onclick="${opt.func}">${opt.optName}</button>`,

                    "hr":`<hr>`,
/*<div class="opt">
   <div id="bg" style="opacity: 1; " class="opt">
      <input type="checkbox" id="snapPixels" name="renderEngine" checked="" onclick="updateSVGcanvas('current', 'snapPixels')" style="margin:10px"> 
      <div onclick="_id('bgPicker').click()" style="margin: 0 5px;">
         Background Color
         <div style="height:10px;margin:0;padding:0;background-color:red;display:block;" class="button">
            <input type="color" style="width:0;height:0;opacity:0;margin:0;padding:0" id="bgPicker">
         </div>
      </div>
   </div>
</div>
*/
                    "color":`<div id="${opt.id}" style="opaity:1;" class="opt">
                    <input type="checkbox" id="box${opt.id}" checked="" onclick="updateSVGcanvas('current', '${opt.val}')" style="margin:10px">
                    <button onclick="_id('${opt.id}Picker').click()" style="margin: -5px 0px; font-size:12px; padding:0;min-width: -webkit-fill-available;text-align: left;">
                    ${opt.optName}
                    <div style="height:10px;margin:0;padding:0;background-color:${opt.color};display:block;border-radius: 50px;" class="button" id="display_${opt.id}">
                    <input type="color" style="width:0;height:0;opacity:0;margin:0;padding:0" id="${opt.id}Picker" value="${opt.color}" oninput="updateSVGcanvas('current', '${opt.val}'),_id('display_${opt.id}').style.backgroundColor=this.value">
                    </div>
                    </div>
                    </div>`
                }
            
        };
 
        function createOptDivs(opts, parentDiv) {
        opts.forEach(function (opt) {
            if (opt.type == 'hr')
                parentDiv.innerHTML += tagTemplates(opt)[opt.type];
            else {
                var div = document.createElement('div');
                div.className = 'opt';
                div.innerHTML = tagTemplates(opt)[opt.type];
                parentDiv.appendChild(div);
            }
        });
    };

    createOptDivs(opts, document.getElementById("pixelProperties"));
}();

var EssentialFunctions = function() {
    window._id = function(a) {
        return document.getElementById(a);
    };

    window.sleep = function(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    window.doesArrContains = function(arr, value) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] == value) return true;
        return false;
    };

    window.eraseHTML = function(obj) {
        try {
            obj.remove();
        } catch (e) {}
    };

    window.getBlob = function(tgt, objType = "image/svg+xml") {
        const blob = new Blob([tgt], {
            type: objType
        });

        const url = URL.createObjectURL(blob);
        return url;
    };

    window.changeLoader = async function(a) {
        return new Promise(async function(resolve, reject) {
            document.body.style.backgroundPosition = "0";

            _id("preloader").style.display = a;
            resolve();
        });
    };

}();

var prototypePixelItfeatures = function() {
    config = {};
    pixelit.prototype.crushAlpha = function(thickness = 127.5, opacity = 255) {
        thickness = 254 - thickness;
        console.log(thickness);
        const w = this.drawto.width;
        const h = this.drawto.height;
        var imgPixels = this.ctx.getImageData(0, 0, w, h);
        for (var y = 0; y < imgPixels.height; y++) {
            for (var x = 0; x < imgPixels.width; x++) {
                var i = y * 4 * imgPixels.width + x * 4;
                if (imgPixels.data[i + 3] == 0 || imgPixels.data[i + 3] == 255)
                    continue;
                0 < imgPixels.data[i + 3] && imgPixels.data[i + 3] <= opacity //0 < pixelAlpha < 255
                    ?
                    (imgPixels.data[i + 3] =
                        imgPixels.data[i + 3] < thickness ?
                        0 :
                        Math.round(opacity) >= thickness ?
                        opacity - imgPixels.data[i + 3] / 2 + imgPixels.data[i + 3] :
                        (opacity * imgPixels.data[i + 3]) / 127) :
                    "";
            }
        }
        this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return this;
    };
    pixelit.constructor.scale =
        config.scale && config.scale > 0 && config.scale <= Infinity ?
        config.scale * 0.01 :
        8 * 0.01;

    pixelit.prototype.setScale = function(scale) {
        this.scale = scale > 0 && scale <= Infinity ? scale * 0.01 : 8 * 0.01;
        return this;
    };

    pixelit.prototype.pixelate = function() {
        this.drawto.width = this.drawfrom.width;
        this.drawto.height = this.drawfrom.height;
        let scaledW = this.drawto.width * this.scale;
        let scaledH = this.drawto.height * this.scale;

        //make temporary canvas to make new scaled copy
        const tempCanvas = document.createElement("canvas");

        // Set temp canvas width/height & hide (fixes higher scaled cutting off image bottom)
        tempCanvas.width = this.drawto.width* _id("sizeVal").innerHTML/100;
        tempCanvas.height = this.drawto.height* _id("sizeVal").innerHTML/100;
        tempCanvas.style.visibility = "hidden";
        tempCanvas.style.position = "fixed";
        tempCanvas.style.top = "0";
        tempCanvas.style.left = "0";

        //corner case of bigger images, increase the temporary canvas size to fit everything
        if (this.drawto.width > 900 || this.drawto.height > 900) {
            //fix sclae to pixelate bigger images
            this.scale *= 0.5;
            scaledW = this.drawto.width * this.scale;
            scaledH = this.drawto.height * this.scale;
            //make it big enough to fit
            tempCanvas.width = Math.max(scaledW, scaledH) + 50;
            tempCanvas.height = Math.max(scaledW, scaledH) + 50;
        }
        // get the context
        const tempContext = tempCanvas.getContext("2d");
        // draw the image into the canvas
        tempContext.drawImage(this.drawfrom, 0, 0, scaledW, scaledH);
        document.body.appendChild(tempCanvas);
        //configs to pixelate
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        //calculations to remove extra border
        let finalWidth = this.drawfrom.width;
        if (this.drawfrom.width > 300) {
            finalWidth +=
                this.drawfrom.width > this.drawfrom.height ?
                parseInt(
                    this.drawfrom.width / (this.drawfrom.width * this.scale)
                ) / 1.5 :
                parseInt(
                    this.drawfrom.width / (this.drawfrom.width * this.scale)
                );
        }
        let finalHeight = this.drawfrom.height;
        if (this.drawfrom.height > 300) {
            finalHeight +=
                this.drawfrom.height > this.drawfrom.width ?
                parseInt(
                    this.drawfrom.height / (this.drawfrom.height * this.scale)
                ) / 1.5 :
                parseInt(
                    this.drawfrom.height / (this.drawfrom.height * this.scale)
                );
        }
        //draw to final canvas
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        this.ctx.drawImage(
            tempCanvas,
            0,
            0,
            scaledW,
            scaledH,
            0,
            0,
            finalWidth, //+ Math.max(24, 25 * this.scale),
            finalHeight //+ Math.max(24, 25 * this.scale)
        );
        //remove temp element
        tempCanvas.remove();

        return this;
    }
}();

var pxObject = {};
var pixelLayerObject = class {
    constructor() {
        this.draftCanvas = '';
        this.exactCanvas = '';
        this.pxCanvas = '';
        this.dimensions = { x: 0, y: 0, w: 0, h: 0 };
        this.px = {}
        this.palette = [];
        this.svg = '';
        this.trim = '';
        this.tempCanvas = '';
    }
}

var setDefaultVariables = function() {
    _id("temp").innerHTML = "";
    window.baseImg = "";
    window.colorPalette = [];
    window.colorThief = new ColorThief();
    window.maxColors = 5;
    window.renderEngine = _id("renderEngine").selectedIndex;
    window.fromURLs = { 0: [], 1: [] };
    window.hiddenCounter = 0;
    window.hiddenSVG = "";
    window.masterSettings = "default";
    window.pixelLayers = [];
    window.positionInfo = {};
    window.pxObject = {};
    window.svgColors = [];
    window.svgLayers = [];
};

var setSettings = function() {
    return {
        default: { thVal: 127, alVal: 255, resVal: 25, sizeVal: 100, renderEngine:0,stkVal:50 , obj: Object.keys(pxObject) },
        current: { thVal: Math.abs(thicknessRange.value), alVal: aliasingRange.value, resVal: resolutionRange.value, sizeVal: sizeRange.value, renderEngine:renderEngine.value,stkVal:strokeRange.value, obj: Object.keys(pxObject) }
    };
};

var loadedSVG = "";
//const svgo = new SVGO();

strokeRange.oninput = sizeRange.oninput = aliasingRange.oninput = resolutionRange.oninput = thicknessRange.oninput = function() {
    changeLoader("block");
    sleep(1).then(updateSVGcanvas);
};

var fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".svg";

fileInput.onchange = (e) => {
    changeLoader("block");
    sleep(1).then(initFileLoader(e));
};

function initFileLoader(e) {
    _id("renderEngine").selectedIndex = 0;
    changeLoader("block");

    e = e.target.files[0];
    fileInput.value = "";

    var reader = new FileReader();

    reader.readAsText(e, "UTF-8");
    reader.onload = readerEvent =>
        sleep(1).then(initConversion(readerEvent.target.result));
};

async function initConversion(obj = loadedSVG) {

    obj = await SVGO_ALL.optimize(obj, { path: ""}).data;  
    obj = await SVGO_ALL.optimize(obj, { path: ""}).data;  
    obj = await SVGO_ALL.optimize(obj, { path: ""}).data;  
    obj = await SVGO_ALL.optimize(obj, { path: ""}).data;  
    obj = await SVGO_ALL.optimize(obj, { path: ""}).data;  
    obj = await SVGO_ALL.optimize(obj, { path: ""}).data;
    obj = await SVGO_ALL.optimize(obj, { path: ""}).data;    
    console.log("optimized", obj);

    setDefaultVariables();

    obj = obj.replace("<svg", '<svg id="baseImg"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');
 

    newElement = _id("baseImg").parentNode;
    ["baseImg", "pixelImg", "tempImgs"].forEach(ele => {
        eraseHTML(_id(ele));
    });

    newElement.innerHTML += obj;
    baseImg = _id("baseImg");
    


    positionInfo = {
        width: baseImg.clientWidth,
        height: baseImg.clientHeight,
        newWidth: baseImg.clientWidth,
        newHeight: baseImg.clientHeight,
        mode:0
    };

    if (0 == positionInfo.width || 0 == positionInfo.height)
        positionInfo = {
            width: baseImg.viewBox.baseVal.width,
            height: baseImg.viewBox.baseVal.height,
            newWidth: baseImg.viewBox.baseVal.width,
            newHeight: baseImg.viewBox.baseVal.height,
            mode:1
        };

        //if positionInfo.width > 500 || positionInfo.height > 500, rescale them proportionally to be smaller than 500
        let scaler = 500 / Math.max(positionInfo.width, positionInfo.height)*1000;     
        if (positionInfo.width > scaler || positionInfo.height > scaler) {
            let ratio = positionInfo.width / positionInfo.height;
            if (positionInfo.width > scaler) {
                positionInfo.newWidth = scaler;
                positionInfo.newHeight = scaler / ratio;
            } else {
                positionInfo.newHeight = scaler;
                positionInfo.newWidth = scaler * ratio;
            }
       console.log(ratio, positionInfo.newWidth, positionInfo.newHeight,"scaled");


    }
    mountPreviews(baseImg);
    prepareSVG(obj);
    await explodeSVG(svgColors);
};

function mountPreviews(obj) {
    obj.outerHTML =
        '<img id="baseImg" src=' +
        getBlob(obj.outerHTML) +
        `>
  <img id="pixelImg" >`;
};

function prepareSVG(obj) {
    var json = svgson.parseSync(obj);
    hideLayers(json.children);
    hiddenSVG = svgson.stringify(json);
    //console.log(hiddenSVG);
};

function hideLayers(json) {
    for (var i = 0; i < json.length; i++) {
        var hiddenTag = `;;display:none!important/*${hiddenCounter}*/;;`,
            renderable = "a audio canvas circle ellipse foreignObject iframe image line path polygon polyline rect svg switch text textPath tspan unknown use video".split(" "),
            unrenderable = "clipPath defs desc linearGradient marker mask metadata pattern radialGradient script style title".split(" ");

        renderable = doesArrContains(renderable, json[i].name);
        unrenderable = doesArrContains(unrenderable, json[i].name);

        renderable && (json[i].attributes.style ? json[i].attributes.style += hiddenTag : json[i].attributes.style = hiddenTag, svgColors.push(hiddenTag));

        json[i].children && !unrenderable && hideLayers(json[i].children);
        hiddenCounter++;
    }
};

async function explodeSVG(strings) {
    var i = 0;

    for (var str of strings) {
        let o = "image" + i;
        var newSVG = hiddenSVG.replace(str, "");

        newSVG = newSVG.replace(/<\/?([^>]*;;display:none!important\/*)[^>]*>/gi, "");
        newSVG = newSVG.replace("baseImg", "SVG_" + o);
        newSVG = newSVG.replace(/(fill-opacity|stroke-opacity)/gi, "opacity");
        


        let optimalSVG = await svgo.optimize(newSVG, { path: "" });
         optimalSVG = await svgo.optimize(optimalSVG.data, { path: "" });
         optimalSVG = await svgo.optimize(optimalSVG.data, { path: "" });
         optimalSVG = await svgo.optimize(optimalSVG.data, { path: "" });
         optimalSVG = await svgo.optimize(optimalSVG.data, { path: "" });

        newSVG = optimalSVG.data;

        var opacityOBJ = 1,
            regexIn = /[\s"']+/gi;
        regexIn = new RegExp(regexIn.source + /opacity:([0-9]*\.?[0-9]+);/gi.source + "|" + regexIn.source + /opacity="([0-9]*\.?[0-9]+)"/gi.source, "gi");
        console.log(newSVG, "\n\n\n");
        for (var opacityMatch = regexIn.exec(newSVG); null != opacityMatch;) {

            opacityOBJ = opacityMatch[0].replace(opacityMatch[2], 1);
            newSVG = newSVG.replace(opacityMatch[0], opacityOBJ);
            if (opacityMatch[2] != "1") opacityMatch[2] *= 1.4;
            opacityOBJ = opacityMatch[2];
            opacityMatch = regexIn.exec(newSVG);
        }

        var mixBlendModeOBJ = "normal";
        regexIn = new RegExp(/mode:([a-zA-Z]*);*/gi.source + "|" + /mode="([a-zA-Z]*)"*/gi.source, "gi");
        for (opacityMatch = regexIn.exec(newSVG); null != opacityMatch;) {
            mixBlendModeOBJ = opacityMatch[0].replace(opacityMatch[1], "normal"),
                newSVG = newSVG.replace(opacityMatch[0], mixBlendModeOBJ),
                opacityMatch[1] = opacityMatch[1],
                mixBlendModeOBJ = opacityMatch[1],
                opacityMatch = regexIn.exec(newSVG);
        }

     
        
        let positionInfo2 = positionInfo;
        pxObject[o] = new pixelLayerObject();

        pxObject[o].opacity = opacityOBJ;
        pxObject[o].mixBlendMode = mixBlendModeOBJ;
        
        pxObject[o].svg = newSVG;
        pxObject[o].exactCanvas = _id("temp").appendChild(document.createElement("canvas"));
        pxObject[o].exactCanvas.className = "pixelated";
        pxObject[o].exactCanvas.id = "exact_" + o;
        pxObject[o].exactCanvas.width = positionInfo2.width;
        pxObject[o].exactCanvas.height = positionInfo2.height;

      
         

        newSVG = pxObject[o].exactCanvas.getContext("2d");

        new drawInlineSVG(newSVG, pxObject[o].svg, function(image) {
            pxObject[o].palette = colorThief.getPalette(image, maxColors);
            pxObject[o].tempCanvas = document.createElement("canvas");
            pxObject[o].tempCanvas.width = positionInfo.width;
            pxObject[o].tempCanvas.height = positionInfo.height;
            pxObject[o].tempCanvas.getContext("2d").drawImage(image, 0, 0, positionInfo2.newWidth, positionInfo2.newHeight);

            pxObject[o].trim = trimSVGBorders(pxObject[o].tempCanvas);
            pxObject[o].tempCanvas = null;

            pxObject[o].draftCanvas = _id("temp").appendChild(pxObject[o].trim.obj);
            pxObject[o].draftCanvas.className = "pixelated";
            pxObject[o].draftCanvas.id = "draft_" + o;

            pxObject[o].dimensions = {
                x: pxObject[o].trim.x,
                y: pxObject[o].trim.y,
                w: pxObject[o].trim.w,
                h: pxObject[o].trim.h
            };

            pxObject[o].pxCanvas = _id("temp").appendChild(document.createElement("canvas"));
            pxObject[o].pxCanvas.className = "pixelated";
            pxObject[o].pxCanvas.id = "canvas_" + o;
            pxObject[o].pxCanvas.getContext("2d").drawImage(image, 0, 0, positionInfo2.newWidth, positionInfo2.newHeight);

            pxObject[o].px = new pixelit({
                palette: pxObject[o].palette,
                from: pxObject[o].draftCanvas,
                to: pxObject[o].pxCanvas,
                scale: resolutionRange.value
            });

            image = o.replace(/[^0-9]/g, "");
            //console.log(image, "counter");
            image >= strings.length - 1 && sleep(1500).then(updateSVGcanvas(masterSettings));
        });
        i++;
    }
};

var trimSVGBorders = function() {

    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x)
            if (0 !== imageData.data[y * width * 4 + 4 * x + 3]) return false;
        return true;
    }

    function columnBlank(imageData, width, x, top, bottom) {
        for (; top < bottom; ++top)
            if (0 !== imageData.data[top * width * 4 + 4 * x + 3]) return false;
        return true;
    }

    return function(canvas) {
        for (var ctx = canvas.getContext("2d"),
                width = canvas.width,
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
                right = imageData.width,
                bottom = imageData.height,
                top = 0,
                left = 0; top < bottom && rowBlank(imageData, width, top);)
            ++top;

        for (; bottom - 1 > top && rowBlank(imageData, width, bottom - 1);)
            --bottom;

        for (; left < right && columnBlank(imageData, width, left, top, bottom);)
            ++left;

        for (; right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom);)
            --right;

        ctx = ctx.getImageData(left, top, 0 < right - left ? right - left : right, 0 < bottom - top ? bottom - top : bottom);

        canvas = canvas.ownerDocument.createElement("canvas");

        (new Image()).src = this.url;

        width = canvas.getContext("2d");
        canvas.width = ctx.width;
        canvas.height = ctx.height;
        width.putImageData(ctx, 0, 0);

        return { obj: canvas, y: top, x: left, w: ctx.width, h: ctx.height };
    };
}();

function drawInlineSVG(ctx, rawSVG, callback) {

    var svg = new Blob([rawSVG], { type: "image/svg+xml;charset=utf-8" }),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
        img = new Image;

    img.onload = function() {
        ctx.drawImage(this, 0, 0);
        domURL.revokeObjectURL(url);
        callback(this);
    };

    img.src = url;
};

function updateSVGcanvas(mode = "current", targetSetting) {
    masterSettings = "current"

    changeLoader("block");
    sleep(1).then(initUpdate(mode, targetSetting));;

};

function initUpdate(mode, targetSetting) {
    if  (targetSetting == "renderEngine")_id("renderEngine").value=0;
    var currSettings = setSettings();

    targetSetting && (currSettings[mode][targetSetting] = currSettings["default"][targetSetting]);
    let { thVal, alVal, resVal, sizeVal, stkVal, obj } = currSettings[mode];

    thicknessRange.value = thVal;
    aliasingRange.value = alVal;
    resolutionRange.value = resVal;
    sizeRange.value = sizeVal;
    strokeRange.value = stkVal;

    _id("resVal").innerHTML = resVal;
    _id("thVal").innerHTML = thVal;
    _id("alVal").innerHTML = alVal;
    _id("sizeVal").innerHTML = sizeVal;
    _id("stkVal").innerHTML = stkVal;

    var newCanvas = document.createElement("canvas");

    ctx = newCanvas.getContext("2d");

    _id("baseImg").width = positionInfo.newWidth * sizeVal / 100;
    _id("baseImg").height = positionInfo.newHeight * sizeVal / 100;
    _id("realSizeVal").innerHTML = _id("baseImg").width + "x" + _id("baseImg").height;

    newCanvas.width = _id("baseImg").width;
    newCanvas.height = _id("baseImg").height;

    var currrenderEngine = renderEngine == _id("renderEngine").selectedIndex;

    _id("snapper").style.opacity = 1 - 0.8 * _id("renderEngine").selectedIndex;
    _id("snapPixels").disabled = _id("renderEngine").selectedIndex;

    var precision = -61 * _id("renderEngine").selectedIndex;

    if (!currrenderEngine) {
        for (const layer of obj)
            _id("renderEngine").selectedIndex ? pxObject[layer].px.setDrawFrom(pxObject[layer].exactCanvas) : pxObject[layer].px.setDrawFrom(pxObject[layer].draftCanvas), pxObject[layer].px.draw();
        renderEngine = _id("renderEngine").selectedIndex;
    };
    var pixelSize;
    var x, y, w, h;
    for (const layer of obj) {
        try {
            pxObject[layer].px.setScale(resVal * sizeVal / 100).pixelate().crushAlpha(thVal, alVal);
        } catch (e) {
            console.log(e);
            continue;
        }
        try {
            pxObject[layer].px.setPalette(pxObject[layer].palette).convertPalette();
        } catch (e) {}
        try {
            h = w = y = x = void 0;
            x = pxObject[layer].dimensions.x * sizeVal / 100;
            y = pxObject[layer].dimensions.y * sizeVal / 100;
            w = pxObject[layer].dimensions.w * sizeVal / 100;
            h = pxObject[layer].dimensions.h * sizeVal / 100;
        } catch (e) {
            console.log(e);
            break;
        }

        pixelSize = (100 / resVal) * sizeVal / 100;

        if (1 == _id("renderEngine").selectedIndex)
            y = x = 0, w = newCanvas.width, h = newCanvas.height;
        else if (_id("snapPixels").checked) {


            x = snapLayerTo(x, pixelSize, newCanvas.width / 2);
            y = snapLayerTo(y, pixelSize, newCanvas.height / 2);
        }

        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = pxObject[layer].opacity;
        ctx.globalCompositeOperation = pxObject[layer].mixBlendMode;

        ctx.drawImage(pxObject[layer].pxCanvas, x, y, w, h);
    }

    var strokeCanvas = newCanvas.cloneNode(true);
    drawStroke(strokeCanvas, newCanvas, _id("stkColorPicker").value+""+parseInt(255*!!_id("boxstkColor").checked).toString(16).padStart(2, '0'), _id("boxstkColor").checked*((pixelSize)*stkVal/50), 0);

    newCanvas = strokeCanvas;
    drawBackground(strokeCanvas, newCanvas, _id("bgColorPicker").value+""+parseInt(255*!!_id("boxbgColor").checked).toString(16).padStart(2, '0'));
    _id("pixelImg").src = strokeCanvas.toDataURL();

    //_id("pixelImg").src = newCanvas.toDataURL();

    changeLoader('none');
};

function drawStroke(ctx, target, color = "red", w = pixelSize, mode = 1) {
    var d = [
        [-1, 0, 1, 0, 0, 1, 0, -1],
        [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1],
    ];
    ctx = ctx.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.canvas.width += 2 * w, ctx.canvas.height += 2 * w;

    for (var dArr = d[mode], i = 0; i < d[mode].length; i++)
        ctx.drawImage(target, 0 + w + dArr[i] * w, w + dArr[i + 1] * w);

    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, target.width + 2 * w, target.height + 2 * w);
   
  /*  ctx.globalCompositeOperation = "destination-out";
    for (i = 0; i < d[mode].length; i++)
        ctx.drawImage(target, w, w);

*/    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(target, w, w);
};

function drawBackground(ctx, target, color = "red") {
    ctx = ctx.getContext('2d')
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = color;
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillRect(0, 0, target.width, target.height);
};

function snapLayerTo(x, y, z) {
    if (z && x >= z) y = -y;
    if (y == 0) y = 1;
    return Math.floor(x / y) * y;
};

function randomizeSettings() {

    anime({
        targets: ["#thicknessRange", "#aliasingRange", "#resolutionRange"],
        value: function(a) {
           return anime.random(5, Math.round(a.max));
        },
        duration: 0,
        complete: function() {
            updateSVGcanvas("current");
        }
    });
};
/*
document.addEventListener(
    "DOMContentLoaded",
    initConversion(baseImg.outerHTML)
);

/* <div class="opt">
                <button onclick="updateSVGcanvas('current','sizeVal')"> ↶ </button>
                <div>
                    <p>SVG Size: <span id="sizeVal"></span>% <span id="realSizeVal"></span></p>
                    <input type="range" min="1" max="200" step=".1" value="100" id="sizeRange"></input>
                </div>
            </div>
            <hr>
            <div class="opt">
                <button onclick="updateSVGcanvas('current','resVal')"> ↶ </button>
                <div>
                    <p>Pixel Resolution: <span id="resVal"></span></p>
                    <input type="range" min="1" max="50" step=".5" value="25" id="resolutionRange"></input>
                </div>
            </div>
            <div id="snapper">
                <input style="margin:10px" type="checkbox" id="snapPixels" name="renderEngine" checked="" onclick="updateSVGcanvas('current')">
                <span>Snap 2 Pixel-Perfect Grid</span>
            </div>
            <hr>
            <div class="opt">
                <button onclick="updateSVGcanvas('current','thVal')"> ↶ </button>
                <div>
                    <p>Borders Thickness: <span id="thVal"></span></p>
                    <input type="range" min="-255" max="-1" step="1" value="-127" id="thicknessRange"></input>
                </div>
            </div>

            <div class="opt">
                <button onclick="updateSVGcanvas('current','alVal')"> ↶ </button>
                <div>
                    <p>Borders Aliasing: <span id="alVal"></span></p>
                    <input type="range" min="0" max="255" step="1" value="255" id="aliasingRange"></input>
                </div>
            </div>
            <hr>

            <div class="opt">
                <button onclick="_id('renderEngine').selectedIndex =0; updateSVGcanvas('current')"> ↶ </button>
                <div>
                    <p>Render Quality: </p>
                    <select style="width:100%" id="renderEngine" onchange="updateSVGcanvas('current')">
          <option value="0">Draft - Faster</option>
          <option value="1">Accurate - Slower</option>
        </select>
                </div>
            </div>
            <hr>

            <div class="opt">
                <button onclick="randomizeSettings()">Randomize Settings</button>
            </div>
            <hr>
            <div class="opt">
                <button onclick="fileInput.click();">🡅 Upload SVG File</button>
            </div>
            <div class="opt">
   <div id="bg" style="opacity: 1; " class="opt">
      <input type="checkbox" id="snapPixels" name="renderEngine" checked="" onclick="updateSVGcanvas('current', 'snapPixels')" style="margin:10px"> 
      <div onclick="_id('bgPicker').click()" style="margin: 0 5px;">
         Background Color
         <div style="height:10px;margin:0;padding:0;background-color:red;display:block;" class="button">
            <input type="color" style="width:0;height:0;opacity:0;margin:0;padding:0" id="bgPicker">
         </div>
      </div>
   </div>
</div>
            */
