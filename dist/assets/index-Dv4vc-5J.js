(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))m(h);new MutationObserver(h=>{for(const u of h)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&m(p)}).observe(document,{childList:!0,subtree:!0});function c(h){const u={};return h.integrity&&(u.integrity=h.integrity),h.referrerPolicy&&(u.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?u.credentials="include":h.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function m(h){if(h.ep)return;h.ep=!0;const u=c(h);fetch(h.href,u)}})();function S(f){return f&&f.__esModule&&Object.prototype.hasOwnProperty.call(f,"default")?f.default:f}var A={exports:{}};/**
 * vivus - JavaScript library to make drawing animation on SVG
 * @version v0.4.6
 * @link https://github.com/maxwellito/vivus
 * @license MIT
 */var F;function M(){return F||(F=1,function(f,l){(function(){function c(t){if(typeof t>"u")throw new Error('Pathformer [constructor]: "element" parameter is required');if(t.constructor===String&&(t=document.getElementById(t),!t))throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');if(t instanceof window.SVGElement||t instanceof window.SVGGElement||/^svg$/i.test(t.nodeName))this.el=t;else throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');this.scan(t)}c.prototype.TYPES=["line","ellipse","circle","polygon","polyline","rect"],c.prototype.ATTR_WATCH=["cx","cy","points","r","rx","ry","x","x1","x2","y","y1","y2"],c.prototype.scan=function(t){for(var n,e,r,i,s=t.querySelectorAll(this.TYPES.join(",")),o=0;o<s.length;o++)e=s[o],n=this[e.tagName.toLowerCase()+"ToPath"],r=n(this.parseAttr(e.attributes)),i=this.pathMaker(e,r),e.parentNode.replaceChild(i,e)},c.prototype.lineToPath=function(t){var n={},e=t.x1||0,r=t.y1||0,i=t.x2||0,s=t.y2||0;return n.d="M"+e+","+r+"L"+i+","+s,n},c.prototype.rectToPath=function(t){var n={},e=parseFloat(t.x)||0,r=parseFloat(t.y)||0,i=parseFloat(t.width)||0,s=parseFloat(t.height)||0;if(t.rx||t.ry){var o=parseInt(t.rx,10)||-1,d=parseInt(t.ry,10)||-1;o=Math.min(Math.max(o<0?d:o,0),i/2),d=Math.min(Math.max(d<0?o:d,0),s/2),n.d="M "+(e+o)+","+r+" L "+(e+i-o)+","+r+" A "+o+","+d+",0,0,1,"+(e+i)+","+(r+d)+" L "+(e+i)+","+(r+s-d)+" A "+o+","+d+",0,0,1,"+(e+i-o)+","+(r+s)+" L "+(e+o)+","+(r+s)+" A "+o+","+d+",0,0,1,"+e+","+(r+s-d)+" L "+e+","+(r+d)+" A "+o+","+d+",0,0,1,"+(e+o)+","+r}else n.d="M"+e+" "+r+" L"+(e+i)+" "+r+" L"+(e+i)+" "+(r+s)+" L"+e+" "+(r+s)+" Z";return n},c.prototype.polylineToPath=function(t){var n={},e=t.points.trim().split(" "),r,i;if(t.points.indexOf(",")===-1){var s=[];for(r=0;r<e.length;r+=2)s.push(e[r]+","+e[r+1]);e=s}for(i="M"+e[0],r=1;r<e.length;r++)e[r].indexOf(",")!==-1&&(i+="L"+e[r]);return n.d=i,n},c.prototype.polygonToPath=function(t){var n=c.prototype.polylineToPath(t);return n.d+="Z",n},c.prototype.ellipseToPath=function(t){var n={},e=parseFloat(t.rx)||0,r=parseFloat(t.ry)||0,i=parseFloat(t.cx)||0,s=parseFloat(t.cy)||0,o=i-e,d=s,g=parseFloat(i)+parseFloat(e),y=s;return n.d="M"+o+","+d+"A"+e+","+r+" 0,1,1 "+g+","+y+"A"+e+","+r+" 0,1,1 "+o+","+y,n},c.prototype.circleToPath=function(t){var n={},e=parseFloat(t.r)||0,r=parseFloat(t.cx)||0,i=parseFloat(t.cy)||0,s=r-e,o=i,d=parseFloat(r)+parseFloat(e),g=i;return n.d="M"+s+","+o+"A"+e+","+e+" 0,1,1 "+d+","+g+"A"+e+","+e+" 0,1,1 "+s+","+g,n},c.prototype.pathMaker=function(t,n){var e,r,i=document.createElementNS("http://www.w3.org/2000/svg","path");for(e=0;e<t.attributes.length;e++)r=t.attributes[e],this.ATTR_WATCH.indexOf(r.name)===-1&&i.setAttribute(r.name,r.value);for(e in n)i.setAttribute(e,n[e]);return i},c.prototype.parseAttr=function(t){for(var n,e={},r=0;r<t.length;r++){if(n=t[r],this.ATTR_WATCH.indexOf(n.name)!==-1&&n.value.indexOf("%")!==-1)throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");e[n.name]=n.value}return e};var m,h,u,p;function a(t,n,e){m(),this.isReady=!1,this.setElement(t,n),this.setOptions(n),this.setCallback(e),this.isReady&&this.init()}a.LINEAR=function(t){return t},a.EASE=function(t){return-Math.cos(t*Math.PI)/2+.5},a.EASE_OUT=function(t){return 1-Math.pow(1-t,3)},a.EASE_IN=function(t){return Math.pow(t,3)},a.EASE_OUT_BOUNCE=function(t){var n=-Math.cos(t*(.5*Math.PI))+1,e=Math.pow(n,1.5),r=Math.pow(1-t,2),i=-Math.abs(Math.cos(e*(2.5*Math.PI)))+1;return 1-r+i*r},a.prototype.setElement=function(t,n){var e,r;if(typeof t>"u")throw new Error('Vivus [constructor]: "element" parameter is required');if(t.constructor===String&&(t=document.getElementById(t),!t))throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');if(this.parentEl=t,n&&n.file){r=this,e=function(){var s=document.createElement("div");s.innerHTML=this.responseText;var o=s.querySelector("svg");if(!o)throw new Error("Vivus [load]: Cannot find the SVG in the loaded file : "+n.file);r.el=o,r.el.setAttribute("width","100%"),r.el.setAttribute("height","100%"),r.parentEl.appendChild(r.el),r.isReady=!0,r.init(),r=null};var i=new window.XMLHttpRequest;i.addEventListener("load",e),i.open("GET",n.file),i.send();return}switch(t.constructor){case window.SVGSVGElement:case window.SVGElement:case window.SVGGElement:this.el=t,this.isReady=!0;break;case window.HTMLObjectElement:r=this,e=function(s){if(!r.isReady){if(r.el=t.contentDocument&&t.contentDocument.querySelector("svg"),!r.el&&s)throw new Error("Vivus [constructor]: object loaded does not contain any SVG");r.el&&(t.getAttribute("built-by-vivus")&&(r.parentEl.insertBefore(r.el,t),r.parentEl.removeChild(t),r.el.setAttribute("width","100%"),r.el.setAttribute("height","100%")),r.isReady=!0,r.init(),r=null)}},e()||t.addEventListener("load",e);break;default:throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)')}},a.prototype.setOptions=function(t){var n=["delayed","sync","async","nsync","oneByOne","scenario","scenario-sync"],e=["inViewport","manual","autostart"];if(t!==void 0&&t.constructor!==Object)throw new Error('Vivus [constructor]: "options" parameter must be an object');if(t=t||{},t.type&&n.indexOf(t.type)===-1)throw new Error("Vivus [constructor]: "+t.type+" is not an existing animation `type`");if(this.type=t.type||n[0],t.start&&e.indexOf(t.start)===-1)throw new Error("Vivus [constructor]: "+t.start+" is not an existing `start` option");if(this.start=t.start||e[0],this.isIE=window.navigator.userAgent.indexOf("MSIE")!==-1||window.navigator.userAgent.indexOf("Trident/")!==-1||window.navigator.userAgent.indexOf("Edge/")!==-1,this.duration=p(t.duration,120),this.delay=p(t.delay,null),this.dashGap=p(t.dashGap,1),this.forceRender=t.hasOwnProperty("forceRender")?!!t.forceRender:this.isIE,this.reverseStack=!!t.reverseStack,this.selfDestroy=!!t.selfDestroy,this.onReady=t.onReady,this.map=[],this.frameLength=this.currentFrame=this.delayUnit=this.speed=this.handle=null,this.ignoreInvisible=t.hasOwnProperty("ignoreInvisible")?!!t.ignoreInvisible:!1,this.animTimingFunction=t.animTimingFunction||a.LINEAR,this.pathTimingFunction=t.pathTimingFunction||a.LINEAR,this.delay>=this.duration)throw new Error("Vivus [constructor]: delay must be shorter than duration")},a.prototype.setCallback=function(t){if(t&&t.constructor!==Function)throw new Error('Vivus [constructor]: "callback" parameter must be a function');this.callback=t||function(){}},a.prototype.mapping=function(){var t,n,e,r,i,s,o,d,g,y;for(d=s=o=0,n=this.el.querySelectorAll("path"),y=!1,t=0;t<n.length;t++)if(e=n[t],!this.isInvisible(e)){if(i={el:e,length:0,startAt:0,duration:0,isResizeSensitive:!1},e.getAttribute("vector-effect")==="non-scaling-stroke"){var k=e.getBoundingClientRect(),L=e.getBBox();g=Math.max(k.width/L.width,k.height/L.height),i.isResizeSensitive=!0,y=!0}else g=1;if(i.length=Math.ceil(e.getTotalLength()*g),isNaN(i.length)){window.console&&console.warn&&console.warn("Vivus [mapping]: cannot retrieve a path element length",e);continue}this.map.push(i),e.style.strokeDasharray=i.length+" "+(i.length+this.dashGap*2),e.style.strokeDashoffset=i.length+this.dashGap,i.length+=this.dashGap,s+=i.length,this.renderPath(t)}for(y&&console.warn("Vivus: this SVG contains non-scaling-strokes. You should call instance.recalc() when the SVG is resized or you will encounter unwanted behaviour. See https://github.com/maxwellito/vivus#non-scaling for more info."),s=s===0?1:s,this.delay=this.delay===null?this.duration/3:this.delay,this.delayUnit=this.delay/(n.length>1?n.length-1:1),this.reverseStack&&this.map.reverse(),t=0;t<this.map.length;t++){switch(i=this.map[t],this.type){case"delayed":i.startAt=this.delayUnit*t,i.duration=this.duration-this.delay;break;case"oneByOne":i.startAt=o/s*this.duration,i.duration=i.length/s*this.duration;break;case"sync":case"async":case"nsync":i.startAt=0,i.duration=this.duration;break;case"scenario-sync":e=i.el,r=this.parseAttr(e),i.startAt=d+(p(r["data-delay"],this.delayUnit)||0),i.duration=p(r["data-duration"],this.duration),d=r["data-async"]!==void 0?i.startAt:i.startAt+i.duration,this.frameLength=Math.max(this.frameLength,i.startAt+i.duration);break;case"scenario":e=i.el,r=this.parseAttr(e),i.startAt=p(r["data-start"],this.delayUnit)||0,i.duration=p(r["data-duration"],this.duration),this.frameLength=Math.max(this.frameLength,i.startAt+i.duration);break}o+=i.length,this.frameLength=this.frameLength||this.duration}},a.prototype.recalc=function(){this.mustRecalcScale||(this.mustRecalcScale=h((function(){this.performLineRecalc()}).bind(this)))},a.prototype.performLineRecalc=function(){for(var t,n,e,r,i,s=0;s<this.map.length;s++)t=this.map[s],t.isResizeSensitive&&(n=t.el,e=n.getBoundingClientRect(),r=n.getBBox(),i=Math.max(e.width/r.width,e.height/r.height),t.length=Math.ceil(n.getTotalLength()*i),n.style.strokeDasharray=t.length+" "+(t.length+this.dashGap*2));this.trace(),this.mustRecalcScale=null},a.prototype.draw=function(){var t=this;if(this.currentFrame+=this.speed,this.currentFrame<=0)this.stop(),this.reset();else if(this.currentFrame>=this.frameLength)this.stop(),this.currentFrame=this.frameLength,this.trace(),this.selfDestroy&&this.destroy();else{this.trace(),this.handle=h(function(){t.draw()});return}this.callback(this),this.instanceCallback&&(this.instanceCallback(this),this.instanceCallback=null)},a.prototype.trace=function(){var t,n,e,r;for(r=this.animTimingFunction(this.currentFrame/this.frameLength)*this.frameLength,t=0;t<this.map.length;t++)e=this.map[t],n=(r-e.startAt)/e.duration,n=this.pathTimingFunction(Math.max(0,Math.min(1,n))),e.progress!==n&&(e.progress=n,e.el.style.strokeDashoffset=Math.floor(e.length*(1-n)),this.renderPath(t))},a.prototype.renderPath=function(t){if(this.forceRender&&this.map&&this.map[t]){var n=this.map[t],e=n.el.cloneNode(!0);n.el.parentNode.replaceChild(e,n.el),n.el=e}},a.prototype.init=function(){this.frameLength=0,this.currentFrame=0,this.map=[],new c(this.el),this.mapping(),this.starter(),this.onReady&&this.onReady(this)},a.prototype.starter=function(){switch(this.start){case"manual":return;case"autostart":this.play();break;case"inViewport":var t=this,n=function(){t.isInViewport(t.parentEl,1)&&(t.play(),window.removeEventListener("scroll",n))};window.addEventListener("scroll",n),n();break}},a.prototype.getStatus=function(){return this.currentFrame===0?"start":this.currentFrame===this.frameLength?"end":"progress"},a.prototype.reset=function(){return this.setFrameProgress(0)},a.prototype.finish=function(){return this.setFrameProgress(1)},a.prototype.setFrameProgress=function(t){return t=Math.min(1,Math.max(0,t)),this.currentFrame=Math.round(this.frameLength*t),this.trace(),this},a.prototype.play=function(t,n){if(this.instanceCallback=null,t&&typeof t=="function")this.instanceCallback=t,t=null;else if(t&&typeof t!="number")throw new Error("Vivus [play]: invalid speed");return n&&typeof n=="function"&&!this.instanceCallback&&(this.instanceCallback=n),this.speed=t||1,this.handle||this.draw(),this},a.prototype.stop=function(){return this.handle&&(u(this.handle),this.handle=null),this},a.prototype.destroy=function(){this.stop();var t,n;for(t=0;t<this.map.length;t++)n=this.map[t],n.el.style.strokeDashoffset=null,n.el.style.strokeDasharray=null,this.renderPath(t)},a.prototype.isInvisible=function(t){var n,e=t.getAttribute("data-ignore");return e!==null?e!=="false":this.ignoreInvisible?(n=t.getBoundingClientRect(),!n.width&&!n.height):!1},a.prototype.parseAttr=function(t){var n,e={};if(t&&t.attributes)for(var r=0;r<t.attributes.length;r++)n=t.attributes[r],e[n.name]=n.value;return e},a.prototype.isInViewport=function(t,n){var e=this.scrollY(),r=e+this.getViewportH(),i=t.getBoundingClientRect(),s=i.height,o=e+i.top,d=o+s;return n=n||0,o+s*n<=r&&d>=e},a.prototype.getViewportH=function(){var t=this.docElem.clientHeight,n=window.innerHeight;return t<n?n:t},a.prototype.scrollY=function(){return window.pageYOffset||this.docElem.scrollTop},m=function(){a.prototype.docElem||(a.prototype.docElem=window.document.documentElement,h=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),u=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t)}}())},p=function(t,n){var e=parseInt(t,10);return e>=0?e:n},f.exports=a})()}(A)),A.exports}var j=M();const x=S(j);class T{constructor(l,c){this.kanji=l,this.kanjiData=c}render(){const l=document.createElement("div");l.className="flashcard";const c=document.createElement("h1");c.className="kanji-character",c.textContent=this.kanji,l.appendChild(c);const m=document.createElement("div");m.className="kanji-animation",m.id=`animation-${this.kanji}`,l.appendChild(m);const h=document.createElement("p");h.className="kanji-meaning",h.textContent=this.kanjiData.meaning||"Meaning not available",l.appendChild(h);const u=document.createElement("div");u.className="kanji-readings",u.innerHTML=`
            <p><strong>On'yomi:</strong> ${this.kanjiData.readings.onyomi.join(", ")}</p>
            <p><strong>Kun'yomi:</strong> ${this.kanjiData.readings.kunyomi.join(", ")}</p>
        `,l.appendChild(u);const p=document.createElement("ul");if(p.className="kanji-examples",this.kanjiData.phraseExamples&&this.kanjiData.phraseExamples.length>0)this.kanjiData.phraseExamples.forEach(a=>{const t=document.createElement("li");t.textContent=a,p.appendChild(t)});else{const a=document.createElement("li");a.textContent="No examples available",p.appendChild(a)}return l.appendChild(p),l}loadStrokeAnimation(l){const c=this.kanjiData.svg;if(!c){console.error(`No SVG file found for kanji "${this.kanji}"`),document.getElementById(l).innerHTML=`<p style="color: red;">Error: SVG not found for "${this.kanji}"</p>`;return}const m=`assets/svg/${c}`;fetch(m).then(h=>{if(!h.ok)throw new Error(`SVG for kanji "${this.kanji}" not found`);return h.text()}).then(h=>{const u=document.getElementById(l);u.innerHTML=h;const p=u.querySelector("svg"),a=Array.from(p.querySelectorAll("path")),t=Array.from(p.querySelectorAll("text"));t.forEach(n=>n.setAttribute("opacity","0")),new x(p,{type:"oneByOne",duration:a.length*200,animTimingFunction:x.EASE_IN,onProgress:n=>{this.updateStrokeNumbers(n,a,t)}})}).catch(h=>{console.error("Error fetching SVG:",h);const u=document.getElementById(l);u&&(u.innerHTML=`<p style="color: red;">${h.message}</p>`)})}updateStrokeNumbers(l,c,m){Math.floor(l*c.length)}}let b={},w=[],v=0;async function C(){try{const f=await fetch("/data/kanji.json");if(!f.ok)throw new Error("Failed to load kanji.json");b=await f.json(),w=Object.keys(b)}catch(f){console.error("Error loading kanji data:",f)}}function E(){const f=document.getElementById("app");f.innerHTML="";const l=w[v],c=b[l],m=new T(l,c);f.appendChild(m.render()),m.loadStrokeAnimation(`animation-${l}`)}function V(){v=(v+1)%w.length,E()}function R(){v=(v-1+w.length)%w.length,E()}function I(){E()}async function P(){if(await C(),w.length===0){console.error("Kanji list is empty. Check kanji.json.");return}E(),document.getElementById("prev-btn").addEventListener("click",R),document.getElementById("next-btn").addEventListener("click",V),document.getElementById("replay-btn").addEventListener("click",I)}document.addEventListener("DOMContentLoaded",P);
