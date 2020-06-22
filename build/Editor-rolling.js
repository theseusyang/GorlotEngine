var LiteGUI={root:null,content:null,panels:{},windows:[],undo_steps:[],modalbg_div:null,mainmenu:null,init:function(c){c=c||{};c.width&&c.height&&this.setWindowSize(c.width,c.height);this.container=null;c.container&&(this.container=document.getElementById(c.container));this.container||(this.container=document.body);if(c.wrapped){var a=document.createElement("div");a.style.position="relative";a.style.overflow="hidden";this.root=a;this.container.appendChild(a);this.content=a=document.createElement("div");
this.root.appendChild(a);this.root.classList.contains("fullscreen")&&window.addEventListener("resize",function(a){LiteGUI.maximizeWindow()})}else this.root=this.content=this.container;this.root.className="litegui-wrap fullscreen";this.content.className="litegui-maincontent";a=this.modalbg_div=document.createElement("div");this.modalbg_div.className="litemodalbg";this.root.appendChild(this.modalbg_div);a.style.display="none";c.menubar&&this.createMenubar();c.gui_callback&&c.gui_callback();window.addEventListener("beforeunload",
function(a){for(var c in LiteGUI.windows)LiteGUI.windows[c].close();LiteGUI.windows=[]})},trigger:function(c,a,b,e){var d=document.createEvent("CustomEvent");d.initCustomEvent(a,!0,!0,b);d.srcElement=e;c.dispatchEvent?c.dispatchEvent(d):c.__events&&c.__events.dispatchEvent(d);return d},bind:function(c,a,b){function e(c){if(c.addEventListener)c.addEventListener(a,b);else{if(!c.__events){var e=document.createElement("span");e.widget=c;Object.defineProperty(c,"__events",{enumerable:!1,configurable:!1,
writable:!1,value:e})}c.__events.addEventListener(a,b)}}if(!c)throw"Cannot bind to null";if(!a)throw"Event bind missing";if(!b)throw"Bind callback missing";c.constructor===String&&(c=document.querySelectorAll(c));if(c.constructor===NodeList||c.constructor===Array)for(var d=0;d<c.length;++d)e(c[d]);else e(c)},unbind:function(c,a,b){c.removeEventListener?c.removeEventListener(a,b):c.__events&&c.__events.removeEventListener&&c.__events.removeEventListener(a,b)},removeClass:function(c,a,b){b||(b=a,a=
"."+a);c=(c||document).querySelectorAll(a);for(a=0;a<c.length;++a)c[a].classList.remove(b)},add:function(c){this.content.appendChild(c.root||c)},remove:function(c){if(c){if(c.constructor===String)for(var a=document.querySelectorAll(c),b=0;b<a.length;++b)(c=a[b])&&c.parentNode&&c.parentNode.removeChild(c);if(c.constructor===Array||c.constructor===NodeList)for(b=0;b<c.length;++b)LiteGUI.remove(c[b]);else c.root&&c.root.parentNode?c.root.parentNode.removeChild(c.root):c.parentNode&&c.parentNode.removeChild(c)}},
getById:function(c){return document.getElementById(c)},createMenubar:function(){this.menubar=new LiteGUI.Menubar("mainmenubar");this.add(this.menubar)},setWindowSize:function(c,a){var b=this.root.style;if(c&&a)b.width=c+"px",b.height=a+"px",b.boxShadow="0 0 4px black",this.root.classList.remove("fullscreen");else{if(this.root.classList.contains("fullscreen"))return;this.root.classList.add("fullscreen");b.width="100%";b.height="100%";b.boxShadow="0 0 0"}LiteGUI.trigger(LiteGUI,"resized")},maximizeWindow:function(){this.setWindowSize()},
setCursor:function(c){this.root.style.cursor=c},isCursorOverElement:function(c,a){var b=c.pageX,e=c.pageY,d=a.getBoundingClientRect();return d?e>d.top&&e<d.top+d.height&&b>d.left&&b<d.left+d.width?!0:!1:!1},getRect:function(c){return c.getBoundingClientRect()},toClipboard:function(c,a){c&&c.constructor!==String&&(c=JSON.stringify(c));var b=null,e=!1;if(!a)try{document.queryCommandSupported("copy"),b=document.createElement("input"),b.type="text",b.style.opacity=0,b.value=c,document.body.appendChild(b),
b.select(),e=document.execCommand("copy"),console.log(e?"saved to clipboard":"problem saving to clipboard"),document.body.removeChild(b)}catch(d){b&&document.body.removeChild(b),console.warn("Oops, unable to copy using the true clipboard")}try{this._safe_cliboard=null,localStorage.setItem("litegui_clipboard",c)}catch(f){this._safe_cliboard=c,console.warn("cliboard quota excedeed")}},getLocalClipboard:function(){var c=localStorage.getItem("litegui_clipboard");!c&&this._safe_cliboard&&(c=this._safe_cliboard);
return c?"{"==c[0]?JSON.parse(c):c:null},addCSS:function(c){if(c)if(c.constructor===String){var a=document.createElement("style");a.type="text/css";a.innerHTML=c;document.getElementsByTagName("head")[0].appendChild(a)}else for(a in c)document.body.style[a]=c[a]},requireCSS:function(c,a){for("string"==typeof c&&(c=[c]);c.length;){var b=document.createElement("link");b.rel="stylesheet";b.type="text/css";b.href=c.shift(1);b.media="all";document.getElementsByTagName("head")[0].appendChild(b);0==c.length&&
(b.onload=a)}},request:function(c){var a=c.dataType||"text";"json"==a?a="text":"xml"==a?a="text":"binary"==a&&(a="arraybuffer",c.mimeType="application/octet-stream");var b=new XMLHttpRequest;b.open(c.data?"POST":"GET",c.url,!0);a&&(b.responseType=a);c.mimeType&&b.overrideMimeType(c.mimeType);c.nocache&&b.setRequestHeader("Cache-Control","no-cache");b.onload=function(a){a=this.response;if(200!=this.status)a="Error "+this.status,c.error&&c.error(a),LEvent.trigger(b,"fail",this.status);else{if("json"==
c.dataType)try{a=JSON.parse(a)}catch(e){if(c.error)c.error(e);else throw e;}else if("xml"==c.dataType)try{a=(new DOMParser).parseFromString(a,"text/xml")}catch(g){if(c.error)c.error(g);else throw g;}c.success&&c.success.call(this,a,this)}};b.onerror=function(a){c.error&&c.error(a)};a=new FormData;if(c.data)for(var e in c.data)a.append(e,c.data[e]);b.send(a);return b},requestText:function(c,a,b){return this.request({url:c,dataType:"text",success:a,error:b})},requestJSON:function(c,a,b){return this.request({url:c,
dataType:"json",success:a,error:b})},requestBinary:function(c,a,b){return this.request({url:c,dataType:"binary",success:a,error:b})},requireScript:function(c,a,b,e,d){if(!c)throw"invalid URL";c.constructor===String&&(c=[c]);var f=c.length,g=[],h;for(h in c){var k=document.createElement("script");k.num=h;k.type="text/javascript";k.src=c[h]+(d?"?version="+d:"");k.original_src=c[h];k.async=!1;k.onload=function(b){f--;g.push(this);f?e&&e(this.original_src,this.num):a&&a(g)};b&&(k.onerror=function(a){b(a,
this.original_src,this.num)});document.getElementsByTagName("head")[0].appendChild(k)}},requireScriptSerial:function(c,a,b){function e(){var f=document.createElement("script");f.type="text/javascript";f.src=c.shift(1);f.onload=function(f){c.length?(b&&b(c[0],c.length),e()):(d.push(this),a&&a(d))};document.getElementsByTagName("head")[0].appendChild(f)}"string"==typeof c&&(c=[c]);var d=[];e()},newDiv:function(c,a){return this.createElement("div",c,a)},createElement:function(c,a,b,e,d){c=document.createElement(c);
if(a){a=a.split(" ");for(var f=0;f<a.length;f++)"."==a[f][0]?c.classList.add(a[f].substr(1)):c.id="#"==a[f][0]?a[f].substr(1):a[f]}c.root=c;b&&(c.innerHTML=b);c.add=function(a){this.appendChild(a.root||a)};if(e)if(e.constructor===String)c.setAttribute("style",e);else for(f in e)c.style[f]=e[f];if(d)for(f in d)c.addEventListener(f,d[f]);return c},createListItem:function(c,a,b){var e=document.createElement("span");e.innerHTML=c;e=e.childNodes[0];if(a)for(var d in a)if(c=e.querySelector(d))c.innerText=
a[d];if(b)for(d in b)e.style[d]=b[d];return e},createButton:function(c,a,b,e){var d=document.createElement("button");d.className="litegui litebutton button";if(c){c=c.split(" ");for(var f=0;f<c.length;f++)"."==c[f][0]?d.classList.add(c[f].substr(1)):d.id="#"==c[f][0]?c[f].substr(1):c[f]}d.root=d;void 0!==a&&(d.innerHTML=a);b&&d.addEventListener("click",b);if(e)if(e.constructor===String)d.setAttribute("style",e);else for(f in e)d.style[f]=e[f];return d},getParents:function(c){for(var a=[];null!==(c=
c.parentElement);)c.nodeType===Node.ELEMENT_NODE&&a.push(elem);return a},newWindow:function(c,a,b,e){e=e||{};a=window.open("","","width="+a+", height="+b+", location=no, status=no, menubar=no, titlebar=no, fullscreen=yes");a.document.write("<html><head><title>"+c+"</title>");b=document.querySelectorAll("link[rel='stylesheet'],style");for(c=0;c<b.length;c++)a.document.write(b[c].outerHTML);if(e.scripts)for(b=document.querySelectorAll("script"),c=0;c<b.length;c++)b[c].src&&a.document.write(b[c].outerHTML);
a.document.write("</head><body>"+(e.content||"")+"</body></html>");a.document.close();return a},showModalBackground:function(c){LiteGUI.modalbg_div&&(LiteGUI.modalbg_div.style.display=c?"block":"none")},showMessage:function(c,a){a=a||{};a.title=a.title||"Attention";a.content=c;a.close="fade";var b=new LiteGUI.Dialog(a);a.noclose||b.addButton("Close",{close:!0});b.makeModal("fade");return b},popup:function(c,a){a=a||{};a.min_height=140;"string"==typeof c&&(c="<p>"+c+"</p>");a.content=c;a.close="fade";
var b=new LiteGUI.Dialog(a);a.noclose||b.addButton("Close",{close:!0});b.show();return b},alert:function(c,a){a=a||{};a.className="alert";a.title=a.title||"Alert";a.width=a.width||280;a.height=a.height||140;"string"==typeof c&&(c="<p>"+c+"</p>");LiteGUI.remove(".litepanel.alert");return LiteGUI.showMessage(c,a)},confirm:function(c,a,b){function e(b){b="yes"==this.dataset.value;d.close();a&&a(b)}b=b||{};b.className="alert";b.title=b.title||"Confirm";b.width=b.width||280;"string"==typeof c&&(c="<p>"+
c+"</p>");b.noclose=!0;var d=this.showMessage(c+"<button class='litebutton' data-value='yes' style='width:45%; margin-left: 10px'>Yes</button><button class='litebutton' data-value='no' style='width:45%'>No</button>",b);d.content.style.paddingBottom="10px";c=d.content.querySelectorAll("button");for(b=0;b<c.length;b++)c[b].addEventListener("click",e);c[0].focus();return d},prompt:function(c,a,b){function e(){var b=h.value;this.dataset&&"cancel"==this.dataset.value&&(b=null);g.close();a&&a(b)}b=b||{};
b.className="alert";b.title=b.title||"Prompt";b.width=b.width||280;"string"==typeof c&&(c="<p>"+c+"</p>");var d=b.value||"",f="<input type='text' value='"+d+"'/>";b.textarea&&(f="<textarea class='textfield' style='width:95%'>"+d+"</textarea>");b.noclose=!0;var g=this.showMessage(c+("<p>"+f+"</p><button class='litebutton' data-value='accept' style='width:45%; margin-left: 10px; margin-bottom: 10px'>Accept</button><button class='litebutton' data-value='cancel' style='width:45%'>Cancel</button>"),b);
c=g.content.querySelectorAll("button");for(b=0;b<c.length;b++)c[b].addEventListener("click",e);var h=g.content.querySelector("input,textarea");h.addEventListener("keydown",function(a){a||(a=window.event);a=a.keyCode||a.which;if("13"==a)return e(),!1;"29"==a&&g.close()},!0);h.focus();return g},choice:function(c,a,b,e){function d(c){c=a[this.dataset.value];g.close();b&&b(c)}e=e||{};e.className="alert";e.title=e.title||"Select one option";e.width=e.width||280;"string"==typeof c&&(c="<p>"+c+"</p>");for(var f in a)c+=
"<button class='litebutton' data-value='"+f+"' style='width:45%; margin-left: 10px'>"+(a[f].content||a[f])+"</button>";e.noclose=!0;var g=this.showMessage(c,e);g.content.style.paddingBottom="10px";c=g.content.querySelectorAll("button");for(f=0;f<c.length;f++)c[f].addEventListener("click",d);return g},downloadURL:function(c,a){var b=document.createElement("a");b.href=c;b.download=a;document.body.appendChild(b);b.click();document.body.removeChild(b)},downloadFile:function(c,a,b){if(a){b||(b=a.constructor===
String?"text/plain":"application/octet-stream");var e=null,e=a.constructor!==File&&a.constructor!==Blob?new Blob([a],{type:b}):a,d=URL.createObjectURL(e);a=document.createElement("a");a.setAttribute("href",d);a.setAttribute("download",c);a.style.display="none";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(d)},6E4)}else console.warn("No file provided to download")},getUrlVars:function(){for(var c=[],a,b=window.location.href.slice(window.location.href.indexOf("?")+
1).split("&"),e=0;e<b.length;e++)a=b[e].split("="),c.push(a[0]),c[a[0]]=a[1];return c},getUrlVar:function(c){return LiteGUI.getUrlVars()[c]},focus:function(c){c.focus()},blur:function(c){c.blur()},draggable:function(c,a,b,e,d){function f(a){if("mousedown"==a.type){k||(l=(k=c.getClientRects()[0])?k.left:0,m=k?k.top:0);if(d&&!1==d(c,a))return a.stopPropagation(),a.preventDefault(),!1;g=a.clientX;h=a.clientY;document.addEventListener("mousemove",f);document.addEventListener("mouseup",f);b&&b(c,a);a.stopPropagation();
a.preventDefault();return!1}if("mouseup"==a.type)document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",f),e&&e(c,a);else if("mousemove"==a.type){var r=a.clientX-g,n=a.clientY-h;g=a.clientX;h=a.clientY;l+=r;m+=n;c.style.left=l+"px";c.style.top=m+"px"}}a=a||c;a.addEventListener("mousedown",f);a.style.cursor="move";var g=0,h=0,k=c.getClientRects()[0],l=k?k.left:0,m=k?k.top:0;c.style.position="absolute";c.style.left=l+"px";c.style.top=m+"px"},cloneObject:function(c,a){var b=
a||{},e;for(e in c)if("_"!=e[0]&&"jQuery"!=e.substr(0,6)){var d=c[e];if(null==d)b[e]=null;else if(!isFunction(d))if("number"==typeof d||"string"==typeof d)b[e]=d;else if(d.constructor==Float32Array)b[e]=Array.apply([],d);else if(isArray(d))b[e]&&b[e].constructor==Float32Array?b[e].set(d):b[e]=JSON.parse(JSON.stringify(d));else try{b[e]=JSON.parse(JSON.stringify(d))}catch(f){console.error(f)}}return b},safeName:function(c){return String(c).replace(/[\s\.]/g,"")},special_codes:{close:"&#10005;",navicon:"&#9776;",
refresh:"&#8634;",gear:"&#9881;",open_folder:"&#128194;",download:"&#11123;",tick:"&#10003;",trash:"&#128465;"},htmlEncode:function(c){var a=document.createElement("div");a.innerHTML=c;return a.innerText},htmlDecode:function(c){var a=document.createElement("div");a.innerText=c;return a.innerHTML},sizeToCSS:function(c){return void 0===c||null===c?null:c.constructor===String?c:0<=c?(c|0)+"px":"calc( 100% - "+Math.abs(c|0)+"px )"},getElementWindow:function(c){c=c.ownerDocument;return c.defaultView||
c.parentWindow},createDropArea:function(c,a,b,e){function d(a){c.addEventListener("dragexit",d);c.addEventListener("dragover",d);c.addEventListener("drop",f);a.stopPropagation();a.preventDefault();"dragenter"==a.type&&b&&b(a,this);"dragexit"==a.type&&e&&e(a,this)}function f(b){b.stopPropagation();b.preventDefault();c.removeEventListener("dragexit",d);c.removeEventListener("dragover",d);c.removeEventListener("drop",f);var e=void 0;a&&(e=a(b));if(e)return b.stopPropagation(),b.stopImmediatePropagation(),
!0}c.addEventListener("dragenter",d)}};Object.defineProperty(String.prototype,"template",{value:function(c,a){for(var b=this,e=/{{([^}}]+)?}}/g,d;d=e.exec(b);)var f=a?(new Function("with(this) { try { return "+d[1]+"} catch(e) { return 'error';} }")).call(c):c[d[1]],b=b.replace(d[0],f);return b},enumerable:!1});
function purgeElement(c,a){var b=c.attributes,e,d;if(b)for(e=b.length-1;0<=e;e-=1)d=b[e].name,"function"===typeof c[d]&&(c[d]=null);if(b=c.childNodes)for(b=b.length,e=0;e<b;e+=1)purgeElement(c.childNodes[e])}
"undefined"==typeof escapeHtmlEntities&&(escapeHtmlEntities=function(c){return c.replace(/[\u00A0-\u2666<>\&]/g,function(a){return"&"+(escapeHtmlEntities.entityTable[a.charCodeAt(0)]||"#"+a.charCodeAt(0))+";"})},escapeHtmlEntities.entityTable={34:"quot",38:"amp",39:"apos",60:"lt",62:"gt",160:"nbsp",161:"iexcl",162:"cent",163:"pound",164:"curren",165:"yen",166:"brvbar",167:"sect",168:"uml",169:"copy",170:"ordf",171:"laquo",172:"not",173:"shy",174:"reg",175:"macr",176:"deg",177:"plusmn",178:"sup2",
179:"sup3",180:"acute",181:"micro",182:"para",183:"middot",184:"cedil",185:"sup1",186:"ordm",187:"raquo",188:"frac14",189:"frac12",190:"frac34",191:"iquest",192:"Agrave",193:"Aacute",194:"Acirc",195:"Atilde",196:"Auml",197:"Aring",198:"AElig",199:"Ccedil",200:"Egrave",201:"Eacute",202:"Ecirc",203:"Euml",204:"Igrave",205:"Iacute",206:"Icirc",207:"Iuml",208:"ETH",209:"Ntilde",210:"Ograve",211:"Oacute",212:"Ocirc",213:"Otilde",214:"Ouml",215:"times",216:"Oslash",217:"Ugrave",218:"Uacute",219:"Ucirc",
220:"Uuml",221:"Yacute",222:"THORN",223:"szlig",224:"agrave",225:"aacute",226:"acirc",227:"atilde",228:"auml",229:"aring",230:"aelig",231:"ccedil",232:"egrave",233:"eacute",234:"ecirc",235:"euml",236:"igrave",237:"iacute",238:"icirc",239:"iuml",240:"eth",241:"ntilde",242:"ograve",243:"oacute",244:"ocirc",245:"otilde",246:"ouml",247:"divide",248:"oslash",249:"ugrave",250:"uacute",251:"ucirc",252:"uuml",253:"yacute",254:"thorn",255:"yuml",402:"fnof",913:"Alpha",914:"Beta",915:"Gamma",916:"Delta",917:"Epsilon",
918:"Zeta",919:"Eta",920:"Theta",921:"Iota",922:"Kappa",923:"Lambda",924:"Mu",925:"Nu",926:"Xi",927:"Omicron",928:"Pi",929:"Rho",931:"Sigma",932:"Tau",933:"Upsilon",934:"Phi",935:"Chi",936:"Psi",937:"Omega",945:"alpha",946:"beta",947:"gamma",948:"delta",949:"epsilon",950:"zeta",951:"eta",952:"theta",953:"iota",954:"kappa",955:"lambda",956:"mu",957:"nu",958:"xi",959:"omicron",960:"pi",961:"rho",962:"sigmaf",963:"sigma",964:"tau",965:"upsilon",966:"phi",967:"chi",968:"psi",969:"omega",977:"thetasym",
978:"upsih",982:"piv",8226:"bull",8230:"hellip",8242:"prime",8243:"Prime",8254:"oline",8260:"frasl",8472:"weierp",8465:"image",8476:"real",8482:"trade",8501:"alefsym",8592:"larr",8593:"uarr",8594:"rarr",8595:"darr",8596:"harr",8629:"crarr",8656:"lArr",8657:"uArr",8658:"rArr",8659:"dArr",8660:"hArr",8704:"forall",8706:"part",8707:"exist",8709:"empty",8711:"nabla",8712:"isin",8713:"notin",8715:"ni",8719:"prod",8721:"sum",8722:"minus",8727:"lowast",8730:"radic",8733:"prop",8734:"infin",8736:"ang",8743:"and",
8744:"or",8745:"cap",8746:"cup",8747:"int",8756:"there4",8764:"sim",8773:"cong",8776:"asymp",8800:"ne",8801:"equiv",8804:"le",8805:"ge",8834:"sub",8835:"sup",8836:"nsub",8838:"sube",8839:"supe",8853:"oplus",8855:"otimes",8869:"perp",8901:"sdot",8968:"lceil",8969:"rceil",8970:"lfloor",8971:"rfloor",9001:"lang",9002:"rang",9674:"loz",9824:"spades",9827:"clubs",9829:"hearts",9830:"diams",338:"OElig",339:"oelig",352:"Scaron",353:"scaron",376:"Yuml",710:"circ",732:"tilde",8194:"ensp",8195:"emsp",8201:"thinsp",
8204:"zwnj",8205:"zwj",8206:"lrm",8207:"rlm",8211:"ndash",8212:"mdash",8216:"lsquo",8217:"rsquo",8218:"sbquo",8220:"ldquo",8221:"rdquo",8222:"bdquo",8224:"dagger",8225:"Dagger",8240:"permil",8249:"lsaquo",8250:"rsaquo",8364:"euro"});
function beautifyCode(c,a,b){a=a||"abstract else instanceof super boolean enum int switch break export interface synchronized byte extends let this case false long throw catch final native throws char finally new transient class float null true const for package try continue function private typeof debugger goto protected var default if public void delete implements return volatile do import short while double in static with".split(" ");c=c.replace(/\b(\w+)\b/g,function(b){return-1!=a.indexOf(b)?
"<span class='rsv'>"+b+"</span>":b});c=c.replace(/\b([0-9]+)\b/g,function(a){return"<span class='num'>"+a+"</span>"});c=c.replace(/(\w+\.\w+)/g,function(a){a=a.split(".");return"<span class='obj'>"+a[0]+"</span>.<span class='prop'>"+a[1]+"</span>"});c=c.replace(/(\w+)\(/g,function(a){return"<span class='prop'>"+a.substr(0,a.length-1)+"</span>("});c=c.replace(/(\"(\\.|[^\"])*\")/g,function(a){return"<span class='str'>"+a+"</span>"});c=c.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,function(a){return"<span class='cmnt'>"+
a.replace(/<[^>]*>/g,"")+"</span>"});b||(c="<style>.obj { color: #79B; } .prop { color: #B97; }\t.str,.num { color: #A79; } .cmnt { color: #798; } .rsv { color: #9AB; } </style>"+c);return c}
function beautifyJSON(c,a){"object"==typeof c&&(c=JSON.stringify(c));var b=["false","true","null"];c=c.replace(/(\w+)/g,function(a){return-1!=b.indexOf(a)?"<span class='rsv'>"+a+"</span>":a});c=c.replace(/([0-9]+)/g,function(a){return"<span class='num'>"+a+"</span>"});c=c.replace(/(\w+\.\w+)/g,function(a){a=a.split(".");return"<span class='obj'>"+a[0]+"</span>.<span class='prop'>"+a[1]+"</span>"});c=c.replace(/(\"(\\.|[^\"])*\")/g,function(a){return"<span class='str'>"+a+"</span>"});c=c.replace(/(\/\/[a-zA-Z0-9\?\!\(\)_ ]*)/g,
function(a){return"<span class='cmnt'>"+a+"</span>"});a||(c="<style>.obj { color: #79B; } .prop { color: #B97; }\t.str { color: #A79; } .num { color: #B97; } .cmnt { color: #798; } .rsv { color: #9AB; } </style>"+c);return c}function dataURItoBlob(c){for(var a=c.indexOf(","),b=atob(c.substr(a+1)),e=new ArrayBuffer(b.length),d=new Uint8Array(e),f=b.length,g=0;g<f;g++)d[g]=b.charCodeAt(g);c=c.substr(5,a-5);c=c.substr(0,c.length-7);return new Blob([e],{type:c})}
(function(){function c(a,b){b=b||{};a=a||"";var c=document.createElement("div");c.className="litegui searchbox";c.innerHTML="<input value='"+a+"' placeholder='"+(null!=b.placeholder?b.placeholder:"Search")+"'/>";this.input=c.querySelector("input");this.root=c;var e=this;this.input.onchange=function(a){a=a.target.value;b.callback&&b.callback.call(e,a)}}function a(a,b){function c(a){var b=parseInt(k.style.top);k.style.top=(b+0.1*a.deltaY).toFixed()+"px";a.preventDefault();return!0}this.options=b=b||
{};var e=this;b.parentMenu&&(b.parentMenu.constructor!==this.constructor?(console.error("parentMenu must be of class ContextMenu, ignoring it"),b.parentMenu=null):(this.parentMenu=b.parentMenu,this.parentMenu.lock=!0,this.parentMenu.current_submenu=this));b.event&&"MouseEvent"!==b.event.constructor.name&&"PointerEvent"!==b.event.constructor.name&&"CustomEvent"!==b.event.constructor.name&&(console.error("Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it."),b.event=null);
var k=document.createElement("div");k.className="litecontextmenu litemenubar-panel";k.style.minWidth=100;k.style.minHeight=100;k.style.pointerEvents="none";setTimeout(function(){k.style.pointerEvents="auto"},100);k.addEventListener("mouseup",function(a){a.preventDefault();return!0},!0);k.addEventListener("contextmenu",function(a){if(2!=a.button)return!1;a.preventDefault();return!1},!0);k.addEventListener("mousedown",function(a){if(2==a.button)return e.close(),a.preventDefault(),!0},!0);this.root=
k;if(b.title){var l=document.createElement("div");l.className="litemenu-title";l.innerHTML=b.title;k.appendChild(l)}var l=0,m;for(m in a){var p=a.constructor==Array?a[m]:m;null!=p&&p.constructor!==String&&(p=void 0===p.content?String(p):p.content);this.addItem(p,a[m],b);l++}k.addEventListener("mouseleave",function(a){e.lock||(k.closing_timer&&clearTimeout(k.closing_timer),k.closing_timer=setTimeout(e.close.bind(e,a),500))});k.addEventListener("mouseenter",function(a){k.closing_timer&&clearTimeout(k.closing_timer)});
k.addEventListener("wheel",c,!0);k.addEventListener("mousewheel",c,!0);m=document;b.event&&(m=b.event.target.ownerDocument);m||(m=document);m.body.appendChild(k);l=b.left||0;m=b.top||0;if(b.event)if("MouseEvent"!==b.event.constructor.name&&"PointerEvent"!==b.event.constructor.name&&"CustomEvent"!==b.event.constructor.name)console.warn("Event passed to ContextMenu is not of type MouseEvent"),b.event=null;else{l=b.event.pageX-10;m=b.event.pageY-10;b.title&&(m-=20);b.parentMenu&&(l=b.parentMenu.root.getBoundingClientRect(),
l=l.left+l.width);var p=document.body.getBoundingClientRect(),r=k.getBoundingClientRect();l>p.width-r.width-10&&(l=p.width-r.width-10);m>p.height-r.height-10&&(m=p.height-r.height-10)}k.style.left=l+"px";k.style.top=m+"px"}function b(a,b,c){c=c||{};var e=this.root=document.createElement("ul");e.id=a;e.className="litelist";this.items=[];var k=this;this.callback=c.callback;for(var l in b){a=document.createElement("li");a.className="list-item";a.data=b[l];a.dataset.value=b[l];var m="";"string"==typeof b[l]?
m=b[l]+"<span class='arrow'></span>":(m=(b[l].name||b[l].title||"")+"<span class='arrow'></span>",b[l].id&&(a.id=b[l].id));a.innerHTML=m;a.addEventListener("click",function(){for(var a=e.querySelectorAll(".list-item.selected"),b=0;b<a.length;++b)a[b].classList.remove("selected");this.classList.add("selected");LiteGUI.trigger(k.root,"wchanged",this);k.callback&&k.callback(this.data)});e.appendChild(a)}c.parent&&(c.parent.root?c.parent.root.appendChild(e):c.parent.appendChild(e))}function e(a){a=a||
{};this.root=document.createElement("div");this.root.className="litecomplexlist";this.item_code=a.item_code||"<div class='listitem'><span class='tick'><span>"+LiteGUI.special_codes.tick+"</span></span><span class='title'></span><button class='trash'>"+LiteGUI.special_codes.close+"</button></div>";a.height&&(this.root.style.height=LiteGUI.sizeToCSS(a.height));this.onItemRemoved=this.onItemToggled=this.onItemSelected=this.selected=null}LiteGUI.Button=function(a,b){b=b||{};"function"===typeof b&&(b=
{callback:b});var c=this,e=document.createElement("div");e.className="litegui button";this.root=e;var k=document.createElement("button");k.className="litebutton";this.content=k;e.appendChild(k);k.innerHTML=a;k.addEventListener("click",function(a){c.click()});this.click=function(){b.callback&&b.callback.call(c)}};c.prototype.setValue=function(a){this.input.value=a;this.input.onchange()};c.prototype.getValue=function(){return this.input.value};LiteGUI.SearchBox=c;a.prototype.addItem=function(a,b,c){function e(a){var b=
this.value;b&&b.has_submenu&&k.call(this,a)}function k(a){var b=this.value,e=!0;l.current_submenu&&l.current_submenu.close(a);if(c.callback){var d=c.callback.call(l,b,c,a);!0===d&&(e=!1)}if(b&&(b.callback&&!c.ignore_item_callbacks&&!0!==b.disabled&&(d=b.callback.call(this,b,c,a,l),!0===d&&(e=!1)),b.submenu)){if(!b.submenu.options)throw"ContextMenu submenu needs options";new LiteGUI.ContextMenu(b.submenu.options,{callback:b.submenu.callback,event:a,parentMenu:l,ignore_item_callbacks:b.submenu.ignore_item_callbacks,
title:b.submenu.title,autoopen:c.autoopen});e=!1}e&&!l.lock&&l.close()}var l=this;c=c||{};var m=document.createElement("div");m.className="litemenu-entry submenu";var p=!1;if(null===b)m.classList.add("separator");else{m.innerHTML=b&&b.title?b.title:a;if(m.value=b)b.disabled&&(p=!0,m.classList.add("disabled")),(b.submenu||b.has_submenu)&&m.classList.add("has_submenu");"function"==typeof b?(m.dataset.value=a,m.onclick_callback=b):m.dataset.value=b}this.root.appendChild(m);p||m.addEventListener("click",
k);c.autoopen&&m.addEventListener("mouseenter",e);return m};a.prototype.close=function(a,b){this.root.parentNode&&this.root.parentNode.removeChild(this.root);this.parentMenu&&!b&&(this.parentMenu.lock=!1,this.parentMenu.current_submenu=null,void 0===a?this.parentMenu.close():a&&!LiteGUI.isCursorOverElement(a,this.parentMenu.root)&&LiteGUI.trigger(this.parentMenu.root,"mouseleave",a));this.current_submenu&&this.current_submenu.close(a,!0);this.root.closing_timer&&clearTimeout(this.root.closing_timer)};
a.prototype.getTopMenu=function(){return this.options.parentMenu?this.options.parentMenu.getTopMenu():this};a.prototype.getFirstEvent=function(){return this.options.parentMenu?this.options.parentMenu.getFirstEvent():this.options.event};LiteGUI.ContextMenu=a;LiteGUI.ContextualMenu=a;LiteGUI.Checkbox=function(a,b){this.value=a;var c=this.root=document.createElement("span");c.className="litecheckbox inputfield";c.dataset.value=a;var e=this.element=document.createElement("span");e.className="fixed flag checkbox "+
(a?"on":"off");c.appendChild(e);c.addEventListener("click",function(a){this.setValue("true"!=this.root.dataset.value);a.preventDefault();a.stopPropagation()}.bind(this));this.setValue=function(a){if(this.value!==a&&this.root.dataset.value!=a.toString()){(this.root.dataset.value=a)?(this.element.classList.remove("off"),this.element.classList.add("on")):(this.element.classList.remove("on"),this.element.classList.add("off"));var c=this.value;this.value=a;b&&b(a,c)}};this.getValue=function(){return this.value}};
LiteGUI.createLitebox=function(a,b){var c=document.createElement("span");c.className="listbox "+(a?"listopen":"listclosed");c.innerHTML=a?"&#9660;":"&#9658;";c.dataset.value=a?"open":"closed";c.addEventListener("click",function(a){a.target.setValue("open"==this.dataset.value?!1:!0);this.stopPropagation&&a.stopPropagation()});c.on_change_callback=b;c.setEmpty=function(a){a?this.classList.add("empty"):this.classList.remove("empty")};c.expand=function(){this.setValue(!0)};c.collapse=function(){this.setValue(!1)};
c.setValue=function(a){this.dataset.value!=(a?"open":"closed")&&(a?(this.dataset.value="open",this.innerHTML="&#9660;",this.classList.add("listopen"),this.classList.remove("listclosed")):(this.dataset.value="closed",this.innerHTML="&#9658;",this.classList.remove("listopen"),this.classList.add("listclosed")),b&&b(this.dataset.value))};c.getValue=function(){return this.dataset.value};return c};b.prototype.getSelectedItem=function(){return this.root.querySelector(".list-item.selected")};b.prototype.setSelectedItem=
function(a){for(var b=this.root.querySelectorAll(".list-item"),c=0;c<b.length;c++){var e=b[c];if(e.data==a){LiteGUI.trigger(e,"click");break}}};LiteGUI.List=b;LiteGUI.Slider=function(a,b){function c(a){var e=l.getBoundingClientRect();if(e){var d=b.min||0;m.setValue(a/e.width*((b.max||1)-d)+d)}}function e(a){var b=l.getBoundingClientRect();if(b)return c((void 0===a.x?a.pageX:a.x)-b.left),a.preventDefault(),!1}function k(a){var b=p||document;p=null;b.removeEventListener("mousemove",e);b.removeEventListener("mouseup",
k);a.preventDefault();return!1}b=b||{};var l=this.root=document.createElement("div"),m=this;this.value=a;l.className="liteslider";this.setValue=function(a,c){var e=b.min||0,d=b.max||1;a<e?a=e:a>d&&(a=d);d=(a-e)/(d-e);e=(100*d).toFixed(1)+"%";d=(100*d+2).toFixed(1)+"%";l.style.background="linear-gradient(to right, #999 "+e+", #FC0 "+d+", #333 "+d+")";if(a!=this.value&&(this.value=a,!c&&(LiteGUI.trigger(this.root,"change",a),this.onChange)))this.onChange(a)};var p=null;l.addEventListener("mousedown",
function(a){var b;a.offsetX?b=a.offsetX:a.layerX&&(b=a.layerX);c(b);p=l.ownerDocument;p.addEventListener("mousemove",e);p.addEventListener("mouseup",k);a.preventDefault();a.stopPropagation()});this.setValue(a)};LiteGUI.LineEditor=function(a,b){function c(a){return[q.width*((n.xrange[1]-n.xrange[0])*a[0]+n.xrange[0]),q.height*((n.yrange[1]-n.yrange[0])*a[1]+n.yrange[0])]}function e(a){return[(a[0]/q.width-n.xrange[0])/(n.xrange[1]-n.xrange[0]),(a[1]/q.height-n.yrange[0])/(n.yrange[1]-n.yrange[0])]}
function k(a){var b=q.getBoundingClientRect(),c=a.clientX-b.left,d=a.clientY-b.top;0>c?c=0:c>q.width&&(c=q.width);0>d?d=0:d>q.height&&(d=q.height);if(-1!=s&&p([a.clientX-b.left,a.clientY-b.top],[c,d])>0.5*q.height)n.value.splice(s,1),l(a);else{b=e([-(t[0]-c),t[1]-d]);if(-1!=s){var f=n.xrange[0],g=n.xrange[1];n.no_trespassing&&(0<s&&(f=n.value[s-1][0]),s<n.value.length-1&&(g=n.value[s+1][0]));var k=n.value[s];k[0]+=b[0];k[1]+=b[1];k[0]<f?k[0]=f:k[0]>g&&(k[0]=g);k[1]<n.yrange[0]?k[1]=n.yrange[0]:k[1]>
n.yrange[1]&&(k[1]=n.yrange[1])}r();n.redraw();t[0]=c;t[1]=d;m();a.preventDefault();a.stopPropagation()}}function l(a){s=-1;n.redraw();document.removeEventListener("mousemove",k);document.removeEventListener("mouseup",l);m();a.preventDefault();a.stopPropagation()}function m(){b.callback?b.callback.call(n,n.value):LiteGUI.trigger(n,"change")}function p(a,b){return Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2))}function r(){var a=null;-1!=s&&(a=n.value[s]);n.value.sort(function(a,b){return a[0]-
b[0]});a&&(s=n.value.indexOf(a))}b=b||{};var n=document.createElement("div");n.className="curve "+(b.extraclass?b.extraclass:"");n.style.minHeight="50px";n.style.width=b.width||"100%";n.bgcolor=b.bgcolor||"#222";n.pointscolor=b.pointscolor||"#5AF";n.linecolor=b.linecolor||"#444";n.value=a||[];n.xrange=b.xrange||[0,1];n.yrange=b.yrange||[0,1];n.defaulty=null!=b.defaulty?b.defaulty:0.5;n.no_trespassing=b.no_trespassing||!1;n.show_samples=b.show_samples||0;n.options=b;n.style.minWidth="50px";n.style.minHeight=
"20px";var q=document.createElement("canvas");q.width=b.width||200;q.height=b.height||50;n.appendChild(q);n.canvas=q;n.addEventListener("mousedown",function(a){document.addEventListener("mousemove",k);document.addEventListener("mouseup",l);for(var b=q.getBoundingClientRect(),d=a.clientX-b.left,b=a.clientY-b.top,f=q.height-b,m=1E5,x=-1,w=0;w<n.value.length;w++){var u=c(n.value[w]),u=p([d,f],u);u<m&&8>u&&(m=u,x=w)}s=x;-1==s&&(f=e([d,q.height-b]),n.value.push(f),r(),s=n.value.indexOf(f));t=[d,b];n.redraw();
a.preventDefault();a.stopPropagation()});n.getValueAt=function(a){if(a<n.xrange[0]||a>n.xrange[1])return n.defaulty;for(var b=[n.xrange[0],n.defaulty],c=0,c=0;c<n.value.length;c+=1){var e=n.value[c];if(a==e[0])return e[1];if(a<e[0])return c=(a-b[0])/(e[0]-b[0]),b[1]*(1-c)+e[1]*c;b=e}e=[n.xrange[1],n.defaulty];c=(a-b[0])/(e[0]-b[0]);return b[1]*(1-c)+e[1]*c};n.resample=function(a){var b=[];a=(n.xrange[1]-n.xrange[0])/a;for(var c=n.xrange[0];c<=n.xrange[1];c+=a)b.push(n.getValueAt(c));return b};n.addValue=
function(a){for(var b=0;b<n.value;b++)if(!(n.value[b][0]<a[0])){n.value.splice(b,0,a);redraw();return}n.value.push(a);redraw()};var s=-1;n.redraw=function(){var a=q.parentNode.getBoundingClientRect();a&&q.width!=a.width&&a.width&&1E3>a.width&&(q.width=a.width);a&&q.height!=a.height&&a.height&&1E3>a.height&&(q.height=a.height);a=q.getContext("2d");a.setTransform(1,0,0,1,0,0);a.translate(0,q.height);a.scale(1,-1);a.fillStyle=n.bgcolor;a.fillRect(0,0,q.width,q.height);a.strokeStyle=n.linecolor;a.beginPath();
var b=c([n.xrange[0],n.defaulty]);a.moveTo(b[0],b[1]);for(var e in n.value)b=n.value[e],b=c(b),a.lineTo(b[0],b[1]);b=c([n.xrange[1],n.defaulty]);a.lineTo(b[0],b[1]);a.stroke();for(e=0;e<n.value.length;e+=1)b=n.value[e],b=c(b),a.fillStyle=s==e?"white":n.pointscolor,a.beginPath(),a.arc(b[0],b[1],s==e?4:2,0,2*Math.PI),a.fill();if(n.show_samples){var d=n.resample(n.show_samples);a.fillStyle="#888";for(e=0;e<d.length;e+=1)b=[(n.xrange[1]-n.xrange[0])/n.show_samples*e+n.xrange[0],d[e]],b=c(b),a.beginPath(),
a.arc(b[0],b[1],2,0,2*Math.PI),a.fill()}};var t=[0,0];n.redraw();return n};e.prototype.addTitle=function(a){a=LiteGUI.createElement("div",".listtitle",a);this.root.appendChild(a);return a};e.prototype.addHTML=function(a,b){var c=LiteGUI.createElement("div",".listtext",a);b&&c.addEventListener("mousedown",b);this.root.appendChild(c);return c};e.prototype.clear=function(){this.root.innerHTML=""};e.prototype.addItem=function(a,b,c,e){var k=LiteGUI.createListItem(this.item_code,{".title":b||a.content||
a.name});k.item=a;c&&k.classList.add("enabled");e||(k.querySelector(".trash").style.display="none");var l=this;k.addEventListener("mousedown",function(b){b.preventDefault();this.setSelected(!0);if(l.onItemSelected)l.onItemSelected(a,k)});k.querySelector(".tick").addEventListener("mousedown",function(b){b.preventDefault();k.classList.toggle("enabled");if(l.onItemToggled)l.onItemToggled(a,k,k.classList.contains("enabled"))});k.querySelector(".trash").addEventListener("mousedown",function(b){b.preventDefault();
b.stopPropagation();b.stopImmediatePropagation();if(l.onItemRemoved)l.onItemRemoved(a,k)});k.setContent=function(a,b){b?k.querySelector(".title").innerHTML=a:k.querySelector(".title").innerText=a};k.toggleEnabled=function(a){k.classList.toggle("enabled")};k.setSelected=function(a){LiteGUI.removeClass(l.root,"selected");a?this.classList.add("selected"):this.classList.remove("selected");l.selected=k.item};k.show=function(){this.style.display=""};k.hide=function(){this.style.display="none"};this.root.appendChild(k);
return k};LiteGUI.ComplexList=e})();
(function(){function c(a){a=a||{};this.root=document.createElement("div");this.root.className="liteconsole";this.root.innerHTML="<div class='log'></div><div class='foot'><input type='text'/></div>";this.log_element=this.root.querySelector(".log");this.input=this.root.querySelector("input");this.input.addEventListener("keydown",this.processKeyDown.bind(this));this._prompt=a.prompt||"]";this.onProcessCommand=this.onAutocomplete=null;this.history=[];this._history_offset=0}c.prototype.processKeyDown=
function(a){if(!this._input_blocked){if(13==a.keyCode){var b=this.input.value.trim();this.addMessage(this._prompt+b,"me",!0);this.input.value="";this.history.push(b);10<this.history.length&&this.history.shift();if(this.onProcessCommand)this.onProcessCommand(b);this._history_offset=0}else if(38==a.keyCode||40==a.keyCode){this._history_offset+=38==a.keyCode?-1:1;0<this._history_offset?this._history_offset=0:this._history_offset<-this.history.length&&(this._history_offset=-this.history.length);b=this.history.length+
this._history_offset;if(0>b)return;this.input.value=b>=this.history.length?"":this.history[b]}else if(9==a.keyCode)if(this.onAutocomplete)this.input.value=this.onAutocomplete(this.input.value);else return;else return;a.preventDefault();a.stopPropagation()}};c.prototype.addMessage=function(a,b,c){function d(a,d){g=document.createElement("pre");c?g.innerText=a:g.innerHTML=a;g.className="msg";b&&(g.className+=" "+b);f.appendChild(g);1E3<f.children.length&&f.removeChild(f.children[0])}var f=this.log_element,
g=null;if(a&&a.constructor===Array)for(var h=0;h<a.length;++h)d(a[h]);else a&&a.constructor===Object?d(JSON.stringify(a,null,""),this):d(a,this);this.log_element.scrollTop=1E6;g.update=function(a){this.innerHTML=a};return g};c.prototype.log=function(){var a=Array.prototype.slice.call(arguments).join(",");return this.addMessage(a,"msglog")};c.prototype.warn=function(){var a=Array.prototype.slice.call(arguments).join(",");return this.addMessage(a,"msgwarn")};c.prototype.error=function(){var a=Array.prototype.slice.call(arguments).join(",");
return this.addMessage(a,"msgerror")};c.prototype.clear=function(){this.log_element.innerHTML=""};LiteGUI.Console=c})();
(function(){function c(a,b){if(a&&a.constructor===String||b){var c=a;a=b||{};a.id=c;console.warn("LiteGUI.Area legacy parameter, use options as first parameter instead of id.")}a=a||{};c=document.createElement("div");c.className="litearea";a.id&&(c.id=a.id);a.className&&(c.className+=" "+a.className);this.root=c;this.root.litearea=this;var d=a.width||"100%",f=a.height||"100%";0>d&&(d="calc( 100% - "+Math.abs(d)+"px)");0>f&&(f="calc( 100% - "+Math.abs(f)+"px)");c.style.width=d;c.style.height=f;this.options=
a;var g=this;this._computed_size=[this.root.offsetWidth,this.root.offserHeight];c=document.createElement("div");a.content_id&&(c.id=a.content_id);c.className="liteareacontent";c.style.width="100%";c.style.height="100%";this.root.appendChild(c);this.content=c;this.split_direction="none";this.sections=[];a.autoresize&&LiteGUI.bind(LiteGUI,"resized",function(){g.onResize()})}c.VERTICAL="vertical";c.HORIZONTAL="horizontal";c.splitbar_size=4;c.prototype.getSection=function(a){a=a||0;return this.sections.length>
a?this.sections[a]:null};c.prototype.onResize=function(a){var b=[this.root.offsetWidth,this.root.offsetHeight];a&&this._computed_size&&b[0]==this._computed_size[0]&&b[1]==this._computed_size[1]||this.sendResizeEvent(a)};c.prototype.sendResizeEvent=function(a){if(this.sections.length)for(var b in this.sections)this.sections[b].onResize(a);else for(a=0;a<this.root.childNodes.length;a++)if(b=this.root.childNodes[a],b.litearea)b.litearea.onResize();else LiteGUI.trigger(b,"resize");if(this.onresize)this.onresize()};
c.prototype.getWidth=function(){return this.root.offsetWidth};c.prototype.getHeight=function(){return this.root.offsetHeight};c.prototype.isVisible=function(){return"none"!=this.root.style.display};c.prototype.adjustHeight=function(){if(this.root.parentNode){var a=this.root.getClientRects()[0].top;this.root.style.height="calc( 100% - "+a+"px )"}else console.error("Cannot adjust height of LiteGUI.Area without parent")};c.prototype.split=function(a,b,e){function d(a){var b=r.root.ownerDocument;b.addEventListener("mousemove",
f);b.addEventListener("mouseup",g);n[0]=a.pageX;n[1]=a.pageY;a.stopPropagation();a.preventDefault()}function f(b){"horizontal"==a?n[0]!=b.pageX&&r.moveSplit(n[0]-b.pageX):"vertical"==a&&n[1]!=b.pageY&&r.moveSplit(b.pageY-n[1]);n[0]=b.pageX;n[1]=b.pageY;b.stopPropagation();b.preventDefault();if(r.options.immediateResize||r.options.inmediateResize)r.onResize()}function g(a){a=r.root.ownerDocument;a.removeEventListener("mousemove",f);a.removeEventListener("mouseup",g);r.onResize()}if(!a||a.constructor!==
String)throw"First parameter must be a string: 'vertical' or 'horizontal'";b||(b=["50%",null]);if("vertical"!=a&&"horizontal"!=a)throw"First parameter must be a string: 'vertical' or 'horizontal'";if(this.sections.length)throw"cannot split twice";var h=new LiteGUI.Area({content_id:this.content.id});h.root.style.display="inline-block";var k=new LiteGUI.Area;k.root.style.display="inline-block";var l="",m=null,p=null;e&&(l=" - "+(c.splitbar_size+2)+"px",m=document.createElement("div"),m.className="litesplitbar "+
a,"vertical"==a?m.style.height=c.splitbar_size+"px":m.style.width=c.splitbar_size+"px",this.splitbar=m,m.addEventListener("mousedown",d));b=b||["50%",null];"vertical"==a?(h.root.style.width="100%",k.root.style.width="100%",null==b[0]?(p=b[1],"number"==typeof p&&(p=b[1]+"px"),h.root.style.height="-moz-calc( 100% - "+p+l+" )",h.root.style.height="-webkit-calc( 100% - "+p+l+" )",h.root.style.height="calc( 100% - "+p+l+" )",k.root.style.height=p,k.size=p,p=h):null==b[1]?(p=b[0],"number"==typeof p&&(p=
b[0]+"px"),h.root.style.height=p,h.size=p,k.root.style.height="-moz-calc( 100% - "+p+l+" )",k.root.style.height="-webkit-calc( 100% - "+p+l+" )",k.root.style.height="calc( 100% - "+p+l+" )",p=k):(l=b[0],"number"==typeof l&&(l=b[0]+"px"),e=b[1],"number"==typeof e&&(e=b[1]+"px"),h.root.style.height=l,h.size=l,k.root.style.height=e,k.size=e)):(h.root.style.height="100%",k.root.style.height="100%",null==b[0]?(p=b[1],"number"==typeof p&&(p=b[1]+"px"),h.root.style.width="-moz-calc( 100% - "+p+l+" )",h.root.style.width=
"-webkit-calc( 100% - "+p+l+" )",h.root.style.width="calc( 100% - "+p+l+" )",k.root.style.width=p,k.size=b[1],p=h):null==b[1]?(p=b[0],"number"==typeof p&&(p=b[0]+"px"),h.root.style.width=p,h.size=p,k.root.style.width="-moz-calc( 100% - "+p+l+" )",k.root.style.width="-webkit-calc( 100% - "+p+l+" )",k.root.style.width="calc( 100% - "+p+l+" )",p=k):(l=b[0],"number"==typeof l&&(l=b[0]+"px"),e=b[1],"number"==typeof e&&(e=b[1]+"px"),h.root.style.width=l,h.size=l,k.root.style.width=e,k.size=e));h.root.removeChild(h.content);
h.root.appendChild(this.content);h.content=this.content;this.root.appendChild(h.root);m&&this.root.appendChild(m);this.root.appendChild(k.root);this.sections=[h,k];this.dynamic_section=p;this.direction=a;var r=this,n=[0,0]};c.prototype.hide=function(){this.root.style.display="none"};c.prototype.show=function(){this.root.style.display="block"};c.prototype.showSection=function(a){var b=this.sections[a],c=0;if(!b||"none"==b.root.style.display){c="horizontal"==this.direction?b.root.style.width:b.root.style.height;
-1!=c.indexOf("calc")&&(c="50%");for(var d in this.sections)b=this.sections[d],d==a?b.root.style.display="inline-block":"horizontal"==this.direction?b.root.style.width="calc( 100% - "+c+" - 5px)":b.root.style.height="calc( 100% - "+c+" - 5px)";this.splitbar&&(this.splitbar.style.display="inline-block");this.sendResizeEvent()}};c.prototype.hideSection=function(a){for(var b in this.sections){var c=this.sections[b];b==a?c.root.style.display="none":"horizontal"==this.direction?c.root.style.width="100%":
c.root.style.height="100%"}this.splitbar&&(this.splitbar.style.display="none");this.sendResizeEvent()};c.prototype.moveSplit=function(a){if(this.sections){var b=this.sections[0],e=this.sections[1],d=" - "+c.splitbar_size+"px",f=this.options.minSplitSize||10;"horizontal"==this.direction?this.dynamic_section==b?(a=e.root.offsetWidth+a,a<f&&(a=f),b.root.style.width="-moz-calc( 100% - "+a+"px "+d+" )",b.root.style.width="-webkit-calc( 100% - "+a+"px "+d+" )",b.root.style.width="calc( 100% - "+a+"px "+
d+" )",e.root.style.width=a+"px"):(a=b.root.offsetWidth-a,a<f&&(a=f),e.root.style.width="-moz-calc( 100% - "+a+"px "+d+" )",e.root.style.width="-webkit-calc( 100% - "+a+"px "+d+" )",e.root.style.width="calc( 100% - "+a+"px "+d+" )",b.root.style.width=a+"px"):"vertical"==this.direction&&(this.dynamic_section==b?(a=e.root.offsetHeight-a,a<f&&(a=f),b.root.style.height="-moz-calc( 100% - "+a+"px "+d+" )",b.root.style.height="-webkit-calc( 100% - "+a+"px "+d+" )",b.root.style.height="calc( 100% - "+a+
"px "+d+" )",e.root.style.height=a+"px"):(a=b.root.offsetHeight+a,a<f&&(a=f),e.root.style.height="-moz-calc( 100% - "+a+"px "+d+" )",e.root.style.height="-webkit-calc( 100% - "+a+"px "+d+" )",e.root.style.height="calc( 100% - "+a+"px "+d+" )",b.root.style.height=a+"px"));LiteGUI.trigger(this.root,"split_moved");b=this.root.querySelectorAll(".litearea");for(e=0;e<b.length;++e)LiteGUI.trigger(b[e],"split_moved")}};c.prototype.addEventListener=function(a,b,c,d){return this.root.addEventListener(a,b,
c,d)};c.prototype.setAreaSize=function(a,b){var e=this.sections[1],d=" - "+c.splitbar_size+"px";e.root.style.width="-moz-calc( 100% - "+b+d+" )";e.root.style.width="-webkit-calc( 100% - "+b+d+" )";e.root.style.width="calc( 100% - "+b+d+" )"};c.prototype.merge=function(a){if(0==this.sections.length)throw"not splitted";a=this.sections[a||0];this.root.appendChild(a.content);this.content=a.content;this.root.removeChild(this.sections[0].root);this.root.removeChild(this.sections[1].root);this.sections=
[];this._computed_size=null;this.onResize()};c.prototype.add=function(a){if("string"==typeof a){var b=document.createElement("div");b.innerHTML=a;a=b}this.content.appendChild(a.root||a)};c.prototype.query=function(a){return this.root.querySelector(a)};LiteGUI.Area=c;LiteGUI.Split=function(a,b,c){b=b||{};if(a&&a.constructor===String){var d=a;a=b;b=c||{};b.id=d;console.warn("LiteGUI.Split legacy parameter, use sections as first parameter instead of id.")}this.root=c=document.createElement("div");b.id&&
(c.id=d);c.className="litesplit "+(b.vertical?"vsplit":"hsplit");this.sections=[];for(var f in a)d=document.createElement("div"),d.className="split-section split"+f,"number"==typeof a[f]?b.vertical?d.style.height=a[f].toFixed(1)+"%":d.style.width=a[f].toFixed(1)+"%":"string"==typeof a[f]?b.vertical?d.style.height=a[f]:d.style.width=a[f]:(a[f].id&&(d.id=a[f].id),b.vertical?d.style.height="Number"==typeof a[f].height?a[f].height.toFixed(1)+"%":a[f].height:d.style.width="Number"==typeof a[f].width?a[f].width.toFixed(1)+
"%":a[f].width),d.add=function(a){this.appendChild(a.root||a)},this.sections.push(d),c.appendChild(d);b.parent&&(b.parent.root?b.parent.root.appendChild(c):b.parent.appendChild(c));this.getSection=function(a){return this.sections[a]}}})();
(function(){function c(a,b){b=b||{};this.menu=[];this.panels=[];this.root=document.createElement("div");this.root.id=a;this.root.className="litemenubar";this.content=document.createElement("ul");this.root.appendChild(this.content);this.is_open=!1;this.auto_open=b.auto_open||!1;this.sort_entries=b.sort_entries||!1}c.closing_time=500;c.prototype.clear=function(){this.content.innerHTML="";this.menu=[];this.panels=[]};c.prototype.attachToPanel=function(a){a.content.insertBefore(this.root,a.content.firstChild)};
c.prototype.add=function(a,b){b=b||{};"function"==typeof b&&(b={callback:b});for(var c=this.menu.length,d=a.split("/"),f=0,g=0,h=this.menu,k=null;h;){if(5<f)throw"Error: Menubar too deep";if(h.length==g){k=g={parent:k,children:[]};f==d.length-1&&(g.data=b);g.disable=function(){this.data&&(this.data.disabled=!0)};g.enable=function(){this.data&&delete this.data.disabled};g.name=d[f];h.push(g);f++;if(f==d.length)break;g.children=[];h=g.children;g=0}else{if(h[g]&&d[f]==h[g].name)if(f<d.length-1){k=h[g];
h=h[g].children;g=0;f++;continue}else{console.warn("Warning: Adding menu that already exists: "+a);break}g++}}c!=this.menu.length&&this.updateMenu()};c.prototype.remove=function(a){if(a=this.findMenu(a)){if(!a.parent||!a.parent.children)return console.warn("menu without parent?");var b=a.parent.children.indexOf(a);-1!=b&&a.parent.children.splice(b,1)}};c.prototype.separator=function(a,b){var c=this.findMenu(a);c&&c.children.push({separator:!0,order:b||10})};c.prototype.findMenu=function(a){a=a.split("/");
for(var b=0,c=0,d=this.menu;d;){if(b==a.length)return d;if(d.length<=c)break;if("*"==a[b])return d[c].children;if(a[b]==d[c].name){if(b==a.length-1)return d[c];d=d[c].children;c=0;b++}else c++}return null};c.prototype.updateMenu=function(){var a=this;this.content.innerHTML="";for(var b in this.menu){var c=document.createElement("li");c.innerHTML="<span class='icon'></span><span class='name'>"+this.menu[b].name+"</span>";this.content.appendChild(c);c.data=this.menu[b];this.menu[b].element=c;c.addEventListener("click",
function(b){var c=this.data;c.data&&c.data.callback&&"function"==typeof c.data.callback&&c.data.callback(c.data);a.is_open?(a.is_open=!1,a.hidePanels()):(a.is_open=!0,a.showMenu(c,b,this))});c.addEventListener("mouseover",function(b){a.hidePanels();(a.is_open||a.auto_open)&&a.showMenu(this.data,b,this)})}};c.prototype.hidePanels=function(){if(this.panels.length){for(var a in this.panels)LiteGUI.remove(this.panels[a]);this.panels=[]}};c.prototype.showMenu=function(a,b,c,d){d||this.hidePanels();if(a.children&&
a.children.length){var f=this;f.closing_by_leave&&clearInterval(f.closing_by_leave);var g=document.createElement("div");g.className="litemenubar-panel";var h=[],k;for(k in a.children)h.push(a.children[k]);this.sort_entries&&h.sort(function(a,b){var c=10,e=10;a&&a.data&&null!=a.data.order&&(c=a.data.order);a&&a.separator&&null!=a.order&&(c=a.order);b&&b.data&&null!=b.data.order&&(e=b.data.order);b&&b.separator&&null!=b.order&&(e=b.order);return c-e});for(k in h){a=document.createElement("p");var l=
h[k];a.className="litemenu-entry "+(a.children?" submenu":"");var m=l.children&&l.children.length;m&&a.classList.add("has_submenu");l&&l.name?a.innerHTML="<span class='icon'></span><span class='name'>"+l.name+(m?"<span class='more'>+</span>":"")+"</span>":a.classList.add("separator");a.data=l;if(a.data.data){l=a.data.data;if("checkbox"==l.type&&l.instance&&l.property&&!0==l.instance[l.property]||!0==l.checkbox||l.instance&&l.property&&l.hasOwnProperty("value")&&l.instance[l.property]==l.value||"function"==
typeof l.isChecked&&l.isChecked.call(l.instance,l))a.className+=" checked";l.disabled&&(a.className+=" disabled")}a.addEventListener("click",function(){var a=this.data;if(a.data){if(a.data.disabled)return;a.data.instance&&a.data.property&&("checkbox"==a.data.type?(a.data.instance[a.data.property]=!a.data.instance[a.data.property],a.data.instance[a.data.property]?this.classList.add("checked"):this.classList.remove("checked")):a.data.hasOwnProperty("value")&&(a.data.instance[a.data.property]=a.data.value));
null!=a.data.checkbox&&(a.data.checkbox=!a.data.checkbox,a.data.checkbox?this.classList.add("checked"):this.classList.remove("checked"));a.data.callback&&"function"==typeof a.data.callback&&a.data.callback(a.data)}a.children&&a.children.length?f.showMenu(a,b,this,!0):(f.is_open=!1,f.hidePanels())});a.addEventListener("mouseenter",function(a){});g.appendChild(a)}g.addEventListener("mouseleave",function(a){f.closing_by_leave&&clearInterval(f.closing_by_leave);f.closing_by_leave=setTimeout(function(){f.is_open=
!1;f.hidePanels()},LiteGUI.Menubar.closing_time)});g.addEventListener("mouseenter",function(a){f.closing_by_leave&&clearInterval(f.closing_by_leave);f.closing_by_leave=null});c=c.getBoundingClientRect();g.style.left=c.left+(d?200:0)+"px";g.style.top=c.top+c.height+(d?-20:10)+"px";this.panels.push(g);document.body.appendChild(g)}};LiteGUI.Menubar=c})();
(function(){function c(a,b){function c(a){a.deltaY&&(g.scrollLeft+=a.deltaY)}if(b||a&&a.constructor===String){var d=a;a=b||{};a.id=d;console.warn("LiteGUI.Tabs legacy parameter, use options as first parameter instead of id.")}this.options=a=a||{};var d=this.mode=a.mode||"horizontal",f=document.createElement("DIV");a.id&&(f.id=a.id);f.data=this;f.className="litetabs "+d;this.root=f;this.root.tabs=this;this.current_tab=null;"horizontal"==d?a.size&&(this.root.style.height="full"==a.size?"100%":a.size):
"vertical"==d&&a.size&&(this.root.style.width="full"==a.size?"100%":a.size);a.width&&(this.root.style.width=a.width.constructor===Number?a.width.toFixed(0)+"px":a.width);a.height&&(this.root.style.height=a.height.constructor===Number?a.height.toFixed(0)+"px":a.height);var g=document.createElement("UL");g.className="wtabcontainer";"vertical"==d?g.style.width=LiteGUI.Tabs.tabs_width+"px":g.style.height=LiteGUI.Tabs.tabs_height+"px";g.addEventListener("wheel",c);g.addEventListener("mousewheel",c);this.list=
g;this.root.appendChild(this.list);this.tabs_root=g;this.tabs={};this.tabs_by_index=[];this.selected=null;this.onchange=a.callback;a.parent&&this.appendTo(a.parent)}c.tabs_width=64;c.tabs_height=26;c.prototype.show=function(){this.root.style.display="block"};c.prototype.hide=function(){this.root.style.display="none"};c.prototype.getCurrentTab=function(){return this.current_tab?this.tabs[this.current_tab[0]]:null};c.prototype.getCurrentTabId=function(){return this.current_tab[0]};c.prototype.getPreviousTab=
function(){return this.previous_tab?this.tabs[this.previous_tab[0]]:null};c.prototype.appendTo=function(a,b){b?a.prepend(this.root):a.appendChild(this.root)};c.prototype.getTab=function(a){return this.tabs[a]};c.prototype.getTabByIndex=function(a){return this.tabs_by_index[a]};c.prototype.getNumOfTabs=function(){var a=0,b;for(b in this.tabs)a++;return a};c.prototype.getTabContent=function(a){if(a=this.tabs[a])return a.content};c.prototype.getTabIndex=function(a){a=this.tabs[a];if(!a)return-1;for(var b=
0;b<this.list.childNodes.length;b++)if(this.list.childNodes[b]==a.tab)return b;return-1};c.prototype.addTab=function(a,b,e){b=b||{};"function"==typeof b&&(b={callback:b});var d=this;if(void 0===a||null===a)a="rand_"+(1E6*Math.random()|0);e=document.createElement("LI");var f=a.replace(/ /gi,"_");e.className="wtab wtab-"+f+" ";e.dataset.id=a;e.innerHTML="<span class='tabtitle'>"+(b.title||a)+"</span>";b.button&&(e.className+="button ");b.tab_className&&(e.className+=b.tab_className);b.bigicon&&(e.innerHTML=
"<img class='tabbigicon' src='"+b.bigicon+"'/>"+e.innerHTML);b.closable&&(e.innerHTML+="<span class='tabclose'>"+LiteGUI.special_codes.close+"</span>",e.querySelector("span.tabclose").addEventListener("click",function(b){d.removeTab(a);b.preventDefault();b.stopPropagation()},!0));if(void 0!==b.index){var g=this.list.childNodes[b.index];g?this.list.insertBefore(e,g):this.list.appendChild(e)}else this.plus_tab?this.list.insertBefore(e,this.plus_tab):this.list.appendChild(e);b.tab_width&&(e.style.width=
b.tab_width.constructor===Number?b.tab_width.toFixed(0)+"px":b.tab_width,e.style.minWidth="0");this.options.autoswitch&&(e.classList.add("autoswitch"),e.addEventListener("dragenter",function(a){d._timeout_mouseover&&clearTimeout(d._timeout_mouseover);d._timeout_mouseover=setTimeout(function(){LiteGUI.trigger(this,"click");d._timeout_mouseover=null}.bind(this),500)}),e.addEventListener("dragleave",function(a){d._timeout_mouseover&&(clearTimeout(d._timeout_mouseover),d._timeout_mouseover=null)}));g=
document.createElement("div");b.id&&(g.id=b.id);g.className="wtabcontent wtabcontent-"+f+" "+(b.className||"");g.dataset.id=a;g.style.display="none";"horizontal"==this.mode?b.size&&(g.style.overflow="auto","full"==b.size?(g.style.width="100%",g.style.height="calc( 100% - "+LiteGUI.Tabs.tabs_height+"px )",g.style.height="-moz-calc( 100% - "+LiteGUI.Tabs.tabs_height+"px )",g.style.height="-webkit-calc( 100% - "+LiteGUI.Tabs.tabs_height+"px )"):g.style.height=b.size):"vertical"==this.mode&&b.size&&(g.style.overflow=
"auto","full"==b.size?(g.style.height="100%",g.style.width="calc( 100% - "+LiteGUI.Tabs.tabs_width+"px )",g.style.width="-moz-calc( 100% - "+LiteGUI.Tabs.tabs_width+"px )",g.style.width="-webkit-calc( 100% - "+LiteGUI.Tabs.tabs_width+"px )"):g.style.width=b.size);void 0!==b.width&&(g.style.width="string"===typeof b.width?b.width:b.width+"px");void 0!==b.height&&(g.style.height="string"===typeof b.height?b.height:b.height+"px");b.content&&("string"==typeof b.content?g.innerHTML=b.content:g.appendChild(b.content));
this.root.appendChild(g);b.button?e.addEventListener("click",function(a){var c=this.dataset.id;b.callback&&b.callback(c,a)}):e.addEventListener("click",c.prototype.onTabClicked);e.options=b;e.tabs=this;var f=e.querySelector("span.tabtitle"),h={id:a,tab:e,content:g,title:f,add:function(a){this.content.appendChild(a.root||a)},setTitle:function(a){this.title.innerHTML=a},click:function(){LiteGUI.trigger(this.tab,"click")},destroy:function(){d.removeTab(this.id)}};b.onclose&&(h.onclose=b.onclose);this.tabs[a]=
h;this.recomputeTabsByIndex();e.addEventListener("contextmenu",function(a){if(2!=a.button)return!1;a.preventDefault();b.callback_context&&b.callback_context.call(h);return!1}.bind(this));!0!=b.selected&&null!=this.selected||this.selectTab(a,b.skip_callbacks);return h};c.prototype.addPlusTab=function(a){this.plus_tab&&console.warn("There is already a plus tab created in this tab widget");this.plus_tab=this.addTab("plus_tab",{title:"+",tab_width:20,button:!0,callback:a,skip_callbacks:!0})};c.prototype.addButtonTab=
function(a,b,c){return this.addTab(a,{title:b,tab_width:20,button:!0,callback:c,skip_callbacks:!0})};c.prototype.onTabClicked=function(a){if(!this.classList.contains("selected")&&this.parentNode){var b=this.options,c=this.parentNode.parentNode.tabs;if(!c)throw"tabs not found";if(!b.callback_canopen||!1!=b.callback_canopen()){c.current_tab&&c.current_tab[0]!=d&&c.current_tab[2]&&c.current_tab[2].callback_leave&&c.current_tab[2].callback_leave(c.current_tab[0],c.current_tab[1],c.current_tab[2]);var d=
this.dataset.id,f=null,g;for(g in c.tabs){var h=c.tabs[g];g==d?(h.selected=!0,h.content.style.display="",f=h.content):(delete h.selected,h.content.style.display="none")}h=c.list.querySelectorAll("li.wtab");for(g=0;g<h.length;++g)h[g].classList.remove("selected");this.classList.add("selected");c.previous_tab=c.current_tab;c.current_tab=[d,f,b];if(a&&(b.callback&&b.callback(d,f,a),LiteGUI.trigger(c,"wchange",[d,f]),c.onchange))c.onchange(d,f);c.selected=d}}};c.prototype.selectTab=function(a,b){if(a){a.constructor!=
String&&(a=a.id);for(var c=this.list.querySelectorAll("li.wtab"),d=0;d<c.length;d++)if(a==c[d].dataset.id){this.onTabClicked.call(c[d],!b);break}}};c.prototype.setTabVisibility=function(a,b){var c=this.tabs[a];c&&(c.tab.style.display=b?"none":null,c.content.style.display=b?"none":null)};c.prototype.recomputeTabsByIndex=function(){this.tabs_by_index=[];for(var a in this.tabs){for(var b=this.tabs[a],c=0,d=b.tab;null!=(d=d.previousSibling);)c++;this.tabs_by_index[c]=b}};c.prototype.removeTab=function(a){var b=
this.tabs[a];if(b){if(b.onclose)b.onclose(b);b.tab.parentNode&&b.tab.parentNode.removeChild(b.tab);b.content.parentNode&&b.content.parentNode.removeChild(b.content);delete this.tabs[a];this.recomputeTabsByIndex()}else console.warn("tab not found: "+a)};c.prototype.removeAllTabs=function(a){var b=[],c;for(c in this.tabs)b.push(this.tabs[c]);for(c in b){var d=b[c];d==this.plus_tab&&a||(d.tab.parentNode&&d.tab.parentNode.removeChild(d.tab),d.content.parentNode&&d.content.parentNode.removeChild(d.content),
delete this.tabs[d.id])}this.recomputeTabsByIndex()};c.prototype.clear=function(){this.removeAllTabs()};c.prototype.hideTab=function(a){this.setTabVisibility(a,!1)};c.prototype.showTab=function(a){this.setTabVisibility(a,!0)};c.prototype.transferTab=function(a,b,c){var d=this.tabs[a];if(d){b.tabs[a]=d;void 0!==c?b.list.insertBefore(d.tab,b.list.childNodes[c]):b.list.appendChild(d.tab);b.root.appendChild(d.content);delete this.tabs[a];c=null;for(var f in this.tabs){c=f;break}c&&this.selectTab(c);d.tab.classList.remove("selected");
b.selectTab(a)}};c.prototype.detachTab=function(a,b,c){if(this.tabs[a]){var d=this.getTabIndex(a),f=window.open("","","width=800, height=600, location=no, status=no, menubar=no, titlebar=no, fullscreen=yes");f.document.write("<head><title>"+a+"</title>");for(var g=document.querySelectorAll("link[rel='stylesheet'],style"),h=0;h<g.length;h++)f.document.write(g[h].outerHTML);f.document.write("</head><body></body>");f.document.close();var k=this,l=new LiteGUI.Tabs(null,this.options);f.tabs=l;f.onbeforeunload=
function(){l.transferTab(a,k,d);c&&c()};l.list.style.height="20px";f.document.body.appendChild(l.root);k.transferTab(a,l);l.tabs[a].tab.classList.add("selected");this.recomputeTabsByIndex();b&&b();return f}};LiteGUI.Tabs=c})();
(function(){function c(a,b){function c(a){var e=[a.screenX-r.data[0],r.data[1]-a.screenY];void 0!==a.movementX&&(e=[a.movementX,-a.movementY]);r.data=[a.screenX,a.screenY];g(e[b.horizontal?0:1],a);a.stopPropagation();a.preventDefault();return!1}function d(a){document.activeElement===this&&(g(0<(void 0!==a.wheelDelta?a.wheelDelta:a.deltaY?-a.deltaY/3:0)?1:-1,a),a.stopPropagation(),a.preventDefault())}function f(a){LiteGUI.trigger(k,"stop_dragging");var b=n||document;n=null;b.removeEventListener("mousemove",
c);b.removeEventListener("mouseup",f);b.exitPointerLock&&b.exitPointerLock();LiteGUI.trigger(r,"blur");a.stopPropagation();a.preventDefault();return!1}function g(a,c){b.linear||(a=0<a?Math.pow(a,1.2):-1*Math.pow(Math.abs(a),1.2));var e=b.step?b.step:1;c&&c.shiftKey?e*=10:c&&c.ctrlKey&&(e*=0.1);e=parseFloat(p.value)+a*e;null!=b.max&&e>b.max&&(e=b.max);null!=b.min&&e<b.min&&(e=b.min);p.value=e.toFixed(h);b.units&&(p.value+=b.units);LiteGUI.trigger(p,"change")}null===a||void 0===a?a=0:a.constructor===
String?a=parseFloat(a):a.constructor!==Number&&(a=0);this.value=a;var h=void 0!=b.precision?b.precision:3;this.options=b||{};var k=document.createElement("div");k.className="dragger "+(b.extraclass?b.extraclass:"");this.root=k;var l=document.createElement("span");l.className="inputfield "+(b.extraclass?b.extraclass:"")+(b.full?" full":"");b.disabled&&(l.className+=" disabled");k.appendChild(l);var m=b.dragger_class||"full",p=document.createElement("input");p.className="text number "+(m?m:"");p.value=
a.toFixed(h)+(b.units?b.units:"");p.tabIndex=b.tab_index;this.input=p;k.input=p;b.disabled&&(p.disabled=!0);b.tab_index&&(p.tabIndex=b.tab_index);l.appendChild(p);p.addEventListener("keydown",function(a){if(38==a.keyCode)g(1,a);else if(40==a.keyCode)g(-1,a);else return;a.stopPropagation();a.preventDefault();return!0});var r=document.createElement("div");r.className="drag_widget";b.disabled&&(r.className+=" disabled");l.appendChild(r);k.dragger=r;r.addEventListener("mousedown",function(a){n=p.ownerDocument;
n.removeEventListener("mousemove",c);n.removeEventListener("mouseup",f);b.disabled||(k.requestPointerLock&&k.requestPointerLock(),n.addEventListener("mousemove",c),n.addEventListener("mouseup",f),r.data=[a.screenX,a.screenY],LiteGUI.trigger(k,"start_dragging"));a.stopPropagation();a.preventDefault()});p.addEventListener("wheel",d,!1);p.addEventListener("mousewheel",d,!1);var n=null}c.prototype.setRange=function(a,b){this.options.min=a;this.options.max=b};c.prototype.setValue=function(a,b){this.value=
a=parseFloat(a);this.options.precision&&(a=a.toFixed(this.options.precision));this.options.units&&(a+=this.options.units);this.input.value=a;b||LiteGUI.trigger(this.input,"change")};c.prototype.getValue=function(){return this.value};LiteGUI.Dragger=c})();
(function(){function c(a,b,c){if(c||a&&a.constructor===String){var d=a;a=b;b=c||{};b.id=d;console.warn("LiteGUI.Tree legacy parameter, use data as first parameter instead of id.")}b=b||{};this.root=c=document.createElement("div");b.id&&(c.id=b.id);c.className="litetree";this.tree=a;var f=this;this.options=b=b||{allow_rename:!1,allow_drag:!0,allow_multiselection:!1};this.indent_offset=b.indent_offset||0;b.height&&(this.root.style.height="string"==typeof b.height?b.height:Math.round(b.height)+"px");
this.collapsed_depth=3;null!=b.collapsed_depth&&(this.collapsed_depth=b.collapsed_depth);c.addEventListener("click",function(a){if(a.srcElement==f.root&&f.onBackgroundClicked)f.onBackgroundClicked(a,f)});c.addEventListener("contextmenu",function(a){if(2!=a.button)return!1;if(f.onContextMenu)f.onContextMenu(a);a.preventDefault();return!1});a=this.createAndInsert(a,b,null);if(!a)throw"Error in LiteGUI.Tree, createAndInsert returned null";a.className+=" root_item";this.root_item=a}c.INDENT=20;c.prototype.updateTree=
function(a){this.root.innerHTML="";(a=this.createAndInsert(a,this.options,null))?(a.className+=" root_item",this.root_item=a):this.root_item=null};c.prototype.insertItem=function(a,b,c,d){if(!b){var f=this.root.childNodes[0];f&&(b=f.dataset.item_id)}a=this.createAndInsert(a,d,b,c);b&&this._updateListBox(this._findElement(b));return a};c.prototype.createAndInsert=function(a,b,c,d){var f=-1;c?f=this._findElementIndex(c):void 0===c&&(f=0);var g=null,h=0;-1!=f&&(g=this.root.childNodes[f],h=parseInt(g.dataset.level)+
1);var k=this.createTreeItem(a,b,h);if(k){k.parent_id=c;this.getItem(k.dataset.item_id)&&console.warn("There another item with the same ID in this tree");-1==f?this.root.appendChild(k):this._insertInside(k,f,d);g&&!this._isNodeChildrenVisible(c)&&k.classList.add("hidden");if(a.children)for(c=0;c<a.children.length;++c)this.createAndInsert(a.children[c],b,a.id);this._updateListBox(k,b,h);b&&b.selected&&this.markAsSelected(k,!0);return k}};c.prototype._insertInside=function(a,b,e,d){var f=this.root.childNodes[b];
if(!f)throw"No parent node found, index: "+b+", nodes: "+this.root.childNodes.length;f=parseInt(f.dataset.level);d=void 0!==d?d:f+1;if(f=a.querySelector(".indentblock"))f.style.paddingLeft=(d+this.indent_offset)*c.INDENT+"px";a.dataset.level=d;for(b+=1;b<this.root.childNodes.length;++b)if(f=this.root.childNodes[b],f.classList&&f.classList.contains("ltreeitem")){var g=parseInt(f.dataset.level);if(g==d&&e)e--;else if(g<d||0===e&&g===d){this.root.insertBefore(a,f);return}}this.root.appendChild(a)};c.prototype._isNodeChildrenVisible=
function(a){a=this.getItem(a);return!a||a.classList.contains("hidden")?!1:(a=a.querySelector(".listbox"))?"closed"==a.getValue()?!1:!0:!0};c.prototype._findElement=function(a){if(!a||a.constructor!==String)throw"findElement param must be string with item id";for(var b=0;b<this.root.childNodes.length;++b){var c=this.root.childNodes[b];if(c.classList&&c.classList.contains("ltreeitem")&&c.classList.contains("ltreeitem-"+a))return c}return null};c.prototype._findElementIndex=function(a){for(var b=0;b<
this.root.childNodes.length;++b){var c=this.root.childNodes[b];if(c.classList&&c.classList.contains("ltreeitem"))if("string"===typeof a){if(c.dataset.item_id===a)return b}else if(c===a)return b}return-1};c.prototype._findElementLastChildIndex=function(a){if(-1==a)return-1;var b=parseInt(this.root.childNodes[a].dataset.level);for(a+=1;a<this.root.childNodes.length;++a){var c=this.root.childNodes[a];if(c.classList&&c.classList.contains("ltreeitem")&&parseInt(c.dataset.level)==b)return a}return-1};c.prototype._findChildElements=
function(a,b){var c=this._findElementIndex(a);if(-1!=c){for(var d=parseInt(this.root.childNodes[c].dataset.level),f=[],c=c+1;c<this.root.childNodes.length;++c){var g=this.root.childNodes[c];if(g.classList&&g.classList.contains("ltreeitem")){var h=parseInt(g.dataset.level);if(!(b&&h>d+1)){if(h<=d)break;f.push(g)}}}return f}};c.prototype.createTreeItem=function(a,b,c){function d(b){b.preventDefault();b.stopPropagation();if(!this.title_element._editing){if(b.ctrlKey&&h.options.allow_multiselection){if(h.isNodeSelected(this)){this.classList.remove("selected");
LiteGUI.trigger(h,"item_remove_from_selection",{item:this,data:this.data});LiteGUI.trigger(h.root,"item_remove_from_selection",{item:this,data:this.data});return}h.markAsSelected(this,!0);LiteGUI.trigger(h,"item_add_to_selection",{item:this,data:this.data});LiteGUI.trigger(h.root,"item_add_to_selection",{item:this,data:this.data});var c=!1;a.callback&&(c=a.callback.call(h,this));if(!c&&h.onItemAddToSelection)h.onItemAddToSelection(this.data,this)}if(b.shiftKey&&h.options.allow_multiselection){if((c=
h.getSelectedItem())&&c!==this){b=Array.prototype.slice.call(c.parentNode.children);var c=b.indexOf(c),e=b.indexOf(this);b=e>c?b.slice(c,e):b.slice(e,c);for(c=0;c<b.length;++c)e=b[c],h.markAsSelected(e,!0),LiteGUI.trigger(h,"item_add_to_selection",{item:e,data:e.data}),LiteGUI.trigger(h.root,"item_add_to_selection",{item:e,data:e.data})}}else{h.markAsSelected(this);h._skip_scroll=!0;LiteGUI.trigger(h,"item_selected",{item:this,data:this.data});LiteGUI.trigger(h.root,"item_selected",{item:this,data:this.data});
c=!1;a.callback&&(c=a.callback.call(h,this));if(!c&&h.onItemSelected)h.onItemSelected(this.data,this);h._skip_scroll=!1}}}function f(a){var b=this,c=b.title_element.querySelector(".incontent");LiteGUI.trigger(h,"item_dblclicked",b);LiteGUI.trigger(h.root,"item_dblclicked",b);if(!c._editing&&h.options.allow_rename){c._editing=!0;c._old_name=c.innerHTML;c.innerHTML="<input type='text' value='"+c.innerHTML+"' />";var e=c.querySelector("input");e.addEventListener("blur",function(a){var e=a.target.value;
setTimeout(function(){c.innerHTML=e},1);delete c._editing;LiteGUI.trigger(h.root,"item_renamed",{old_name:c._old_name,new_name:e,item:b,data:b.data});delete c._old_name});e.addEventListener("keydown",function(a){13==a.keyCode&&this.blur()});e.focus();a.preventDefault()}a.preventDefault();a.stopPropagation()}function g(a){a.preventDefault()}if(null===a||void 0===a)console.error("Tree item cannot be null");else{b=document.createElement("li");b.className="ltreeitem";var h=this;if(a.id){var k=a.id.replace(/\s/g,
"_");b.className+=" ltreeitem-"+k;b.dataset.item_id=a.id}if(a.dataset)for(var l in a.dataset)b.dataset[l]=a.dataset[l];a.DOM=b;b.data=a;void 0!==c&&(b.dataset.level=c,b.classList.add("ltree-level-"+c));var m=document.createElement("div");m.className="ltreeitemtitle";a.className&&(m.className+=" "+a.className);m.innerHTML="<span class='precontent'></span><span class='indentblock'></span><span class='collapsebox'></span><span class='incontent'></span><span class='postcontent'></span>";c=a.content||
a.id||"";m.querySelector(".incontent").innerHTML=c;a.precontent&&(m.querySelector(".precontent").innerHTML=a.precontent);if(a.dataset)for(l in a.dataset)b.dataset[l]=a.dataset[l];b.appendChild(m);b.title_element=m;!1===a.visible&&(b.style.display="none");b.addEventListener("click",d);b.addEventListener("dblclick",f);b.addEventListener("contextmenu",function(a){a.preventDefault();a.stopPropagation();if(2==a.button)return h.onItemContextMenu?h.onItemContextMenu(a,{item:this,data:this.data}):!1});this.options.allow_drag&&
(m.draggable=!0,m.addEventListener("dragstart",function(b){b.dataTransfer.setData("item_id",this.parentNode.dataset.item_id);if(a.onDragData){var c=a.onDragData();if(c)for(var e in c)b.dataTransfer.setData(e,c[e])}}));var p=0;m.addEventListener("dragenter",function(b){b.preventDefault();if(a.skipdrag)return!1;0==p&&m.classList.add("dragover");p++});m.addEventListener("dragleave",function(a){a.preventDefault();p--;0==p&&m.classList.remove("dragover")});m.addEventListener("dragover",g);m.addEventListener("drop",
function(b){m.classList.remove("dragover");b.preventDefault();if(a.skipdrag)return!1;var c=b.dataTransfer.getData("item_id");if(c){var e=this.parentNode.dataset.item_id;(!h.onMoveItem||h.onMoveItem&&!1!=h.onMoveItem(h.getItem(c),h.getItem(e)))&&h.moveItem(c,e)&&LiteGUI.trigger(h.root,"item_moved",{item:h.getItem(c),parent_item:h.getItem(e)})}else LiteGUI.trigger(h.root,"drop_on_item",{item:this,event:b});if(h.onDropItem)h.onDropItem(b,this.parentNode.data)});return b}};c.prototype.filterByName=function(a){for(var b=
0;b<this.root.childNodes.length;++b){var e=this.root.childNodes[b];if(e.classList&&e.classList.contains("ltreeitem")){var d=e.querySelector(".incontent");if(d)if(d=d.innerHTML.toLowerCase(),a&&-1==d.indexOf(a.toLowerCase()))e.classList.add("filtered");else if(e.data&&!1!==e.data.visible&&e.classList.remove("filtered"),d=e.querySelector(".indentblock"))d.style.paddingLeft=a?0:paddingLeft=(parseInt(e.dataset.level)+this.indent_offset)*c.INDENT+"px"}}};c.prototype.filterByRule=function(a,b){if(!a)throw"filterByRule requires a callback";
for(var c=0;c<this.root.childNodes.length;++c){var d=this.root.childNodes[c];if(d.classList&&d.classList.contains("ltreeitem")){var f=d.querySelector(".incontent");if(f)if(a(d.data,f,b)){if(d.data&&!1!==d.data.visible&&d.classList.remove("filtered"),f=d.querySelector(".indentblock"))f.style.paddingLeft=name?0:paddingLeft=(parseInt(d.dataset.level)+this.indent_offset)*LiteGUI.Tree.INDENT+"px"}else d.classList.add("filtered")}}};c.prototype.getItem=function(a){if(!a)return null;if(a.classList)return a;
for(var b=0;b<this.root.childNodes.length;++b){var c=this.root.childNodes[b];if(c.classList&&c.classList.contains("ltreeitem")&&c.dataset.item_id===a)return c}return null};c.prototype.expandItem=function(a,b){var c=this.getItem(a);c&&c.listbox&&(c.listbox.setValue(!0),b&&(c=this.getParent(c))&&this.expandItem(c,b))};c.prototype.collapseItem=function(a){(a=this.getItem(a))&&a.listbox&&listbox.setValue(!1)};c.prototype.isInsideArea=function(a){a=a.constructor===String?this.getItem(a):a;if(!a)return!1;
var b=this.root.getClientRects();if(!b.length)return!1;b=b[0].height;a=a.offsetTop;return this.root.scrollTop<a&&a<this.root.scrollTop+b?!0:!1};c.prototype.scrollToItem=function(a){if(a=a.constructor===String?this.getItem(a):a){var b=this.root.parentNode;if(b){var e=b.getBoundingClientRect();if(e){var d=e.height,f=(parseInt(a.dataset.level)+this.indent_offset)*c.INDENT+50;b.scrollTop=a.offsetTop-0.5*d|0;b.scrollLeft=0.75*e.width<f?f:0}}}};c.prototype.setSelectedItem=function(a,b,c){if(a){a=this.getItem(a);
if(!a)return null;if(!a.classList.contains("selected"))return this.markAsSelected(a),b&&!this._skip_scroll&&this.scrollToItem(a),this.expandItem(a,!0),c&&LiteGUI.trigger(a,"click"),a}else this.unmarkAllAsSelected()};c.prototype.addItemToSelection=function(a){if(a){a=this.getItem(a);if(!a)return null;this.markAsSelected(a,!0);return a}};c.prototype.removeItemFromSelection=function(a){if(a){a=this.getItem(a);if(!a)return null;a.classList.remove("selected")}};c.prototype.getSelectedItem=function(){return this.root.querySelector(".ltreeitem.selected")};
c.prototype.getSelectedItems=function(){return this.root.querySelectorAll(".ltreeitem.selected")};c.prototype.isItemSelected=function(a){return(a=this.getItem(a))?this.isNodeSelected(a):!1};c.prototype.getChildren=function(a,b){a&&a.constructor!==String&&a.dataset&&(a=a.dataset.item_id);return this._findChildElements(a,b)};c.prototype.getParent=function(a){return(a=this.getItem(a))?this.getItem(a.parent_id):null};c.prototype.getAncestors=function(a,b){b=b||[];var c=this.getItem(a);return c?(b.push(c),
this.getAncestors(c.parent_id,b)):b};c.prototype.isAncestor=function(a,b){var c=this.getItem(a);if(!c)return!1;var d=this.getItem(b);return(c=this.getItem(c.parent_id))?c==d?!0:this.isAncestor(c,b):!1};c.prototype.moveItem=function(a,b){if(a===b)return!1;var c=this.getItem(a),d=this.getItem(b);if(this.isAncestor(d,c))return!1;var f=this._findElementIndex(d),g=parseInt(d.dataset.level),h=this.getParent(c);if(!h)return console.error("node parent not found by id, maybe id has changed"),!1;var k=parseInt(h.dataset.level),
f=g-k;if(!d||!c||d==h)return!1;c.parent_id=b;if(g=this.getChildren(c)){g.unshift(c);for(c=0;c<g.length;c++)g[c].parentNode.removeChild(g[c]);for(c=0;c<g.length;c++){var k=g[c],l=parseInt(k.dataset.level)+f;k.dataset.level=l}f=this._findElementIndex(d);l=this._findElementLastChildIndex(f);-1==l&&(l=0);for(c=0;c<g.length;c++)k=g[c],this._insertInside(k,f,l+c-1,parseInt(k.dataset.level))}this._updateListBox(d);h&&this._updateListBox(h);return!0};c.prototype.removeItem=function(a,b){var c=a;"string"==
typeof a&&(c=this.getItem(a));if(!c)return!1;var d=this.getParent(c),f=null;b&&(f=this.getChildren(c));this.root.removeChild(c);if(f)for(c=0;c<f.length;c++)this.root.removeChild(f[c]);d&&this._updateListBox(d);return!0};c.prototype.updateItem=function(a,b){var c=this.getItem(a);if(!c)return!1;c.data=b;b.id&&(c.id=b.id);b.content&&(c.title_element.querySelector(".incontent").innerHTML=b.content);return!0};c.prototype.updateItemId=function(a,b){var c=this.getItem(a);if(!c)return!1;var d=this.getChildren(a,
!0);c.id=b;for(c=0;c<d.length;++c)d[c].parent_id=b;return!0};c.prototype.clear=function(a){if(a){a=this.root.querySelectorAll(".ltreeitem");for(var b=1;b<a.length;b++)this.root.removeChild(a[b])}else this.root.innerHTML=""};c.prototype.getNodeByIndex=function(a){return this.root.querySelectorAll(".ltreeitem")[a]};c.prototype.unmarkAllAsSelected=function(){this.root.classList.remove("selected");var a=this.root.querySelectorAll(".ltreeitem.selected");if(a)for(var b=0;b<a.length;b++)a[b].classList.remove("selected");
a=this.root.querySelectorAll(".ltreeitem.semiselected");for(b=0;b<a.length;b++)a[b].classList.remove("semiselected")};c.prototype.isNodeSelected=function(a){return a.classList.contains("selected")?!0:!1};c.prototype.markAsSelected=function(a,b){if(!a.classList.contains("selected")){b||this.unmarkAllAsSelected();a.classList.add("selected");for(var c=this.getParent(a),d=[];c&&-1==d.indexOf(c);)c.classList.add("semiselected"),d.push(c),c=this.getParent(c)}};c.prototype._updateListBox=function(a,b,c){if(a){var d=
this;if(!a.listbox){var f=a.title_element.querySelector(".collapsebox"),g=LiteGUI.createLitebox(!0,function(b){d.onClickBox(b,a);LiteGUI.trigger(d.root,"item_collapse_change",{item:a,data:g.getValue()})});g.stopPropagation=!0;g.setEmpty(!0);f.appendChild(g);a.listbox=g}(b&&b.collapsed||c>=this.collapsed_depth)&&a.listbox.collapse();(b=this.getChildren(a.dataset.item_id))&&(b.length?a.listbox.setEmpty(!1):a.listbox.setEmpty(!0))}};c.prototype.onClickBox=function(a,b){var c=this.getChildren(b);if(c)for(var d=
0;d<c.length;++d){var f=c[d],g=this.getParent(f),h=!0;g&&(h=this._isNodeChildrenVisible(g));h?f.classList.remove("hidden"):f.classList.add("hidden")}};LiteGUI.Tree=c})();
(function(){function c(a,b){this._ctor(a,b)}c.title_height="20px";c.prototype._ctor=function(a,b){!b&&a&&a.constructor!==String&&(b=a,a=null);b=b||{};this.content=b.content||"";var c=this.root=document.createElement("div");a&&(c.id=a);c.className="litepanel "+(b.className||"");c.data=this;var d="";b.title&&(d+="<div class='panel-header'>"+b.title+"</div>");d+="<div class='content'>"+this.content+"</div>";c.innerHTML=d+"<div class='panel-footer'></div>";b.title&&(this.header=this.root.querySelector(".panel-header"));
this.content=this.root.querySelector(".content");this.footer=this.root.querySelector(".panel-footer");b.width&&(this.root.style.width=LiteGUI.sizeToCSS(b.width));b.height&&(this.root.style.height=LiteGUI.sizeToCSS(b.height));b.position&&(this.root.style.position="absolute",this.root.style.left=LiteGUI.sizeToCSS(b.position[0]),this.root.style.top=LiteGUI.sizeToCSS(b.position[1]));!0==b.scroll&&(this.content.style.overflow="auto")};c.prototype.add=function(a){this.content.appendChild(a.root)};c.prototype.clear=
function(){for(;this.content.firstChild;)this.content.removeChild(this.content.firstChild)};LiteGUI.Panel=c})();
(function(){function c(a,b){if(b||a&&a.constructor===String){var c=a;a=b||{};a.id=c;console.warn("LiteGUI.Dialog legacy parameter, use options as first parameter instead of id.")}this._ctor(a)}c.MINIMIZED_WIDTH=200;c.title_height="20px";c.getDialog=function(a){return(a=document.getElementById(a))?a.dialog:null};c.prototype._ctor=function(a){a=a||{};var b=this;this.width=a.width;this.height=a.height;this.minWidth=a.minWidth||150;this.minHeight=a.minHeight||100;this.content=a.content||"";var e=document.createElement("div");
a.id&&(e.id=a.id);e.className="litedialog "+(a.className||"");e.data=this;e.dialog=this;var d="";if(a.title){d+="<div class='panel-header'>"+a.title+"</div><div class='buttons'>";a.minimize&&(d+="<button class='litebutton mini-button minimize-button'>-</button><button class='litebutton mini-button maximize-button' style='display:none'></button>");a.hide&&(d+="<button class='litebutton mini-button hide-button'></button>");a.detachable&&(d+="<button class='litebutton mini-button detach-button'></button>");
if(a.close||a.closable)d+="<button class='litebutton mini-button close-button'>"+LiteGUI.special_codes.close+"</button>";d+="</div>"}d+="<div class='content'>"+this.content+"</div>";d+="<div class='panel-footer'></div>";e.innerHTML=d;this.root=e;this.content=e.querySelector(".content");this.footer=e.querySelector(".panel-footer");a.fullcontent&&(this.content.style.width="100%",this.content.style.height=a.title?"calc( 100% - "+c.title_height+" )":"100%");if(a.buttons)for(var f in a.buttons)this.addButton(a.buttons[f].name,
a.buttons[f]);!0==a.scroll&&(this.content.style.overflow="auto");(d=e.querySelector(".close-button"))&&d.addEventListener("click",this.close.bind(this));(d=e.querySelector(".maximize-button"))&&d.addEventListener("click",this.maximize.bind(this));(d=e.querySelector(".minimize-button"))&&d.addEventListener("click",this.minimize.bind(this));(d=e.querySelector(".hide-button"))&&d.addEventListener("click",this.hide.bind(this));(e=e.querySelector(".detach-button"))&&e.addEventListener("click",function(){b.detachWindow()});
this.enableProperties(a);this.root.addEventListener("DOMNodeInsertedIntoDocument",function(){if(b.on_attached_to_DOM)b.on_attached_to_DOM();if(b.on_resize)b.on_resize()});this.root.addEventListener("DOMNodeRemovedFromDocument",function(){if(b.on_detached_from_DOM)b.on_detached_from_DOM()});if(a.attach||a.parent)e=null,a.parent&&(e="string"==typeof a.parent?document.querySelector(a.parent):a.parent),e||(e=LiteGUI.root),e.appendChild(this.root),this.center()};c.prototype.add=function(a){this.content.appendChild(a.root||
a)};c.prototype.enableProperties=function(a){a=a||{};var b=this,c=this.root;c.style.position="absolute";c.style.minWidth=this.minWidth+"px";c.style.minHeight=this.minHeight+"px";this.width&&(c.style.width=this.width+"px");this.height&&("number"==typeof this.height?c.style.height=this.height+"px":-1!=this.height.indexOf("%")&&(c.style.height=this.height),this.content.style.height="calc( "+this.height+"px - 24px )");c.style.boxShadow="0 0 3px black";a.draggable&&(this.draggable=!0,LiteGUI.draggable(c,
c.querySelector(".panel-header"),function(){b.bringToFront()},null,function(){return!b.minimized}));a.resizable&&this.setResizable()};c.prototype.setResizable=function(){function a(c){if("mousedown"==c.type)document.body.addEventListener("mousemove",a),document.body.addEventListener("mouseup",a),h=this==d,f[0]=c.pageX,f[1]=c.pageY;else if("mousemove"==c.type){var e=LiteGUI.getRect(b),m=e.width,p=m-(f[0]-c.pageX),e=e.height,r=e-(f[1]-c.pageY);h&&(b.style.width=p+"px");b.style.height=r+"px";f[0]=c.pageX;
f[1]=c.pageY;g.content.style.height="calc( 100% - 24px )";if(g.on_resize&&(m!=p||e!=r))g.on_resize(c,p,r)}else"mouseup"==c.type&&(document.body.removeEventListener("mousemove",a),document.body.removeEventListener("mouseup",a),h=!1);c.preventDefault();c.stopPropagation();return!1}if(!this.resizable){var b=this.root;this.resizable=!0;var c=this.footer;c.style.minHeight="4px";c.classList.add("resizable");var d=document.createElement("div");d.className="resizable-corner";this.root.appendChild(d);c.addEventListener("mousedown",
a);d.addEventListener("mousedown",a,!0);var f=[0,0],g=this,h=!1}};c.prototype.dockTo=function(a,b){if(a){var c=this.root;b=b||"full";a=a.content||a;c.style.top=0;c.style.left=0;c.style.boxShadow="0 0 0";if("full"==b)c.style.position="relative",c.style.width="100%",c.style.height="100%",this.content.style.width="100%",this.content.style.height="calc(100% - "+LiteGUI.Panel.title_height+")",this.content.style.overflow="auto";else if("left"==b||"right"==b)c.style.position="absolute",c.style.top=0,c.style[b]=
0,c.style.width=this.width+"px",c.style.height="100%",this.content.style.height="calc(100% - "+LiteGUI.Panel.title_height+")",this.content.style.overflow="auto","right"==b&&(c.style.left="auto",c.style.right=0);else if("bottom"==b||"top"==b)c.style.width="100%",c.style.height=this.height+"px","bottom"==b&&(c.style.bottom=0,c.style.top="auto");this.draggable&&LiteGUI.draggable(c);a.content?a.content.appendChild(c):"string"==typeof a?(a=document.querySelector(a))&&a.appendChild(c):a.appendChild(c)}};
c.prototype.addButton=function(a,b){b=b||{};b.constructor===Function&&(b={callback:b});var c=this,d=document.createElement("button");d.className="litebutton";d.innerHTML=a;b.className&&(d.className+=" "+b.className);this.root.querySelector(".panel-footer").appendChild(d);d.addEventListener("click",function(a){b.callback&&b.callback(this);b.close&&c.close()});return d};c.prototype.close=function(){LiteGUI.remove(this.root);LiteGUI.trigger(this,"closed",this);if(this.on_close)this.on_close();this.onclose&&
console.warn("Dialog: Do not use onclose, use on_close instead");this.dialog_window&&(this.dialog_window.close(),this.dialog_window=null)};c.prototype.highlight=function(a){a=a||100;this.root.style.outline="1px solid white";var b=this.root.ownerDocument;(b.defaultView||b.parentWindow).focus();setTimeout(function(){this.root.style.outline=null}.bind(this),a)};c.minimized=[];c.prototype.minimize=function(){if(!this.minimized){this.minimized=!0;this.old_box=this.root.getBoundingClientRect();this.root.querySelector(".content").style.display=
"none";var a=this.root.querySelector(".minimize-button");a&&(a.style.display="none");if(a=this.root.querySelector(".maximize-button"))a.style.display="";this.root.style.width=LiteGUI.Dialog.MINIMIZED_WIDTH+"px";LiteGUI.bind(this,"closed",function(){LiteGUI.Dialog.minimized.splice(LiteGUI.Dialog.minimized.indexOf(this),1);LiteGUI.Dialog.arrangeMinimized()});LiteGUI.Dialog.minimized.push(this);LiteGUI.Dialog.arrangeMinimized();LiteGUI.trigger(this,"minimizing")}};c.arrangeMinimized=function(){for(var a in LiteGUI.Dialog.minimized){var b=
LiteGUI.Dialog.minimized[a],c=b.root.parentNode.getBoundingClientRect().height-20;b.root.style.left=LiteGUI.Dialog.MINIMIZED_WIDTH*a;b.root.style.top=c+"px"}};c.prototype.maximize=function(){if(this.minimized){this.minimized=!1;this.root.querySelector(".content").style.display="";LiteGUI.draggable(this.root);this.root.style.left=this.old_box.left+"px";this.root.style.top=this.old_box.top+"px";this.root.style.width=this.old_box.width+"px";this.root.style.height=this.old_box.height+"px";var a=this.root.querySelector(".minimize-button");
a&&(a.style.display="");if(a=this.root.querySelector(".maximize-button"))a.style.display="none";LiteGUI.Dialog.minimized.splice(LiteGUI.Dialog.minimized.indexOf(this),1);LiteGUI.Dialog.arrangeMinimized();LiteGUI.trigger(this,"maximizing")}};c.prototype.makeModal=function(){LiteGUI.showModalBackground(!0);LiteGUI.modalbg_div.appendChild(this.root);this.show();this.center();LiteGUI.bind(this,"closed",function(a){LiteGUI.showModalBackground(!1)})};c.prototype.bringToFront=function(){var a=this.root.parentNode;
a.removeChild(this.root);a.appendChild(this.root)};c.prototype.show=function(a,b){if(!this.root.parentNode){if(b){var c=b.ownerDocument;(c.querySelector(".litegui-wrap")||c.body).appendChild(this.root);(c.defaultView||c.parentWindow).focus()}else LiteGUI.add(this);this.center()}this.detach_window||(this.root.style.display="",LiteGUI.trigger(this,"shown"))};c.prototype.hide=function(a){this.root.style.display="none";LiteGUI.trigger(this,"hidden")};c.prototype.fadeIn=function(a){a=a||1E3;this.root.style.display=
"";this.root.style.opacity=0;var b=this;setTimeout(function(){b.root.style.transition="opacity "+a+"ms";b.root.style.opacity=1},100)};c.prototype.setPosition=function(a,b){this.root.parentNode||console.warn("LiteGUI.Dialog: Cannot set position of dialog if it is not in the DOM");this.root.position="absolute";this.root.style.left=a+"px";this.root.style.top=b+"px"};c.prototype.setSize=function(a,b){this.root.style.width="number"==typeof a?a+"px":a;this.root.style.height="number"==typeof b?b+"px":b};
c.prototype.setTitle=function(a){this.header&&(this.header.innerHTML=a)};c.prototype.center=function(){if(this.root.parentNode){this.root.position="absolute";var a=this.root.offsetHeight,b=this.root.parentNode.offsetHeight;this.root.style.left=Math.floor(0.5*(this.root.parentNode.offsetWidth-this.root.offsetWidth))+"px";this.root.style.top=Math.floor(0.5*(b-a))+"px"}};c.prototype.adjustSize=function(a,b){a=a||0;this.content.style.height="auto";if(0!=this.content.offsetHeight||b){var c=0,d=this.root.querySelector(".panel-footer");
d&&(c+=d.offsetHeight);this.setSize(this.content.offsetWidth,this.content.offsetHeight+20+a+c)}else{var f=this;setTimeout(function(){f.adjustSize(a,!0)},1)}};c.prototype.clear=function(){this.content.innerHTML=""};c.prototype.detachWindow=function(a,b){if(!this.dialog_window){var c=this.root.getClientRects()[0],d=c.width,c=c.height,f="Window",g=this.root.querySelector(".panel-header");g&&(f=g.textContent);var h=window.open("","","width="+d+", height="+c+", location=no, status=no, menubar=no, titlebar=no, fullscreen=yes");
h.document.write("<head><title>"+f+"</title>");this.dialog_window=h;d=document.querySelectorAll("link[rel='stylesheet'],style");for(c=0;c<d.length;c++)h.document.write(d[c].outerHTML);h.document.write("</head><body></body>");h.document.close();h.onbeforeunload=function(){var a=LiteGUI.windows.indexOf(h);-1!=a&&LiteGUI.windows.splice(a,1);b&&b()};h.document.body.appendChild(this.content);this.root.style.display="none";this._old_height=this.content.style.height;this.content.style.height="100%";LiteGUI.windows.push(h);
a&&a();return h}};c.prototype.reattachWindow=function(a){this.dialog_window&&(this.root.appendChild(this.content),this.root.style.display="",this.content.style.height=this._old_height,delete this._old_height,this.dialog_window.close(),a=LiteGUI.windows.indexOf(this.dialog_window),-1!=a&&LiteGUI.windows.splice(a,1),this.dialog_window=null)};c.showAll=function(){for(var a=document.body.querySelectorAll("litedialog"),b=0;b<a.length;b++)a[b].dialog.show()};c.hideAll=function(){for(var a=document.body.querySelectorAll("litedialog"),
b=0;b<a.length;b++)a[b].dialog.hide()};c.closeAll=function(){for(var a=document.body.querySelectorAll("litedialog"),b=0;b<a.length;b++)a[b].dialog.close()};LiteGUI.Dialog=c})();
(function(){function c(a){a=a||{};this.root=document.createElement("table");this.root.classList.add("litetable");this.columns=[];this.column_fields=[];this.rows=[];this.data=[];this._must_update_header=!0;a.colums&&this.setColumns(a.colums);a.scrollable&&(this.root.style.overflow="auto");a.height&&(this.root.style.height=LiteGUI.sizeToCSS(a.height));a.columns&&this.setColumns(a.columns);a.rows&&this.setRows(a.data)}c.prototype.setRows=function(a,b){this.data=a;this.updateContent(b)};c.prototype.addRow=
function(a,b){for(var c=document.createElement("tr"),d=0;d<this.column_fields.length;++d){var f=document.createElement("td"),g=null,g=a.constructor===Array?a[d]:a[this.column_fields[d]];void 0===g&&(g="");f.innerHTML=g;g=this.columns[d];if(void 0===g)break;g.className&&(f.className=g.className);g.width&&(f.style.width=g.width);c.appendChild(f)}this.root.appendChild(c);this.rows.push(c);b||this.data.push(a);return c};c.prototype.updateRow=function(a,b){this.data[a]=b;var c=this.rows[a];if(c){for(var d=
c.querySelectorAll("td"),f=0;f<d.length;++f){var g=this.columns[f],h=null,h=b.constructor===Array?b[f]:b[g.field];void 0===h&&(h="");d[f].innerHTML=h}return c}};c.prototype.updateCell=function(a,b,c){if(a=this.rows[a])if(b=a.childNodes[b])return b.innerHTML=c,b};c.prototype.setColumns=function(a){this.columns.length=0;this.column_fields.length=0;for(var b=Math.floor(100/a.length).toFixed(1)+"%",c=[],d=0;d<a.length;++d){var f=a[d];if(null!==f&&void 0!==f){if(f.constructor===String||f.constructor===
Number)f={name:String(f)};f={name:f.name||"",width:LiteGUI.sizeToCSS(f.width||b),field:(f.field||f.name||"").toLowerCase(),className:f.className};d==a.length-1?f.width=" calc( 100% - ( "+c.join(" + ")+" ) )":c.push(f.width);this.columns.push(f);this.column_fields.push(f.field)}}this._must_update_header=!0;this.updateContent()};c.prototype.updateContent=function(a){this.root.innerHTML="";if(this._must_update_header){this.header=document.createElement("tr");for(var b=0;b<this.columns.length;++b){var c=
this.columns[b],d=document.createElement("th");d.innerHTML=c.name;c.width&&(d.style.width=c.width);c.th=d;this.header.appendChild(d)}this._must_update_header=!1}this.root.appendChild(this.header);if(this.data)if(this.data.length!=this.rows.length&&(a=!1),a)for(b=0;b<this.rows.length;++b)a=this.updateRow(b,this.data[b]),this.root.appendChild(a);else for(b=this.rows.length=0;b<this.data.length;++b)this.addRow(this.data[b],!0)};LiteGUI.Table=c})();
function Inspector(c,a){if(c&&c.constructor===String){var b=c;c=a||{};c.id=b;console.warn("LiteGUI.Inspector legacy parameter, use options as first parameter instead of id.")}c=c||{};this.root=document.createElement("DIV");this.root.className="inspector "+(c.full?"full":"")+(c.className||"");c.one_line&&(this.one_line=!0,this.root.className+=" one_line");c.id&&(this.root.id=c.id);this.sections=[];this.values={};this.widgets=[];this.widgets_by_name={};this.row_number=0;this.addContainer();this.tab_index=
Math.floor(1E4*Math.random());c.width&&(this.root.style.width=LiteGUI.sizeToCSS(c.width));c.height&&(this.root.style.height=LiteGUI.sizeToCSS(c.height),c.one_line||(this.root.style.overflow="auto"));c.name_width&&(this.name_width=c.name_width);c.widgets_width&&(this.widgets_width=c.widgets_width);c.noscroll&&(this.root.style.overflow="hidden");c.onchange&&(this.onchange=c.onchange);c.parent&&this.appendTo(c.parent);this.className=this.root.className;this.widgets_per_row=c.widgets_per_row||1}
Inspector.prototype.getValues=function(){var c={},a;for(a in this.widgets_by_name)c[a]=this.widgets_by_name[a].getValue();return c};Inspector.prototype.setValues=function(c){for(var a in c)this.widgets_by_name[a]&&this.widgets_by_name[a].setValue(c[a])};Inspector.prototype.appendTo=function(c,a){c&&(c.constructor===String&&(c=document.querySelector(c)),c&&(a?c.insertBefore(this.root,c.firstChild):c.appendChild(this.root)))};
Inspector.prototype.clear=function(){for(purgeElement(this.root,!0);this.root.hasChildNodes();)this.root.removeChild(this.root.lastChild);this.root.className=this.className;this.row_number=0;this.values={};this.widgets=[];this.widgets_by_name={};this.sections=[];this._current_container_stack=this._current_container=this.current_section=null;this.addContainer()};Inspector.prototype.refresh=function(){if(this.on_refresh)this.on_refresh()};
Inspector.prototype.append=function(c,a){a=a||{};var b=a.widget_parent||this._current_container||this.root;a.replace?a.replace.parentNode.replaceChild(c,a.replace):(c.section=this.current_section,b.appendChild(c))};Inspector.prototype.pushContainer=function(c){if(this._current_container_stack){if(-1!=this._current_container_stack.indexOf(c)){console.warn("Container already in the stack");return}this._current_container_stack.push(c)}else this._current_container_stack=[c];this._current_container=c};
Inspector.prototype.isContainerInStack=function(c){return this._current_container_stack?-1!=this._current_container_stack.indexOf(c)?!0:!1:!1};
Inspector.prototype.popContainer=function(c){this.row_number=0;if(this._current_container_stack&&this._current_container_stack.length){if(c)for(var a=this._current_container_stack.pop();a&&a!=c;)a=this._current_container_stack.pop();else this._current_container_stack.pop();this._current_container=this._current_container_stack[this._current_container_stack.length-1]}else this._current_container=null};Inspector.prototype.setup=function(c){for(var a in c){var b=c[a];this.add(b.type,b.name,b.value,b.options)}};
Inspector.prototype.getWidget=function(c){return null!==c&&c.constructor===Number?this.widgets[c]:this.widgets_by_name[c]};
Inspector.prototype.inspectInstance=function(c,a,b,e){function d(a,b){b=b||{};for(var c in a)b[c]=a[c];return b}if(c){a||(a=c.getProperties?c.getProperties():this.collectProperties(c));var f=c.constructor;!b&&f.properties&&(b=f.properties);var g={};if(c.getInspectorProperties)g=c.getInspectorProperties();else for(var h in a)if(b&&b[h])g[h]=d(b[h]);else{var k=a[h];if(f["@"+h])(k=f["@"+h])&&null===k.widget||(g[h]=d(k));else if(c["@"+h])g[h]=c["@"+h];else if(null!==k&&void 0!==k)switch(k.constructor){case Number:g[h]=
{type:"number",step:0.1};break;case String:g[h]={type:"string"};break;case Boolean:g[h]={type:"boolean"};break;default:if(k&&(k.constructor===Array||k.constructor.BYTES_PER_ELEMENT)){var l=null!=k[0]&&k[0].constructor===Number;switch(k.length){case 2:g[h]={type:l?"vec2":"Array",step:0.1};break;case 3:g[h]={type:l?"vec3":"Array",step:0.1};break;case 4:g[h]={type:l?"vec4":"Array",step:0.1};break;default:g[h]={type:"Array"}}}}}if(e)for(h in e)delete g[e[h]];if(f.properties_order){a={};for(h in f.properties_order)b=
f.properties_order[h],g[b]?a[b]=g[b]:console.warn("property not found in instance:",b);for(h in g)a[h]||(a[h]=g[h]);g=a}return this.showProperties(c,g)}};Inspector.prototype.collectProperties=function(c){var a={},b;for(b in c)if("_"!=b[0]&&"@"!=b[0]&&"jQuery"!=b.substr(0,6)){var e=c[b];if(!e||e.constructor!=Function||c.constructor["@"+b])a[b]=e}return a};
Inspector.prototype.showProperties=function(c,a){for(var b in a){var e=b,d=a[b];if(d){d.constructor===String&&(d={type:d});d.name&&(e=d.name);if(!d.callback){var f={instance:c,name:e,options:d};"function"!=d.type&&(d.callback=Inspector.assignValue.bind(f))}d.callback_update||(f={instance:c,name:e},d.callback_update=function(){return this.instance[this.name]}.bind(f));d.instance=c;d.varname=e;f=d.widget||d.type||"string";if(this.on_addProperty)this.on_addProperty(f,c,e,c[e],d);this.add(f,e,c[e],d)}}if(c.constructor.widgets)for(b in c.constructor.widgets)e=
c.constructor.widgets[b],this.add(e.widget,e.name,e.value,e);if(c.onShowProperties)c.onShowProperties(this);if(c.constructor.onShowProperties)c.constructor.onShowProperties(c,this)};
Inspector.assignValue=function(c){var a=this.instance,b=a[this.name];if(null==b||null==c||"enum"==this.options.type)a[this.name]=c;else if("number"==typeof b)a[this.name]=parseFloat(c);else if("string"==typeof b)a[this.name]=c;else if(c&&c.length&&b&&b.length&&!(Object.getOwnPropertyDescriptor(a,this.name)&&Object.getOwnPropertyDescriptor(a,this.name).set||Object.getOwnPropertyDescriptor(a.__proto__,this.name)&&Object.getOwnPropertyDescriptor(a.__proto__,this.name).set))for(a=0;a<c.length;++a)b[a]=
c[a];else a[this.name]=c};
Inspector.prototype.createWidget=function(c,a,b){b=b||{};a=void 0===a||null===a?"":a;var e=document.createElement("DIV");e.className="widget "+(b.className||"");e.inspector=this;e.options=b;e.name=c;this.row_number+=this.widgets_per_row;0==this.row_number%2&&(e.className+=" even");var d=b.width||this.widgets_width;d&&(e.style.width=LiteGUI.sizeToCSS(d),e.style.width||(e.style.width="calc("+LiteGUI.sizeToCSS(d)+")"),e.style.minWidth="auto");if(d=b.height||this.height)e.style.height=LiteGUI.sizeToCSS(d),
e.style.height||(e.style.height="calc("+LiteGUI.sizeToCSS(d)+")"),e.style.minHeight="auto";this.widgets.push(e);if(b.widget_name||c)this.widgets_by_name[b.widget_name||c]=e;1!=this.widgets_per_row&&(b.width||(e.style.width=(100/this.widgets_per_row).toFixed(2)+"%"),e.style.display="inline-block");var f=d="";void 0===c||null===c||!this.name_width&&!b.name_width||this.one_line||(f=LiteGUI.sizeToCSS(b.name_width||this.name_width),d="style='width: calc("+f+" - 0px); width: -webkit-calc("+f+" - 0px); width: -moz-calc("+
f+" - 0px); '",f="style='width: calc( 100% - "+f+"); width: -webkit-calc(100% - "+f+"); width: -moz-calc( 100% - "+f+"); '");b.name_width&&(d="style='width: "+LiteGUI.sizeToCSS(b.name_width)+" '");b.content_width&&(f="style='width: "+LiteGUI.sizeToCSS(b.content_width)+" '");var g="",h="",k=this.one_line?"":"<span class='filling'></span>";b.pretitle&&(h=b.pretitle);var l="wcontent ",m=c;b.title&&(m=b.title);null===c||void 0===c?l+=" full":g=""===c?g+("<span class='wname' title='"+m+"' "+d+">"+h+"</span>"):
g+("<span class='wname' title='"+m+"' "+d+">"+h+c+k+"</span>");a.constructor===String||a.constructor===Number||a.constructor===Boolean?e.innerHTML=g+"<span class='info_content "+l+"' "+f+">"+a+"</span>":(e.innerHTML=g+"<span class='info_content "+l+"' "+f+"></span>",(c=e.querySelector("span.info_content"))&&c.appendChild(a));e.content=e.querySelector("span.info_content");e.remove=function(){this.parentNode&&this.parentNode.removeChild(this)};return e};
Inspector.onWidgetChange=function(c,a,b,e,d,f){var g=c.section;e.skip_wchange||(g&&LiteGUI.trigger(g,"wbeforechange",b),LiteGUI.trigger(c,"wbeforechange",b));this.values[a]=b;var h=void 0;e.callback&&(h=d?e.callback.apply(c,b):e.callback.call(c,b,f));e.skip_wchange||(g&&LiteGUI.trigger(g,"wchange",b,c),LiteGUI.trigger(c,"wchange",b,c));if(this.onchange)this.onchange(a,b,c);return h};
Inspector.widget_constructors={"null":"addNull",title:"addTitle",info:"addInfo","default":"addDefault",number:"addNumber",slider:"addSlider",string:"addString",text:"addString",textarea:"addTextarea",color:"addColor","boolean":"addCheckbox",checkbox:"addCheckbox",icon:"addIcon",vec2:"addVector2",vector2:"addVector2",vec3:"addVector3",vector3:"addVector3",vec4:"addVector4",vector4:"addVector4","enum":"addCombo",dropdown:"addCombo",combo:"addCombo",button:"addButton",buttons:"addButtons",file:"addFile",
line:"addLine",list:"addList",tree:"addTree",datatree:"addDataTree",pad:"addPad",array:"addArray",separator:"addSeparator"};Inspector.registerWidget=function(c,a){var b="add"+c.charAt(0).toUpperCase()+c.slice(1);Inspector.prototype[b]=a;Inspector.widget_constructors[c]=b};
Inspector.prototype.add=function(c,a,b,e){if(!c)throw"Inspector: no type specified";1==arguments.length&&"object"==typeof c&&(e=c,c=e.type,a=e.name,b=e.value);var d=LiteGUI.Inspector.widget_constructors[c.toLowerCase()];if(d){if(d.constructor===String&&(d=LiteGUI.Inspector.prototype[d]),d&&d.constructor===Function)return e&&e.constructor===Function&&(e={callback:e}),d.call(this,a,b,e)}else console.warn("LiteGUI.Inspector do not have a widget called",c)};Inspector.prototype.getValue=function(c){return this.values[c]};
Inspector.prototype.applyOptions=function(c,a){c&&a&&(a.className&&(c.className+=" "+a.className),a.id&&(c.id=a.id),a.width&&(c.style.width=LiteGUI.sizeToCSS(a.width)),a.height&&(c.style.height=LiteGUI.sizeToCSS(a.height)))};Inspector.prototype.addSeparator=function(){var c=document.createElement("DIV");c.className="separator";this.append(c);return c};Inspector.prototype.addNull=function(c,a,b){return null};
Inspector.prototype.addDefault=function(c,a,b){return null===a||void 0===a?null:a.constructor===Boolean?this.addCheckbox(c,a,b):a.constructor===String?this.addString(c,a,b):a.constructor===Number?this.addNumber(c,a,b):4==a.length?this.addVector4(c,a,b):3==a.length?this.addVector3(c,a,b):2==a.length?this.addVector2(c,a,b):null};
Inspector.prototype.addString=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this;this.values[c]=a;var d="text";b.password&&(d="password");var f=this.createWidget(c,"<span class='inputfield full "+(b.disabled?"disabled":"")+"'><input type='"+d+"' tabIndex='"+this.tab_index+"' "+(b.focus?"autofocus":"")+" class='text string' value='"+a+"' "+(b.disabled?"disabled":"")+"/></span>",b),g=f.querySelector(".wcontent input");b.placeHolder&&g.setAttribute("placeHolder",b.placeHolder);"right"==b.align&&
(g.style.direction="rtl");g.addEventListener(b.immediate?"keyup":"change",function(a){a=Inspector.onWidgetChange.call(e,f,c,a.target.value,b);void 0!==a&&(this.value=a)});b.callback_enter&&g.addEventListener("keydown",function(a){13==a.keyCode&&(Inspector.onWidgetChange.call(e,f,c,a.target.value,b),b.callback_enter(),a.preventDefault())});this.tab_index+=1;f.setIcon=function(a){a?(g.style.background="transparent url('"+a+"') no-repeat left 4px center",g.style.paddingLeft="1.7em"):(g.style.background=
"",g.style.paddingLeft="")};b.icon&&f.setIcon(b.icon);f.setValue=function(a,b){void 0!==a&&a!==g.value&&(g.value=a,b||LiteGUI.trigger(g,"change"))};f.getValue=function(){return g.value};f.focus=function(){this.querySelector("input").focus()};f.disable=function(){g.disabled=!0};f.enable=function(){g.disabled=!1};this.append(f,b);this.processElement(f,b);return f};
Inspector.prototype.addStringButton=function(c,a,b){b=this.processOptions(b);void 0===a&&(a="");var e=this;this.values[c]=a;var d=this.createWidget(c,"<span class='inputfield button'><input type='text' tabIndex='"+this.tab_index+"' class='text string' value='"+a+"' "+(b.disabled?"disabled":"")+"/></span><button class='micro'>"+(b.button||"...")+"</button>",b),f=d.querySelector(".wcontent input");f.addEventListener("change",function(a){a=Inspector.onWidgetChange.call(e,d,c,a.target.value,b);void 0!==
a&&(this.value=a)});d.setIcon=function(a){a?(f.style.background="transparent url('"+a+"') no-repeat left 4px center",f.style.paddingLeft="1.7em"):(f.style.background="",f.style.paddingLeft="")};b.icon&&d.setIcon(b.icon);var g=d.querySelector(".wcontent button");g.addEventListener("click",function(a){b.callback_button&&b.callback_button.call(d,f.value,a)});b.button_width&&(g.style.width=LiteGUI.sizeToCSS(b.button_width),d.querySelector(".inputfield").style.width="calc( 100% - "+g.style.width+" - 6px)");
this.tab_index+=1;this.append(d,b);d.setValue=function(a,b){f.value=a;b||LiteGUI.trigger(f,"change")};d.disable=function(){f.disabled=!0;g.disabled=!0};d.enable=function(){f.disabled=!1;g.disabled=!1};d.getValue=function(){return f.value};d.focus=function(){LiteGUI.focus(f)};this.processElement(d,b);return d};
Inspector.prototype.addTextarea=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this;this.values[c]=a;var d=this.createWidget(c,"<span class='inputfield textarea "+(b.disabled?"disabled":"")+"'><textarea tabIndex='"+this.tab_index+"' "+(b.disabled?"disabled":"")+"></textarea></span>",b);this.tab_index++;var f=d.querySelector(".wcontent textarea");f.value=a;f.addEventListener(b.immediate?"keyup":"change",function(a){Inspector.onWidgetChange.call(e,d,c,a.target.value,b,!1,a)});b.callback_keydown&&
f.addEventListener("keydown",b.callback_keydown);b.height&&(f.style.height="calc( "+LiteGUI.sizeToCSS(b.height)+" - 5px )");this.append(d,b);d.setValue=function(b,c){void 0!==b&&b!=f.value&&(a=b,f.value=b,c||LiteGUI.trigger(f,"change"))};d.getValue=function(a){return f.value};d.focus=function(){LiteGUI.focus(f)};d.disable=function(){f.disabled=!0};d.enable=function(){f.disabled=!1};this.processElement(d,b);return d};
Inspector.prototype.addNumber=function(c,a,b){b=this.processOptions(b);a=a||0;var e=this;this.values[c]=a;var d=this.createWidget(c,"",b);this.append(d,b);b.extraclass="full";b.tab_index=this.tab_index;b.full=!0;b.precision=void 0!==b.precision?b.precision:2;b.step=void 0===b.step?0==b.precision?1:0.1:b.step;this.tab_index++;var f=null,f=new LiteGUI.Dragger(a,b);f.root.style.width="calc( 100% - 1px )";d.querySelector(".wcontent").appendChild(f.root);f.root.addEventListener("start_dragging",function(a){this.callback_before&&
this.callback_before.call(d)}.bind(b));d.dragger=f;b.disabled&&f.input.setAttribute("disabled","disabled");var g=d.querySelector("input");g.addEventListener("change",function(a){LiteGUI.trigger(d,"wbeforechange",a.target.value);e.values[c]=a.target.value;if(b.callback){var f=b.callback.call(d,parseFloat(a.target.value));"number"==typeof f&&(this.value=f)}LiteGUI.trigger(d,"wchange",a.target.value);if(e.onchange)e.onchange(c,a.target.value,d)});d.setValue=function(a,c){void 0!==a&&(a=parseFloat(a),
b.precision&&(a=a.toFixed(b.precision)),a+=b.units||"",g.value!=a&&(g.value=a,c||LiteGUI.trigger(g,"change")))};d.setRange=function(a,b){f.setRange(a,b)};d.getValue=function(){return parseFloat(g.value)};d.focus=function(){LiteGUI.focus(g)};d.disable=function(){g.disabled=!0};d.enable=function(){g.disabled=!1};this.processElement(d,b);return d};
Inspector.prototype.addVector2=function(c,a,b){function e(a){this.callback_before&&this.callback_before(a)}b=this.processOptions(b);b.step||(b.step=0.1);a=a||[0,0];var d=this;this.values[c]=a;var f=this.createWidget(c,"",b);b.step=b.step||0.1;b.tab_index=this.tab_index;b.full=!0;this.tab_index++;var g=f.querySelector(".wcontent"),h=new LiteGUI.Dragger(a[0],b);h.root.style.marginLeft=0;h.root.style.width="calc( 50% - 1px )";g.appendChild(h.root);b.tab_index=this.tab_index;this.tab_index++;var k=new LiteGUI.Dragger(a[1],
b);k.root.style.width="calc( 50% - 1px )";g.appendChild(k.root);f.draggers=[h,k];LiteGUI.bind(h.root,"start_dragging",e.bind(b));LiteGUI.bind(k.root,"start_dragging",e.bind(b));var l=f.querySelectorAll("input");for(a=0;a<l.length;++a)l[a].addEventListener("change",function(a){a=[];for(var e=0;e<l.length;e++)a.push(parseFloat(l[e].value));LiteGUI.trigger(f,"wbeforechange",[a]);d.values[c]=a;if(b.callback){var g=b.callback.call(f,a);if("object"==typeof g&&2<=g.length){for(e=0;e<l.length;e++)l[e].value=
g[e];a=g}}LiteGUI.trigger(f,"wchange",[a]);if(d.onchange)d.onchange(c,a,f)});this.append(f,b);f.setValue=function(a,b){a&&(h.getValue()!=a[0]&&h.setValue(a[0],!0),k.getValue()!=a[1]&&k.setValue(a[1],b))};f.setRange=function(a,b){h.setRange(a,b);k.setRange(a,b)};this.processElement(f,b);return f};
Inspector.prototype.addVector3=function(c,a,b){function e(a){this.callback_before&&this.callback_before()}b=this.processOptions(b);b.step||(b.step=0.1);a=a||[0,0,0];var d=this;this.values[c]=a;var f=this.createWidget(c,"",b);b.step=b.step||0.1;b.tab_index=this.tab_index;b.full=!0;this.tab_index++;var g=new LiteGUI.Dragger(a[0],b);g.root.style.marginLeft=0;g.root.style.width="calc( 33% - 1px )";f.querySelector(".wcontent").appendChild(g.root);b.tab_index=this.tab_index;this.tab_index++;var h=new LiteGUI.Dragger(a[1],
b);h.root.style.width="calc( 33% - 1px )";f.querySelector(".wcontent").appendChild(h.root);b.tab_index=this.tab_index;this.tab_index++;var k=new LiteGUI.Dragger(a[2],b);k.root.style.width="calc( 33% - 1px )";f.querySelector(".wcontent").appendChild(k.root);f.draggers=[g,h,k];g.root.addEventListener("start_dragging",e.bind(b));h.root.addEventListener("start_dragging",e.bind(b));k.root.addEventListener("start_dragging",e.bind(b));var l=f.querySelectorAll("input");for(a=0;a<l.length;++a)l[a].addEventListener("change",
function(a){a=[];for(var e=0;e<l.length;e++)a.push(parseFloat(l[e].value));LiteGUI.trigger(f,"wbeforechange",[a]);d.values[c]=a;if(b.callback){var g=b.callback.call(f,a);if("object"==typeof g&&3<=g.length){for(e=0;e<l.length;e++)l[e].value=g[e];a=g}}LiteGUI.trigger(f,"wchange",[a]);if(d.onchange)d.onchange(c,a,f)});this.append(f,b);f.setValue=function(a,b){a&&(g.setValue(a[0],!0),h.setValue(a[1],!0),k.setValue(a[2],b))};f.setRange=function(a,b){g.setRange(a,b);h.setRange(a,b);k.setRange(a,b)};this.processElement(f,
b);return f};
Inspector.prototype.addVector4=function(c,a,b){function e(a){this.callback_before&&this.callback_before()}b=this.processOptions(b);b.step||(b.step=0.1);a=a||[0,0,0];var d=this;this.values[c]=a;var f=this.createWidget(c,"",b);b.step=b.step||0.1;b.tab_index=this.tab_index;b.full=!0;this.tab_index++;for(var g=f.draggers=[],h=0;4>h;h++){var k=new LiteGUI.Dragger(a[h],b);k.root.style.marginLeft=0;k.root.style.width="calc( 25% - 1px )";f.querySelector(".wcontent").appendChild(k.root);b.tab_index=this.tab_index;
this.tab_index++;k.root.addEventListener("start_dragging",e.bind(b));g.push(k)}for(var l=f.querySelectorAll("input"),h=0;h<l.length;++h)l[h].addEventListener("change",function(a){a=[];for(var e=0;e<l.length;e++)a.push(parseFloat(l[e].value));LiteGUI.trigger(f,"wbeforechange",[a]);d.values[c]=a;if(b.callback){var g=b.callback.call(f,a);if("object"==typeof g&&4<=g.length){for(e=0;e<l.length;e++)l[e].value=g[e];a=g}}LiteGUI.trigger(f,"wchange",[a]);if(d.onchange)d.onchange(c,a,f)});this.append(f,b);
f.setValue=function(a,b){if(a)for(var c=0;c<g.length;c++)g[c].setValue(a[c],b)};f.setRange=function(a,b){for(var c in g)g[c].setRange(a,b)};this.processElement(f,b);return f};
Inspector.prototype.addPad=function(c,a,b){b=this.processOptions(b);b.step||(b.step=0.1);a=a||[0,0];var e=this;this.values[c]=a;var d=this.createWidget(c,"",b);b.step=b.step||0.1;b.tab_index=this.tab_index;b.full=!0;this.tab_index++;var f=b.minx||b.min||0,g=b.miny||b.min||0,h=b.maxx||b.max||1,k=b.maxy||b.max||1,l=d.querySelector(".wcontent"),m=document.createElement("div");m.className="litepad";l.appendChild(m);m.style.width="100%";m.style.height="100px";b.background&&(m.style.backgroundImage="url('"+
b.background+"')",m.style.backgroundSize="100%",m.style.backgroundRepeat="no-repeat");var p=document.createElement("div");p.className="litepad-handler";m.appendChild(p);b.tab_index=this.tab_index;this.tab_index++;m._onMouseEvent=function(a){var l=m.getBoundingClientRect();a.mousex=a.pageX-l.left;a.mousey=a.pageY-l.top;a.preventDefault();a.stopPropagation();if("mousedown"==a.type)document.body.addEventListener("mousemove",m._onMouseEvent),document.body.addEventListener("mouseup",m._onMouseEvent);else if("mousemove"==
a.type){var p=a.mousex/l.width;a=a.mousey/l.height;p=p*(h-f)+f;a=a*(k-g)+f;p=[p,a];LiteGUI.trigger(d,"wbeforechange",[p]);d.setValue(p);if(b.callback&&(a=b.callback.call(d,p))&&2<=a.length)for(l=0;l<elems.length;l++)d.setValue(a);LiteGUI.trigger(d,"wchange",[p]);if(e.onchange)e.onchange(c,p,d)}else"mouseup"==a.type&&(document.body.removeEventListener("mousemove",m._onMouseEvent),document.body.removeEventListener("mouseup",m._onMouseEvent));return!0};m.addEventListener("mousedown",m._onMouseEvent);
d.setValue=function(a,b){if(void 0!==a){var c=m.getBoundingClientRect(),d=(a[0]-f)/(h-f),e=(a[1]-g)/(k-g),d=Math.max(0,Math.min(d,1)),e=Math.max(0,Math.min(e,1)),l=(c.height-10)/c.height*100;p.style.left=((c.width-10)/c.width*d*100).toFixed(1)+"%";p.style.top=(e*l).toFixed(1)+"%"}};this.append(d,b);d.setValue(a);this.processElement(d,b);return d};
Inspector.prototype.addInfo=function(c,a,b){b=this.processOptions(b);a=void 0===a||null===a?"":a;var e=null;null!=c?e=this.createWidget(c,a,b):(e=document.createElement("div"),b.className&&(e.className=b.className),void 0!==a.nodeName?(e.innerHTML="<span class='winfo'></span>",e.childNodes[0].appendChild(a)):e.innerHTML="<span class='winfo'>"+a+"</span>");var d=e.querySelector(".winfo")||e.querySelector(".wcontent");b.callback&&e.addEventListener("click",b.callback.bind(e));e.setValue=function(a){void 0!==
a&&d&&(d.innerHTML=a)};var f=e.querySelector("span.info_content");f||(f=e.querySelector(".winfo"));b.width&&(e.style.width=LiteGUI.sizeToCSS(b.width),e.style.display="inline-block",c||(d.style.margin="2px"));b.height&&(f.style.height=LiteGUI.sizeToCSS(b.height),f.style.overflow="auto");e.scrollToBottom=function(){f.scrollTop=f.offsetTop};e.add=function(a){f.appendChild(a)};this.append(e,b);this.processElement(e,b);return e};
Inspector.prototype.addSlider=function(c,a,b){b=this.processOptions(b);void 0===b.min&&(b.min=0);void 0===b.max&&(b.max=1);void 0===b.step&&(b.step=0.01);var e=this;if(void 0===a||null===a)a=0;this.values[c]=a;var d=this.createWidget(c,"<span class='inputfield full'>\t\t\t\t<input tabIndex='"+this.tab_index+"' type='text' class='slider-text fixed nano' value='"+a+"' /><span class='slider-container'></span></span>",b),f=d.querySelector(".slider-container"),g=new LiteGUI.Slider(a,b);f.appendChild(g.root);
var h=d.querySelector(".slider-text");h.addEventListener("change",function(f){a=f=parseFloat(this.value);g.setValue(f);Inspector.onWidgetChange.call(e,d,c,f,b)});g.onChange=function(a){h.value=a;Inspector.onWidgetChange.call(e,d,c,a,b)};this.append(d,b);d.setValue=function(b,c){void 0!==b&&(a=b,g.setValue(b,c))};d.getValue=function(){return a};this.processElement(d,b);return d};
Inspector.prototype.addCheckbox=function(c,a,b){b=this.processOptions(b);a=!!a;var e=this;this.values[c]=a;var d=b.label_on||b.label||"on",f=b.label_off||b.label||"off",g=this.createWidget(c,"<span class='inputfield'><span tabIndex='"+this.tab_index+"' class='fixed flag checkbox "+(a?"on":"off")+"'>"+(a?d:f)+"</span></span>",b);this.tab_index++;var h=g.querySelector(".wcontent .checkbox");h.addEventListener("keypress",function(a){32==a.keyCode&&LiteGUI.trigger(this,"click")});g.addEventListener("click",
function(){a=!a;g.querySelector("span.flag").innerHTML=a?d:f;a?h.classList.add("on"):h.classList.remove("on");Inspector.onWidgetChange.call(e,g,c,a,b)});g.getValue=function(){return a};g.setValue=function(b,d){void 0!==b&&(a=b,e.values[c]==b||d||LiteGUI.trigger(h,"click"))};this.append(g,b);this.processElement(g,b);return g};
Inspector.prototype.addFlags=function(c,a,b){var e={},d;for(d in c)e[d]=c[d];if(a)for(d in a)"undefined"==typeof e[d]&&(e[d]=a[d]?!0:!1);for(d in e){a={};for(var f in b)a[f]=b[f];a.callback=function(a){return function(b){c[a]=b}}(d);this.addCheckbox(d,e[d],a)}};
Inspector.prototype.addCombo=function(c,a,b){function e(b,c){b||(b=[]);g=b;c&&(a=c);var d="",e=0,h;for(h in g){var k=g[h],s=g.constructor===Array?e:h,t=g.constructor===Array?k:h;k&&k.title&&(t=k.title);d+="<option value='"+s+"' "+(k==a?" selected":"")+" data-index='"+s+"'>"+t+"</option>";e++}f.querySelector("select").innerHTML=d}b=this.processOptions(b);var d=this;this.values[c]=a;this.tab_index++;var f=this.createWidget(c,"<span class='inputfield full inputcombo "+(b.disabled?"disabled":"")+"'></span>",
b);f.options=b;var g=b.values||[];g.constructor===Function&&(g=b.values());var h="<select tabIndex='"+this.tab_index+"' "+(b.disabled?"disabled":"")+" class='"+(b.disabled?"disabled":"")+"'></select>";f.querySelector("span.inputcombo").innerHTML=h;e(g);var k=!1;f.querySelector(".wcontent select").addEventListener("change",function(e){a=g[e.target.value];k||Inspector.onWidgetChange.call(d,f,c,a,b)});f.getValue=function(){return a};f.setValue=function(b,c){if(void 0!==b){a=b;var d=f.querySelector("select"),
e=d.querySelectorAll("option"),h=-1;if(g.constructor===Array)h=g.indexOf(b);else{var q=0,s;for(s in g)if(g[q]==b){h=q;break}else q++}if(-1!=h){k=c;for(s in e)(q=e[s])&&q.dataset&&(parseFloat(q.dataset.index)==h?(q.setAttribute("selected",!0),d.selectedIndex=h):q.removeAttribute("selected"));k=!1}}};f.setOptionValues=e;this.append(f,b);this.processElement(f,b);return f};
Inspector.prototype.addComboButtons=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this;this.values[c]=a;var d="";if(b.values)for(var f in b.values)d+="<button class='wcombobutton "+(a==b.values[f]?"selected":"")+"' data-name='options.values[i]'>"+b.values[f]+"</button>";var g=this.createWidget(c,d,b);a=g.querySelectorAll(".wcontent button");LiteGUI.bind(a,"click",function(a){a=a.target.innerHTML;e.values[c]=a;for(var d=g.querySelectorAll(".selected"),f=0;f<d.length;++f)d[f].classList.remove("selected");
this.classList.add("selected");Inspector.onWidgetChange.call(e,g,c,a,b)});this.append(g,b);this.processElement(g,b);return g};
Inspector.prototype.addTags=function(c,a,b){function e(a){if(!g.tags[a]){LiteGUI.trigger(g,"wbeforechange",g.tags);g.tags[a]=!0;var e=document.createElement("div");e.data=a;e.className="wtag";e.innerHTML=a+"<span class='close'>X</span>";e.querySelector(".close").addEventListener("click",function(a){a=this.parentNode.data;delete g.tags[a];LiteGUI.remove(this.parentNode);LiteGUI.trigger(g,"wremoved",a);Inspector.onWidgetChange.call(d,g,c,g.tags,b)});g.querySelector(".wtagscontainer").appendChild(e);
d.values[c]=g.tags;b.callback&&b.callback.call(g,g.tags);LiteGUI.trigger(g,"wchange",g.tags);LiteGUI.trigger(g,"wadded",a);if(d.onchange)d.onchange(c,g.tags,g)}}b=this.processOptions(b);a=a||[];var d=this;this.values[c]=a;a="<select>";if(b.values)for(var f in b.values)a+="<option>"+b.values[f]+"</option>";var g=this.createWidget(c,"<span class='inputfield full'>"+(a+"</select><div class='wtagscontainer inputfield'></div>")+"</span>",b);g.tags={};for(f in b.value)e(b.value[f]);g.querySelector(".wcontent select").addEventListener("change",
function(a){e(a.target.value)});this.append(g,b);this.processElement(g,b);return g};
Inspector.prototype.addList=function(c,a,b){function e(c){var d=l.querySelector("li.selected");if(d){if(13==c.keyCode){if(!d)return;d=a[d.dataset.pos];b.callback_dblclick&&b.callback_dblclick.call(h,d)}else if(40==c.keyCode){var e=d.nextSibling;e&&LiteGUI.trigger(e,"click");d.scrollIntoViewIfNeeded&&d.scrollIntoViewIfNeeded({block:"end",behavior:"smooth"})}else if(38==c.keyCode)(e=d.previousSibling)&&LiteGUI.trigger(e,"click"),d.scrollIntoViewIfNeeded&&d.scrollIntoViewIfNeeded({block:"end",behavior:"smooth"});
else return;c.preventDefault();c.stopPropagation();return!0}}function d(d){if(b.multiselection)this.classList.toggle("selected");else{d=l.querySelectorAll("li");for(var e=0;e<d.length;++e)d[e].classList.remove("selected");this.classList.add("selected")}d=a[this.dataset.pos];Inspector.onWidgetChange.call(h,l,c,d,b);LiteGUI.trigger(l,"wadded",d)}function f(c){c=a[this.dataset.pos];b.callback_dblclick&&b.callback_dblclick.call(h,c)}function g(a,c,e){var g=e;c=!!c;var h=null,k="";null!=a&&(a.constructor===
String||a.constructor===Number||a.constructor===Boolean?g=String(a):a&&(g=a.content||a.title||a.name||e,h=a.style,a.icon&&(k="<img src='"+a.icon+"' class='icon' /> "),a.selected&&(c=!0)));var l;l=g.replace(/<(?:.|\n)*?>/gm,"");var m=document.createElement("li");m.classList.add("item-"+LiteGUI.safeName(e));c&&m.classList.add("selected");m.dataset.name=l;m.dataset.pos=e;m.value=a;h&&m.setAttribute("style",h);m.innerHTML=k+g;m.addEventListener("click",d);b.callback_dblclick&&m.addEventListener("dblclick",
f);return m}b=this.processOptions(b);var h=this,k="";b.height&&(k="style='height: 100%; overflow: auto;'");k="<ul class='lite-list' "+k+" tabIndex='"+this.tab_index+"'><ul>";this.tab_index++;var l=this.createWidget(c,"<span class='inputfield full "+(b.disabled?"disabled":"")+"' style='height: 100%;'>"+k+"</span>",b);l.querySelector(".info_content").style.height="100%";l.querySelector(".lite-list");k=l.querySelector(".inputfield");k.style.height="100%";k.style.paddingBottom="0.2em";for(var k=l.querySelectorAll("ul"),
m=0;m<k.length;++m){var p=k[m];p.addEventListener("focus",function(){document.addEventListener("keydown",e,!0)});p.addEventListener("blur",function(){document.removeEventListener("keydown",e,!0)})}l.updateItems=function(c,e){e=e||b.selected;a=c;var f=this.querySelector("ul");f.innerHTML="";if(a)for(var h in a){var k=g(a[h],e,h);f.appendChild(k)}LiteGUI.bind(f.querySelectorAll("li"),"click",d)};l.addItem=function(b,c,d){a.constructor!==Array?console.error("cannot add item to list of object, only array"):
(a.push(b),d=this.querySelector("ul"),b=g(b,c),d.appendChild(b))};l.removeItem=function(a){for(var b=l.querySelectorAll(".wcontent li"),c=0;c<b.length;c++)b[c].dataset.name==a&&LiteGUI.remove(b[c])};l.updateItems(a,b.selected);this.append(l,b);l.getSelected=function(){for(var a=[],b=this.querySelectorAll("ul li.selected"),c=0;c<b.length;++c)a.push(b[c].dataset.name);return a};l.getByIndex=function(a){return this.querySelectorAll("ul li")[a]};l.getIndex=l.getByIndex;l.selectIndex=function(a,b){for(var c=
this.querySelectorAll("ul li"),d=0;d<c.length;++d){var e=c[d];d==a?e.classList.add("selected"):b||e.classList.remove("selected")}return c[a]};l.deselectIndex=function(a){(a=this.querySelectorAll("ul li")[a])&&a.classList.remove("selected");return a};l.scrollToIndex=function(a){if(a=this.querySelectorAll("ul li")[a])this.scrollTop=a.offsetTop};l.selectAll=function(){for(var a=this.querySelectorAll("ul li"),b=0;b<a.length;++b){var c=a[b];c.classList.contains("selected")||LiteGUI.trigger(c,"click")}};
l.deselectAll=function(){for(var a=this.querySelectorAll("ul li"),b=0;b<a.length;++b){var c=a[b];c.classList.contains("selected")&&LiteGUI.trigger(c,"click")}};l.setValue=function(a){void 0!==a&&this.updateItems(a)};l.getNumberOfItems=function(){return this.querySelectorAll("ul li").length};l.filter=function(a,b){var c=this.querySelectorAll("ul li"),d=!1;if(a&&a.constructor===String){var e=a;b&&e.toLowerCase();d=!0;a=function(a){return-1!=(b?a:a.toLowerCase()).indexOf(e)}}for(var f=0;f<c.length;++f){var g=
c[f];if(a){var h=g.value;d&&null!=h&&h.constructor!==String&&(h=g.innerHTML);a(h,g,g.classList.contains("selected"))?g.style.display="":g.style.display="none"}else g.style.display=""}};l.selectByFilter=function(a){for(var b=this.querySelectorAll("ul li"),c=0;c<b.length;++c){var d=b[c],e=a(d.value,d,d.classList.contains("selected"));!0===e?d.classList.add("selected"):!1===e&&d.classList.remove("selected")}};b.height&&(l.scrollTop=0);this.processElement(l,b);return l};
Inspector.prototype.addButton=function(c,a,b){b=this.processOptions(b);a=b.button_text||a||"";var e=this,d="";null===c&&(d="single");b.micro&&(d+=" micro");var f="";b.disabled&&(f="disabled='disabled'");var g=this.createWidget(c,"<button title='"+(b.title||"")+"' class='litebutton "+d+"' tabIndex='"+this.tab_index+"' "+f+">"+a+"</button>",b);this.tab_index++;var h=g.querySelector("button");h.addEventListener("click",function(d){Inspector.onWidgetChange.call(e,g,c,this.innerHTML,b,!1,d);LiteGUI.trigger(h,
"wclick",a)});this.append(g,b);g.wclick=function(a){b.disabled||LiteGUI.bind(this,"wclick",a)};g.setValue=function(a){void 0!==a&&(h.innerHTML=a)};g.disable=function(){h.disabled=!0};g.enable=function(){h.disabled=!1};this.processElement(g,b);return g};
Inspector.prototype.addButtons=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this,d="",f="calc( "+(100/a.length).toFixed(3)+"% - 4px )",f="width:"+f+"; width: -moz-"+f+"; width: -webkit-"+f+"; margin: 2px;";if(a&&"object"==typeof a)for(var g in a){var h="";b.title&&b.title.constructor===Array&&(h=b.title[g]||"");d+="<button class='litebutton' title='"+h+"' tabIndex='"+this.tab_index+"' style='"+f+"'>"+a[g]+"</button>";this.tab_index++}var k=this.createWidget(c,d,b);a=k.querySelectorAll("button");
for(g=0;g<a.length;++g)a[g].addEventListener("click",function(a){Inspector.onWidgetChange.call(e,k,c,this.innerHTML,b,null,a);LiteGUI.trigger(k,"wclick",this.innerHTML)});this.append(k,b);this.processElement(k,b);return k};
Inspector.prototype.addIcon=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this,d=b.image,f=b.width||b.size||20,g=b.height||b.size||20,h=this.createWidget(c,"<span class='icon' "+(b.title?"title='"+b.title+"'":"")+" tabIndex='"+this.tab_index+"'></span>",b);this.tab_index++;var k=h.querySelector("span.wcontent"),l=h.querySelector("span.icon"),m=b.x||0;b.index&&(m=b.index*-f);h.style.minWidth=h.style.width=f+"px";h.style.margin="0 2px";h.style.padding="0";k.style.margin="0";k.style.padding=
"0";l.style.display="inline-block";l.style.cursor="pointer";l.style.width=f+"px";l.style.height=g+"px";l.style.backgroundImage="url('"+d+"')";l.style.backgroundPosition=m+"px "+(a?g:0)+"px";l.addEventListener("mousedown",function(d){d.preventDefault();a=!a;d=Inspector.onWidgetChange.call(e,h,c,a,b);LiteGUI.trigger(h,"wclick",a);void 0!==d&&(a=d);l.style.backgroundPosition=m+"px "+(a?g:0)+"px";!1===b.toggle&&setTimeout(function(){l.style.backgroundPosition=m+"px 0px";a=!1},200)});this.append(h,b);
h.setValue=function(d,f){void 0!==d&&(a=d,l.style.backgroundPosition=m+"px "+(a?g:0)+"px",f||Inspector.onWidgetChange.call(e,h,c,a,b))};h.getValue=function(){return a};this.processElement(h,b);return h};
Inspector.prototype.addColor=function(c,a,b){b=this.processOptions(b);a=a||[0,0,0];var e=this;this.values[c]=a;var d="<input tabIndex='"+this.tab_index+"' id='colorpicker-"+c+"' class='color' value='"+(a[0]+","+a[1]+","+a[2])+"' "+(b.disabled?"disabled":"")+"/>";this.tab_index++;b.show_rgb&&(d+="<span class='rgb-color'>"+Inspector.parseColor(a)+"</span>");var f=this.createWidget(c,d,b);this.append(f,b);var d=f.querySelector("input.color"),g=null;if(window.jscolor){g=new jscolor.color(d);g.pickerFaceColor=
"#333";g.pickerBorderColor="black";g.pickerInsetColor="#222";g.rgb_intensity=1;b.disabled&&(g.pickerOnfocus=!1);a.constructor!==String&&a.length&&2<a.length&&(g.fromRGB(1*a[0],1*a[1],1*a[2]),g.rgb_intensity=1);d.addEventListener("change",function(a){if(a=f.querySelector(".rgb-color"))a.innerHTML=LiteGUI.Inspector.parseColor(g.rgb)});g.onImmediateChange=function(){var a=[g.rgb[0]*g.rgb_intensity,g.rgb[1]*g.rgb_intensity,g.rgb[2]*g.rgb_intensity],d=[a.concat(),g.toString()];LiteGUI.trigger(f,"wbeforechange",
d);e.values[c]=a;b.callback&&b.callback.call(f,a.concat(),"#"+g.toString(),g);LiteGUI.trigger(f,"wchange",d);if(e.onchange)e.onchange(c,a.concat(),f)};b.step=b.step||0.01;b.dragger_class="nano";var h=new LiteGUI.Dragger(1,b);f.querySelector(".wcontent").appendChild(h.root);h.input.addEventListener("change",function(a){a=parseFloat(this.value);g.rgb_intensity=a;if(g.onImmediateChange)g.onImmediateChange()});f.setValue=function(a,b){g.fromRGB(a[0],a[1],a[2]);b||LiteGUI.trigger(h.input,"change")};f.getValue=
function(){return a}}else d.addEventListener("change",function(a){if(a=f.querySelector(".rgb-color"))a.innerHTML=LiteGUI.Inspector.parseColor(g.rgb)});this.processElement(f,b);return f};
Inspector.prototype.addFile=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this;this.values[c]=a;var d=this.createWidget(c,"<span class='inputfield full whidden' style='width: calc(100% - 26px)'><span class='filename'></span></span><button class='litebutton' style='width:20px; margin-left: 2px;'>...</button><input type='file' size='100' class='file' value='"+a+"'/>",b);d.querySelector(".wcontent").style.position="relative";var f=d.querySelector(".wcontent input"),g=d.querySelector(".wcontent .filename");
a&&(g.innerText=a.name);f.addEventListener("change",function(a){if(a.target.files.length){var f=a.target.files[0];f.files=a.target.files;b.generate_url&&(f.url=URL.createObjectURL(a.target.files[0]));g.innerText=f.name;b.read_file?(a=new FileReader,a.onload=function(a){f.data=a.target.result;Inspector.onWidgetChange.call(e,d,c,f,b)},"binary"==b.read_file?a.readAsArrayBuffer(f):"data_url"==b.read_file?a.readAsDataURL(f):a.readAsText(f)):Inspector.onWidgetChange.call(e,d,c,f,b)}else g.innerText="",
Inspector.onWidgetChange.call(e,d,c,null,b)});this.append(d,b);return d};
Inspector.prototype.addLine=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this;this.values[c]=a;var d=this.createWidget(c,"<span class='line-editor'></span>",b);d.style.width="100%";a=new LiteGUI.LineEditor(a,b);d.querySelector("span.line-editor").appendChild(a);LiteGUI.bind(a,"change",function(a){LiteGUI.trigger(d,"wbeforechange",[a.target.value]);b.callback&&b.callback.call(d,a.target.value);LiteGUI.trigger(d,"wchange",[a.target.value]);Inspector.onWidgetChange.call(e,d,c,a.target.value,
b)});this.append(d,b);return d};
Inspector.prototype.addTree=function(c,a,b){b=this.processOptions(b);a=a||"";var e=this.createWidget(c,"<div class='wtree inputfield full'></div>",b);c=e.querySelector(".wtree");b.height&&(c.style.height="number"==typeof b.height?b.height+"px":b.height,c.style.overflow="auto");var d=e.tree=new LiteGUI.Tree(a,b.tree_options);d.onItemSelected=function(a,c){b.callback&&b.callback.call(e,a,c)};c.appendChild(d.root);e.setValue=function(a){d.updateTree(a)};this.append(e,b);this.processElement(e,b);return e};
Inspector.prototype.addDataTree=function(c,a,b){function e(a,b){for(var c in b){var d=document.createElement("div");d.className="treenode";"object"==typeof b[c]?(d.innerHTML="<span class='itemname'>"+c+"</span><span class='itemcontent'></span>",e(d.querySelector(".itemcontent"),b[c])):d.innerHTML="<span class='itemname'>"+c+"</span><span class='itemvalue'>"+b[c]+"</span>";a.appendChild(d)}}b=this.processOptions(b);a=a||"";c=this.createWidget(c,"<div class='wtree'></div>",b);var d=c.querySelector(".wtree");
e(d,a);this.append(c,b);return c};
Inspector.prototype.addArray=function(c,a,b){function e(){var a=this.value,c=Math.min(a.length,h);f.widgets_per_row+=1;this.innerHTML="";for(var e=0;e<c;++e){var k=null;void 0!==a[e]&&(k=a[e]);var l=document.createElement("div");l.className="array-row";l.innerHTML="<span class='row-index'>"+e+"</span><span class='row-cell'></span><button style='width: 30px;' class='litebutton single row-trash'><img src='imgs/mini-icon-trash.png'/></button>";this.appendChild(l);l={widget_parent:l.querySelector(".row-cell"),
callback:d.bind({value:this.value,index:e})};if(b.data_options)for(var s in b.data_options)l[s]=b.data_options[s];f.add(g,null,k,l)}f.widgets_per_row-=1}function d(a){this.value[this.index]=a;b.callback&&b.callback.call(k,this.value,this.index)}var f=this;if(a&&a.constructor===Array){b=this.processOptions(b);var g=b.data_type||"string",h=b.max_items||100,k=null;this.widgets_per_row=3;this.addInfo(c,null,{name_width:"100%",width:"100% - 160px"});var l=this.addString("length",a.length||"0",{width:100,
callback:function(b){b=parseInt(b);0>a&&(a=0);a.length=b;e.call(k)}});this.addButtons(null,["+","-"],{width:60,callback:function(b){"+"==b?a.length+=1:0<a.length&&(a.length-=1);l.setValue(a.length);e.call(k)}});this.widgets_per_row=1;k=this.addContainer(c,b);k.value=a;e.call(k);k.setValue=function(a){this.value=a;e.call(k)};k.getValue=function(){return this.value=v};return k}console.error("Inspector: Array widget value must be a valid array")};
Inspector.prototype.addContainer=function(c,a){c&&c.constructor!==String&&console.warn("LiteGUI.Inspector.addContainer first parameter must be a string with the name");var b=this.startContainer(null,a);this.endContainer();return b};
Inspector.prototype.startContainer=function(c,a){a=this.processOptions(a);var b=document.createElement("DIV");b.className="wcontainer";this.applyOptions(b,a);this.row_number=0;this.append(b);this.pushContainer(b);a.widgets_per_row&&(this.widgets_per_row=a.widgets_per_row);a.height&&(b.style.height=LiteGUI.sizeToCSS(a.height),b.style.overflow="auto");b.refresh=function(){b.on_refresh&&b.on_refresh.call(this,b)};return b};Inspector.prototype.endContainer=function(c,a){this.popContainer()};
Inspector.prototype.addSection=function(c,a){a=this.processOptions(a);var b=this;this.current_section&&this.current_section.end();var e=document.createElement("DIV");e.className="wsection";c||(e.className+=" notitle");a.className&&(e.className+=" "+a.className);a.collapsed&&(e.className+=" collapsed");a.id&&(e.id=a.id);a.instance&&(e.instance=a.instance);var d="";c&&(d+="<div class='wsectiontitle'>"+(a.no_collapse?"":"<span class='switch-section-button'></span>")+c+"</div>");e.innerHTML=d+"<div class='wsectioncontent'></div>";
e._last_container_stack=this._current_container_stack.concat();this.root.appendChild(e);this.sections.push(e);e.sectiontitle=e.querySelector(".wsectiontitle");c&&e.sectiontitle.addEventListener("click",function(b){"button"!=b.target.localName&&(e.classList.toggle("collapsed"),b=e.querySelector(".wsectioncontent"),b.style.display="none"===b.style.display?null:"none",a.callback&&a.callback.call(e,!e.classList.contains("collapsed")))});a.collapsed&&(e.querySelector(".wsectioncontent").style.display=
"none");this.setCurrentSection(e);a.widgets_per_row&&(this.widgets_per_row=a.widgets_per_row);e.refresh=function(){e.on_refresh&&e.on_refresh.call(this,e)};e.end=function(){if(b.current_section==this){b._current_container_stack=this._last_container_stack;b._current_container=null;var a=this.querySelector(".wsectioncontent");a&&(b.isContainerInStack(a)&&b.popContainer(a),b.current_section=null)}};return e};
Inspector.prototype.setCurrentSection=function(c){this.current_section!=c&&(this.current_section=c,this.popContainer(c.parentNode),c=c.querySelector(".wsectioncontent"),this.pushContainer(c))};Inspector.prototype.getCurrentSection=function(){for(var c=this._current_container_stack.length-1;0<=c;--c){var a=this._current_container_stack[c];if(a.classList.contains("wsectioncontent"))return a.parentNode}return null};Inspector.prototype.endCurrentSection=function(){this.current_section&&this.current_section.end()};
Inspector.prototype.beginGroup=function(c,a){a=this.processOptions(a);var b=document.createElement("DIV");b.className="wgroup";b.innerHTML="<div class='wgroupheader "+(a.title?"wtitle":"")+"'><span class='switch-section-button'></span>"+(c||"")+"</div>";b.group=!0;var e=document.createElement("DIV");e.className="wgroupcontent";a.collapsed&&(e.style.display="none");a.height&&(e.style.height=LiteGUI.sizeToCSS(a.height));a.scrollable&&(e.style.overflow="auto");b.appendChild(e);var d=a.collapsed||!1,
f=b.querySelector(".wgroupheader");d&&f.classList.add("collapsed");f.addEventListener("click",function(a){var c=b.querySelector(".wgroupcontent").style;c.display="none"===c.display?"":"none";(d=!d)?f.classList.add("collapsed"):f.classList.remove("collapsed");a.preventDefault()});this.append(b,a);this.pushContainer(e);return b};Inspector.prototype.endGroup=function(){do this.popContainer();while(this._current_container&&!this._current_container.classList.contains("wgroupcontent"))};
Inspector.prototype.addTitle=function(c,a){a=this.processOptions(a);var b=document.createElement("DIV"),e="<span class='wtitle'><span class='text'>"+c+"</span>";a.help&&(e+="<span class='help'><div class='help-content'>"+a.help+"</div></span>");b.innerHTML=e+"</span>";b.setValue=function(a){this.querySelector(".text").innerHTML=a};this.row_number=0;this.append(b,a);return b};
Inspector.prototype.scrollTo=function(c){if(c=this.root.querySelector("#"+c))this.root.parentNode.parentNode.scrollTop=c.offsetTop-this.root.offsetTop};Inspector.prototype.processOptions=function(c){"function"==typeof c&&(c={callback:c});return c||{}};Inspector.prototype.processElement=function(c,a){a.callback_update&&c.setValue&&(c.on_update=function(){this.setValue(a.callback_update.call(this),!0)})};
Inspector.prototype.updateWidgets=function(){for(var c=0;c<this.widgets.length;++c){var a=this.widgets[c];if(a.on_update)a.on_update(a)}};Inspector.parseColor=function(c){return"<span style='color: #FAA'>"+c[0].toFixed(2)+"</span>,<span style='color: #AFA'>"+c[1].toFixed(2)+"</span>,<span style='color: #AAF'>"+c[2].toFixed(2)+"</span>"};LiteGUI.Inspector=Inspector;

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// This is CodeMirror (http://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    module.exports = mod();
  else if (typeof define == "function" && define.amd) // AMD
    return define([], mod);
  else // Plain browser env
    (this || window).CodeMirror = mod();
})(function() {
  "use strict";

  // BROWSER SNIFFING

  // Kludges for bugs and behavior differences that can't be feature
  // detected are enabled based on userAgent etc sniffing.
  var userAgent = navigator.userAgent;
  var platform = navigator.platform;

  var gecko = /gecko\/\d/i.test(userAgent);
  var ie_upto10 = /MSIE \d/.test(userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
  var ie = ie_upto10 || ie_11up;
  var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : ie_11up[1]);
  var webkit = /WebKit\//.test(userAgent);
  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
  var chrome = /Chrome\//.test(userAgent);
  var presto = /Opera\//.test(userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
  var phantom = /PhantomJS/.test(userAgent);

  var ios = /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
  // This is woefully incomplete. Suggestions for alternative methods welcome.
  var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
  var mac = ios || /Mac/.test(platform);
  var windows = /win/i.test(platform);

  var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
  if (presto_version) presto_version = Number(presto_version[1]);
  if (presto_version && presto_version >= 15) { presto = false; webkit = true; }
  // Some browsers use the wrong event properties to signal cmd/ctrl on OS X
  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
  var captureRightClick = gecko || (ie && ie_version >= 9);

  // Optimize some code when these features are not used.
  var sawReadOnlySpans = false, sawCollapsedSpans = false;

  // EDITOR CONSTRUCTOR

  // A CodeMirror instance represents an editor. This is the object
  // that user code is usually dealing with.

  function CodeMirror(place, options) {
    if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);

    this.options = options = options ? copyObj(options) : {};
    // Determine effective options based on given values and defaults.
    copyObj(defaults, options, false);
    setGuttersForLineNumbers(options);

    var doc = options.value;
    if (typeof doc == "string") doc = new Doc(doc, options.mode, null, options.lineSeparator);
    this.doc = doc;

    var input = new CodeMirror.inputStyles[options.inputStyle](this);
    var display = this.display = new Display(place, doc, input);
    display.wrapper.CodeMirror = this;
    updateGutters(this);
    themeChanged(this);
    if (options.lineWrapping)
      this.display.wrapper.className += " CodeMirror-wrap";
    if (options.autofocus && !mobile) display.input.focus();
    initScrollbars(this);

    this.state = {
      keyMaps: [],  // stores maps added by addKeyMap
      overlays: [], // highlighting overlays, as added by addOverlay
      modeGen: 0,   // bumped when mode/overlay changes, used to invalidate highlighting info
      overwrite: false,
      delayingBlurEvent: false,
      focused: false,
      suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
      pasteIncoming: false, cutIncoming: false, // help recognize paste/cut edits in input.poll
      selectingText: false,
      draggingText: false,
      highlight: new Delayed(), // stores highlight worker timeout
      keySeq: null,  // Unfinished key sequence
      specialChars: null
    };

    var cm = this;

    // Override magic textarea content restore that IE sometimes does
    // on our hidden textarea on reload
    if (ie && ie_version < 11) setTimeout(function() { cm.display.input.reset(true); }, 20);

    registerEventHandlers(this);
    ensureGlobalHandlers();

    startOperation(this);
    this.curOp.forceUpdate = true;
    attachDoc(this, doc);

    if ((options.autofocus && !mobile) || cm.hasFocus())
      setTimeout(bind(onFocus, this), 20);
    else
      onBlur(this);

    for (var opt in optionHandlers) if (optionHandlers.hasOwnProperty(opt))
      optionHandlers[opt](this, options[opt], Init);
    maybeUpdateLineNumberWidth(this);
    if (options.finishInit) options.finishInit(this);
    for (var i = 0; i < initHooks.length; ++i) initHooks[i](this);
    endOperation(this);
    // Suppress optimizelegibility in Webkit, since it breaks text
    // measuring on line wrapping boundaries.
    if (webkit && options.lineWrapping &&
        getComputedStyle(display.lineDiv).textRendering == "optimizelegibility")
      display.lineDiv.style.textRendering = "auto";
  }

  // DISPLAY CONSTRUCTOR

  // The display handles the DOM integration, both for input reading
  // and content drawing. It holds references to DOM nodes and
  // display-related state.

  function Display(place, doc, input) {
    var d = this;
    this.input = input;

    // Covers bottom-right square when both scrollbars are present.
    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
    d.scrollbarFiller.setAttribute("cm-not-content", "true");
    // Covers bottom of gutter when coverGutterNextToScrollbar is on
    // and h scrollbar is present.
    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
    d.gutterFiller.setAttribute("cm-not-content", "true");
    // Will contain the actual code, positioned to cover the viewport.
    d.lineDiv = elt("div", null, "CodeMirror-code");
    // Elements are added to these to represent selection and cursors.
    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
    // A visibility: hidden element used to find the size of things.
    d.measure = elt("div", null, "CodeMirror-measure");
    // When lines outside of the viewport are measured, they are drawn in this.
    d.lineMeasure = elt("div", null, "CodeMirror-measure");
    // Wraps everything that needs to exist inside the vertically-padded coordinate system
    d.lineSpace = elt("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
                      null, "position: relative; outline: none");
    // Moved around its parent to cover visible view.
    d.mover = elt("div", [elt("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative");
    // Set to the height of the document, allowing scrolling.
    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
    d.sizerWidth = null;
    // Behavior of elts with overflow: auto and padding is
    // inconsistent across browsers. This is used to ensure the
    // scrollable area is big enough.
    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
    // Will contain the gutters, if any.
    d.gutters = elt("div", null, "CodeMirror-gutters");
    d.lineGutter = null;
    // Actual scrollable element.
    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
    d.scroller.setAttribute("tabIndex", "-1");
    // The element in which the editor lives.
    d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");

    // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
    if (ie && ie_version < 8) { d.gutters.style.zIndex = -1; d.scroller.style.paddingRight = 0; }
    if (!webkit && !(gecko && mobile)) d.scroller.draggable = true;

    if (place) {
      if (place.appendChild) place.appendChild(d.wrapper);
      else place(d.wrapper);
    }

    // Current rendered range (may be bigger than the view window).
    d.viewFrom = d.viewTo = doc.first;
    d.reportedViewFrom = d.reportedViewTo = doc.first;
    // Information about the rendered lines.
    d.view = [];
    d.renderedView = null;
    // Holds info about a single rendered line when it was rendered
    // for measurement, while not in view.
    d.externalMeasured = null;
    // Empty space (in pixels) above the view
    d.viewOffset = 0;
    d.lastWrapHeight = d.lastWrapWidth = 0;
    d.updateLineNumbers = null;

    d.nativeBarWidth = d.barHeight = d.barWidth = 0;
    d.scrollbarsClipped = false;

    // Used to only resize the line number gutter when necessary (when
    // the amount of lines crosses a boundary that makes its width change)
    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
    // Set to true when a non-horizontal-scrolling line widget is
    // added. As an optimization, line widget aligning is skipped when
    // this is false.
    d.alignWidgets = false;

    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;

    // Tracks the maximum line length so that the horizontal scrollbar
    // can be kept static when scrolling.
    d.maxLine = null;
    d.maxLineLength = 0;
    d.maxLineChanged = false;

    // Used for measuring wheel scrolling granularity
    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;

    // True when shift is held down.
    d.shift = false;

    // Used to track whether anything happened since the context menu
    // was opened.
    d.selForContextMenu = null;

    d.activeTouch = null;

    input.init(d);
  }

  // STATE UPDATES

  // Used to get the editor into a consistent state again when options change.

  function loadMode(cm) {
    cm.doc.mode = CodeMirror.getMode(cm.options, cm.doc.modeOption);
    resetModeState(cm);
  }

  function resetModeState(cm) {
    cm.doc.iter(function(line) {
      if (line.stateAfter) line.stateAfter = null;
      if (line.styles) line.styles = null;
    });
    cm.doc.frontier = cm.doc.first;
    startWorker(cm, 100);
    cm.state.modeGen++;
    if (cm.curOp) regChange(cm);
  }

  function wrappingChanged(cm) {
    if (cm.options.lineWrapping) {
      addClass(cm.display.wrapper, "CodeMirror-wrap");
      cm.display.sizer.style.minWidth = "";
      cm.display.sizerWidth = null;
    } else {
      rmClass(cm.display.wrapper, "CodeMirror-wrap");
      findMaxLine(cm);
    }
    estimateLineHeights(cm);
    regChange(cm);
    clearCaches(cm);
    setTimeout(function(){updateScrollbars(cm);}, 100);
  }

  // Returns a function that estimates the height of a line, to use as
  // first approximation until the line becomes visible (and is thus
  // properly measurable).
  function estimateHeight(cm) {
    var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
    return function(line) {
      if (lineIsHidden(cm.doc, line)) return 0;

      var widgetsHeight = 0;
      if (line.widgets) for (var i = 0; i < line.widgets.length; i++) {
        if (line.widgets[i].height) widgetsHeight += line.widgets[i].height;
      }

      if (wrapping)
        return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
      else
        return widgetsHeight + th;
    };
  }

  function estimateLineHeights(cm) {
    var doc = cm.doc, est = estimateHeight(cm);
    doc.iter(function(line) {
      var estHeight = est(line);
      if (estHeight != line.height) updateLineHeight(line, estHeight);
    });
  }

  function themeChanged(cm) {
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    clearCaches(cm);
  }

  function guttersChanged(cm) {
    updateGutters(cm);
    regChange(cm);
    setTimeout(function(){alignHorizontally(cm);}, 20);
  }

  // Rebuild the gutter elements, ensure the margin to the left of the
  // code matches their width.
  function updateGutters(cm) {
    var gutters = cm.display.gutters, specs = cm.options.gutters;
    removeChildren(gutters);
    for (var i = 0; i < specs.length; ++i) {
      var gutterClass = specs[i];
      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
      if (gutterClass == "CodeMirror-linenumbers") {
        cm.display.lineGutter = gElt;
        gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
      }
    }
    gutters.style.display = i ? "" : "none";
    updateGutterSpace(cm);
  }

  function updateGutterSpace(cm) {
    var width = cm.display.gutters.offsetWidth;
    cm.display.sizer.style.marginLeft = width + "px";
  }

  // Compute the character length of a line, taking into account
  // collapsed ranges (see markText) that might hide parts, and join
  // other lines onto it.
  function lineLength(line) {
    if (line.height == 0) return 0;
    var len = line.text.length, merged, cur = line;
    while (merged = collapsedSpanAtStart(cur)) {
      var found = merged.find(0, true);
      cur = found.from.line;
      len += found.from.ch - found.to.ch;
    }
    cur = line;
    while (merged = collapsedSpanAtEnd(cur)) {
      var found = merged.find(0, true);
      len -= cur.text.length - found.from.ch;
      cur = found.to.line;
      len += cur.text.length - found.to.ch;
    }
    return len;
  }

  // Find the longest line in the document.
  function findMaxLine(cm) {
    var d = cm.display, doc = cm.doc;
    d.maxLine = getLine(doc, doc.first);
    d.maxLineLength = lineLength(d.maxLine);
    d.maxLineChanged = true;
    doc.iter(function(line) {
      var len = lineLength(line);
      if (len > d.maxLineLength) {
        d.maxLineLength = len;
        d.maxLine = line;
      }
    });
  }

  // Make sure the gutters options contains the element
  // "CodeMirror-linenumbers" when the lineNumbers option is true.
  function setGuttersForLineNumbers(options) {
    var found = indexOf(options.gutters, "CodeMirror-linenumbers");
    if (found == -1 && options.lineNumbers) {
      options.gutters = options.gutters.concat(["CodeMirror-linenumbers"]);
    } else if (found > -1 && !options.lineNumbers) {
      options.gutters = options.gutters.slice(0);
      options.gutters.splice(found, 1);
    }
  }

  // SCROLLBARS

  // Prepare DOM reads needed to update the scrollbars. Done in one
  // shot to minimize update/measure roundtrips.
  function measureForScrollbars(cm) {
    var d = cm.display, gutterW = d.gutters.offsetWidth;
    var docH = Math.round(cm.doc.height + paddingVert(cm.display));
    return {
      clientHeight: d.scroller.clientHeight,
      viewHeight: d.wrapper.clientHeight,
      scrollWidth: d.scroller.scrollWidth, clientWidth: d.scroller.clientWidth,
      viewWidth: d.wrapper.clientWidth,
      barLeft: cm.options.fixedGutter ? gutterW : 0,
      docHeight: docH,
      scrollHeight: docH + scrollGap(cm) + d.barHeight,
      nativeBarWidth: d.nativeBarWidth,
      gutterWidth: gutterW
    };
  }

  function NativeScrollbars(place, scroll, cm) {
    this.cm = cm;
    var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
    var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    place(vert); place(horiz);

    on(vert, "scroll", function() {
      if (vert.clientHeight) scroll(vert.scrollTop, "vertical");
    });
    on(horiz, "scroll", function() {
      if (horiz.clientWidth) scroll(horiz.scrollLeft, "horizontal");
    });

    this.checkedZeroWidth = false;
    // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
    if (ie && ie_version < 8) this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
  }

  NativeScrollbars.prototype = copyObj({
    update: function(measure) {
      var needsH = measure.scrollWidth > measure.clientWidth + 1;
      var needsV = measure.scrollHeight > measure.clientHeight + 1;
      var sWidth = measure.nativeBarWidth;

      if (needsV) {
        this.vert.style.display = "block";
        this.vert.style.bottom = needsH ? sWidth + "px" : "0";
        var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
        // A bug in IE8 can cause this value to be negative, so guard it.
        this.vert.firstChild.style.height =
          Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
      } else {
        this.vert.style.display = "";
        this.vert.firstChild.style.height = "0";
      }

      if (needsH) {
        this.horiz.style.display = "block";
        this.horiz.style.right = needsV ? sWidth + "px" : "0";
        this.horiz.style.left = measure.barLeft + "px";
        var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
        this.horiz.firstChild.style.width =
          (measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
      } else {
        this.horiz.style.display = "";
        this.horiz.firstChild.style.width = "0";
      }

      if (!this.checkedZeroWidth && measure.clientHeight > 0) {
        if (sWidth == 0) this.zeroWidthHack();
        this.checkedZeroWidth = true;
      }

      return {right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0};
    },
    setScrollLeft: function(pos) {
      if (this.horiz.scrollLeft != pos) this.horiz.scrollLeft = pos;
      if (this.disableHoriz) this.enableZeroWidthBar(this.horiz, this.disableHoriz);
    },
    setScrollTop: function(pos) {
      if (this.vert.scrollTop != pos) this.vert.scrollTop = pos;
      if (this.disableVert) this.enableZeroWidthBar(this.vert, this.disableVert);
    },
    zeroWidthHack: function() {
      var w = mac && !mac_geMountainLion ? "12px" : "18px";
      this.horiz.style.height = this.vert.style.width = w;
      this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
      this.disableHoriz = new Delayed;
      this.disableVert = new Delayed;
    },
    enableZeroWidthBar: function(bar, delay) {
      bar.style.pointerEvents = "auto";
      function maybeDisable() {
        // To find out whether the scrollbar is still visible, we
        // check whether the element under the pixel in the bottom
        // left corner of the scrollbar box is the scrollbar box
        // itself (when the bar is still visible) or its filler child
        // (when the bar is hidden). If it is still visible, we keep
        // it enabled, if it's hidden, we disable pointer events.
        var box = bar.getBoundingClientRect();
        var elt = document.elementFromPoint(box.left + 1, box.bottom - 1);
        if (elt != bar) bar.style.pointerEvents = "none";
        else delay.set(1000, maybeDisable);
      }
      delay.set(1000, maybeDisable);
    },
    clear: function() {
      var parent = this.horiz.parentNode;
      parent.removeChild(this.horiz);
      parent.removeChild(this.vert);
    }
  }, NativeScrollbars.prototype);

  function NullScrollbars() {}

  NullScrollbars.prototype = copyObj({
    update: function() { return {bottom: 0, right: 0}; },
    setScrollLeft: function() {},
    setScrollTop: function() {},
    clear: function() {}
  }, NullScrollbars.prototype);

  CodeMirror.scrollbarModel = {"native": NativeScrollbars, "null": NullScrollbars};

  function initScrollbars(cm) {
    if (cm.display.scrollbars) {
      cm.display.scrollbars.clear();
      if (cm.display.scrollbars.addClass)
        rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
    }

    cm.display.scrollbars = new CodeMirror.scrollbarModel[cm.options.scrollbarStyle](function(node) {
      cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
      // Prevent clicks in the scrollbars from killing focus
      on(node, "mousedown", function() {
        if (cm.state.focused) setTimeout(function() { cm.display.input.focus(); }, 0);
      });
      node.setAttribute("cm-not-content", "true");
    }, function(pos, axis) {
      if (axis == "horizontal") setScrollLeft(cm, pos);
      else setScrollTop(cm, pos);
    }, cm);
    if (cm.display.scrollbars.addClass)
      addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
  }

  function updateScrollbars(cm, measure) {
    if (!measure) measure = measureForScrollbars(cm);
    var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
    updateScrollbarsInner(cm, measure);
    for (var i = 0; i < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i++) {
      if (startWidth != cm.display.barWidth && cm.options.lineWrapping)
        updateHeightsInViewport(cm);
      updateScrollbarsInner(cm, measureForScrollbars(cm));
      startWidth = cm.display.barWidth; startHeight = cm.display.barHeight;
    }
  }

  // Re-synchronize the fake scrollbars with the actual size of the
  // content.
  function updateScrollbarsInner(cm, measure) {
    var d = cm.display;
    var sizes = d.scrollbars.update(measure);

    d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
    d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
    d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent"

    if (sizes.right && sizes.bottom) {
      d.scrollbarFiller.style.display = "block";
      d.scrollbarFiller.style.height = sizes.bottom + "px";
      d.scrollbarFiller.style.width = sizes.right + "px";
    } else d.scrollbarFiller.style.display = "";
    if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
      d.gutterFiller.style.display = "block";
      d.gutterFiller.style.height = sizes.bottom + "px";
      d.gutterFiller.style.width = measure.gutterWidth + "px";
    } else d.gutterFiller.style.display = "";
  }

  // Compute the lines that are visible in a given viewport (defaults
  // the the current scroll position). viewport may contain top,
  // height, and ensure (see op.scrollToPos) properties.
  function visibleLines(display, doc, viewport) {
    var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
    top = Math.floor(top - paddingTop(display));
    var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;

    var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
    // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
    // forces those lines into the viewport (if possible).
    if (viewport && viewport.ensure) {
      var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
      if (ensureFrom < from) {
        from = ensureFrom;
        to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
      } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
        from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
        to = ensureTo;
      }
    }
    return {from: from, to: Math.max(to, from + 1)};
  }

  // LINE NUMBERS

  // Re-align line numbers and gutter marks to compensate for
  // horizontal scrolling.
  function alignHorizontally(cm) {
    var display = cm.display, view = display.view;
    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) return;
    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
    var gutterW = display.gutters.offsetWidth, left = comp + "px";
    for (var i = 0; i < view.length; i++) if (!view[i].hidden) {
      if (cm.options.fixedGutter && view[i].gutter)
        view[i].gutter.style.left = left;
      var align = view[i].alignable;
      if (align) for (var j = 0; j < align.length; j++)
        align[j].style.left = left;
    }
    if (cm.options.fixedGutter)
      display.gutters.style.left = (comp + gutterW) + "px";
  }

  // Used to ensure that the line number gutter is still the right
  // size for the current document size. Returns true when an update
  // is needed.
  function maybeUpdateLineNumberWidth(cm) {
    if (!cm.options.lineNumbers) return false;
    var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
    if (last.length != display.lineNumChars) {
      var test = display.measure.appendChild(elt("div", [elt("div", last)],
                                                 "CodeMirror-linenumber CodeMirror-gutter-elt"));
      var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
      display.lineGutter.style.width = "";
      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
      display.lineNumWidth = display.lineNumInnerWidth + padding;
      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
      display.lineGutter.style.width = display.lineNumWidth + "px";
      updateGutterSpace(cm);
      return true;
    }
    return false;
  }

  function lineNumberFor(options, i) {
    return String(options.lineNumberFormatter(i + options.firstLineNumber));
  }

  // Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
  // but using getBoundingClientRect to get a sub-pixel-accurate
  // result.
  function compensateForHScroll(display) {
    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
  }

  // DISPLAY DRAWING

  function DisplayUpdate(cm, viewport, force) {
    var display = cm.display;

    this.viewport = viewport;
    // Store some values that we'll need later (but don't want to force a relayout for)
    this.visible = visibleLines(display, cm.doc, viewport);
    this.editorIsHidden = !display.wrapper.offsetWidth;
    this.wrapperHeight = display.wrapper.clientHeight;
    this.wrapperWidth = display.wrapper.clientWidth;
    this.oldDisplayWidth = displayWidth(cm);
    this.force = force;
    this.dims = getDimensions(cm);
    this.events = [];
  }

  DisplayUpdate.prototype.signal = function(emitter, type) {
    if (hasHandler(emitter, type))
      this.events.push(arguments);
  };
  DisplayUpdate.prototype.finish = function() {
    for (var i = 0; i < this.events.length; i++)
      signal.apply(null, this.events[i]);
  };

  function maybeClipScrollbars(cm) {
    var display = cm.display;
    if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
      display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
      display.heightForcer.style.height = scrollGap(cm) + "px";
      display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
      display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
      display.scrollbarsClipped = true;
    }
  }

  // Does the actual updating of the line display. Bails out
  // (returning false) when there is nothing to be done and forced is
  // false.
  function updateDisplayIfNeeded(cm, update) {
    var display = cm.display, doc = cm.doc;

    if (update.editorIsHidden) {
      resetView(cm);
      return false;
    }

    // Bail out if the visible area is already rendered and nothing changed.
    if (!update.force &&
        update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo &&
        (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) &&
        display.renderedView == display.view && countDirtyView(cm) == 0)
      return false;

    if (maybeUpdateLineNumberWidth(cm)) {
      resetView(cm);
      update.dims = getDimensions(cm);
    }

    // Compute a suitable new viewport (from & to)
    var end = doc.first + doc.size;
    var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
    var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
    if (display.viewFrom < from && from - display.viewFrom < 20) from = Math.max(doc.first, display.viewFrom);
    if (display.viewTo > to && display.viewTo - to < 20) to = Math.min(end, display.viewTo);
    if (sawCollapsedSpans) {
      from = visualLineNo(cm.doc, from);
      to = visualLineEndNo(cm.doc, to);
    }

    var different = from != display.viewFrom || to != display.viewTo ||
      display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
    adjustView(cm, from, to);

    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
    // Position the mover div to align with the current scroll position
    cm.display.mover.style.top = display.viewOffset + "px";

    var toUpdate = countDirtyView(cm);
    if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view &&
        (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo))
      return false;

    // For big changes, we hide the enclosing element during the
    // update, since that speeds up the operations on most browsers.
    var focused = activeElt();
    if (toUpdate > 4) display.lineDiv.style.display = "none";
    patchDisplay(cm, display.updateLineNumbers, update.dims);
    if (toUpdate > 4) display.lineDiv.style.display = "";
    display.renderedView = display.view;
    // There might have been a widget with a focused element that got
    // hidden or updated, if so re-focus it.
    if (focused && activeElt() != focused && focused.offsetHeight) focused.focus();

    // Prevent selection and cursors from interfering with the scroll
    // width and height.
    removeChildren(display.cursorDiv);
    removeChildren(display.selectionDiv);
    display.gutters.style.height = display.sizer.style.minHeight = 0;

    if (different) {
      display.lastWrapHeight = update.wrapperHeight;
      display.lastWrapWidth = update.wrapperWidth;
      startWorker(cm, 400);
    }

    display.updateLineNumbers = null;

    return true;
  }

  function postUpdateDisplay(cm, update) {
    var viewport = update.viewport;

    for (var first = true;; first = false) {
      if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
        // Clip forced viewport to actual scrollable area.
        if (viewport && viewport.top != null)
          viewport = {top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top)};
        // Updated line heights might result in the drawn area not
        // actually covering the viewport. Keep looping until it does.
        update.visible = visibleLines(cm.display, cm.doc, viewport);
        if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo)
          break;
      }
      if (!updateDisplayIfNeeded(cm, update)) break;
      updateHeightsInViewport(cm);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
    }

    update.signal(cm, "update", cm);
    if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
      update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
      cm.display.reportedViewFrom = cm.display.viewFrom; cm.display.reportedViewTo = cm.display.viewTo;
    }
  }

  function updateDisplaySimple(cm, viewport) {
    var update = new DisplayUpdate(cm, viewport);
    if (updateDisplayIfNeeded(cm, update)) {
      updateHeightsInViewport(cm);
      postUpdateDisplay(cm, update);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.finish();
    }
  }

  function setDocumentHeight(cm, measure) {
    cm.display.sizer.style.minHeight = measure.docHeight + "px";
    cm.display.heightForcer.style.top = measure.docHeight + "px";
    cm.display.gutters.style.height = (measure.docHeight + cm.display.barHeight + scrollGap(cm)) + "px";
  }

  // Read the actual heights of the rendered lines, and update their
  // stored heights to match.
  function updateHeightsInViewport(cm) {
    var display = cm.display;
    var prevBottom = display.lineDiv.offsetTop;
    for (var i = 0; i < display.view.length; i++) {
      var cur = display.view[i], height;
      if (cur.hidden) continue;
      if (ie && ie_version < 8) {
        var bot = cur.node.offsetTop + cur.node.offsetHeight;
        height = bot - prevBottom;
        prevBottom = bot;
      } else {
        var box = cur.node.getBoundingClientRect();
        height = box.bottom - box.top;
      }
      var diff = cur.line.height - height;
      if (height < 2) height = textHeight(display);
      if (diff > .001 || diff < -.001) {
        updateLineHeight(cur.line, height);
        updateWidgetHeight(cur.line);
        if (cur.rest) for (var j = 0; j < cur.rest.length; j++)
          updateWidgetHeight(cur.rest[j]);
      }
    }
  }

  // Read and store the height of line widgets associated with the
  // given line.
  function updateWidgetHeight(line) {
    if (line.widgets) for (var i = 0; i < line.widgets.length; ++i)
      line.widgets[i].height = line.widgets[i].node.parentNode.offsetHeight;
  }

  // Do a bulk-read of the DOM positions and sizes needed to draw the
  // view, so that we don't interleave reading and writing to the DOM.
  function getDimensions(cm) {
    var d = cm.display, left = {}, width = {};
    var gutterLeft = d.gutters.clientLeft;
    for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
      left[cm.options.gutters[i]] = n.offsetLeft + n.clientLeft + gutterLeft;
      width[cm.options.gutters[i]] = n.clientWidth;
    }
    return {fixedPos: compensateForHScroll(d),
            gutterTotalWidth: d.gutters.offsetWidth,
            gutterLeft: left,
            gutterWidth: width,
            wrapperWidth: d.wrapper.clientWidth};
  }

  // Sync the actual display DOM structure with display.view, removing
  // nodes for lines that are no longer in view, and creating the ones
  // that are not there yet, and updating the ones that are out of
  // date.
  function patchDisplay(cm, updateNumbersFrom, dims) {
    var display = cm.display, lineNumbers = cm.options.lineNumbers;
    var container = display.lineDiv, cur = container.firstChild;

    function rm(node) {
      var next = node.nextSibling;
      // Works around a throw-scroll bug in OS X Webkit
      if (webkit && mac && cm.display.currentWheelTarget == node)
        node.style.display = "none";
      else
        node.parentNode.removeChild(node);
      return next;
    }

    var view = display.view, lineN = display.viewFrom;
    // Loop over the elements in the view, syncing cur (the DOM nodes
    // in display.lineDiv) with the view as we go.
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (lineView.hidden) {
      } else if (!lineView.node || lineView.node.parentNode != container) { // Not drawn yet
        var node = buildLineElement(cm, lineView, lineN, dims);
        container.insertBefore(node, cur);
      } else { // Already drawn
        while (cur != lineView.node) cur = rm(cur);
        var updateNumber = lineNumbers && updateNumbersFrom != null &&
          updateNumbersFrom <= lineN && lineView.lineNumber;
        if (lineView.changes) {
          if (indexOf(lineView.changes, "gutter") > -1) updateNumber = false;
          updateLineForChanges(cm, lineView, lineN, dims);
        }
        if (updateNumber) {
          removeChildren(lineView.lineNumber);
          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
        }
        cur = lineView.node.nextSibling;
      }
      lineN += lineView.size;
    }
    while (cur) cur = rm(cur);
  }

  // When an aspect of a line changes, a string is added to
  // lineView.changes. This updates the relevant part of the line's
  // DOM structure.
  function updateLineForChanges(cm, lineView, lineN, dims) {
    for (var j = 0; j < lineView.changes.length; j++) {
      var type = lineView.changes[j];
      if (type == "text") updateLineText(cm, lineView);
      else if (type == "gutter") updateLineGutter(cm, lineView, lineN, dims);
      else if (type == "class") updateLineClasses(lineView);
      else if (type == "widget") updateLineWidgets(cm, lineView, dims);
    }
    lineView.changes = null;
  }

  // Lines with gutter elements, widgets or a background class need to
  // be wrapped, and have the extra elements added to the wrapper div
  function ensureLineWrapped(lineView) {
    if (lineView.node == lineView.text) {
      lineView.node = elt("div", null, null, "position: relative");
      if (lineView.text.parentNode)
        lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
      lineView.node.appendChild(lineView.text);
      if (ie && ie_version < 8) lineView.node.style.zIndex = 2;
    }
    return lineView.node;
  }

  function updateLineBackground(lineView) {
    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
    if (cls) cls += " CodeMirror-linebackground";
    if (lineView.background) {
      if (cls) lineView.background.className = cls;
      else { lineView.background.parentNode.removeChild(lineView.background); lineView.background = null; }
    } else if (cls) {
      var wrap = ensureLineWrapped(lineView);
      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
    }
  }

  // Wrapper around buildLineContent which will reuse the structure
  // in display.externalMeasured when possible.
  function getLineContent(cm, lineView) {
    var ext = cm.display.externalMeasured;
    if (ext && ext.line == lineView.line) {
      cm.display.externalMeasured = null;
      lineView.measure = ext.measure;
      return ext.built;
    }
    return buildLineContent(cm, lineView);
  }

  // Redraw the line's text. Interacts with the background and text
  // classes because the mode may output tokens that influence these
  // classes.
  function updateLineText(cm, lineView) {
    var cls = lineView.text.className;
    var built = getLineContent(cm, lineView);
    if (lineView.text == lineView.node) lineView.node = built.pre;
    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
    lineView.text = built.pre;
    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
      lineView.bgClass = built.bgClass;
      lineView.textClass = built.textClass;
      updateLineClasses(lineView);
    } else if (cls) {
      lineView.text.className = cls;
    }
  }

  function updateLineClasses(lineView) {
    updateLineBackground(lineView);
    if (lineView.line.wrapClass)
      ensureLineWrapped(lineView).className = lineView.line.wrapClass;
    else if (lineView.node != lineView.text)
      lineView.node.className = "";
    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
    lineView.text.className = textClass || "";
  }

  function updateLineGutter(cm, lineView, lineN, dims) {
    if (lineView.gutter) {
      lineView.node.removeChild(lineView.gutter);
      lineView.gutter = null;
    }
    if (lineView.gutterBackground) {
      lineView.node.removeChild(lineView.gutterBackground);
      lineView.gutterBackground = null;
    }
    if (lineView.line.gutterClass) {
      var wrap = ensureLineWrapped(lineView);
      lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass,
                                      "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) +
                                      "px; width: " + dims.gutterTotalWidth + "px");
      wrap.insertBefore(lineView.gutterBackground, lineView.text);
    }
    var markers = lineView.line.gutterMarkers;
    if (cm.options.lineNumbers || markers) {
      var wrap = ensureLineWrapped(lineView);
      var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " +
                                             (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
      cm.display.input.setUneditable(gutterWrap);
      wrap.insertBefore(gutterWrap, lineView.text);
      if (lineView.line.gutterClass)
        gutterWrap.className += " " + lineView.line.gutterClass;
      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"]))
        lineView.lineNumber = gutterWrap.appendChild(
          elt("div", lineNumberFor(cm.options, lineN),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: "
              + cm.display.lineNumInnerWidth + "px"));
      if (markers) for (var k = 0; k < cm.options.gutters.length; ++k) {
        var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
        if (found)
          gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " +
                                     dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
      }
    }
  }

  function updateLineWidgets(cm, lineView, dims) {
    if (lineView.alignable) lineView.alignable = null;
    for (var node = lineView.node.firstChild, next; node; node = next) {
      var next = node.nextSibling;
      if (node.className == "CodeMirror-linewidget")
        lineView.node.removeChild(node);
    }
    insertLineWidgets(cm, lineView, dims);
  }

  // Build a line's DOM representation from scratch
  function buildLineElement(cm, lineView, lineN, dims) {
    var built = getLineContent(cm, lineView);
    lineView.text = lineView.node = built.pre;
    if (built.bgClass) lineView.bgClass = built.bgClass;
    if (built.textClass) lineView.textClass = built.textClass;

    updateLineClasses(lineView);
    updateLineGutter(cm, lineView, lineN, dims);
    insertLineWidgets(cm, lineView, dims);
    return lineView.node;
  }

  // A lineView may contain multiple logical lines (when merged by
  // collapsed spans). The widgets for all of them need to be drawn.
  function insertLineWidgets(cm, lineView, dims) {
    insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
    if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++)
      insertLineWidgetsFor(cm, lineView.rest[i], lineView, dims, false);
  }

  function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
    if (!line.widgets) return;
    var wrap = ensureLineWrapped(lineView);
    for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
      var widget = ws[i], node = elt("div", [widget.node], "CodeMirror-linewidget");
      if (!widget.handleMouseEvents) node.setAttribute("cm-ignore-events", "true");
      positionLineWidget(widget, node, lineView, dims);
      cm.display.input.setUneditable(node);
      if (allowAbove && widget.above)
        wrap.insertBefore(node, lineView.gutter || lineView.text);
      else
        wrap.appendChild(node);
      signalLater(widget, "redraw");
    }
  }

  function positionLineWidget(widget, node, lineView, dims) {
    if (widget.noHScroll) {
      (lineView.alignable || (lineView.alignable = [])).push(node);
      var width = dims.wrapperWidth;
      node.style.left = dims.fixedPos + "px";
      if (!widget.coverGutter) {
        width -= dims.gutterTotalWidth;
        node.style.paddingLeft = dims.gutterTotalWidth + "px";
      }
      node.style.width = width + "px";
    }
    if (widget.coverGutter) {
      node.style.zIndex = 5;
      node.style.position = "relative";
      if (!widget.noHScroll) node.style.marginLeft = -dims.gutterTotalWidth + "px";
    }
  }

  // POSITION OBJECT

  // A Pos instance represents a position within the text.
  var Pos = CodeMirror.Pos = function(line, ch) {
    if (!(this instanceof Pos)) return new Pos(line, ch);
    this.line = line; this.ch = ch;
  };

  // Compare two positions, return 0 if they are the same, a negative
  // number when a is less, and a positive number otherwise.
  var cmp = CodeMirror.cmpPos = function(a, b) { return a.line - b.line || a.ch - b.ch; };

  function copyPos(x) {return Pos(x.line, x.ch);}
  function maxPos(a, b) { return cmp(a, b) < 0 ? b : a; }
  function minPos(a, b) { return cmp(a, b) < 0 ? a : b; }

  // INPUT HANDLING

  function ensureFocus(cm) {
    if (!cm.state.focused) { cm.display.input.focus(); onFocus(cm); }
  }

  // This will be set to an array of strings when copying, so that,
  // when pasting, we know what kind of selections the copied text
  // was made out of.
  var lastCopied = null;

  function applyTextInput(cm, inserted, deleted, sel, origin) {
    var doc = cm.doc;
    cm.display.shift = false;
    if (!sel) sel = doc.sel;

    var paste = cm.state.pasteIncoming || origin == "paste";
    var textLines = doc.splitLines(inserted), multiPaste = null;
    // When pasing N lines into N selections, insert one line per selection
    if (paste && sel.ranges.length > 1) {
      if (lastCopied && lastCopied.join("\n") == inserted) {
        if (sel.ranges.length % lastCopied.length == 0) {
          multiPaste = [];
          for (var i = 0; i < lastCopied.length; i++)
            multiPaste.push(doc.splitLines(lastCopied[i]));
        }
      } else if (textLines.length == sel.ranges.length) {
        multiPaste = map(textLines, function(l) { return [l]; });
      }
    }

    // Normal behavior is to insert the new text into every selection
    for (var i = sel.ranges.length - 1; i >= 0; i--) {
      var range = sel.ranges[i];
      var from = range.from(), to = range.to();
      if (range.empty()) {
        if (deleted && deleted > 0) // Handle deletion
          from = Pos(from.line, from.ch - deleted);
        else if (cm.state.overwrite && !paste) // Handle overwrite
          to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
      }
      var updateInput = cm.curOp.updateInput;
      var changeEvent = {from: from, to: to, text: multiPaste ? multiPaste[i % multiPaste.length] : textLines,
                         origin: origin || (paste ? "paste" : cm.state.cutIncoming ? "cut" : "+input")};
      makeChange(cm.doc, changeEvent);
      signalLater(cm, "inputRead", cm, changeEvent);
    }
    if (inserted && !paste)
      triggerElectric(cm, inserted);

    ensureCursorVisible(cm);
    cm.curOp.updateInput = updateInput;
    cm.curOp.typing = true;
    cm.state.pasteIncoming = cm.state.cutIncoming = false;
  }

  function handlePaste(e, cm) {
    var pasted = e.clipboardData && e.clipboardData.getData("text/plain");
    if (pasted) {
      e.preventDefault();
      if (!cm.isReadOnly() && !cm.options.disableInput)
        runInOp(cm, function() { applyTextInput(cm, pasted, 0, null, "paste"); });
      return true;
    }
  }

  function triggerElectric(cm, inserted) {
    // When an 'electric' character is inserted, immediately trigger a reindent
    if (!cm.options.electricChars || !cm.options.smartIndent) return;
    var sel = cm.doc.sel;

    for (var i = sel.ranges.length - 1; i >= 0; i--) {
      var range = sel.ranges[i];
      if (range.head.ch > 100 || (i && sel.ranges[i - 1].head.line == range.head.line)) continue;
      var mode = cm.getModeAt(range.head);
      var indented = false;
      if (mode.electricChars) {
        for (var j = 0; j < mode.electricChars.length; j++)
          if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
            indented = indentLine(cm, range.head.line, "smart");
            break;
          }
      } else if (mode.electricInput) {
        if (mode.electricInput.test(getLine(cm.doc, range.head.line).text.slice(0, range.head.ch)))
          indented = indentLine(cm, range.head.line, "smart");
      }
      if (indented) signalLater(cm, "electricInput", cm, range.head.line);
    }
  }

  function copyableRanges(cm) {
    var text = [], ranges = [];
    for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
      var line = cm.doc.sel.ranges[i].head.line;
      var lineRange = {anchor: Pos(line, 0), head: Pos(line + 1, 0)};
      ranges.push(lineRange);
      text.push(cm.getRange(lineRange.anchor, lineRange.head));
    }
    return {text: text, ranges: ranges};
  }

  function disableBrowserMagic(field) {
    field.setAttribute("autocorrect", "off");
    field.setAttribute("autocapitalize", "off");
    field.setAttribute("spellcheck", "false");
  }

  // TEXTAREA INPUT STYLE

  function TextareaInput(cm) {
    this.cm = cm;
    // See input.poll and input.reset
    this.prevInput = "";

    // Flag that indicates whether we expect input to appear real soon
    // now (after some event like 'keypress' or 'input') and are
    // polling intensively.
    this.pollingFast = false;
    // Self-resetting timeout for the poller
    this.polling = new Delayed();
    // Tracks when input.reset has punted to just putting a short
    // string into the textarea instead of the full selection.
    this.inaccurateSelection = false;
    // Used to work around IE issue with selection being forgotten when focus moves away from textarea
    this.hasSelection = false;
    this.composing = null;
  };

  function hiddenTextarea() {
    var te = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
    var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    // The textarea is kept positioned near the cursor to prevent the
    // fact that it'll be scrolled into view on input from scrolling
    // our fake cursor out of view. On webkit, when wrap=off, paste is
    // very slow. So make the area wide instead.
    if (webkit) te.style.width = "1000px";
    else te.setAttribute("wrap", "off");
    // If border: 0; -- iOS fails to open keyboard (issue #1287)
    if (ios) te.style.border = "1px solid black";
    disableBrowserMagic(te);
    return div;
  }

  TextareaInput.prototype = copyObj({
    init: function(display) {
      var input = this, cm = this.cm;

      // Wraps and hides input textarea
      var div = this.wrapper = hiddenTextarea();
      // The semihidden textarea that is focused when the editor is
      // focused, and receives input.
      var te = this.textarea = div.firstChild;
      display.wrapper.insertBefore(div, display.wrapper.firstChild);

      // Needed to hide big blue blinking cursor on Mobile Safari (doesn't seem to work in iOS 8 anymore)
      if (ios) te.style.width = "0px";

      on(te, "input", function() {
        if (ie && ie_version >= 9 && input.hasSelection) input.hasSelection = null;
        input.poll();
      });

      on(te, "paste", function(e) {
        if (signalDOMEvent(cm, e) || handlePaste(e, cm)) return

        cm.state.pasteIncoming = true;
        input.fastPoll();
      });

      function prepareCopyCut(e) {
        if (signalDOMEvent(cm, e)) return
        if (cm.somethingSelected()) {
          lastCopied = cm.getSelections();
          if (input.inaccurateSelection) {
            input.prevInput = "";
            input.inaccurateSelection = false;
            te.value = lastCopied.join("\n");
            selectInput(te);
          }
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          lastCopied = ranges.text;
          if (e.type == "cut") {
            cm.setSelections(ranges.ranges, null, sel_dontScroll);
          } else {
            input.prevInput = "";
            te.value = ranges.text.join("\n");
            selectInput(te);
          }
        }
        if (e.type == "cut") cm.state.cutIncoming = true;
      }
      on(te, "cut", prepareCopyCut);
      on(te, "copy", prepareCopyCut);

      on(display.scroller, "paste", function(e) {
        if (eventInWidget(display, e) || signalDOMEvent(cm, e)) return;
        cm.state.pasteIncoming = true;
        input.focus();
      });

      // Prevent normal selection in the editor (we handle our own)
      on(display.lineSpace, "selectstart", function(e) {
        if (!eventInWidget(display, e)) e_preventDefault(e);
      });

      on(te, "compositionstart", function() {
        var start = cm.getCursor("from");
        if (input.composing) input.composing.range.clear()
        input.composing = {
          start: start,
          range: cm.markText(start, cm.getCursor("to"), {className: "CodeMirror-composing"})
        };
      });
      on(te, "compositionend", function() {
        if (input.composing) {
          input.poll();
          input.composing.range.clear();
          input.composing = null;
        }
      });
    },

    prepareSelection: function() {
      // Redraw the selection and/or cursor
      var cm = this.cm, display = cm.display, doc = cm.doc;
      var result = prepareSelection(cm);

      // Move the hidden textarea near the cursor to prevent scrolling artifacts
      if (cm.options.moveInputWithCursor) {
        var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
        var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
        result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10,
                                            headPos.top + lineOff.top - wrapOff.top));
        result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10,
                                             headPos.left + lineOff.left - wrapOff.left));
      }

      return result;
    },

    showSelection: function(drawn) {
      var cm = this.cm, display = cm.display;
      removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
      removeChildrenAndAdd(display.selectionDiv, drawn.selection);
      if (drawn.teTop != null) {
        this.wrapper.style.top = drawn.teTop + "px";
        this.wrapper.style.left = drawn.teLeft + "px";
      }
    },

    // Reset the input to correspond to the selection (or to be empty,
    // when not typing and nothing is selected)
    reset: function(typing) {
      if (this.contextMenuPending) return;
      var minimal, selected, cm = this.cm, doc = cm.doc;
      if (cm.somethingSelected()) {
        this.prevInput = "";
        var range = doc.sel.primary();
        minimal = hasCopyEvent &&
          (range.to().line - range.from().line > 100 || (selected = cm.getSelection()).length > 1000);
        var content = minimal ? "-" : selected || cm.getSelection();
        this.textarea.value = content;
        if (cm.state.focused) selectInput(this.textarea);
        if (ie && ie_version >= 9) this.hasSelection = content;
      } else if (!typing) {
        this.prevInput = this.textarea.value = "";
        if (ie && ie_version >= 9) this.hasSelection = null;
      }
      this.inaccurateSelection = minimal;
    },

    getField: function() { return this.textarea; },

    supportsTouch: function() { return false; },

    focus: function() {
      if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
        try { this.textarea.focus(); }
        catch (e) {} // IE8 will throw if the textarea is display: none or not in DOM
      }
    },

    blur: function() { this.textarea.blur(); },

    resetPosition: function() {
      this.wrapper.style.top = this.wrapper.style.left = 0;
    },

    receivedFocus: function() { this.slowPoll(); },

    // Poll for input changes, using the normal rate of polling. This
    // runs as long as the editor is focused.
    slowPoll: function() {
      var input = this;
      if (input.pollingFast) return;
      input.polling.set(this.cm.options.pollInterval, function() {
        input.poll();
        if (input.cm.state.focused) input.slowPoll();
      });
    },

    // When an event has just come in that is likely to add or change
    // something in the input textarea, we poll faster, to ensure that
    // the change appears on the screen quickly.
    fastPoll: function() {
      var missed = false, input = this;
      input.pollingFast = true;
      function p() {
        var changed = input.poll();
        if (!changed && !missed) {missed = true; input.polling.set(60, p);}
        else {input.pollingFast = false; input.slowPoll();}
      }
      input.polling.set(20, p);
    },

    // Read input from the textarea, and update the document to match.
    // When something is selected, it is present in the textarea, and
    // selected (unless it is huge, in which case a placeholder is
    // used). When nothing is selected, the cursor sits after previously
    // seen text (can be empty), which is stored in prevInput (we must
    // not reset the textarea when typing, because that breaks IME).
    poll: function() {
      var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
      // Since this is called a *lot*, try to bail out as cheaply as
      // possible when it is clear that nothing happened. hasSelection
      // will be the case when there is a lot of text in the textarea,
      // in which case reading its value would be expensive.
      if (this.contextMenuPending || !cm.state.focused ||
          (hasSelection(input) && !prevInput && !this.composing) ||
          cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq)
        return false;

      var text = input.value;
      // If nothing changed, bail.
      if (text == prevInput && !cm.somethingSelected()) return false;
      // Work around nonsensical selection resetting in IE9/10, and
      // inexplicable appearance of private area unicode characters on
      // some key combos in Mac (#2689).
      if (ie && ie_version >= 9 && this.hasSelection === text ||
          mac && /[\uf700-\uf7ff]/.test(text)) {
        cm.display.input.reset();
        return false;
      }

      if (cm.doc.sel == cm.display.selForContextMenu) {
        var first = text.charCodeAt(0);
        if (first == 0x200b && !prevInput) prevInput = "\u200b";
        if (first == 0x21da) { this.reset(); return this.cm.execCommand("undo"); }
      }
      // Find the part of the input that is actually new
      var same = 0, l = Math.min(prevInput.length, text.length);
      while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) ++same;

      var self = this;
      runInOp(cm, function() {
        applyTextInput(cm, text.slice(same), prevInput.length - same,
                       null, self.composing ? "*compose" : null);

        // Don't leave long text in the textarea, since it makes further polling slow
        if (text.length > 1000 || text.indexOf("\n") > -1) input.value = self.prevInput = "";
        else self.prevInput = text;

        if (self.composing) {
          self.composing.range.clear();
          self.composing.range = cm.markText(self.composing.start, cm.getCursor("to"),
                                             {className: "CodeMirror-composing"});
        }
      });
      return true;
    },

    ensurePolled: function() {
      if (this.pollingFast && this.poll()) this.pollingFast = false;
    },

    onKeyPress: function() {
      if (ie && ie_version >= 9) this.hasSelection = null;
      this.fastPoll();
    },

    onContextMenu: function(e) {
      var input = this, cm = input.cm, display = cm.display, te = input.textarea;
      var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
      if (!pos || presto) return; // Opera is difficult.

      // Reset the current text selection only if the click is done outside of the selection
      // and 'resetSelectionOnContextMenu' option is true.
      var reset = cm.options.resetSelectionOnContextMenu;
      if (reset && cm.doc.sel.contains(pos) == -1)
        operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);

      var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
      input.wrapper.style.cssText = "position: absolute"
      var wrapperBox = input.wrapper.getBoundingClientRect()
      te.style.cssText = "position: absolute; width: 30px; height: 30px; top: " + (e.clientY - wrapperBox.top - 5) +
        "px; left: " + (e.clientX - wrapperBox.left - 5) + "px; z-index: 1000; background: " +
        (ie ? "rgba(255, 255, 255, .05)" : "transparent") +
        "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      if (webkit) var oldScrollY = window.scrollY; // Work around Chrome issue (#2712)
      display.input.focus();
      if (webkit) window.scrollTo(null, oldScrollY);
      display.input.reset();
      // Adds "Select all" to context menu in FF
      if (!cm.somethingSelected()) te.value = input.prevInput = " ";
      input.contextMenuPending = true;
      display.selForContextMenu = cm.doc.sel;
      clearTimeout(display.detectingSelectAll);

      // Select-all will be greyed out if there's nothing to select, so
      // this adds a zero-width space so that we can later check whether
      // it got selected.
      function prepareSelectAllHack() {
        if (te.selectionStart != null) {
          var selected = cm.somethingSelected();
          var extval = "\u200b" + (selected ? te.value : "");
          te.value = "\u21da"; // Used to catch context-menu undo
          te.value = extval;
          input.prevInput = selected ? "" : "\u200b";
          te.selectionStart = 1; te.selectionEnd = extval.length;
          // Re-set this, in case some other handler touched the
          // selection in the meantime.
          display.selForContextMenu = cm.doc.sel;
        }
      }
      function rehide() {
        input.contextMenuPending = false;
        input.wrapper.style.cssText = oldWrapperCSS
        te.style.cssText = oldCSS;
        if (ie && ie_version < 9) display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);

        // Try to detect the user choosing select-all
        if (te.selectionStart != null) {
          if (!ie || (ie && ie_version < 9)) prepareSelectAllHack();
          var i = 0, poll = function() {
            if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 &&
                te.selectionEnd > 0 && input.prevInput == "\u200b")
              operation(cm, commands.selectAll)(cm);
            else if (i++ < 10) display.detectingSelectAll = setTimeout(poll, 500);
            else display.input.reset();
          };
          display.detectingSelectAll = setTimeout(poll, 200);
        }
      }

      if (ie && ie_version >= 9) prepareSelectAllHack();
      if (captureRightClick) {
        e_stop(e);
        var mouseup = function() {
          off(window, "mouseup", mouseup);
          setTimeout(rehide, 20);
        };
        on(window, "mouseup", mouseup);
      } else {
        setTimeout(rehide, 50);
      }
    },

    readOnlyChanged: function(val) {
      if (!val) this.reset();
    },

    setUneditable: nothing,

    needsContentAttribute: false
  }, TextareaInput.prototype);

  // CONTENTEDITABLE INPUT STYLE

  function ContentEditableInput(cm) {
    this.cm = cm;
    this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
    this.polling = new Delayed();
    this.gracePeriod = false;
  }

  ContentEditableInput.prototype = copyObj({
    init: function(display) {
      var input = this, cm = input.cm;
      var div = input.div = display.lineDiv;
      disableBrowserMagic(div);

      on(div, "paste", function(e) {
        if (!signalDOMEvent(cm, e)) handlePaste(e, cm);
      })

      on(div, "compositionstart", function(e) {
        var data = e.data;
        input.composing = {sel: cm.doc.sel, data: data, startData: data};
        if (!data) return;
        var prim = cm.doc.sel.primary();
        var line = cm.getLine(prim.head.line);
        var found = line.indexOf(data, Math.max(0, prim.head.ch - data.length));
        if (found > -1 && found <= prim.head.ch)
          input.composing.sel = simpleSelection(Pos(prim.head.line, found),
                                                Pos(prim.head.line, found + data.length));
      });
      on(div, "compositionupdate", function(e) {
        input.composing.data = e.data;
      });
      on(div, "compositionend", function(e) {
        var ours = input.composing;
        if (!ours) return;
        if (e.data != ours.startData && !/\u200b/.test(e.data))
          ours.data = e.data;
        // Need a small delay to prevent other code (input event,
        // selection polling) from doing damage when fired right after
        // compositionend.
        setTimeout(function() {
          if (!ours.handled)
            input.applyComposition(ours);
          if (input.composing == ours)
            input.composing = null;
        }, 50);
      });

      on(div, "touchstart", function() {
        input.forceCompositionEnd();
      });

      on(div, "input", function() {
        if (input.composing) return;
        if (cm.isReadOnly() || !input.pollContent())
          runInOp(input.cm, function() {regChange(cm);});
      });

      function onCopyCut(e) {
        if (signalDOMEvent(cm, e)) return
        if (cm.somethingSelected()) {
          lastCopied = cm.getSelections();
          if (e.type == "cut") cm.replaceSelection("", null, "cut");
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          lastCopied = ranges.text;
          if (e.type == "cut") {
            cm.operation(function() {
              cm.setSelections(ranges.ranges, 0, sel_dontScroll);
              cm.replaceSelection("", null, "cut");
            });
          }
        }
        // iOS exposes the clipboard API, but seems to discard content inserted into it
        if (e.clipboardData && !ios) {
          e.preventDefault();
          e.clipboardData.clearData();
          e.clipboardData.setData("text/plain", lastCopied.join("\n"));
        } else {
          // Old-fashioned briefly-focus-a-textarea hack
          var kludge = hiddenTextarea(), te = kludge.firstChild;
          cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
          te.value = lastCopied.join("\n");
          var hadFocus = document.activeElement;
          selectInput(te);
          setTimeout(function() {
            cm.display.lineSpace.removeChild(kludge);
            hadFocus.focus();
          }, 50);
        }
      }
      on(div, "copy", onCopyCut);
      on(div, "cut", onCopyCut);
    },

    prepareSelection: function() {
      var result = prepareSelection(this.cm, false);
      result.focus = this.cm.state.focused;
      return result;
    },

    showSelection: function(info) {
      if (!info || !this.cm.display.view.length) return;
      if (info.focus) this.showPrimarySelection();
      this.showMultipleSelections(info);
    },

    showPrimarySelection: function() {
      var sel = window.getSelection(), prim = this.cm.doc.sel.primary();
      var curAnchor = domToPos(this.cm, sel.anchorNode, sel.anchorOffset);
      var curFocus = domToPos(this.cm, sel.focusNode, sel.focusOffset);
      if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad &&
          cmp(minPos(curAnchor, curFocus), prim.from()) == 0 &&
          cmp(maxPos(curAnchor, curFocus), prim.to()) == 0)
        return;

      var start = posToDOM(this.cm, prim.from());
      var end = posToDOM(this.cm, prim.to());
      if (!start && !end) return;

      var view = this.cm.display.view;
      var old = sel.rangeCount && sel.getRangeAt(0);
      if (!start) {
        start = {node: view[0].measure.map[2], offset: 0};
      } else if (!end) { // FIXME dangerously hacky
        var measure = view[view.length - 1].measure;
        var map = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
        end = {node: map[map.length - 1], offset: map[map.length - 2] - map[map.length - 3]};
      }

      try { var rng = range(start.node, start.offset, end.offset, end.node); }
      catch(e) {} // Our model of the DOM might be outdated, in which case the range we try to set can be impossible
      if (rng) {
        if (!gecko && this.cm.state.focused) {
          sel.collapse(start.node, start.offset);
          if (!rng.collapsed) sel.addRange(rng);
        } else {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
        if (old && sel.anchorNode == null) sel.addRange(old);
        else if (gecko) this.startGracePeriod();
      }
      this.rememberSelection();
    },

    startGracePeriod: function() {
      var input = this;
      clearTimeout(this.gracePeriod);
      this.gracePeriod = setTimeout(function() {
        input.gracePeriod = false;
        if (input.selectionChanged())
          input.cm.operation(function() { input.cm.curOp.selectionChanged = true; });
      }, 20);
    },

    showMultipleSelections: function(info) {
      removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
      removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
    },

    rememberSelection: function() {
      var sel = window.getSelection();
      this.lastAnchorNode = sel.anchorNode; this.lastAnchorOffset = sel.anchorOffset;
      this.lastFocusNode = sel.focusNode; this.lastFocusOffset = sel.focusOffset;
    },

    selectionInEditor: function() {
      var sel = window.getSelection();
      if (!sel.rangeCount) return false;
      var node = sel.getRangeAt(0).commonAncestorContainer;
      return contains(this.div, node);
    },

    focus: function() {
      if (this.cm.options.readOnly != "nocursor") this.div.focus();
    },
    blur: function() { this.div.blur(); },
    getField: function() { return this.div; },

    supportsTouch: function() { return true; },

    receivedFocus: function() {
      var input = this;
      if (this.selectionInEditor())
        this.pollSelection();
      else
        runInOp(this.cm, function() { input.cm.curOp.selectionChanged = true; });

      function poll() {
        if (input.cm.state.focused) {
          input.pollSelection();
          input.polling.set(input.cm.options.pollInterval, poll);
        }
      }
      this.polling.set(this.cm.options.pollInterval, poll);
    },

    selectionChanged: function() {
      var sel = window.getSelection();
      return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset ||
        sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
    },

    pollSelection: function() {
      if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
        var sel = window.getSelection(), cm = this.cm;
        this.rememberSelection();
        var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var head = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (anchor && head) runInOp(cm, function() {
          setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
          if (anchor.bad || head.bad) cm.curOp.selectionChanged = true;
        });
      }
    },

    pollContent: function() {
      var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
      var from = sel.from(), to = sel.to();
      if (from.line < display.viewFrom || to.line > display.viewTo - 1) return false;

      var fromIndex;
      if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
        var fromLine = lineNo(display.view[0].line);
        var fromNode = display.view[0].node;
      } else {
        var fromLine = lineNo(display.view[fromIndex].line);
        var fromNode = display.view[fromIndex - 1].node.nextSibling;
      }
      var toIndex = findViewIndex(cm, to.line);
      if (toIndex == display.view.length - 1) {
        var toLine = display.viewTo - 1;
        var toNode = display.lineDiv.lastChild;
      } else {
        var toLine = lineNo(display.view[toIndex + 1].line) - 1;
        var toNode = display.view[toIndex + 1].node.previousSibling;
      }

      var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
      var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
      while (newText.length > 1 && oldText.length > 1) {
        if (lst(newText) == lst(oldText)) { newText.pop(); oldText.pop(); toLine--; }
        else if (newText[0] == oldText[0]) { newText.shift(); oldText.shift(); fromLine++; }
        else break;
      }

      var cutFront = 0, cutEnd = 0;
      var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
      while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront))
        ++cutFront;
      var newBot = lst(newText), oldBot = lst(oldText);
      var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0),
                               oldBot.length - (oldText.length == 1 ? cutFront : 0));
      while (cutEnd < maxCutEnd &&
             newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1))
        ++cutEnd;

      newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd);
      newText[0] = newText[0].slice(cutFront);

      var chFrom = Pos(fromLine, cutFront);
      var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
      if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
        replaceRange(cm.doc, newText, chFrom, chTo, "+input");
        return true;
      }
    },

    ensurePolled: function() {
      this.forceCompositionEnd();
    },
    reset: function() {
      this.forceCompositionEnd();
    },
    forceCompositionEnd: function() {
      if (!this.composing || this.composing.handled) return;
      this.applyComposition(this.composing);
      this.composing.handled = true;
      this.div.blur();
      this.div.focus();
    },
    applyComposition: function(composing) {
      if (this.cm.isReadOnly())
        operation(this.cm, regChange)(this.cm)
      else if (composing.data && composing.data != composing.startData)
        operation(this.cm, applyTextInput)(this.cm, composing.data, 0, composing.sel);
    },

    setUneditable: function(node) {
      node.contentEditable = "false"
    },

    onKeyPress: function(e) {
      e.preventDefault();
      if (!this.cm.isReadOnly())
        operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
    },

    readOnlyChanged: function(val) {
      this.div.contentEditable = String(val != "nocursor")
    },

    onContextMenu: nothing,
    resetPosition: nothing,

    needsContentAttribute: true
  }, ContentEditableInput.prototype);

  function posToDOM(cm, pos) {
    var view = findViewForLine(cm, pos.line);
    if (!view || view.hidden) return null;
    var line = getLine(cm.doc, pos.line);
    var info = mapFromLineView(view, line, pos.line);

    var order = getOrder(line), side = "left";
    if (order) {
      var partPos = getBidiPartAt(order, pos.ch);
      side = partPos % 2 ? "right" : "left";
    }
    var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
    result.offset = result.collapse == "right" ? result.end : result.start;
    return result;
  }

  function badPos(pos, bad) { if (bad) pos.bad = true; return pos; }

  function domToPos(cm, node, offset) {
    var lineNode;
    if (node == cm.display.lineDiv) {
      lineNode = cm.display.lineDiv.childNodes[offset];
      if (!lineNode) return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
      node = null; offset = 0;
    } else {
      for (lineNode = node;; lineNode = lineNode.parentNode) {
        if (!lineNode || lineNode == cm.display.lineDiv) return null;
        if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) break;
      }
    }
    for (var i = 0; i < cm.display.view.length; i++) {
      var lineView = cm.display.view[i];
      if (lineView.node == lineNode)
        return locateNodeInLineView(lineView, node, offset);
    }
  }

  function locateNodeInLineView(lineView, node, offset) {
    var wrapper = lineView.text.firstChild, bad = false;
    if (!node || !contains(wrapper, node)) return badPos(Pos(lineNo(lineView.line), 0), true);
    if (node == wrapper) {
      bad = true;
      node = wrapper.childNodes[offset];
      offset = 0;
      if (!node) {
        var line = lineView.rest ? lst(lineView.rest) : lineView.line;
        return badPos(Pos(lineNo(line), line.text.length), bad);
      }
    }

    var textNode = node.nodeType == 3 ? node : null, topNode = node;
    if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
      textNode = node.firstChild;
      if (offset) offset = textNode.nodeValue.length;
    }
    while (topNode.parentNode != wrapper) topNode = topNode.parentNode;
    var measure = lineView.measure, maps = measure.maps;

    function find(textNode, topNode, offset) {
      for (var i = -1; i < (maps ? maps.length : 0); i++) {
        var map = i < 0 ? measure.map : maps[i];
        for (var j = 0; j < map.length; j += 3) {
          var curNode = map[j + 2];
          if (curNode == textNode || curNode == topNode) {
            var line = lineNo(i < 0 ? lineView.line : lineView.rest[i]);
            var ch = map[j] + offset;
            if (offset < 0 || curNode != textNode) ch = map[j + (offset ? 1 : 0)];
            return Pos(line, ch);
          }
        }
      }
    }
    var found = find(textNode, topNode, offset);
    if (found) return badPos(found, bad);

    // FIXME this is all really shaky. might handle the few cases it needs to handle, but likely to cause problems
    for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
      found = find(after, after.firstChild, 0);
      if (found)
        return badPos(Pos(found.line, found.ch - dist), bad);
      else
        dist += after.textContent.length;
    }
    for (var before = topNode.previousSibling, dist = offset; before; before = before.previousSibling) {
      found = find(before, before.firstChild, -1);
      if (found)
        return badPos(Pos(found.line, found.ch + dist), bad);
      else
        dist += after.textContent.length;
    }
  }

  function domTextBetween(cm, from, to, fromLine, toLine) {
    var text = "", closing = false, lineSep = cm.doc.lineSeparator();
    function recognizeMarker(id) { return function(marker) { return marker.id == id; }; }
    function walk(node) {
      if (node.nodeType == 1) {
        var cmText = node.getAttribute("cm-text");
        if (cmText != null) {
          if (cmText == "") cmText = node.textContent.replace(/\u200b/g, "");
          text += cmText;
          return;
        }
        var markerID = node.getAttribute("cm-marker"), range;
        if (markerID) {
          var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
          if (found.length && (range = found[0].find()))
            text += getBetween(cm.doc, range.from, range.to).join(lineSep);
          return;
        }
        if (node.getAttribute("contenteditable") == "false") return;
        for (var i = 0; i < node.childNodes.length; i++)
          walk(node.childNodes[i]);
        if (/^(pre|div|p)$/i.test(node.nodeName))
          closing = true;
      } else if (node.nodeType == 3) {
        var val = node.nodeValue;
        if (!val) return;
        if (closing) {
          text += lineSep;
          closing = false;
        }
        text += val;
      }
    }
    for (;;) {
      walk(from);
      if (from == to) break;
      from = from.nextSibling;
    }
    return text;
  }

  CodeMirror.inputStyles = {"textarea": TextareaInput, "contenteditable": ContentEditableInput};

  // SELECTION / CURSOR

  // Selection objects are immutable. A new one is created every time
  // the selection changes. A selection is one or more non-overlapping
  // (and non-touching) ranges, sorted, and an integer that indicates
  // which one is the primary selection (the one that's scrolled into
  // view, that getCursor returns, etc).
  function Selection(ranges, primIndex) {
    this.ranges = ranges;
    this.primIndex = primIndex;
  }

  Selection.prototype = {
    primary: function() { return this.ranges[this.primIndex]; },
    equals: function(other) {
      if (other == this) return true;
      if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) return false;
      for (var i = 0; i < this.ranges.length; i++) {
        var here = this.ranges[i], there = other.ranges[i];
        if (cmp(here.anchor, there.anchor) != 0 || cmp(here.head, there.head) != 0) return false;
      }
      return true;
    },
    deepCopy: function() {
      for (var out = [], i = 0; i < this.ranges.length; i++)
        out[i] = new Range(copyPos(this.ranges[i].anchor), copyPos(this.ranges[i].head));
      return new Selection(out, this.primIndex);
    },
    somethingSelected: function() {
      for (var i = 0; i < this.ranges.length; i++)
        if (!this.ranges[i].empty()) return true;
      return false;
    },
    contains: function(pos, end) {
      if (!end) end = pos;
      for (var i = 0; i < this.ranges.length; i++) {
        var range = this.ranges[i];
        if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0)
          return i;
      }
      return -1;
    }
  };

  function Range(anchor, head) {
    this.anchor = anchor; this.head = head;
  }

  Range.prototype = {
    from: function() { return minPos(this.anchor, this.head); },
    to: function() { return maxPos(this.anchor, this.head); },
    empty: function() {
      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
    }
  };

  // Take an unsorted, potentially overlapping set of ranges, and
  // build a selection out of it. 'Consumes' ranges array (modifying
  // it).
  function normalizeSelection(ranges, primIndex) {
    var prim = ranges[primIndex];
    ranges.sort(function(a, b) { return cmp(a.from(), b.from()); });
    primIndex = indexOf(ranges, prim);
    for (var i = 1; i < ranges.length; i++) {
      var cur = ranges[i], prev = ranges[i - 1];
      if (cmp(prev.to(), cur.from()) >= 0) {
        var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
        if (i <= primIndex) --primIndex;
        ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
      }
    }
    return new Selection(ranges, primIndex);
  }

  function simpleSelection(anchor, head) {
    return new Selection([new Range(anchor, head || anchor)], 0);
  }

  // Most of the external API clips given positions to make sure they
  // actually exist within the document.
  function clipLine(doc, n) {return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));}
  function clipPos(doc, pos) {
    if (pos.line < doc.first) return Pos(doc.first, 0);
    var last = doc.first + doc.size - 1;
    if (pos.line > last) return Pos(last, getLine(doc, last).text.length);
    return clipToLen(pos, getLine(doc, pos.line).text.length);
  }
  function clipToLen(pos, linelen) {
    var ch = pos.ch;
    if (ch == null || ch > linelen) return Pos(pos.line, linelen);
    else if (ch < 0) return Pos(pos.line, 0);
    else return pos;
  }
  function isLine(doc, l) {return l >= doc.first && l < doc.first + doc.size;}
  function clipPosArray(doc, array) {
    for (var out = [], i = 0; i < array.length; i++) out[i] = clipPos(doc, array[i]);
    return out;
  }

  // SELECTION UPDATES

  // The 'scroll' parameter given to many of these indicated whether
  // the new cursor position should be scrolled into view after
  // modifying the selection.

  // If shift is held or the extend flag is set, extends a range to
  // include a given position (and optionally a second position).
  // Otherwise, simply returns the range between the given positions.
  // Used for cursor motion and such.
  function extendRange(doc, range, head, other) {
    if (doc.cm && doc.cm.display.shift || doc.extend) {
      var anchor = range.anchor;
      if (other) {
        var posBefore = cmp(head, anchor) < 0;
        if (posBefore != (cmp(other, anchor) < 0)) {
          anchor = head;
          head = other;
        } else if (posBefore != (cmp(head, other) < 0)) {
          head = other;
        }
      }
      return new Range(anchor, head);
    } else {
      return new Range(other || head, head);
    }
  }

  // Extend the primary selection range, discard the rest.
  function extendSelection(doc, head, other, options) {
    setSelection(doc, new Selection([extendRange(doc, doc.sel.primary(), head, other)], 0), options);
  }

  // Extend all selections (pos is an array of selections with length
  // equal the number of selections)
  function extendSelections(doc, heads, options) {
    for (var out = [], i = 0; i < doc.sel.ranges.length; i++)
      out[i] = extendRange(doc, doc.sel.ranges[i], heads[i], null);
    var newSel = normalizeSelection(out, doc.sel.primIndex);
    setSelection(doc, newSel, options);
  }

  // Updates a single range in the selection.
  function replaceOneSelection(doc, i, range, options) {
    var ranges = doc.sel.ranges.slice(0);
    ranges[i] = range;
    setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
  }

  // Reset the selection to a single range.
  function setSimpleSelection(doc, anchor, head, options) {
    setSelection(doc, simpleSelection(anchor, head), options);
  }

  // Give beforeSelectionChange handlers a change to influence a
  // selection update.
  function filterSelectionChange(doc, sel, options) {
    var obj = {
      ranges: sel.ranges,
      update: function(ranges) {
        this.ranges = [];
        for (var i = 0; i < ranges.length; i++)
          this.ranges[i] = new Range(clipPos(doc, ranges[i].anchor),
                                     clipPos(doc, ranges[i].head));
      },
      origin: options && options.origin
    };
    signal(doc, "beforeSelectionChange", doc, obj);
    if (doc.cm) signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
    if (obj.ranges != sel.ranges) return normalizeSelection(obj.ranges, obj.ranges.length - 1);
    else return sel;
  }

  function setSelectionReplaceHistory(doc, sel, options) {
    var done = doc.history.done, last = lst(done);
    if (last && last.ranges) {
      done[done.length - 1] = sel;
      setSelectionNoUndo(doc, sel, options);
    } else {
      setSelection(doc, sel, options);
    }
  }

  // Set a new selection.
  function setSelection(doc, sel, options) {
    setSelectionNoUndo(doc, sel, options);
    addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
  }

  function setSelectionNoUndo(doc, sel, options) {
    if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange"))
      sel = filterSelectionChange(doc, sel, options);

    var bias = options && options.bias ||
      (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
    setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));

    if (!(options && options.scroll === false) && doc.cm)
      ensureCursorVisible(doc.cm);
  }

  function setSelectionInner(doc, sel) {
    if (sel.equals(doc.sel)) return;

    doc.sel = sel;

    if (doc.cm) {
      doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = true;
      signalCursorActivity(doc.cm);
    }
    signalLater(doc, "cursorActivity", doc);
  }

  // Verify that the selection does not partially select any atomic
  // marked ranges.
  function reCheckSelection(doc) {
    setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false), sel_dontScroll);
  }

  // Return a selection that does not partially select any atomic
  // ranges.
  function skipAtomicInSelection(doc, sel, bias, mayClear) {
    var out;
    for (var i = 0; i < sel.ranges.length; i++) {
      var range = sel.ranges[i];
      var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i];
      var newAnchor = skipAtomic(doc, range.anchor, old && old.anchor, bias, mayClear);
      var newHead = skipAtomic(doc, range.head, old && old.head, bias, mayClear);
      if (out || newAnchor != range.anchor || newHead != range.head) {
        if (!out) out = sel.ranges.slice(0, i);
        out[i] = new Range(newAnchor, newHead);
      }
    }
    return out ? normalizeSelection(out, sel.primIndex) : sel;
  }

  function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
    var line = getLine(doc, pos.line);
    if (line.markedSpans) for (var i = 0; i < line.markedSpans.length; ++i) {
      var sp = line.markedSpans[i], m = sp.marker;
      if ((sp.from == null || (m.inclusiveLeft ? sp.from <= pos.ch : sp.from < pos.ch)) &&
          (sp.to == null || (m.inclusiveRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
        if (mayClear) {
          signal(m, "beforeCursorEnter");
          if (m.explicitlyCleared) {
            if (!line.markedSpans) break;
            else {--i; continue;}
          }
        }
        if (!m.atomic) continue;

        if (oldPos) {
          var near = m.find(dir < 0 ? 1 : -1), diff;
          if (dir < 0 ? m.inclusiveRight : m.inclusiveLeft)
            near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null);
          if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0))
            return skipAtomicInner(doc, near, pos, dir, mayClear);
        }

        var far = m.find(dir < 0 ? -1 : 1);
        if (dir < 0 ? m.inclusiveLeft : m.inclusiveRight)
          far = movePos(doc, far, dir, far.line == pos.line ? line : null);
        return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null;
      }
    }
    return pos;
  }

  // Ensure a given position is not inside an atomic range.
  function skipAtomic(doc, pos, oldPos, bias, mayClear) {
    var dir = bias || 1;
    var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) ||
        (!mayClear && skipAtomicInner(doc, pos, oldPos, dir, true)) ||
        skipAtomicInner(doc, pos, oldPos, -dir, mayClear) ||
        (!mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true));
    if (!found) {
      doc.cantEdit = true;
      return Pos(doc.first, 0);
    }
    return found;
  }

  function movePos(doc, pos, dir, line) {
    if (dir < 0 && pos.ch == 0) {
      if (pos.line > doc.first) return clipPos(doc, Pos(pos.line - 1));
      else return null;
    } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
      if (pos.line < doc.first + doc.size - 1) return Pos(pos.line + 1, 0);
      else return null;
    } else {
      return new Pos(pos.line, pos.ch + dir);
    }
  }

  // SELECTION DRAWING

  function updateSelection(cm) {
    cm.display.input.showSelection(cm.display.input.prepareSelection());
  }

  function prepareSelection(cm, primary) {
    var doc = cm.doc, result = {};
    var curFragment = result.cursors = document.createDocumentFragment();
    var selFragment = result.selection = document.createDocumentFragment();

    for (var i = 0; i < doc.sel.ranges.length; i++) {
      if (primary === false && i == doc.sel.primIndex) continue;
      var range = doc.sel.ranges[i];
      if (range.from().line >= cm.display.viewTo || range.to().line < cm.display.viewFrom) continue;
      var collapsed = range.empty();
      if (collapsed || cm.options.showCursorWhenSelecting)
        drawSelectionCursor(cm, range.head, curFragment);
      if (!collapsed)
        drawSelectionRange(cm, range, selFragment);
    }
    return result;
  }

  // Draws a cursor for the given range
  function drawSelectionCursor(cm, head, output) {
    var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);

    var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
    cursor.style.left = pos.left + "px";
    cursor.style.top = pos.top + "px";
    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";

    if (pos.other) {
      // Secondary cursor, shown when on a 'jump' in bi-directional text
      var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      otherCursor.style.display = "";
      otherCursor.style.left = pos.other.left + "px";
      otherCursor.style.top = pos.other.top + "px";
      otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
    }
  }

  // Draws the given range as a highlighted selection
  function drawSelectionRange(cm, range, output) {
    var display = cm.display, doc = cm.doc;
    var fragment = document.createDocumentFragment();
    var padding = paddingH(cm.display), leftSide = padding.left;
    var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;

    function add(left, top, width, bottom) {
      if (top < 0) top = 0;
      top = Math.round(top);
      bottom = Math.round(bottom);
      fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left +
                               "px; top: " + top + "px; width: " + (width == null ? rightSide - left : width) +
                               "px; height: " + (bottom - top) + "px"));
    }

    function drawForLine(line, fromArg, toArg) {
      var lineObj = getLine(doc, line);
      var lineLen = lineObj.text.length;
      var start, end;
      function coords(ch, bias) {
        return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
      }

      iterateBidiSections(getOrder(lineObj), fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir) {
        var leftPos = coords(from, "left"), rightPos, left, right;
        if (from == to) {
          rightPos = leftPos;
          left = right = leftPos.left;
        } else {
          rightPos = coords(to - 1, "right");
          if (dir == "rtl") { var tmp = leftPos; leftPos = rightPos; rightPos = tmp; }
          left = leftPos.left;
          right = rightPos.right;
        }
        if (fromArg == null && from == 0) left = leftSide;
        if (rightPos.top - leftPos.top > 3) { // Different lines, draw top part
          add(left, leftPos.top, null, leftPos.bottom);
          left = leftSide;
          if (leftPos.bottom < rightPos.top) add(left, leftPos.bottom, null, rightPos.top);
        }
        if (toArg == null && to == lineLen) right = rightSide;
        if (!start || leftPos.top < start.top || leftPos.top == start.top && leftPos.left < start.left)
          start = leftPos;
        if (!end || rightPos.bottom > end.bottom || rightPos.bottom == end.bottom && rightPos.right > end.right)
          end = rightPos;
        if (left < leftSide + 1) left = leftSide;
        add(left, rightPos.top, right - left, rightPos.bottom);
      });
      return {start: start, end: end};
    }

    var sFrom = range.from(), sTo = range.to();
    if (sFrom.line == sTo.line) {
      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
    } else {
      var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
      var singleVLine = visualLine(fromLine) == visualLine(toLine);
      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
      if (singleVLine) {
        if (leftEnd.top < rightStart.top - 2) {
          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
        } else {
          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
        }
      }
      if (leftEnd.bottom < rightStart.top)
        add(leftSide, leftEnd.bottom, null, rightStart.top);
    }

    output.appendChild(fragment);
  }

  // Cursor-blinking
  function restartBlink(cm) {
    if (!cm.state.focused) return;
    var display = cm.display;
    clearInterval(display.blinker);
    var on = true;
    display.cursorDiv.style.visibility = "";
    if (cm.options.cursorBlinkRate > 0)
      display.blinker = setInterval(function() {
        display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden";
      }, cm.options.cursorBlinkRate);
    else if (cm.options.cursorBlinkRate < 0)
      display.cursorDiv.style.visibility = "hidden";
  }

  // HIGHLIGHT WORKER

  function startWorker(cm, time) {
    if (cm.doc.mode.startState && cm.doc.frontier < cm.display.viewTo)
      cm.state.highlight.set(time, bind(highlightWorker, cm));
  }

  function highlightWorker(cm) {
    var doc = cm.doc;
    if (doc.frontier < doc.first) doc.frontier = doc.first;
    if (doc.frontier >= cm.display.viewTo) return;
    var end = +new Date + cm.options.workTime;
    var state = copyState(doc.mode, getStateBefore(cm, doc.frontier));
    var changedLines = [];

    doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function(line) {
      if (doc.frontier >= cm.display.viewFrom) { // Visible
        var oldStyles = line.styles, tooLong = line.text.length > cm.options.maxHighlightLength;
        var highlighted = highlightLine(cm, line, tooLong ? copyState(doc.mode, state) : state, true);
        line.styles = highlighted.styles;
        var oldCls = line.styleClasses, newCls = highlighted.classes;
        if (newCls) line.styleClasses = newCls;
        else if (oldCls) line.styleClasses = null;
        var ischange = !oldStyles || oldStyles.length != line.styles.length ||
          oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
        for (var i = 0; !ischange && i < oldStyles.length; ++i) ischange = oldStyles[i] != line.styles[i];
        if (ischange) changedLines.push(doc.frontier);
        line.stateAfter = tooLong ? state : copyState(doc.mode, state);
      } else {
        if (line.text.length <= cm.options.maxHighlightLength)
          processLine(cm, line.text, state);
        line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) : null;
      }
      ++doc.frontier;
      if (+new Date > end) {
        startWorker(cm, cm.options.workDelay);
        return true;
      }
    });
    if (changedLines.length) runInOp(cm, function() {
      for (var i = 0; i < changedLines.length; i++)
        regLineChange(cm, changedLines[i], "text");
    });
  }

  // Finds the line to start with when starting a parse. Tries to
  // find a line with a stateAfter, so that it can start with a
  // valid state. If that fails, it returns the line with the
  // smallest indentation, which tends to need the least context to
  // parse correctly.
  function findStartLine(cm, n, precise) {
    var minindent, minline, doc = cm.doc;
    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
    for (var search = n; search > lim; --search) {
      if (search <= doc.first) return doc.first;
      var line = getLine(doc, search - 1);
      if (line.stateAfter && (!precise || search <= doc.frontier)) return search;
      var indented = countColumn(line.text, null, cm.options.tabSize);
      if (minline == null || minindent > indented) {
        minline = search - 1;
        minindent = indented;
      }
    }
    return minline;
  }

  function getStateBefore(cm, n, precise) {
    var doc = cm.doc, display = cm.display;
    if (!doc.mode.startState) return true;
    var pos = findStartLine(cm, n, precise), state = pos > doc.first && getLine(doc, pos-1).stateAfter;
    if (!state) state = startState(doc.mode);
    else state = copyState(doc.mode, state);
    doc.iter(pos, n, function(line) {
      processLine(cm, line.text, state);
      var save = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo;
      line.stateAfter = save ? copyState(doc.mode, state) : null;
      ++pos;
    });
    if (precise) doc.frontier = pos;
    return state;
  }

  // POSITION MEASUREMENT

  function paddingTop(display) {return display.lineSpace.offsetTop;}
  function paddingVert(display) {return display.mover.offsetHeight - display.lineSpace.offsetHeight;}
  function paddingH(display) {
    if (display.cachedPaddingH) return display.cachedPaddingH;
    var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    var data = {left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight)};
    if (!isNaN(data.left) && !isNaN(data.right)) display.cachedPaddingH = data;
    return data;
  }

  function scrollGap(cm) { return scrollerGap - cm.display.nativeBarWidth; }
  function displayWidth(cm) {
    return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
  }
  function displayHeight(cm) {
    return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
  }

  // Ensure the lineView.wrapping.heights array is populated. This is
  // an array of bottom offsets for the lines that make up a drawn
  // line. When lineWrapping is on, there might be more than one
  // height.
  function ensureLineHeights(cm, lineView, rect) {
    var wrapping = cm.options.lineWrapping;
    var curWidth = wrapping && displayWidth(cm);
    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
      var heights = lineView.measure.heights = [];
      if (wrapping) {
        lineView.measure.width = curWidth;
        var rects = lineView.text.firstChild.getClientRects();
        for (var i = 0; i < rects.length - 1; i++) {
          var cur = rects[i], next = rects[i + 1];
          if (Math.abs(cur.bottom - next.bottom) > 2)
            heights.push((cur.bottom + next.top) / 2 - rect.top);
        }
      }
      heights.push(rect.bottom - rect.top);
    }
  }

  // Find a line map (mapping character offsets to text nodes) and a
  // measurement cache for the given line number. (A line view might
  // contain multiple lines when collapsed ranges are present.)
  function mapFromLineView(lineView, line, lineN) {
    if (lineView.line == line)
      return {map: lineView.measure.map, cache: lineView.measure.cache};
    for (var i = 0; i < lineView.rest.length; i++)
      if (lineView.rest[i] == line)
        return {map: lineView.measure.maps[i], cache: lineView.measure.caches[i]};
    for (var i = 0; i < lineView.rest.length; i++)
      if (lineNo(lineView.rest[i]) > lineN)
        return {map: lineView.measure.maps[i], cache: lineView.measure.caches[i], before: true};
  }

  // Render a line into the hidden node display.externalMeasured. Used
  // when measurement is needed for a line that's not in the viewport.
  function updateExternalMeasurement(cm, line) {
    line = visualLine(line);
    var lineN = lineNo(line);
    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
    view.lineN = lineN;
    var built = view.built = buildLineContent(cm, view);
    view.text = built.pre;
    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
    return view;
  }

  // Get a {top, bottom, left, right} box (in line-local coordinates)
  // for a given character.
  function measureChar(cm, line, ch, bias) {
    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
  }

  // Find a line view that corresponds to the given line number.
  function findViewForLine(cm, lineN) {
    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo)
      return cm.display.view[findViewIndex(cm, lineN)];
    var ext = cm.display.externalMeasured;
    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size)
      return ext;
  }

  // Measurement can be split in two steps, the set-up work that
  // applies to the whole line, and the measurement of the actual
  // character. Functions like coordsChar, that need to do a lot of
  // measurements in a row, can thus ensure that the set-up work is
  // only done once.
  function prepareMeasureForLine(cm, line) {
    var lineN = lineNo(line);
    var view = findViewForLine(cm, lineN);
    if (view && !view.text) {
      view = null;
    } else if (view && view.changes) {
      updateLineForChanges(cm, view, lineN, getDimensions(cm));
      cm.curOp.forceUpdate = true;
    }
    if (!view)
      view = updateExternalMeasurement(cm, line);

    var info = mapFromLineView(view, line, lineN);
    return {
      line: line, view: view, rect: null,
      map: info.map, cache: info.cache, before: info.before,
      hasHeights: false
    };
  }

  // Given a prepared measurement object, measures the position of an
  // actual character (or fetches it from the cache).
  function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
    if (prepared.before) ch = -1;
    var key = ch + (bias || ""), found;
    if (prepared.cache.hasOwnProperty(key)) {
      found = prepared.cache[key];
    } else {
      if (!prepared.rect)
        prepared.rect = prepared.view.text.getBoundingClientRect();
      if (!prepared.hasHeights) {
        ensureLineHeights(cm, prepared.view, prepared.rect);
        prepared.hasHeights = true;
      }
      found = measureCharInner(cm, prepared, ch, bias);
      if (!found.bogus) prepared.cache[key] = found;
    }
    return {left: found.left, right: found.right,
            top: varHeight ? found.rtop : found.top,
            bottom: varHeight ? found.rbottom : found.bottom};
  }

  var nullRect = {left: 0, right: 0, top: 0, bottom: 0};

  function nodeAndOffsetInLineMap(map, ch, bias) {
    var node, start, end, collapse;
    // First, search the line map for the text node corresponding to,
    // or closest to, the target character.
    for (var i = 0; i < map.length; i += 3) {
      var mStart = map[i], mEnd = map[i + 1];
      if (ch < mStart) {
        start = 0; end = 1;
        collapse = "left";
      } else if (ch < mEnd) {
        start = ch - mStart;
        end = start + 1;
      } else if (i == map.length - 3 || ch == mEnd && map[i + 3] > ch) {
        end = mEnd - mStart;
        start = end - 1;
        if (ch >= mEnd) collapse = "right";
      }
      if (start != null) {
        node = map[i + 2];
        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right"))
          collapse = bias;
        if (bias == "left" && start == 0)
          while (i && map[i - 2] == map[i - 3] && map[i - 1].insertLeft) {
            node = map[(i -= 3) + 2];
            collapse = "left";
          }
        if (bias == "right" && start == mEnd - mStart)
          while (i < map.length - 3 && map[i + 3] == map[i + 4] && !map[i + 5].insertLeft) {
            node = map[(i += 3) + 2];
            collapse = "right";
          }
        break;
      }
    }
    return {node: node, start: start, end: end, collapse: collapse, coverStart: mStart, coverEnd: mEnd};
  }

  function measureCharInner(cm, prepared, ch, bias) {
    var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
    var node = place.node, start = place.start, end = place.end, collapse = place.collapse;

    var rect;
    if (node.nodeType == 3) { // If it is a text node, use a range to retrieve the coordinates.
      for (var i = 0; i < 4; i++) { // Retry a maximum of 4 times when nonsense rectangles are returned
        while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) --start;
        while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) ++end;
        if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
          rect = node.parentNode.getBoundingClientRect();
        } else if (ie && cm.options.lineWrapping) {
          var rects = range(node, start, end).getClientRects();
          if (rects.length)
            rect = rects[bias == "right" ? rects.length - 1 : 0];
          else
            rect = nullRect;
        } else {
          rect = range(node, start, end).getBoundingClientRect() || nullRect;
        }
        if (rect.left || rect.right || start == 0) break;
        end = start;
        start = start - 1;
        collapse = "right";
      }
      if (ie && ie_version < 11) rect = maybeUpdateRectForZooming(cm.display.measure, rect);
    } else { // If it is a widget, simply get the box for the whole widget.
      if (start > 0) collapse = bias = "right";
      var rects;
      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1)
        rect = rects[bias == "right" ? rects.length - 1 : 0];
      else
        rect = node.getBoundingClientRect();
    }
    if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
      var rSpan = node.parentNode.getClientRects()[0];
      if (rSpan)
        rect = {left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom};
      else
        rect = nullRect;
    }

    var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
    var mid = (rtop + rbot) / 2;
    var heights = prepared.view.measure.heights;
    for (var i = 0; i < heights.length - 1; i++)
      if (mid < heights[i]) break;
    var top = i ? heights[i - 1] : 0, bot = heights[i];
    var result = {left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
                  right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
                  top: top, bottom: bot};
    if (!rect.left && !rect.right) result.bogus = true;
    if (!cm.options.singleCursorHeightPerLine) { result.rtop = rtop; result.rbottom = rbot; }

    return result;
  }

  // Work around problem with bounding client rects on ranges being
  // returned incorrectly when zoomed on IE10 and below.
  function maybeUpdateRectForZooming(measure, rect) {
    if (!window.screen || screen.logicalXDPI == null ||
        screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure))
      return rect;
    var scaleX = screen.logicalXDPI / screen.deviceXDPI;
    var scaleY = screen.logicalYDPI / screen.deviceYDPI;
    return {left: rect.left * scaleX, right: rect.right * scaleX,
            top: rect.top * scaleY, bottom: rect.bottom * scaleY};
  }

  function clearLineMeasurementCacheFor(lineView) {
    if (lineView.measure) {
      lineView.measure.cache = {};
      lineView.measure.heights = null;
      if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++)
        lineView.measure.caches[i] = {};
    }
  }

  function clearLineMeasurementCache(cm) {
    cm.display.externalMeasure = null;
    removeChildren(cm.display.lineMeasure);
    for (var i = 0; i < cm.display.view.length; i++)
      clearLineMeasurementCacheFor(cm.display.view[i]);
  }

  function clearCaches(cm) {
    clearLineMeasurementCache(cm);
    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
    if (!cm.options.lineWrapping) cm.display.maxLineChanged = true;
    cm.display.lineNumChars = null;
  }

  function pageScrollX() { return window.pageXOffset || (document.documentElement || document.body).scrollLeft; }
  function pageScrollY() { return window.pageYOffset || (document.documentElement || document.body).scrollTop; }

  // Converts a {top, bottom, left, right} box from line-local
  // coordinates into another coordinate system. Context may be one of
  // "line", "div" (display.lineDiv), "local"/null (editor), "window",
  // or "page".
  function intoCoordSystem(cm, lineObj, rect, context) {
    if (lineObj.widgets) for (var i = 0; i < lineObj.widgets.length; ++i) if (lineObj.widgets[i].above) {
      var size = widgetHeight(lineObj.widgets[i]);
      rect.top += size; rect.bottom += size;
    }
    if (context == "line") return rect;
    if (!context) context = "local";
    var yOff = heightAtLine(lineObj);
    if (context == "local") yOff += paddingTop(cm.display);
    else yOff -= cm.display.viewOffset;
    if (context == "page" || context == "window") {
      var lOff = cm.display.lineSpace.getBoundingClientRect();
      yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
      rect.left += xOff; rect.right += xOff;
    }
    rect.top += yOff; rect.bottom += yOff;
    return rect;
  }

  // Coverts a box from "div" coords to another coordinate system.
  // Context may be "window", "page", "div", or "local"/null.
  function fromCoordSystem(cm, coords, context) {
    if (context == "div") return coords;
    var left = coords.left, top = coords.top;
    // First move into "page" coordinate system
    if (context == "page") {
      left -= pageScrollX();
      top -= pageScrollY();
    } else if (context == "local" || !context) {
      var localBox = cm.display.sizer.getBoundingClientRect();
      left += localBox.left;
      top += localBox.top;
    }

    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
    return {left: left - lineSpaceBox.left, top: top - lineSpaceBox.top};
  }

  function charCoords(cm, pos, context, lineObj, bias) {
    if (!lineObj) lineObj = getLine(cm.doc, pos.line);
    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
  }

  // Returns a box for a given cursor position, which may have an
  // 'other' property containing the position of the secondary cursor
  // on a bidi boundary.
  function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
    lineObj = lineObj || getLine(cm.doc, pos.line);
    if (!preparedMeasure) preparedMeasure = prepareMeasureForLine(cm, lineObj);
    function get(ch, right) {
      var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left", varHeight);
      if (right) m.left = m.right; else m.right = m.left;
      return intoCoordSystem(cm, lineObj, m, context);
    }
    function getBidi(ch, partPos) {
      var part = order[partPos], right = part.level % 2;
      if (ch == bidiLeft(part) && partPos && part.level < order[partPos - 1].level) {
        part = order[--partPos];
        ch = bidiRight(part) - (part.level % 2 ? 0 : 1);
        right = true;
      } else if (ch == bidiRight(part) && partPos < order.length - 1 && part.level < order[partPos + 1].level) {
        part = order[++partPos];
        ch = bidiLeft(part) - part.level % 2;
        right = false;
      }
      if (right && ch == part.to && ch > part.from) return get(ch - 1);
      return get(ch, right);
    }
    var order = getOrder(lineObj), ch = pos.ch;
    if (!order) return get(ch);
    var partPos = getBidiPartAt(order, ch);
    var val = getBidi(ch, partPos);
    if (bidiOther != null) val.other = getBidi(ch, bidiOther);
    return val;
  }

  // Used to cheaply estimate the coordinates for a position. Used for
  // intermediate scroll updates.
  function estimateCoords(cm, pos) {
    var left = 0, pos = clipPos(cm.doc, pos);
    if (!cm.options.lineWrapping) left = charWidth(cm.display) * pos.ch;
    var lineObj = getLine(cm.doc, pos.line);
    var top = heightAtLine(lineObj) + paddingTop(cm.display);
    return {left: left, right: left, top: top, bottom: top + lineObj.height};
  }

  // Positions returned by coordsChar contain some extra information.
  // xRel is the relative x position of the input coordinates compared
  // to the found position (so xRel > 0 means the coordinates are to
  // the right of the character position, for example). When outside
  // is true, that means the coordinates lie outside the line's
  // vertical range.
  function PosWithInfo(line, ch, outside, xRel) {
    var pos = Pos(line, ch);
    pos.xRel = xRel;
    if (outside) pos.outside = true;
    return pos;
  }

  // Compute the character position closest to the given coordinates.
  // Input must be lineSpace-local ("div" coordinate system).
  function coordsChar(cm, x, y) {
    var doc = cm.doc;
    y += cm.display.viewOffset;
    if (y < 0) return PosWithInfo(doc.first, 0, true, -1);
    var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
    if (lineN > last)
      return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, true, 1);
    if (x < 0) x = 0;

    var lineObj = getLine(doc, lineN);
    for (;;) {
      var found = coordsCharInner(cm, lineObj, lineN, x, y);
      var merged = collapsedSpanAtEnd(lineObj);
      var mergedPos = merged && merged.find(0, true);
      if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0))
        lineN = lineNo(lineObj = mergedPos.to.line);
      else
        return found;
    }
  }

  function coordsCharInner(cm, lineObj, lineNo, x, y) {
    var innerOff = y - heightAtLine(lineObj);
    var wrongLine = false, adjust = 2 * cm.display.wrapper.clientWidth;
    var preparedMeasure = prepareMeasureForLine(cm, lineObj);

    function getX(ch) {
      var sp = cursorCoords(cm, Pos(lineNo, ch), "line", lineObj, preparedMeasure);
      wrongLine = true;
      if (innerOff > sp.bottom) return sp.left - adjust;
      else if (innerOff < sp.top) return sp.left + adjust;
      else wrongLine = false;
      return sp.left;
    }

    var bidi = getOrder(lineObj), dist = lineObj.text.length;
    var from = lineLeft(lineObj), to = lineRight(lineObj);
    var fromX = getX(from), fromOutside = wrongLine, toX = getX(to), toOutside = wrongLine;

    if (x > toX) return PosWithInfo(lineNo, to, toOutside, 1);
    // Do a binary search between these bounds.
    for (;;) {
      if (bidi ? to == from || to == moveVisually(lineObj, from, 1) : to - from <= 1) {
        var ch = x < fromX || x - fromX <= toX - x ? from : to;
        var xDiff = x - (ch == from ? fromX : toX);
        while (isExtendingChar(lineObj.text.charAt(ch))) ++ch;
        var pos = PosWithInfo(lineNo, ch, ch == from ? fromOutside : toOutside,
                              xDiff < -1 ? -1 : xDiff > 1 ? 1 : 0);
        return pos;
      }
      var step = Math.ceil(dist / 2), middle = from + step;
      if (bidi) {
        middle = from;
        for (var i = 0; i < step; ++i) middle = moveVisually(lineObj, middle, 1);
      }
      var middleX = getX(middle);
      if (middleX > x) {to = middle; toX = middleX; if (toOutside = wrongLine) toX += 1000; dist = step;}
      else {from = middle; fromX = middleX; fromOutside = wrongLine; dist -= step;}
    }
  }

  var measureText;
  // Compute the default text height.
  function textHeight(display) {
    if (display.cachedTextHeight != null) return display.cachedTextHeight;
    if (measureText == null) {
      measureText = elt("pre");
      // Measure a bunch of lines, for browsers that compute
      // fractional heights.
      for (var i = 0; i < 49; ++i) {
        measureText.appendChild(document.createTextNode("x"));
        measureText.appendChild(elt("br"));
      }
      measureText.appendChild(document.createTextNode("x"));
    }
    removeChildrenAndAdd(display.measure, measureText);
    var height = measureText.offsetHeight / 50;
    if (height > 3) display.cachedTextHeight = height;
    removeChildren(display.measure);
    return height || 1;
  }

  // Compute the default character width.
  function charWidth(display) {
    if (display.cachedCharWidth != null) return display.cachedCharWidth;
    var anchor = elt("span", "xxxxxxxxxx");
    var pre = elt("pre", [anchor]);
    removeChildrenAndAdd(display.measure, pre);
    var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
    if (width > 2) display.cachedCharWidth = width;
    return width || 10;
  }

  // OPERATIONS

  // Operations are used to wrap a series of changes to the editor
  // state in such a way that each change won't have to update the
  // cursor and display (which would be awkward, slow, and
  // error-prone). Instead, display updates are batched and then all
  // combined and executed at once.

  var operationGroup = null;

  var nextOpId = 0;
  // Start a new operation.
  function startOperation(cm) {
    cm.curOp = {
      cm: cm,
      viewChanged: false,      // Flag that indicates that lines might need to be redrawn
      startHeight: cm.doc.height, // Used to detect need to update scrollbar
      forceUpdate: false,      // Used to force a redraw
      updateInput: null,       // Whether to reset the input textarea
      typing: false,           // Whether this reset should be careful to leave existing text (for compositing)
      changeObjs: null,        // Accumulated changes, for firing change events
      cursorActivityHandlers: null, // Set of handlers to fire cursorActivity on
      cursorActivityCalled: 0, // Tracks which cursorActivity handlers have been called already
      selectionChanged: false, // Whether the selection needs to be redrawn
      updateMaxLine: false,    // Set when the widest line needs to be determined anew
      scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
      scrollToPos: null,       // Used to scroll to a specific position
      focus: false,
      id: ++nextOpId           // Unique ID
    };
    if (operationGroup) {
      operationGroup.ops.push(cm.curOp);
    } else {
      cm.curOp.ownsGroup = operationGroup = {
        ops: [cm.curOp],
        delayedCallbacks: []
      };
    }
  }

  function fireCallbacksForOps(group) {
    // Calls delayed callbacks and cursorActivity handlers until no
    // new ones appear
    var callbacks = group.delayedCallbacks, i = 0;
    do {
      for (; i < callbacks.length; i++)
        callbacks[i].call(null);
      for (var j = 0; j < group.ops.length; j++) {
        var op = group.ops[j];
        if (op.cursorActivityHandlers)
          while (op.cursorActivityCalled < op.cursorActivityHandlers.length)
            op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
      }
    } while (i < callbacks.length);
  }

  // Finish an operation, updating the display and signalling delayed events
  function endOperation(cm) {
    var op = cm.curOp, group = op.ownsGroup;
    if (!group) return;

    try { fireCallbacksForOps(group); }
    finally {
      operationGroup = null;
      for (var i = 0; i < group.ops.length; i++)
        group.ops[i].cm.curOp = null;
      endOperations(group);
    }
  }

  // The DOM updates done when an operation finishes are batched so
  // that the minimum number of relayouts are required.
  function endOperations(group) {
    var ops = group.ops;
    for (var i = 0; i < ops.length; i++) // Read DOM
      endOperation_R1(ops[i]);
    for (var i = 0; i < ops.length; i++) // Write DOM (maybe)
      endOperation_W1(ops[i]);
    for (var i = 0; i < ops.length; i++) // Read DOM
      endOperation_R2(ops[i]);
    for (var i = 0; i < ops.length; i++) // Write DOM (maybe)
      endOperation_W2(ops[i]);
    for (var i = 0; i < ops.length; i++) // Read DOM
      endOperation_finish(ops[i]);
  }

  function endOperation_R1(op) {
    var cm = op.cm, display = cm.display;
    maybeClipScrollbars(cm);
    if (op.updateMaxLine) findMaxLine(cm);

    op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null ||
      op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom ||
                         op.scrollToPos.to.line >= display.viewTo) ||
      display.maxLineChanged && cm.options.lineWrapping;
    op.update = op.mustUpdate &&
      new DisplayUpdate(cm, op.mustUpdate && {top: op.scrollTop, ensure: op.scrollToPos}, op.forceUpdate);
  }

  function endOperation_W1(op) {
    op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
  }

  function endOperation_R2(op) {
    var cm = op.cm, display = cm.display;
    if (op.updatedDisplay) updateHeightsInViewport(cm);

    op.barMeasure = measureForScrollbars(cm);

    // If the max line changed since it was last measured, measure it,
    // and ensure the document's width matches it.
    // updateDisplay_W2 will use these properties to do the actual resizing
    if (display.maxLineChanged && !cm.options.lineWrapping) {
      op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
      cm.display.sizerWidth = op.adjustWidthTo;
      op.barMeasure.scrollWidth =
        Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
      op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
    }

    if (op.updatedDisplay || op.selectionChanged)
      op.preparedSelection = display.input.prepareSelection();
  }

  function endOperation_W2(op) {
    var cm = op.cm;

    if (op.adjustWidthTo != null) {
      cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
      if (op.maxScrollLeft < cm.doc.scrollLeft)
        setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
      cm.display.maxLineChanged = false;
    }

    if (op.preparedSelection)
      cm.display.input.showSelection(op.preparedSelection);
    if (op.updatedDisplay || op.startHeight != cm.doc.height)
      updateScrollbars(cm, op.barMeasure);
    if (op.updatedDisplay)
      setDocumentHeight(cm, op.barMeasure);

    if (op.selectionChanged) restartBlink(cm);

    if (cm.state.focused && op.updateInput)
      cm.display.input.reset(op.typing);
    if (op.focus && op.focus == activeElt() && (!document.hasFocus || document.hasFocus()))
      ensureFocus(op.cm);
  }

  function endOperation_finish(op) {
    var cm = op.cm, display = cm.display, doc = cm.doc;

    if (op.updatedDisplay) postUpdateDisplay(cm, op.update);

    // Abort mouse wheel delta measurement, when scrolling explicitly
    if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos))
      display.wheelStartX = display.wheelStartY = null;

    // Propagate the scroll position to the actual DOM scroller
    if (op.scrollTop != null && (display.scroller.scrollTop != op.scrollTop || op.forceScroll)) {
      doc.scrollTop = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
      display.scrollbars.setScrollTop(doc.scrollTop);
      display.scroller.scrollTop = doc.scrollTop;
    }
    if (op.scrollLeft != null && (display.scroller.scrollLeft != op.scrollLeft || op.forceScroll)) {
      doc.scrollLeft = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, op.scrollLeft));
      display.scrollbars.setScrollLeft(doc.scrollLeft);
      display.scroller.scrollLeft = doc.scrollLeft;
      alignHorizontally(cm);
    }
    // If we need to scroll a specific position into view, do so.
    if (op.scrollToPos) {
      var coords = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from),
                                     clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
      if (op.scrollToPos.isCursor && cm.state.focused) maybeScrollWindow(cm, coords);
    }

    // Fire events for markers that are hidden/unidden by editing or
    // undoing
    var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
    if (hidden) for (var i = 0; i < hidden.length; ++i)
      if (!hidden[i].lines.length) signal(hidden[i], "hide");
    if (unhidden) for (var i = 0; i < unhidden.length; ++i)
      if (unhidden[i].lines.length) signal(unhidden[i], "unhide");

    if (display.wrapper.offsetHeight)
      doc.scrollTop = cm.display.scroller.scrollTop;

    // Fire change events, and delayed event handlers
    if (op.changeObjs)
      signal(cm, "changes", cm, op.changeObjs);
    if (op.update)
      op.update.finish();
  }

  // Run the given function in an operation
  function runInOp(cm, f) {
    if (cm.curOp) return f();
    startOperation(cm);
    try { return f(); }
    finally { endOperation(cm); }
  }
  // Wraps a function in an operation. Returns the wrapped function.
  function operation(cm, f) {
    return function() {
      if (cm.curOp) return f.apply(cm, arguments);
      startOperation(cm);
      try { return f.apply(cm, arguments); }
      finally { endOperation(cm); }
    };
  }
  // Used to add methods to editor and doc instances, wrapping them in
  // operations.
  function methodOp(f) {
    return function() {
      if (this.curOp) return f.apply(this, arguments);
      startOperation(this);
      try { return f.apply(this, arguments); }
      finally { endOperation(this); }
    };
  }
  function docMethodOp(f) {
    return function() {
      var cm = this.cm;
      if (!cm || cm.curOp) return f.apply(this, arguments);
      startOperation(cm);
      try { return f.apply(this, arguments); }
      finally { endOperation(cm); }
    };
  }

  // VIEW TRACKING

  // These objects are used to represent the visible (currently drawn)
  // part of the document. A LineView may correspond to multiple
  // logical lines, if those are connected by collapsed ranges.
  function LineView(doc, line, lineN) {
    // The starting line
    this.line = line;
    // Continuing lines, if any
    this.rest = visualLineContinued(line);
    // Number of logical lines in this visual line
    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
    this.node = this.text = null;
    this.hidden = lineIsHidden(doc, line);
  }

  // Create a range of LineView objects for the given lines.
  function buildViewArray(cm, from, to) {
    var array = [], nextPos;
    for (var pos = from; pos < to; pos = nextPos) {
      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
      nextPos = pos + view.size;
      array.push(view);
    }
    return array;
  }

  // Updates the display.view data structure for a given change to the
  // document. From and to are in pre-change coordinates. Lendiff is
  // the amount of lines added or subtracted by the change. This is
  // used for changes that span multiple lines, or change the way
  // lines are divided into visual lines. regLineChange (below)
  // registers single-line changes.
  function regChange(cm, from, to, lendiff) {
    if (from == null) from = cm.doc.first;
    if (to == null) to = cm.doc.first + cm.doc.size;
    if (!lendiff) lendiff = 0;

    var display = cm.display;
    if (lendiff && to < display.viewTo &&
        (display.updateLineNumbers == null || display.updateLineNumbers > from))
      display.updateLineNumbers = from;

    cm.curOp.viewChanged = true;

    if (from >= display.viewTo) { // Change after
      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo)
        resetView(cm);
    } else if (to <= display.viewFrom) { // Change before
      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
        resetView(cm);
      } else {
        display.viewFrom += lendiff;
        display.viewTo += lendiff;
      }
    } else if (from <= display.viewFrom && to >= display.viewTo) { // Full overlap
      resetView(cm);
    } else if (from <= display.viewFrom) { // Top overlap
      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cut) {
        display.view = display.view.slice(cut.index);
        display.viewFrom = cut.lineN;
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    } else if (to >= display.viewTo) { // Bottom overlap
      var cut = viewCuttingPoint(cm, from, from, -1);
      if (cut) {
        display.view = display.view.slice(0, cut.index);
        display.viewTo = cut.lineN;
      } else {
        resetView(cm);
      }
    } else { // Gap in the middle
      var cutTop = viewCuttingPoint(cm, from, from, -1);
      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cutTop && cutBot) {
        display.view = display.view.slice(0, cutTop.index)
          .concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN))
          .concat(display.view.slice(cutBot.index));
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    }

    var ext = display.externalMeasured;
    if (ext) {
      if (to < ext.lineN)
        ext.lineN += lendiff;
      else if (from < ext.lineN + ext.size)
        display.externalMeasured = null;
    }
  }

  // Register a change to a single line. Type must be one of "text",
  // "gutter", "class", "widget"
  function regLineChange(cm, line, type) {
    cm.curOp.viewChanged = true;
    var display = cm.display, ext = cm.display.externalMeasured;
    if (ext && line >= ext.lineN && line < ext.lineN + ext.size)
      display.externalMeasured = null;

    if (line < display.viewFrom || line >= display.viewTo) return;
    var lineView = display.view[findViewIndex(cm, line)];
    if (lineView.node == null) return;
    var arr = lineView.changes || (lineView.changes = []);
    if (indexOf(arr, type) == -1) arr.push(type);
  }

  // Clear the view.
  function resetView(cm) {
    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
    cm.display.view = [];
    cm.display.viewOffset = 0;
  }

  // Find the view element corresponding to a given line. Return null
  // when the line isn't visible.
  function findViewIndex(cm, n) {
    if (n >= cm.display.viewTo) return null;
    n -= cm.display.viewFrom;
    if (n < 0) return null;
    var view = cm.display.view;
    for (var i = 0; i < view.length; i++) {
      n -= view[i].size;
      if (n < 0) return i;
    }
  }

  function viewCuttingPoint(cm, oldN, newN, dir) {
    var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
    if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size)
      return {index: index, lineN: newN};
    for (var i = 0, n = cm.display.viewFrom; i < index; i++)
      n += view[i].size;
    if (n != oldN) {
      if (dir > 0) {
        if (index == view.length - 1) return null;
        diff = (n + view[index].size) - oldN;
        index++;
      } else {
        diff = n - oldN;
      }
      oldN += diff; newN += diff;
    }
    while (visualLineNo(cm.doc, newN) != newN) {
      if (index == (dir < 0 ? 0 : view.length - 1)) return null;
      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
      index += dir;
    }
    return {index: index, lineN: newN};
  }

  // Force the view to cover a given range, adding empty view element
  // or clipping off existing ones as needed.
  function adjustView(cm, from, to) {
    var display = cm.display, view = display.view;
    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
      display.view = buildViewArray(cm, from, to);
      display.viewFrom = from;
    } else {
      if (display.viewFrom > from)
        display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
      else if (display.viewFrom < from)
        display.view = display.view.slice(findViewIndex(cm, from));
      display.viewFrom = from;
      if (display.viewTo < to)
        display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
      else if (display.viewTo > to)
        display.view = display.view.slice(0, findViewIndex(cm, to));
    }
    display.viewTo = to;
  }

  // Count the number of lines in the view whose DOM representation is
  // out of date (or nonexistent).
  function countDirtyView(cm) {
    var view = cm.display.view, dirty = 0;
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (!lineView.hidden && (!lineView.node || lineView.changes)) ++dirty;
    }
    return dirty;
  }

  // EVENT HANDLERS

  // Attach the necessary event handlers when initializing the editor
  function registerEventHandlers(cm) {
    var d = cm.display;
    on(d.scroller, "mousedown", operation(cm, onMouseDown));
    // Older IE's will not fire a second mousedown for a double click
    if (ie && ie_version < 11)
      on(d.scroller, "dblclick", operation(cm, function(e) {
        if (signalDOMEvent(cm, e)) return;
        var pos = posFromMouse(cm, e);
        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) return;
        e_preventDefault(e);
        var word = cm.findWordAt(pos);
        extendSelection(cm.doc, word.anchor, word.head);
      }));
    else
      on(d.scroller, "dblclick", function(e) { signalDOMEvent(cm, e) || e_preventDefault(e); });
    // Some browsers fire contextmenu *after* opening the menu, at
    // which point we can't mess with it anymore. Context menu is
    // handled in onMouseDown for these browsers.
    if (!captureRightClick) on(d.scroller, "contextmenu", function(e) {onContextMenu(cm, e);});

    // Used to suppress mouse event handling when a touch happens
    var touchFinished, prevTouch = {end: 0};
    function finishTouch() {
      if (d.activeTouch) {
        touchFinished = setTimeout(function() {d.activeTouch = null;}, 1000);
        prevTouch = d.activeTouch;
        prevTouch.end = +new Date;
      }
    };
    function isMouseLikeTouchEvent(e) {
      if (e.touches.length != 1) return false;
      var touch = e.touches[0];
      return touch.radiusX <= 1 && touch.radiusY <= 1;
    }
    function farAway(touch, other) {
      if (other.left == null) return true;
      var dx = other.left - touch.left, dy = other.top - touch.top;
      return dx * dx + dy * dy > 20 * 20;
    }
    on(d.scroller, "touchstart", function(e) {
      if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e)) {
        clearTimeout(touchFinished);
        var now = +new Date;
        d.activeTouch = {start: now, moved: false,
                         prev: now - prevTouch.end <= 300 ? prevTouch : null};
        if (e.touches.length == 1) {
          d.activeTouch.left = e.touches[0].pageX;
          d.activeTouch.top = e.touches[0].pageY;
        }
      }
    });
    on(d.scroller, "touchmove", function() {
      if (d.activeTouch) d.activeTouch.moved = true;
    });
    on(d.scroller, "touchend", function(e) {
      var touch = d.activeTouch;
      if (touch && !eventInWidget(d, e) && touch.left != null &&
          !touch.moved && new Date - touch.start < 300) {
        var pos = cm.coordsChar(d.activeTouch, "page"), range;
        if (!touch.prev || farAway(touch, touch.prev)) // Single tap
          range = new Range(pos, pos);
        else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) // Double tap
          range = cm.findWordAt(pos);
        else // Triple tap
          range = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
        cm.setSelection(range.anchor, range.head);
        cm.focus();
        e_preventDefault(e);
      }
      finishTouch();
    });
    on(d.scroller, "touchcancel", finishTouch);

    // Sync scrolling between fake scrollbars and real scrollable
    // area, ensure viewport is updated when scrolling.
    on(d.scroller, "scroll", function() {
      if (d.scroller.clientHeight) {
        setScrollTop(cm, d.scroller.scrollTop);
        setScrollLeft(cm, d.scroller.scrollLeft, true);
        signal(cm, "scroll", cm);
      }
    });

    // Listen to wheel events in order to try and update the viewport on time.
    on(d.scroller, "mousewheel", function(e){onScrollWheel(cm, e);});
    on(d.scroller, "DOMMouseScroll", function(e){onScrollWheel(cm, e);});

    // Prevent wrapper from ever scrolling
    on(d.wrapper, "scroll", function() { d.wrapper.scrollTop = d.wrapper.scrollLeft = 0; });

    d.dragFunctions = {
      enter: function(e) {if (!signalDOMEvent(cm, e)) e_stop(e);},
      over: function(e) {if (!signalDOMEvent(cm, e)) { onDragOver(cm, e); e_stop(e); }},
      start: function(e){onDragStart(cm, e);},
      drop: operation(cm, onDrop),
      leave: function(e) {if (!signalDOMEvent(cm, e)) { clearDragCursor(cm); }}
    };

    var inp = d.input.getField();
    on(inp, "keyup", function(e) { onKeyUp.call(cm, e); });
    on(inp, "keydown", operation(cm, onKeyDown));
    on(inp, "keypress", operation(cm, onKeyPress));
    on(inp, "focus", bind(onFocus, cm));
    on(inp, "blur", bind(onBlur, cm));
  }

  function dragDropChanged(cm, value, old) {
    var wasOn = old && old != CodeMirror.Init;
    if (!value != !wasOn) {
      var funcs = cm.display.dragFunctions;
      var toggle = value ? on : off;
      toggle(cm.display.scroller, "dragstart", funcs.start);
      toggle(cm.display.scroller, "dragenter", funcs.enter);
      toggle(cm.display.scroller, "dragover", funcs.over);
      toggle(cm.display.scroller, "dragleave", funcs.leave);
      toggle(cm.display.scroller, "drop", funcs.drop);
    }
  }

  // Called when the window resizes
  function onResize(cm) {
    var d = cm.display;
    if (d.lastWrapHeight == d.wrapper.clientHeight && d.lastWrapWidth == d.wrapper.clientWidth)
      return;
    // Might be a text scaling operation, clear size caches.
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.scrollbarsClipped = false;
    cm.setSize();
  }

  // MOUSE EVENTS

  // Return true when the given mouse event happened in a widget
  function eventInWidget(display, e) {
    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
      if (!n || (n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true") ||
          (n.parentNode == display.sizer && n != display.mover))
        return true;
    }
  }

  // Given a mouse event, find the corresponding position. If liberal
  // is false, it checks whether a gutter or scrollbar was clicked,
  // and returns null if it was. forRect is used by rectangular
  // selections, and tries to estimate a character position even for
  // coordinates beyond the right of the text.
  function posFromMouse(cm, e, liberal, forRect) {
    var display = cm.display;
    if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") return null;

    var x, y, space = display.lineSpace.getBoundingClientRect();
    // Fails unpredictably on IE[67] when mouse is dragged around quickly.
    try { x = e.clientX - space.left; y = e.clientY - space.top; }
    catch (e) { return null; }
    var coords = coordsChar(cm, x, y), line;
    if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
      coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
    }
    return coords;
  }

  // A mouse down can be a single click, double click, triple click,
  // start of selection drag, start of text drag, new cursor
  // (ctrl-click), rectangle drag (alt-drag), or xwin
  // middle-click-paste. Or it might be a click on something we should
  // not interfere with, such as a scrollbar or widget.
  function onMouseDown(e) {
    var cm = this, display = cm.display;
    if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) return;
    display.shift = e.shiftKey;

    if (eventInWidget(display, e)) {
      if (!webkit) {
        // Briefly turn off draggability, to allow widgets to do
        // normal dragging things.
        display.scroller.draggable = false;
        setTimeout(function(){display.scroller.draggable = true;}, 100);
      }
      return;
    }
    if (clickInGutter(cm, e)) return;
    var start = posFromMouse(cm, e);
    window.focus();

    switch (e_button(e)) {
    case 1:
      // #3261: make sure, that we're not starting a second selection
      if (cm.state.selectingText)
        cm.state.selectingText(e);
      else if (start)
        leftButtonDown(cm, e, start);
      else if (e_target(e) == display.scroller)
        e_preventDefault(e);
      break;
    case 2:
      if (webkit) cm.state.lastMiddleDown = +new Date;
      if (start) extendSelection(cm.doc, start);
      setTimeout(function() {display.input.focus();}, 20);
      e_preventDefault(e);
      break;
    case 3:
      if (captureRightClick) onContextMenu(cm, e);
      else delayBlurEvent(cm);
      break;
    }
  }

  var lastClick, lastDoubleClick;
  function leftButtonDown(cm, e, start) {
    if (ie) setTimeout(bind(ensureFocus, cm), 0);
    else cm.curOp.focus = activeElt();

    var now = +new Date, type;
    if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
      type = "triple";
    } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
      type = "double";
      lastDoubleClick = {time: now, pos: start};
    } else {
      type = "single";
      lastClick = {time: now, pos: start};
    }

    var sel = cm.doc.sel, modifier = mac ? e.metaKey : e.ctrlKey, contained;
    if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() &&
        type == "single" && (contained = sel.contains(start)) > -1 &&
        (cmp((contained = sel.ranges[contained]).from(), start) < 0 || start.xRel > 0) &&
        (cmp(contained.to(), start) > 0 || start.xRel < 0))
      leftButtonStartDrag(cm, e, start, modifier);
    else
      leftButtonSelect(cm, e, start, type, modifier);
  }

  // Start a text drag. When it ends, see if any dragging actually
  // happen, and treat as a click if it didn't.
  function leftButtonStartDrag(cm, e, start, modifier) {
    var display = cm.display, startTime = +new Date;
    var dragEnd = operation(cm, function(e2) {
      if (webkit) display.scroller.draggable = false;
      cm.state.draggingText = false;
      off(document, "mouseup", dragEnd);
      off(display.scroller, "drop", dragEnd);
      if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
        e_preventDefault(e2);
        if (!modifier && +new Date - 200 < startTime)
          extendSelection(cm.doc, start);
        // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
        if (webkit || ie && ie_version == 9)
          setTimeout(function() {document.body.focus(); display.input.focus();}, 20);
        else
          display.input.focus();
      }
    });
    // Let the drag handler handle this.
    if (webkit) display.scroller.draggable = true;
    cm.state.draggingText = dragEnd;
    // IE's approach to draggable
    if (display.scroller.dragDrop) display.scroller.dragDrop();
    on(document, "mouseup", dragEnd);
    on(display.scroller, "drop", dragEnd);
  }

  // Normal selection, as opposed to text dragging.
  function leftButtonSelect(cm, e, start, type, addNew) {
    var display = cm.display, doc = cm.doc;
    e_preventDefault(e);

    var ourRange, ourIndex, startSel = doc.sel, ranges = startSel.ranges;
    if (addNew && !e.shiftKey) {
      ourIndex = doc.sel.contains(start);
      if (ourIndex > -1)
        ourRange = ranges[ourIndex];
      else
        ourRange = new Range(start, start);
    } else {
      ourRange = doc.sel.primary();
      ourIndex = doc.sel.primIndex;
    }

    if (e.altKey) {
      type = "rect";
      if (!addNew) ourRange = new Range(start, start);
      start = posFromMouse(cm, e, true, true);
      ourIndex = -1;
    } else if (type == "double") {
      var word = cm.findWordAt(start);
      if (cm.display.shift || doc.extend)
        ourRange = extendRange(doc, ourRange, word.anchor, word.head);
      else
        ourRange = word;
    } else if (type == "triple") {
      var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
      if (cm.display.shift || doc.extend)
        ourRange = extendRange(doc, ourRange, line.anchor, line.head);
      else
        ourRange = line;
    } else {
      ourRange = extendRange(doc, ourRange, start);
    }

    if (!addNew) {
      ourIndex = 0;
      setSelection(doc, new Selection([ourRange], 0), sel_mouse);
      startSel = doc.sel;
    } else if (ourIndex == -1) {
      ourIndex = ranges.length;
      setSelection(doc, normalizeSelection(ranges.concat([ourRange]), ourIndex),
                   {scroll: false, origin: "*mouse"});
    } else if (ranges.length > 1 && ranges[ourIndex].empty() && type == "single" && !e.shiftKey) {
      setSelection(doc, normalizeSelection(ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
                   {scroll: false, origin: "*mouse"});
      startSel = doc.sel;
    } else {
      replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
    }

    var lastPos = start;
    function extendTo(pos) {
      if (cmp(lastPos, pos) == 0) return;
      lastPos = pos;

      if (type == "rect") {
        var ranges = [], tabSize = cm.options.tabSize;
        var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
        var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
        var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
        for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line));
             line <= end; line++) {
          var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
          if (left == right)
            ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
          else if (text.length > leftPos)
            ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
        }
        if (!ranges.length) ranges.push(new Range(start, start));
        setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex),
                     {origin: "*mouse", scroll: false});
        cm.scrollIntoView(pos);
      } else {
        var oldRange = ourRange;
        var anchor = oldRange.anchor, head = pos;
        if (type != "single") {
          if (type == "double")
            var range = cm.findWordAt(pos);
          else
            var range = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
          if (cmp(range.anchor, anchor) > 0) {
            head = range.head;
            anchor = minPos(oldRange.from(), range.anchor);
          } else {
            head = range.anchor;
            anchor = maxPos(oldRange.to(), range.head);
          }
        }
        var ranges = startSel.ranges.slice(0);
        ranges[ourIndex] = new Range(clipPos(doc, anchor), head);
        setSelection(doc, normalizeSelection(ranges, ourIndex), sel_mouse);
      }
    }

    var editorSize = display.wrapper.getBoundingClientRect();
    // Used to ensure timeout re-tries don't fire when another extend
    // happened in the meantime (clearTimeout isn't reliable -- at
    // least on Chrome, the timeouts still happen even when cleared,
    // if the clear happens after their scheduled firing time).
    var counter = 0;

    function extend(e) {
      var curCount = ++counter;
      var cur = posFromMouse(cm, e, true, type == "rect");
      if (!cur) return;
      if (cmp(cur, lastPos) != 0) {
        cm.curOp.focus = activeElt();
        extendTo(cur);
        var visible = visibleLines(display, doc);
        if (cur.line >= visible.to || cur.line < visible.from)
          setTimeout(operation(cm, function(){if (counter == curCount) extend(e);}), 150);
      } else {
        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
        if (outside) setTimeout(operation(cm, function() {
          if (counter != curCount) return;
          display.scroller.scrollTop += outside;
          extend(e);
        }), 50);
      }
    }

    function done(e) {
      cm.state.selectingText = false;
      counter = Infinity;
      e_preventDefault(e);
      display.input.focus();
      off(document, "mousemove", move);
      off(document, "mouseup", up);
      doc.history.lastSelOrigin = null;
    }

    var move = operation(cm, function(e) {
      if (!e_button(e)) done(e);
      else extend(e);
    });
    var up = operation(cm, done);
    cm.state.selectingText = up;
    on(document, "mousemove", move);
    on(document, "mouseup", up);
  }

  // Determines whether an event happened in the gutter, and fires the
  // handlers for the corresponding event.
  function gutterEvent(cm, e, type, prevent) {
    try { var mX = e.clientX, mY = e.clientY; }
    catch(e) { return false; }
    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) return false;
    if (prevent) e_preventDefault(e);

    var display = cm.display;
    var lineBox = display.lineDiv.getBoundingClientRect();

    if (mY > lineBox.bottom || !hasHandler(cm, type)) return e_defaultPrevented(e);
    mY -= lineBox.top - display.viewOffset;

    for (var i = 0; i < cm.options.gutters.length; ++i) {
      var g = display.gutters.childNodes[i];
      if (g && g.getBoundingClientRect().right >= mX) {
        var line = lineAtHeight(cm.doc, mY);
        var gutter = cm.options.gutters[i];
        signal(cm, type, cm, line, gutter, e);
        return e_defaultPrevented(e);
      }
    }
  }

  function clickInGutter(cm, e) {
    return gutterEvent(cm, e, "gutterClick", true);
  }

  // Kludge to work around strange IE behavior where it'll sometimes
  // re-fire a series of drag-related events right after the drop (#1551)
  var lastDrop = 0;

  function onDrop(e) {
    var cm = this;
    clearDragCursor(cm);
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
      return;
    e_preventDefault(e);
    if (ie) lastDrop = +new Date;
    var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
    if (!pos || cm.isReadOnly()) return;
    // Might be a file drop, in which case we simply extract the text
    // and insert it.
    if (files && files.length && window.FileReader && window.File) {
      var n = files.length, text = Array(n), read = 0;
      var loadFile = function(file, i) {
        if (cm.options.allowDropFileTypes &&
            indexOf(cm.options.allowDropFileTypes, file.type) == -1)
          return;

        var reader = new FileReader;
        reader.onload = operation(cm, function() {
          var content = reader.result;
          if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) content = "";
          text[i] = content;
          if (++read == n) {
            pos = clipPos(cm.doc, pos);
            var change = {from: pos, to: pos,
                          text: cm.doc.splitLines(text.join(cm.doc.lineSeparator())),
                          origin: "paste"};
            makeChange(cm.doc, change);
            setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
          }
        });
        reader.readAsText(file);
      };
      for (var i = 0; i < n; ++i) loadFile(files[i], i);
    } else { // Normal drop
      // Don't do a replace if the drop happened inside of the selected text.
      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
        cm.state.draggingText(e);
        // Ensure the editor is re-focused
        setTimeout(function() {cm.display.input.focus();}, 20);
        return;
      }
      try {
        var text = e.dataTransfer.getData("Text");
        if (text) {
          if (cm.state.draggingText && !(mac ? e.altKey : e.ctrlKey))
            var selected = cm.listSelections();
          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
          if (selected) for (var i = 0; i < selected.length; ++i)
            replaceRange(cm.doc, "", selected[i].anchor, selected[i].head, "drag");
          cm.replaceSelection(text, "around", "paste");
          cm.display.input.focus();
        }
      }
      catch(e){}
    }
  }

  function onDragStart(cm, e) {
    if (ie && (!cm.state.draggingText || +new Date - lastDrop < 100)) { e_stop(e); return; }
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) return;

    e.dataTransfer.setData("Text", cm.getSelection());

    // Use dummy image instead of default browsers image.
    // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
    if (e.dataTransfer.setDragImage && !safari) {
      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (presto) {
        img.width = img.height = 1;
        cm.display.wrapper.appendChild(img);
        // Force a relayout, or Opera won't use our image for some obscure reason
        img._top = img.offsetTop;
      }
      e.dataTransfer.setDragImage(img, 0, 0);
      if (presto) img.parentNode.removeChild(img);
    }
  }

  function onDragOver(cm, e) {
    var pos = posFromMouse(cm, e);
    if (!pos) return;
    var frag = document.createDocumentFragment();
    drawSelectionCursor(cm, pos, frag);
    if (!cm.display.dragCursor) {
      cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
      cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
    }
    removeChildrenAndAdd(cm.display.dragCursor, frag);
  }

  function clearDragCursor(cm) {
    if (cm.display.dragCursor) {
      cm.display.lineSpace.removeChild(cm.display.dragCursor);
      cm.display.dragCursor = null;
    }
  }

  // SCROLL EVENTS

  // Sync the scrollable area and scrollbars, ensure the viewport
  // covers the visible area.
  function setScrollTop(cm, val) {
    if (Math.abs(cm.doc.scrollTop - val) < 2) return;
    cm.doc.scrollTop = val;
    if (!gecko) updateDisplaySimple(cm, {top: val});
    if (cm.display.scroller.scrollTop != val) cm.display.scroller.scrollTop = val;
    cm.display.scrollbars.setScrollTop(val);
    if (gecko) updateDisplaySimple(cm);
    startWorker(cm, 100);
  }
  // Sync scroller and scrollbar, ensure the gutter elements are
  // aligned.
  function setScrollLeft(cm, val, isScroller) {
    if (isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) return;
    val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
    cm.doc.scrollLeft = val;
    alignHorizontally(cm);
    if (cm.display.scroller.scrollLeft != val) cm.display.scroller.scrollLeft = val;
    cm.display.scrollbars.setScrollLeft(val);
  }

  // Since the delta values reported on mouse wheel events are
  // unstandardized between browsers and even browser versions, and
  // generally horribly unpredictable, this code starts by measuring
  // the scroll effect that the first few mouse wheel events have,
  // and, from that, detects the way it can convert deltas to pixel
  // offsets afterwards.
  //
  // The reason we want to know the amount a wheel event will scroll
  // is that it gives us a chance to update the display before the
  // actual scrolling happens, reducing flickering.

  var wheelSamples = 0, wheelPixelsPerUnit = null;
  // Fill in a browser-detected starting value on browsers where we
  // know one. These don't have to be accurate -- the result of them
  // being wrong would just be a slight flicker on the first wheel
  // scroll (if it is large enough).
  if (ie) wheelPixelsPerUnit = -.53;
  else if (gecko) wheelPixelsPerUnit = 15;
  else if (chrome) wheelPixelsPerUnit = -.7;
  else if (safari) wheelPixelsPerUnit = -1/3;

  var wheelEventDelta = function(e) {
    var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) dx = e.detail;
    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) dy = e.detail;
    else if (dy == null) dy = e.wheelDelta;
    return {x: dx, y: dy};
  };
  CodeMirror.wheelEventPixels = function(e) {
    var delta = wheelEventDelta(e);
    delta.x *= wheelPixelsPerUnit;
    delta.y *= wheelPixelsPerUnit;
    return delta;
  };

  function onScrollWheel(cm, e) {
    var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;

    var display = cm.display, scroll = display.scroller;
    // Quit if there's nothing to scroll here
    var canScrollX = scroll.scrollWidth > scroll.clientWidth;
    var canScrollY = scroll.scrollHeight > scroll.clientHeight;
    if (!(dx && canScrollX || dy && canScrollY)) return;

    // Webkit browsers on OS X abort momentum scrolls when the target
    // of the scroll event is removed from the scrollable element.
    // This hack (see related code in patchDisplay) makes sure the
    // element is kept around.
    if (dy && mac && webkit) {
      outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
        for (var i = 0; i < view.length; i++) {
          if (view[i].node == cur) {
            cm.display.currentWheelTarget = cur;
            break outer;
          }
        }
      }
    }

    // On some browsers, horizontal scrolling will cause redraws to
    // happen before the gutter has been realigned, causing it to
    // wriggle around in a most unseemly way. When we have an
    // estimated pixels/delta value, we just handle horizontal
    // scrolling entirely here. It'll be slightly off from native, but
    // better than glitching out.
    if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
      if (dy && canScrollY)
        setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight)));
      setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth)));
      // Only prevent default scrolling if vertical scrolling is
      // actually possible. Otherwise, it causes vertical scroll
      // jitter on OSX trackpads when deltaX is small and deltaY
      // is large (issue #3579)
      if (!dy || (dy && canScrollY))
        e_preventDefault(e);
      display.wheelStartX = null; // Abort measurement, if in progress
      return;
    }

    // 'Project' the visible viewport to cover the area that is being
    // scrolled into view (if we know enough to estimate it).
    if (dy && wheelPixelsPerUnit != null) {
      var pixels = dy * wheelPixelsPerUnit;
      var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
      if (pixels < 0) top = Math.max(0, top + pixels - 50);
      else bot = Math.min(cm.doc.height, bot + pixels + 50);
      updateDisplaySimple(cm, {top: top, bottom: bot});
    }

    if (wheelSamples < 20) {
      if (display.wheelStartX == null) {
        display.wheelStartX = scroll.scrollLeft; display.wheelStartY = scroll.scrollTop;
        display.wheelDX = dx; display.wheelDY = dy;
        setTimeout(function() {
          if (display.wheelStartX == null) return;
          var movedX = scroll.scrollLeft - display.wheelStartX;
          var movedY = scroll.scrollTop - display.wheelStartY;
          var sample = (movedY && display.wheelDY && movedY / display.wheelDY) ||
            (movedX && display.wheelDX && movedX / display.wheelDX);
          display.wheelStartX = display.wheelStartY = null;
          if (!sample) return;
          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
          ++wheelSamples;
        }, 200);
      } else {
        display.wheelDX += dx; display.wheelDY += dy;
      }
    }
  }

  // KEY EVENTS

  // Run a handler that was bound to a key.
  function doHandleBinding(cm, bound, dropShift) {
    if (typeof bound == "string") {
      bound = commands[bound];
      if (!bound) return false;
    }
    // Ensure previous input has been read, so that the handler sees a
    // consistent view of the document
    cm.display.input.ensurePolled();
    var prevShift = cm.display.shift, done = false;
    try {
      if (cm.isReadOnly()) cm.state.suppressEdits = true;
      if (dropShift) cm.display.shift = false;
      done = bound(cm) != Pass;
    } finally {
      cm.display.shift = prevShift;
      cm.state.suppressEdits = false;
    }
    return done;
  }

  function lookupKeyForEditor(cm, name, handle) {
    for (var i = 0; i < cm.state.keyMaps.length; i++) {
      var result = lookupKey(name, cm.state.keyMaps[i], handle, cm);
      if (result) return result;
    }
    return (cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm))
      || lookupKey(name, cm.options.keyMap, handle, cm);
  }

  var stopSeq = new Delayed;
  function dispatchKey(cm, name, e, handle) {
    var seq = cm.state.keySeq;
    if (seq) {
      if (isModifierKey(name)) return "handled";
      stopSeq.set(50, function() {
        if (cm.state.keySeq == seq) {
          cm.state.keySeq = null;
          cm.display.input.reset();
        }
      });
      name = seq + " " + name;
    }
    var result = lookupKeyForEditor(cm, name, handle);

    if (result == "multi")
      cm.state.keySeq = name;
    if (result == "handled")
      signalLater(cm, "keyHandled", cm, name, e);

    if (result == "handled" || result == "multi") {
      e_preventDefault(e);
      restartBlink(cm);
    }

    if (seq && !result && /\'$/.test(name)) {
      e_preventDefault(e);
      return true;
    }
    return !!result;
  }

  // Handle a key from the keydown event.
  function handleKeyBinding(cm, e) {
    var name = keyName(e, true);
    if (!name) return false;

    if (e.shiftKey && !cm.state.keySeq) {
      // First try to resolve full name (including 'Shift-'). Failing
      // that, see if there is a cursor-motion command (starting with
      // 'go') bound to the keyname without 'Shift-'.
      return dispatchKey(cm, "Shift-" + name, e, function(b) {return doHandleBinding(cm, b, true);})
          || dispatchKey(cm, name, e, function(b) {
               if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion)
                 return doHandleBinding(cm, b);
             });
    } else {
      return dispatchKey(cm, name, e, function(b) { return doHandleBinding(cm, b); });
    }
  }

  // Handle a key from the keypress event
  function handleCharBinding(cm, e, ch) {
    return dispatchKey(cm, "'" + ch + "'", e,
                       function(b) { return doHandleBinding(cm, b, true); });
  }

  var lastStoppedKey = null;
  function onKeyDown(e) {
    var cm = this;
    cm.curOp.focus = activeElt();
    if (signalDOMEvent(cm, e)) return;
    // IE does strange things with escape.
    if (ie && ie_version < 11 && e.keyCode == 27) e.returnValue = false;
    var code = e.keyCode;
    cm.display.shift = code == 16 || e.shiftKey;
    var handled = handleKeyBinding(cm, e);
    if (presto) {
      lastStoppedKey = handled ? code : null;
      // Opera has no cut event... we try to at least catch the key combo
      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey))
        cm.replaceSelection("", null, "cut");
    }

    // Turn mouse into crosshair when Alt is held on Mac.
    if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className))
      showCrossHair(cm);
  }

  function showCrossHair(cm) {
    var lineDiv = cm.display.lineDiv;
    addClass(lineDiv, "CodeMirror-crosshair");

    function up(e) {
      if (e.keyCode == 18 || !e.altKey) {
        rmClass(lineDiv, "CodeMirror-crosshair");
        off(document, "keyup", up);
        off(document, "mouseover", up);
      }
    }
    on(document, "keyup", up);
    on(document, "mouseover", up);
  }

  function onKeyUp(e) {
    if (e.keyCode == 16) this.doc.sel.shift = false;
    signalDOMEvent(this, e);
  }

  function onKeyPress(e) {
    var cm = this;
    if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) return;
    var keyCode = e.keyCode, charCode = e.charCode;
    if (presto && keyCode == lastStoppedKey) {lastStoppedKey = null; e_preventDefault(e); return;}
    if ((presto && (!e.which || e.which < 10)) && handleKeyBinding(cm, e)) return;
    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
    if (handleCharBinding(cm, e, ch)) return;
    cm.display.input.onKeyPress(e);
  }

  // FOCUS/BLUR EVENTS

  function delayBlurEvent(cm) {
    cm.state.delayingBlurEvent = true;
    setTimeout(function() {
      if (cm.state.delayingBlurEvent) {
        cm.state.delayingBlurEvent = false;
        onBlur(cm);
      }
    }, 100);
  }

  function onFocus(cm) {
    if (cm.state.delayingBlurEvent) cm.state.delayingBlurEvent = false;

    if (cm.options.readOnly == "nocursor") return;
    if (!cm.state.focused) {
      signal(cm, "focus", cm);
      cm.state.focused = true;
      addClass(cm.display.wrapper, "CodeMirror-focused");
      // This test prevents this from firing when a context
      // menu is closed (since the input reset would kill the
      // select-all detection hack)
      if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
        cm.display.input.reset();
        if (webkit) setTimeout(function() { cm.display.input.reset(true); }, 20); // Issue #1730
      }
      cm.display.input.receivedFocus();
    }
    restartBlink(cm);
  }
  function onBlur(cm) {
    if (cm.state.delayingBlurEvent) return;

    if (cm.state.focused) {
      signal(cm, "blur", cm);
      cm.state.focused = false;
      rmClass(cm.display.wrapper, "CodeMirror-focused");
    }
    clearInterval(cm.display.blinker);
    setTimeout(function() {if (!cm.state.focused) cm.display.shift = false;}, 150);
  }

  // CONTEXT MENU HANDLING

  // To make the context menu work, we need to briefly unhide the
  // textarea (making it as unobtrusive as possible) to let the
  // right-click take effect on it.
  function onContextMenu(cm, e) {
    if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) return;
    if (signalDOMEvent(cm, e, "contextmenu")) return;
    cm.display.input.onContextMenu(e);
  }

  function contextMenuInGutter(cm, e) {
    if (!hasHandler(cm, "gutterContextMenu")) return false;
    return gutterEvent(cm, e, "gutterContextMenu", false);
  }

  // UPDATING

  // Compute the position of the end of a change (its 'to' property
  // refers to the pre-change end).
  var changeEnd = CodeMirror.changeEnd = function(change) {
    if (!change.text) return change.to;
    return Pos(change.from.line + change.text.length - 1,
               lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
  };

  // Adjust a position to refer to the post-change position of the
  // same text, or the end of the change if the change covers it.
  function adjustForChange(pos, change) {
    if (cmp(pos, change.from) < 0) return pos;
    if (cmp(pos, change.to) <= 0) return changeEnd(change);

    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
    if (pos.line == change.to.line) ch += changeEnd(change).ch - change.to.ch;
    return Pos(line, ch);
  }

  function computeSelAfterChange(doc, change) {
    var out = [];
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      var range = doc.sel.ranges[i];
      out.push(new Range(adjustForChange(range.anchor, change),
                         adjustForChange(range.head, change)));
    }
    return normalizeSelection(out, doc.sel.primIndex);
  }

  function offsetPos(pos, old, nw) {
    if (pos.line == old.line)
      return Pos(nw.line, pos.ch - old.ch + nw.ch);
    else
      return Pos(nw.line + (pos.line - old.line), pos.ch);
  }

  // Used by replaceSelections to allow moving the selection to the
  // start or around the replaced test. Hint may be "start" or "around".
  function computeReplacedSel(doc, changes, hint) {
    var out = [];
    var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      var from = offsetPos(change.from, oldPrev, newPrev);
      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
      oldPrev = change.to;
      newPrev = to;
      if (hint == "around") {
        var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
        out[i] = new Range(inv ? to : from, inv ? from : to);
      } else {
        out[i] = new Range(from, from);
      }
    }
    return new Selection(out, doc.sel.primIndex);
  }

  // Allow "beforeChange" event handlers to influence a change
  function filterChange(doc, change, update) {
    var obj = {
      canceled: false,
      from: change.from,
      to: change.to,
      text: change.text,
      origin: change.origin,
      cancel: function() { this.canceled = true; }
    };
    if (update) obj.update = function(from, to, text, origin) {
      if (from) this.from = clipPos(doc, from);
      if (to) this.to = clipPos(doc, to);
      if (text) this.text = text;
      if (origin !== undefined) this.origin = origin;
    };
    signal(doc, "beforeChange", doc, obj);
    if (doc.cm) signal(doc.cm, "beforeChange", doc.cm, obj);

    if (obj.canceled) return null;
    return {from: obj.from, to: obj.to, text: obj.text, origin: obj.origin};
  }

  // Apply a change to a document, and add it to the document's
  // history, and propagating it to all linked documents.
  function makeChange(doc, change, ignoreReadOnly) {
    if (doc.cm) {
      if (!doc.cm.curOp) return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
      if (doc.cm.state.suppressEdits) return;
    }

    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
      change = filterChange(doc, change, true);
      if (!change) return;
    }

    // Possibly split or suppress the update based on the presence
    // of read-only spans in its range.
    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
    if (split) {
      for (var i = split.length - 1; i >= 0; --i)
        makeChangeInner(doc, {from: split[i].from, to: split[i].to, text: i ? [""] : change.text});
    } else {
      makeChangeInner(doc, change);
    }
  }

  function makeChangeInner(doc, change) {
    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) return;
    var selAfter = computeSelAfterChange(doc, change);
    addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);

    makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
    var rebased = [];

    linkedDocs(doc, function(doc, sharedHist) {
      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
        rebaseHist(doc.history, change);
        rebased.push(doc.history);
      }
      makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
    });
  }

  // Revert a change stored in a document's history.
  function makeChangeFromHistory(doc, type, allowSelectionOnly) {
    if (doc.cm && doc.cm.state.suppressEdits) return;

    var hist = doc.history, event, selAfter = doc.sel;
    var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;

    // Verify that there is a useable event (so that ctrl-z won't
    // needlessly clear selection events)
    for (var i = 0; i < source.length; i++) {
      event = source[i];
      if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges)
        break;
    }
    if (i == source.length) return;
    hist.lastOrigin = hist.lastSelOrigin = null;

    for (;;) {
      event = source.pop();
      if (event.ranges) {
        pushSelectionToHistory(event, dest);
        if (allowSelectionOnly && !event.equals(doc.sel)) {
          setSelection(doc, event, {clearRedo: false});
          return;
        }
        selAfter = event;
      }
      else break;
    }

    // Build up a reverse change object to add to the opposite history
    // stack (redo when undoing, and vice versa).
    var antiChanges = [];
    pushSelectionToHistory(selAfter, dest);
    dest.push({changes: antiChanges, generation: hist.generation});
    hist.generation = event.generation || ++hist.maxGeneration;

    var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");

    for (var i = event.changes.length - 1; i >= 0; --i) {
      var change = event.changes[i];
      change.origin = type;
      if (filter && !filterChange(doc, change, false)) {
        source.length = 0;
        return;
      }

      antiChanges.push(historyChangeFromChange(doc, change));

      var after = i ? computeSelAfterChange(doc, change) : lst(source);
      makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
      if (!i && doc.cm) doc.cm.scrollIntoView({from: change.from, to: changeEnd(change)});
      var rebased = [];

      // Propagate to the linked documents
      linkedDocs(doc, function(doc, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc.history) == -1) {
          rebaseHist(doc.history, change);
          rebased.push(doc.history);
        }
        makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
      });
    }
  }

  // Sub-views need their line numbers shifted when text is added
  // above or below them in the parent document.
  function shiftDoc(doc, distance) {
    if (distance == 0) return;
    doc.first += distance;
    doc.sel = new Selection(map(doc.sel.ranges, function(range) {
      return new Range(Pos(range.anchor.line + distance, range.anchor.ch),
                       Pos(range.head.line + distance, range.head.ch));
    }), doc.sel.primIndex);
    if (doc.cm) {
      regChange(doc.cm, doc.first, doc.first - distance, distance);
      for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++)
        regLineChange(doc.cm, l, "gutter");
    }
  }

  // More lower-level change function, handling only a single document
  // (not linked ones).
  function makeChangeSingleDoc(doc, change, selAfter, spans) {
    if (doc.cm && !doc.cm.curOp)
      return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);

    if (change.to.line < doc.first) {
      shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
      return;
    }
    if (change.from.line > doc.lastLine()) return;

    // Clip the change to the size of this doc
    if (change.from.line < doc.first) {
      var shift = change.text.length - 1 - (doc.first - change.from.line);
      shiftDoc(doc, shift);
      change = {from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
                text: [lst(change.text)], origin: change.origin};
    }
    var last = doc.lastLine();
    if (change.to.line > last) {
      change = {from: change.from, to: Pos(last, getLine(doc, last).text.length),
                text: [change.text[0]], origin: change.origin};
    }

    change.removed = getBetween(doc, change.from, change.to);

    if (!selAfter) selAfter = computeSelAfterChange(doc, change);
    if (doc.cm) makeChangeSingleDocInEditor(doc.cm, change, spans);
    else updateDoc(doc, change, spans);
    setSelectionNoUndo(doc, selAfter, sel_dontScroll);
  }

  // Handle the interaction of a change to a document with the editor
  // that this document is part of.
  function makeChangeSingleDocInEditor(cm, change, spans) {
    var doc = cm.doc, display = cm.display, from = change.from, to = change.to;

    var recomputeMaxLength = false, checkWidthStart = from.line;
    if (!cm.options.lineWrapping) {
      checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
      doc.iter(checkWidthStart, to.line + 1, function(line) {
        if (line == display.maxLine) {
          recomputeMaxLength = true;
          return true;
        }
      });
    }

    if (doc.sel.contains(change.from, change.to) > -1)
      signalCursorActivity(cm);

    updateDoc(doc, change, spans, estimateHeight(cm));

    if (!cm.options.lineWrapping) {
      doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
        var len = lineLength(line);
        if (len > display.maxLineLength) {
          display.maxLine = line;
          display.maxLineLength = len;
          display.maxLineChanged = true;
          recomputeMaxLength = false;
        }
      });
      if (recomputeMaxLength) cm.curOp.updateMaxLine = true;
    }

    // Adjust frontier, schedule worker
    doc.frontier = Math.min(doc.frontier, from.line);
    startWorker(cm, 400);

    var lendiff = change.text.length - (to.line - from.line) - 1;
    // Remember that these lines changed, for updating the display
    if (change.full)
      regChange(cm);
    else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change))
      regLineChange(cm, from.line, "text");
    else
      regChange(cm, from.line, to.line + 1, lendiff);

    var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
    if (changeHandler || changesHandler) {
      var obj = {
        from: from, to: to,
        text: change.text,
        removed: change.removed,
        origin: change.origin
      };
      if (changeHandler) signalLater(cm, "change", cm, obj);
      if (changesHandler) (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
    }
    cm.display.selForContextMenu = null;
  }

  function replaceRange(doc, code, from, to, origin) {
    if (!to) to = from;
    if (cmp(to, from) < 0) { var tmp = to; to = from; from = tmp; }
    if (typeof code == "string") code = doc.splitLines(code);
    makeChange(doc, {from: from, to: to, text: code, origin: origin});
  }

  // SCROLLING THINGS INTO VIEW

  // If an editor sits on the top or bottom of the window, partially
  // scrolled out of view, this ensures that the cursor is visible.
  function maybeScrollWindow(cm, coords) {
    if (signalDOMEvent(cm, "scrollCursorIntoView")) return;

    var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
    if (coords.top + box.top < 0) doScroll = true;
    else if (coords.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) doScroll = false;
    if (doScroll != null && !phantom) {
      var scrollNode = elt("div", "\u200b", null, "position: absolute; top: " +
                           (coords.top - display.viewOffset - paddingTop(cm.display)) + "px; height: " +
                           (coords.bottom - coords.top + scrollGap(cm) + display.barHeight) + "px; left: " +
                           coords.left + "px; width: 2px;");
      cm.display.lineSpace.appendChild(scrollNode);
      scrollNode.scrollIntoView(doScroll);
      cm.display.lineSpace.removeChild(scrollNode);
    }
  }

  // Scroll a given position into view (immediately), verifying that
  // it actually became visible (as line heights are accurately
  // measured, the position of something may 'drift' during drawing).
  function scrollPosIntoView(cm, pos, end, margin) {
    if (margin == null) margin = 0;
    for (var limit = 0; limit < 5; limit++) {
      var changed = false, coords = cursorCoords(cm, pos);
      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
      var scrollPos = calculateScrollPos(cm, Math.min(coords.left, endCoords.left),
                                         Math.min(coords.top, endCoords.top) - margin,
                                         Math.max(coords.left, endCoords.left),
                                         Math.max(coords.bottom, endCoords.bottom) + margin);
      var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
      if (scrollPos.scrollTop != null) {
        setScrollTop(cm, scrollPos.scrollTop);
        if (Math.abs(cm.doc.scrollTop - startTop) > 1) changed = true;
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) changed = true;
      }
      if (!changed) break;
    }
    return coords;
  }

  // Scroll a given set of coordinates into view (immediately).
  function scrollIntoView(cm, x1, y1, x2, y2) {
    var scrollPos = calculateScrollPos(cm, x1, y1, x2, y2);
    if (scrollPos.scrollTop != null) setScrollTop(cm, scrollPos.scrollTop);
    if (scrollPos.scrollLeft != null) setScrollLeft(cm, scrollPos.scrollLeft);
  }

  // Calculate a new scroll position needed to scroll the given
  // rectangle into view. Returns an object with scrollTop and
  // scrollLeft properties. When these are undefined, the
  // vertical/horizontal position does not need to be adjusted.
  function calculateScrollPos(cm, x1, y1, x2, y2) {
    var display = cm.display, snapMargin = textHeight(cm.display);
    if (y1 < 0) y1 = 0;
    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
    var screen = displayHeight(cm), result = {};
    if (y2 - y1 > screen) y2 = y1 + screen;
    var docBottom = cm.doc.height + paddingVert(display);
    var atTop = y1 < snapMargin, atBottom = y2 > docBottom - snapMargin;
    if (y1 < screentop) {
      result.scrollTop = atTop ? 0 : y1;
    } else if (y2 > screentop + screen) {
      var newTop = Math.min(y1, (atBottom ? docBottom : y2) - screen);
      if (newTop != screentop) result.scrollTop = newTop;
    }

    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
    var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
    var tooWide = x2 - x1 > screenw;
    if (tooWide) x2 = x1 + screenw;
    if (x1 < 10)
      result.scrollLeft = 0;
    else if (x1 < screenleft)
      result.scrollLeft = Math.max(0, x1 - (tooWide ? 0 : 10));
    else if (x2 > screenw + screenleft - 3)
      result.scrollLeft = x2 + (tooWide ? 0 : 10) - screenw;
    return result;
  }

  // Store a relative adjustment to the scroll position in the current
  // operation (to be applied when the operation finishes).
  function addToScrollPos(cm, left, top) {
    if (left != null || top != null) resolveScrollToPos(cm);
    if (left != null)
      cm.curOp.scrollLeft = (cm.curOp.scrollLeft == null ? cm.doc.scrollLeft : cm.curOp.scrollLeft) + left;
    if (top != null)
      cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
  }

  // Make sure that at the end of the operation the current cursor is
  // shown.
  function ensureCursorVisible(cm) {
    resolveScrollToPos(cm);
    var cur = cm.getCursor(), from = cur, to = cur;
    if (!cm.options.lineWrapping) {
      from = cur.ch ? Pos(cur.line, cur.ch - 1) : cur;
      to = Pos(cur.line, cur.ch + 1);
    }
    cm.curOp.scrollToPos = {from: from, to: to, margin: cm.options.cursorScrollMargin, isCursor: true};
  }

  // When an operation has its scrollToPos property set, and another
  // scroll action is applied before the end of the operation, this
  // 'simulates' scrolling that position into view in a cheap way, so
  // that the effect of intermediate scroll commands is not ignored.
  function resolveScrollToPos(cm) {
    var range = cm.curOp.scrollToPos;
    if (range) {
      cm.curOp.scrollToPos = null;
      var from = estimateCoords(cm, range.from), to = estimateCoords(cm, range.to);
      var sPos = calculateScrollPos(cm, Math.min(from.left, to.left),
                                    Math.min(from.top, to.top) - range.margin,
                                    Math.max(from.right, to.right),
                                    Math.max(from.bottom, to.bottom) + range.margin);
      cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
    }
  }

  // API UTILITIES

  // Indent the given line. The how parameter can be "smart",
  // "add"/null, "subtract", or "prev". When aggressive is false
  // (typically set to true for forced single-line indents), empty
  // lines are not indented, and places where the mode returns Pass
  // are left alone.
  function indentLine(cm, n, how, aggressive) {
    var doc = cm.doc, state;
    if (how == null) how = "add";
    if (how == "smart") {
      // Fall back to "prev" when the mode doesn't have an indentation
      // method.
      if (!doc.mode.indent) how = "prev";
      else state = getStateBefore(cm, n);
    }

    var tabSize = cm.options.tabSize;
    var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
    if (line.stateAfter) line.stateAfter = null;
    var curSpaceString = line.text.match(/^\s*/)[0], indentation;
    if (!aggressive && !/\S/.test(line.text)) {
      indentation = 0;
      how = "not";
    } else if (how == "smart") {
      indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      if (indentation == Pass || indentation > 150) {
        if (!aggressive) return;
        how = "prev";
      }
    }
    if (how == "prev") {
      if (n > doc.first) indentation = countColumn(getLine(doc, n-1).text, null, tabSize);
      else indentation = 0;
    } else if (how == "add") {
      indentation = curSpace + cm.options.indentUnit;
    } else if (how == "subtract") {
      indentation = curSpace - cm.options.indentUnit;
    } else if (typeof how == "number") {
      indentation = curSpace + how;
    }
    indentation = Math.max(0, indentation);

    var indentString = "", pos = 0;
    if (cm.options.indentWithTabs)
      for (var i = Math.floor(indentation / tabSize); i; --i) {pos += tabSize; indentString += "\t";}
    if (pos < indentation) indentString += spaceStr(indentation - pos);

    if (indentString != curSpaceString) {
      replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
      line.stateAfter = null;
      return true;
    } else {
      // Ensure that, if the cursor was in the whitespace at the start
      // of the line, it is moved to the end of that space.
      for (var i = 0; i < doc.sel.ranges.length; i++) {
        var range = doc.sel.ranges[i];
        if (range.head.line == n && range.head.ch < curSpaceString.length) {
          var pos = Pos(n, curSpaceString.length);
          replaceOneSelection(doc, i, new Range(pos, pos));
          break;
        }
      }
    }
  }

  // Utility for applying a change to a line by handle or number,
  // returning the number and optionally registering the line as
  // changed.
  function changeLine(doc, handle, changeType, op) {
    var no = handle, line = handle;
    if (typeof handle == "number") line = getLine(doc, clipLine(doc, handle));
    else no = lineNo(handle);
    if (no == null) return null;
    if (op(line, no) && doc.cm) regLineChange(doc.cm, no, changeType);
    return line;
  }

  // Helper for deleting text near the selection(s), used to implement
  // backspace, delete, and similar functionality.
  function deleteNearSelection(cm, compute) {
    var ranges = cm.doc.sel.ranges, kill = [];
    // Build up a set of ranges to kill first, merging overlapping
    // ranges.
    for (var i = 0; i < ranges.length; i++) {
      var toKill = compute(ranges[i]);
      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
        var replaced = kill.pop();
        if (cmp(replaced.from, toKill.from) < 0) {
          toKill.from = replaced.from;
          break;
        }
      }
      kill.push(toKill);
    }
    // Next, remove those actual ranges.
    runInOp(cm, function() {
      for (var i = kill.length - 1; i >= 0; i--)
        replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
      ensureCursorVisible(cm);
    });
  }

  // Used for horizontal relative motion. Dir is -1 or 1 (left or
  // right), unit can be "char", "column" (like char, but doesn't
  // cross line boundaries), "word" (across next word), or "group" (to
  // the start of next group of word or non-word-non-whitespace
  // chars). The visually param controls whether, in right-to-left
  // text, direction 1 means to move towards the next index in the
  // string, or towards the character to the right of the current
  // position. The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosH(doc, pos, dir, unit, visually) {
    var line = pos.line, ch = pos.ch, origDir = dir;
    var lineObj = getLine(doc, line);
    function findNextLine() {
      var l = line + dir;
      if (l < doc.first || l >= doc.first + doc.size) return false
      line = l;
      return lineObj = getLine(doc, l);
    }
    function moveOnce(boundToLine) {
      var next = (visually ? moveVisually : moveLogically)(lineObj, ch, dir, true);
      if (next == null) {
        if (!boundToLine && findNextLine()) {
          if (visually) ch = (dir < 0 ? lineRight : lineLeft)(lineObj);
          else ch = dir < 0 ? lineObj.text.length : 0;
        } else return false
      } else ch = next;
      return true;
    }

    if (unit == "char") {
      moveOnce()
    } else if (unit == "column") {
      moveOnce(true)
    } else if (unit == "word" || unit == "group") {
      var sawType = null, group = unit == "group";
      var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
      for (var first = true;; first = false) {
        if (dir < 0 && !moveOnce(!first)) break;
        var cur = lineObj.text.charAt(ch) || "\n";
        var type = isWordChar(cur, helper) ? "w"
          : group && cur == "\n" ? "n"
          : !group || /\s/.test(cur) ? null
          : "p";
        if (group && !first && !type) type = "s";
        if (sawType && sawType != type) {
          if (dir < 0) {dir = 1; moveOnce();}
          break;
        }

        if (type) sawType = type;
        if (dir > 0 && !moveOnce(!first)) break;
      }
    }
    var result = skipAtomic(doc, Pos(line, ch), pos, origDir, true);
    if (!cmp(pos, result)) result.hitSide = true;
    return result;
  }

  // For relative vertical movement. Dir may be -1 or 1. Unit can be
  // "page" or "line". The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosV(cm, pos, dir, unit) {
    var doc = cm.doc, x = pos.left, y;
    if (unit == "page") {
      var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      y = pos.top + dir * (pageSize - (dir < 0 ? 1.5 : .5) * textHeight(cm.display));
    } else if (unit == "line") {
      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
    }
    for (;;) {
      var target = coordsChar(cm, x, y);
      if (!target.outside) break;
      if (dir < 0 ? y <= 0 : y >= doc.height) { target.hitSide = true; break; }
      y += dir * 5;
    }
    return target;
  }

  // EDITOR METHODS

  // The publicly visible API. Note that methodOp(f) means
  // 'wrap f in an operation, performed on its `this` parameter'.

  // This is not the complete set of editor methods. Most of the
  // methods defined on the Doc type are also injected into
  // CodeMirror.prototype, for backwards compatibility and
  // convenience.

  CodeMirror.prototype = {
    constructor: CodeMirror,
    focus: function(){window.focus(); this.display.input.focus();},

    setOption: function(option, value) {
      var options = this.options, old = options[option];
      if (options[option] == value && option != "mode") return;
      options[option] = value;
      if (optionHandlers.hasOwnProperty(option))
        operation(this, optionHandlers[option])(this, value, old);
    },

    getOption: function(option) {return this.options[option];},
    getDoc: function() {return this.doc;},

    addKeyMap: function(map, bottom) {
      this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map));
    },
    removeKeyMap: function(map) {
      var maps = this.state.keyMaps;
      for (var i = 0; i < maps.length; ++i)
        if (maps[i] == map || maps[i].name == map) {
          maps.splice(i, 1);
          return true;
        }
    },

    addOverlay: methodOp(function(spec, options) {
      var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
      if (mode.startState) throw new Error("Overlays may not be stateful.");
      this.state.overlays.push({mode: mode, modeSpec: spec, opaque: options && options.opaque});
      this.state.modeGen++;
      regChange(this);
    }),
    removeOverlay: methodOp(function(spec) {
      var overlays = this.state.overlays;
      for (var i = 0; i < overlays.length; ++i) {
        var cur = overlays[i].modeSpec;
        if (cur == spec || typeof spec == "string" && cur.name == spec) {
          overlays.splice(i, 1);
          this.state.modeGen++;
          regChange(this);
          return;
        }
      }
    }),

    indentLine: methodOp(function(n, dir, aggressive) {
      if (typeof dir != "string" && typeof dir != "number") {
        if (dir == null) dir = this.options.smartIndent ? "smart" : "prev";
        else dir = dir ? "add" : "subtract";
      }
      if (isLine(this.doc, n)) indentLine(this, n, dir, aggressive);
    }),
    indentSelection: methodOp(function(how) {
      var ranges = this.doc.sel.ranges, end = -1;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (!range.empty()) {
          var from = range.from(), to = range.to();
          var start = Math.max(end, from.line);
          end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
          for (var j = start; j < end; ++j)
            indentLine(this, j, how);
          var newRanges = this.doc.sel.ranges;
          if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i].from().ch > 0)
            replaceOneSelection(this.doc, i, new Range(from, newRanges[i].to()), sel_dontScroll);
        } else if (range.head.line > end) {
          indentLine(this, range.head.line, how, true);
          end = range.head.line;
          if (i == this.doc.sel.primIndex) ensureCursorVisible(this);
        }
      }
    }),

    // Fetch the parser token for a given character. Useful for hacks
    // that want to inspect the mode state (say, for completion).
    getTokenAt: function(pos, precise) {
      return takeToken(this, pos, precise);
    },

    getLineTokens: function(line, precise) {
      return takeToken(this, Pos(line), precise, true);
    },

    getTokenTypeAt: function(pos) {
      pos = clipPos(this.doc, pos);
      var styles = getLineStyles(this, getLine(this.doc, pos.line));
      var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
      var type;
      if (ch == 0) type = styles[2];
      else for (;;) {
        var mid = (before + after) >> 1;
        if ((mid ? styles[mid * 2 - 1] : 0) >= ch) after = mid;
        else if (styles[mid * 2 + 1] < ch) before = mid + 1;
        else { type = styles[mid * 2 + 2]; break; }
      }
      var cut = type ? type.indexOf("cm-overlay ") : -1;
      return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
    },

    getModeAt: function(pos) {
      var mode = this.doc.mode;
      if (!mode.innerMode) return mode;
      return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode;
    },

    getHelper: function(pos, type) {
      return this.getHelpers(pos, type)[0];
    },

    getHelpers: function(pos, type) {
      var found = [];
      if (!helpers.hasOwnProperty(type)) return found;
      var help = helpers[type], mode = this.getModeAt(pos);
      if (typeof mode[type] == "string") {
        if (help[mode[type]]) found.push(help[mode[type]]);
      } else if (mode[type]) {
        for (var i = 0; i < mode[type].length; i++) {
          var val = help[mode[type][i]];
          if (val) found.push(val);
        }
      } else if (mode.helperType && help[mode.helperType]) {
        found.push(help[mode.helperType]);
      } else if (help[mode.name]) {
        found.push(help[mode.name]);
      }
      for (var i = 0; i < help._global.length; i++) {
        var cur = help._global[i];
        if (cur.pred(mode, this) && indexOf(found, cur.val) == -1)
          found.push(cur.val);
      }
      return found;
    },

    getStateAfter: function(line, precise) {
      var doc = this.doc;
      line = clipLine(doc, line == null ? doc.first + doc.size - 1: line);
      return getStateBefore(this, line + 1, precise);
    },

    cursorCoords: function(start, mode) {
      var pos, range = this.doc.sel.primary();
      if (start == null) pos = range.head;
      else if (typeof start == "object") pos = clipPos(this.doc, start);
      else pos = start ? range.from() : range.to();
      return cursorCoords(this, pos, mode || "page");
    },

    charCoords: function(pos, mode) {
      return charCoords(this, clipPos(this.doc, pos), mode || "page");
    },

    coordsChar: function(coords, mode) {
      coords = fromCoordSystem(this, coords, mode || "page");
      return coordsChar(this, coords.left, coords.top);
    },

    lineAtHeight: function(height, mode) {
      height = fromCoordSystem(this, {top: height, left: 0}, mode || "page").top;
      return lineAtHeight(this.doc, height + this.display.viewOffset);
    },
    heightAtLine: function(line, mode) {
      var end = false, lineObj;
      if (typeof line == "number") {
        var last = this.doc.first + this.doc.size - 1;
        if (line < this.doc.first) line = this.doc.first;
        else if (line > last) { line = last; end = true; }
        lineObj = getLine(this.doc, line);
      } else {
        lineObj = line;
      }
      return intoCoordSystem(this, lineObj, {top: 0, left: 0}, mode || "page").top +
        (end ? this.doc.height - heightAtLine(lineObj) : 0);
    },

    defaultTextHeight: function() { return textHeight(this.display); },
    defaultCharWidth: function() { return charWidth(this.display); },

    setGutterMarker: methodOp(function(line, gutterID, value) {
      return changeLine(this.doc, line, "gutter", function(line) {
        var markers = line.gutterMarkers || (line.gutterMarkers = {});
        markers[gutterID] = value;
        if (!value && isEmpty(markers)) line.gutterMarkers = null;
        return true;
      });
    }),

    clearGutter: methodOp(function(gutterID) {
      var cm = this, doc = cm.doc, i = doc.first;
      doc.iter(function(line) {
        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
          line.gutterMarkers[gutterID] = null;
          regLineChange(cm, i, "gutter");
          if (isEmpty(line.gutterMarkers)) line.gutterMarkers = null;
        }
        ++i;
      });
    }),

    lineInfo: function(line) {
      if (typeof line == "number") {
        if (!isLine(this.doc, line)) return null;
        var n = line;
        line = getLine(this.doc, line);
        if (!line) return null;
      } else {
        var n = lineNo(line);
        if (n == null) return null;
      }
      return {line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
              textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
              widgets: line.widgets};
    },

    getViewport: function() { return {from: this.display.viewFrom, to: this.display.viewTo};},

    addWidget: function(pos, node, scroll, vert, horiz) {
      var display = this.display;
      pos = cursorCoords(this, clipPos(this.doc, pos));
      var top = pos.bottom, left = pos.left;
      node.style.position = "absolute";
      node.setAttribute("cm-ignore-events", "true");
      this.display.input.setUneditable(node);
      display.sizer.appendChild(node);
      if (vert == "over") {
        top = pos.top;
      } else if (vert == "above" || vert == "near") {
        var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
        hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
        // Default to positioning above (if specified and possible); otherwise default to positioning below
        if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight)
          top = pos.top - node.offsetHeight;
        else if (pos.bottom + node.offsetHeight <= vspace)
          top = pos.bottom;
        if (left + node.offsetWidth > hspace)
          left = hspace - node.offsetWidth;
      }
      node.style.top = top + "px";
      node.style.left = node.style.right = "";
      if (horiz == "right") {
        left = display.sizer.clientWidth - node.offsetWidth;
        node.style.right = "0px";
      } else {
        if (horiz == "left") left = 0;
        else if (horiz == "middle") left = (display.sizer.clientWidth - node.offsetWidth) / 2;
        node.style.left = left + "px";
      }
      if (scroll)
        scrollIntoView(this, left, top, left + node.offsetWidth, top + node.offsetHeight);
    },

    triggerOnKeyDown: methodOp(onKeyDown),
    triggerOnKeyPress: methodOp(onKeyPress),
    triggerOnKeyUp: onKeyUp,

    execCommand: function(cmd) {
      if (commands.hasOwnProperty(cmd))
        return commands[cmd].call(null, this);
    },

    triggerElectric: methodOp(function(text) { triggerElectric(this, text); }),

    findPosH: function(from, amount, unit, visually) {
      var dir = 1;
      if (amount < 0) { dir = -1; amount = -amount; }
      for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
        cur = findPosH(this.doc, cur, dir, unit, visually);
        if (cur.hitSide) break;
      }
      return cur;
    },

    moveH: methodOp(function(dir, unit) {
      var cm = this;
      cm.extendSelectionsBy(function(range) {
        if (cm.display.shift || cm.doc.extend || range.empty())
          return findPosH(cm.doc, range.head, dir, unit, cm.options.rtlMoveVisually);
        else
          return dir < 0 ? range.from() : range.to();
      }, sel_move);
    }),

    deleteH: methodOp(function(dir, unit) {
      var sel = this.doc.sel, doc = this.doc;
      if (sel.somethingSelected())
        doc.replaceSelection("", null, "+delete");
      else
        deleteNearSelection(this, function(range) {
          var other = findPosH(doc, range.head, dir, unit, false);
          return dir < 0 ? {from: other, to: range.head} : {from: range.head, to: other};
        });
    }),

    findPosV: function(from, amount, unit, goalColumn) {
      var dir = 1, x = goalColumn;
      if (amount < 0) { dir = -1; amount = -amount; }
      for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
        var coords = cursorCoords(this, cur, "div");
        if (x == null) x = coords.left;
        else coords.left = x;
        cur = findPosV(this, coords, dir, unit);
        if (cur.hitSide) break;
      }
      return cur;
    },

    moveV: methodOp(function(dir, unit) {
      var cm = this, doc = this.doc, goals = [];
      var collapse = !cm.display.shift && !doc.extend && doc.sel.somethingSelected();
      doc.extendSelectionsBy(function(range) {
        if (collapse)
          return dir < 0 ? range.from() : range.to();
        var headPos = cursorCoords(cm, range.head, "div");
        if (range.goalColumn != null) headPos.left = range.goalColumn;
        goals.push(headPos.left);
        var pos = findPosV(cm, headPos, dir, unit);
        if (unit == "page" && range == doc.sel.primary())
          addToScrollPos(cm, null, charCoords(cm, pos, "div").top - headPos.top);
        return pos;
      }, sel_move);
      if (goals.length) for (var i = 0; i < doc.sel.ranges.length; i++)
        doc.sel.ranges[i].goalColumn = goals[i];
    }),

    // Find the word at the given position (as returned by coordsChar).
    findWordAt: function(pos) {
      var doc = this.doc, line = getLine(doc, pos.line).text;
      var start = pos.ch, end = pos.ch;
      if (line) {
        var helper = this.getHelper(pos, "wordChars");
        if ((pos.xRel < 0 || end == line.length) && start) --start; else ++end;
        var startChar = line.charAt(start);
        var check = isWordChar(startChar, helper)
          ? function(ch) { return isWordChar(ch, helper); }
          : /\s/.test(startChar) ? function(ch) {return /\s/.test(ch);}
          : function(ch) {return !/\s/.test(ch) && !isWordChar(ch);};
        while (start > 0 && check(line.charAt(start - 1))) --start;
        while (end < line.length && check(line.charAt(end))) ++end;
      }
      return new Range(Pos(pos.line, start), Pos(pos.line, end));
    },

    toggleOverwrite: function(value) {
      if (value != null && value == this.state.overwrite) return;
      if (this.state.overwrite = !this.state.overwrite)
        addClass(this.display.cursorDiv, "CodeMirror-overwrite");
      else
        rmClass(this.display.cursorDiv, "CodeMirror-overwrite");

      signal(this, "overwriteToggle", this, this.state.overwrite);
    },
    hasFocus: function() { return this.display.input.getField() == activeElt(); },
    isReadOnly: function() { return !!(this.options.readOnly || this.doc.cantEdit); },

    scrollTo: methodOp(function(x, y) {
      if (x != null || y != null) resolveScrollToPos(this);
      if (x != null) this.curOp.scrollLeft = x;
      if (y != null) this.curOp.scrollTop = y;
    }),
    getScrollInfo: function() {
      var scroller = this.display.scroller;
      return {left: scroller.scrollLeft, top: scroller.scrollTop,
              height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
              width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
              clientHeight: displayHeight(this), clientWidth: displayWidth(this)};
    },

    scrollIntoView: methodOp(function(range, margin) {
      if (range == null) {
        range = {from: this.doc.sel.primary().head, to: null};
        if (margin == null) margin = this.options.cursorScrollMargin;
      } else if (typeof range == "number") {
        range = {from: Pos(range, 0), to: null};
      } else if (range.from == null) {
        range = {from: range, to: null};
      }
      if (!range.to) range.to = range.from;
      range.margin = margin || 0;

      if (range.from.line != null) {
        resolveScrollToPos(this);
        this.curOp.scrollToPos = range;
      } else {
        var sPos = calculateScrollPos(this, Math.min(range.from.left, range.to.left),
                                      Math.min(range.from.top, range.to.top) - range.margin,
                                      Math.max(range.from.right, range.to.right),
                                      Math.max(range.from.bottom, range.to.bottom) + range.margin);
        this.scrollTo(sPos.scrollLeft, sPos.scrollTop);
      }
    }),

    setSize: methodOp(function(width, height) {
      var cm = this;
      function interpret(val) {
        return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
      }
      if (width != null) cm.display.wrapper.style.width = interpret(width);
      if (height != null) cm.display.wrapper.style.height = interpret(height);
      if (cm.options.lineWrapping) clearLineMeasurementCache(this);
      var lineNo = cm.display.viewFrom;
      cm.doc.iter(lineNo, cm.display.viewTo, function(line) {
        if (line.widgets) for (var i = 0; i < line.widgets.length; i++)
          if (line.widgets[i].noHScroll) { regLineChange(cm, lineNo, "widget"); break; }
        ++lineNo;
      });
      cm.curOp.forceUpdate = true;
      signal(cm, "refresh", this);
    }),

    operation: function(f){return runInOp(this, f);},

    refresh: methodOp(function() {
      var oldHeight = this.display.cachedTextHeight;
      regChange(this);
      this.curOp.forceUpdate = true;
      clearCaches(this);
      this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
      updateGutterSpace(this);
      if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5)
        estimateLineHeights(this);
      signal(this, "refresh", this);
    }),

    swapDoc: methodOp(function(doc) {
      var old = this.doc;
      old.cm = null;
      attachDoc(this, doc);
      clearCaches(this);
      this.display.input.reset();
      this.scrollTo(doc.scrollLeft, doc.scrollTop);
      this.curOp.forceScroll = true;
      signalLater(this, "swapDoc", this, old);
      return old;
    }),

    getInputField: function(){return this.display.input.getField();},
    getWrapperElement: function(){return this.display.wrapper;},
    getScrollerElement: function(){return this.display.scroller;},
    getGutterElement: function(){return this.display.gutters;}
  };
  eventMixin(CodeMirror);

  // OPTION DEFAULTS

  // The default configuration options.
  var defaults = CodeMirror.defaults = {};
  // Functions to run when options are changed.
  var optionHandlers = CodeMirror.optionHandlers = {};

  function option(name, deflt, handle, notOnInit) {
    CodeMirror.defaults[name] = deflt;
    if (handle) optionHandlers[name] =
      notOnInit ? function(cm, val, old) {if (old != Init) handle(cm, val, old);} : handle;
  }

  // Passed to option handlers when there is no old value.
  var Init = CodeMirror.Init = {toString: function(){return "CodeMirror.Init";}};

  // These two are, on init, called from the constructor because they
  // have to be initialized before the editor can start at all.
  option("value", "", function(cm, val) {
    cm.setValue(val);
  }, true);
  option("mode", null, function(cm, val) {
    cm.doc.modeOption = val;
    loadMode(cm);
  }, true);

  option("indentUnit", 2, loadMode, true);
  option("indentWithTabs", false);
  option("smartIndent", true);
  option("tabSize", 4, function(cm) {
    resetModeState(cm);
    clearCaches(cm);
    regChange(cm);
  }, true);
  option("lineSeparator", null, function(cm, val) {
    cm.doc.lineSep = val;
    if (!val) return;
    var newBreaks = [], lineNo = cm.doc.first;
    cm.doc.iter(function(line) {
      for (var pos = 0;;) {
        var found = line.text.indexOf(val, pos);
        if (found == -1) break;
        pos = found + val.length;
        newBreaks.push(Pos(lineNo, found));
      }
      lineNo++;
    });
    for (var i = newBreaks.length - 1; i >= 0; i--)
      replaceRange(cm.doc, val, newBreaks[i], Pos(newBreaks[i].line, newBreaks[i].ch + val.length))
  });
  option("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(cm, val, old) {
    cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
    if (old != CodeMirror.Init) cm.refresh();
  });
  option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {cm.refresh();}, true);
  option("electricChars", true);
  option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
    throw new Error("inputStyle can not (yet) be changed in a running editor"); // FIXME
  }, true);
  option("rtlMoveVisually", !windows);
  option("wholeLineUpdateBefore", true);

  option("theme", "default", function(cm) {
    themeChanged(cm);
    guttersChanged(cm);
  }, true);
  option("keyMap", "default", function(cm, val, old) {
    var next = getKeyMap(val);
    var prev = old != CodeMirror.Init && getKeyMap(old);
    if (prev && prev.detach) prev.detach(cm, next);
    if (next.attach) next.attach(cm, prev || null);
  });
  option("extraKeys", null);

  option("lineWrapping", false, wrappingChanged, true);
  option("gutters", [], function(cm) {
    setGuttersForLineNumbers(cm.options);
    guttersChanged(cm);
  }, true);
  option("fixedGutter", true, function(cm, val) {
    cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
    cm.refresh();
  }, true);
  option("coverGutterNextToScrollbar", false, function(cm) {updateScrollbars(cm);}, true);
  option("scrollbarStyle", "native", function(cm) {
    initScrollbars(cm);
    updateScrollbars(cm);
    cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
    cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
  }, true);
  option("lineNumbers", false, function(cm) {
    setGuttersForLineNumbers(cm.options);
    guttersChanged(cm);
  }, true);
  option("firstLineNumber", 1, guttersChanged, true);
  option("lineNumberFormatter", function(integer) {return integer;}, guttersChanged, true);
  option("showCursorWhenSelecting", false, updateSelection, true);

  option("resetSelectionOnContextMenu", true);
  option("lineWiseCopyCut", true);

  option("readOnly", false, function(cm, val) {
    if (val == "nocursor") {
      onBlur(cm);
      cm.display.input.blur();
      cm.display.disabled = true;
    } else {
      cm.display.disabled = false;
    }
    cm.display.input.readOnlyChanged(val)
  });
  option("disableInput", false, function(cm, val) {if (!val) cm.display.input.reset();}, true);
  option("dragDrop", true, dragDropChanged);
  option("allowDropFileTypes", null);

  option("cursorBlinkRate", 530);
  option("cursorScrollMargin", 0);
  option("cursorHeight", 1, updateSelection, true);
  option("singleCursorHeightPerLine", true, updateSelection, true);
  option("workTime", 100);
  option("workDelay", 100);
  option("flattenSpans", true, resetModeState, true);
  option("addModeClass", false, resetModeState, true);
  option("pollInterval", 100);
  option("undoDepth", 200, function(cm, val){cm.doc.history.undoDepth = val;});
  option("historyEventDelay", 1250);
  option("viewportMargin", 10, function(cm){cm.refresh();}, true);
  option("maxHighlightLength", 10000, resetModeState, true);
  option("moveInputWithCursor", true, function(cm, val) {
    if (!val) cm.display.input.resetPosition();
  });

  option("tabindex", null, function(cm, val) {
    cm.display.input.getField().tabIndex = val || "";
  });
  option("autofocus", null);

  // MODE DEFINITION AND QUERYING

  // Known modes, by name and by MIME
  var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  CodeMirror.defineMode = function(name, mode) {
    if (!CodeMirror.defaults.mode && name != "null") CodeMirror.defaults.mode = name;
    if (arguments.length > 2)
      mode.dependencies = Array.prototype.slice.call(arguments, 2);
    modes[name] = mode;
  };

  CodeMirror.defineMIME = function(mime, spec) {
    mimeModes[mime] = spec;
  };

  // Given a MIME type, a {name, ...options} config object, or a name
  // string, return a mode config object.
  CodeMirror.resolveMode = function(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string") found = {name: found};
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return CodeMirror.resolveMode("application/xml");
    }
    if (typeof spec == "string") return {name: spec};
    else return spec || {name: "null"};
  };

  // Given a mode spec (anything that resolveMode accepts), find and
  // initialize an actual mode object.
  CodeMirror.getMode = function(options, spec) {
    var spec = CodeMirror.resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) return CodeMirror.getMode(options, "text/plain");
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop in exts) {
        if (!exts.hasOwnProperty(prop)) continue;
        if (modeObj.hasOwnProperty(prop)) modeObj["_" + prop] = modeObj[prop];
        modeObj[prop] = exts[prop];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType) modeObj.helperType = spec.helperType;
    if (spec.modeProps) for (var prop in spec.modeProps)
      modeObj[prop] = spec.modeProps[prop];

    return modeObj;
  };

  // Minimal default mode.
  CodeMirror.defineMode("null", function() {
    return {token: function(stream) {stream.skipToEnd();}};
  });
  CodeMirror.defineMIME("text/plain", "null");

  // This can be used to attach properties to mode objects from
  // outside the actual mode definition.
  var modeExtensions = CodeMirror.modeExtensions = {};
  CodeMirror.extendMode = function(mode, properties) {
    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : (modeExtensions[mode] = {});
    copyObj(properties, exts);
  };

  // EXTENSIONS

  CodeMirror.defineExtension = function(name, func) {
    CodeMirror.prototype[name] = func;
  };
  CodeMirror.defineDocExtension = function(name, func) {
    Doc.prototype[name] = func;
  };
  CodeMirror.defineOption = option;

  var initHooks = [];
  CodeMirror.defineInitHook = function(f) {initHooks.push(f);};

  var helpers = CodeMirror.helpers = {};
  CodeMirror.registerHelper = function(type, name, value) {
    if (!helpers.hasOwnProperty(type)) helpers[type] = CodeMirror[type] = {_global: []};
    helpers[type][name] = value;
  };
  CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
    CodeMirror.registerHelper(type, name, value);
    helpers[type]._global.push({pred: predicate, val: value});
  };

  // MODE STATE HANDLING

  // Utility functions for working with state. Exported because nested
  // modes need to do this for their inner modes.

  var copyState = CodeMirror.copyState = function(mode, state) {
    if (state === true) return state;
    if (mode.copyState) return mode.copyState(state);
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) val = val.concat([]);
      nstate[n] = val;
    }
    return nstate;
  };

  var startState = CodeMirror.startState = function(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  };

  // Given a mode and a state (for that mode), find the inner mode and
  // state at the position that the state refers to.
  CodeMirror.innerMode = function(mode, state) {
    while (mode.innerMode) {
      var info = mode.innerMode(state);
      if (!info || info.mode == mode) break;
      state = info.state;
      mode = info.mode;
    }
    return info || {mode: mode, state: state};
  };

  // STANDARD COMMANDS

  // Commands are parameter-less actions that can be performed on an
  // editor, mostly used for keybindings.
  var commands = CodeMirror.commands = {
    selectAll: function(cm) {cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);},
    singleSelection: function(cm) {
      cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
    },
    killLine: function(cm) {
      deleteNearSelection(cm, function(range) {
        if (range.empty()) {
          var len = getLine(cm.doc, range.head.line).text.length;
          if (range.head.ch == len && range.head.line < cm.lastLine())
            return {from: range.head, to: Pos(range.head.line + 1, 0)};
          else
            return {from: range.head, to: Pos(range.head.line, len)};
        } else {
          return {from: range.from(), to: range.to()};
        }
      });
    },
    deleteLine: function(cm) {
      deleteNearSelection(cm, function(range) {
        return {from: Pos(range.from().line, 0),
                to: clipPos(cm.doc, Pos(range.to().line + 1, 0))};
      });
    },
    delLineLeft: function(cm) {
      deleteNearSelection(cm, function(range) {
        return {from: Pos(range.from().line, 0), to: range.from()};
      });
    },
    delWrappedLineLeft: function(cm) {
      deleteNearSelection(cm, function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var leftPos = cm.coordsChar({left: 0, top: top}, "div");
        return {from: leftPos, to: range.from()};
      });
    },
    delWrappedLineRight: function(cm) {
      deleteNearSelection(cm, function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var rightPos = cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div");
        return {from: range.from(), to: rightPos };
      });
    },
    undo: function(cm) {cm.undo();},
    redo: function(cm) {cm.redo();},
    undoSelection: function(cm) {cm.undoSelection();},
    redoSelection: function(cm) {cm.redoSelection();},
    goDocStart: function(cm) {cm.extendSelection(Pos(cm.firstLine(), 0));},
    goDocEnd: function(cm) {cm.extendSelection(Pos(cm.lastLine()));},
    goLineStart: function(cm) {
      cm.extendSelectionsBy(function(range) { return lineStart(cm, range.head.line); },
                            {origin: "+move", bias: 1});
    },
    goLineStartSmart: function(cm) {
      cm.extendSelectionsBy(function(range) {
        return lineStartSmart(cm, range.head);
      }, {origin: "+move", bias: 1});
    },
    goLineEnd: function(cm) {
      cm.extendSelectionsBy(function(range) { return lineEnd(cm, range.head.line); },
                            {origin: "+move", bias: -1});
    },
    goLineRight: function(cm) {
      cm.extendSelectionsBy(function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div");
      }, sel_move);
    },
    goLineLeft: function(cm) {
      cm.extendSelectionsBy(function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        return cm.coordsChar({left: 0, top: top}, "div");
      }, sel_move);
    },
    goLineLeftSmart: function(cm) {
      cm.extendSelectionsBy(function(range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var pos = cm.coordsChar({left: 0, top: top}, "div");
        if (pos.ch < cm.getLine(pos.line).search(/\S/)) return lineStartSmart(cm, range.head);
        return pos;
      }, sel_move);
    },
    goLineUp: function(cm) {cm.moveV(-1, "line");},
    goLineDown: function(cm) {cm.moveV(1, "line");},
    goPageUp: function(cm) {cm.moveV(-1, "page");},
    goPageDown: function(cm) {cm.moveV(1, "page");},
    goCharLeft: function(cm) {cm.moveH(-1, "char");},
    goCharRight: function(cm) {cm.moveH(1, "char");},
    goColumnLeft: function(cm) {cm.moveH(-1, "column");},
    goColumnRight: function(cm) {cm.moveH(1, "column");},
    goWordLeft: function(cm) {cm.moveH(-1, "word");},
    goGroupRight: function(cm) {cm.moveH(1, "group");},
    goGroupLeft: function(cm) {cm.moveH(-1, "group");},
    goWordRight: function(cm) {cm.moveH(1, "word");},
    delCharBefore: function(cm) {cm.deleteH(-1, "char");},
    delCharAfter: function(cm) {cm.deleteH(1, "char");},
    delWordBefore: function(cm) {cm.deleteH(-1, "word");},
    delWordAfter: function(cm) {cm.deleteH(1, "word");},
    delGroupBefore: function(cm) {cm.deleteH(-1, "group");},
    delGroupAfter: function(cm) {cm.deleteH(1, "group");},
    indentAuto: function(cm) {cm.indentSelection("smart");},
    indentMore: function(cm) {cm.indentSelection("add");},
    indentLess: function(cm) {cm.indentSelection("subtract");},
    insertTab: function(cm) {cm.replaceSelection("\t");},
    insertSoftTab: function(cm) {
      var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
      for (var i = 0; i < ranges.length; i++) {
        var pos = ranges[i].from();
        var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
        spaces.push(new Array(tabSize - col % tabSize + 1).join(" "));
      }
      cm.replaceSelections(spaces);
    },
    defaultTab: function(cm) {
      if (cm.somethingSelected()) cm.indentSelection("add");
      else cm.execCommand("insertTab");
    },
    transposeChars: function(cm) {
      runInOp(cm, function() {
        var ranges = cm.listSelections(), newSel = [];
        for (var i = 0; i < ranges.length; i++) {
          var cur = ranges[i].head, line = getLine(cm.doc, cur.line).text;
          if (line) {
            if (cur.ch == line.length) cur = new Pos(cur.line, cur.ch - 1);
            if (cur.ch > 0) {
              cur = new Pos(cur.line, cur.ch + 1);
              cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
                              Pos(cur.line, cur.ch - 2), cur, "+transpose");
            } else if (cur.line > cm.doc.first) {
              var prev = getLine(cm.doc, cur.line - 1).text;
              if (prev)
                cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() +
                                prev.charAt(prev.length - 1),
                                Pos(cur.line - 1, prev.length - 1), Pos(cur.line, 1), "+transpose");
            }
          }
          newSel.push(new Range(cur, cur));
        }
        cm.setSelections(newSel);
      });
    },
    newlineAndIndent: function(cm) {
      runInOp(cm, function() {
        var len = cm.listSelections().length;
        for (var i = 0; i < len; i++) {
          var range = cm.listSelections()[i];
          cm.replaceRange(cm.doc.lineSeparator(), range.anchor, range.head, "+input");
          cm.indentLine(range.from().line + 1, null, true);
        }
        ensureCursorVisible(cm);
      });
    },
    toggleOverwrite: function(cm) {cm.toggleOverwrite();}
  };


  // STANDARD KEYMAPS

  var keyMap = CodeMirror.keyMap = {};

  keyMap.basic = {
    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
    "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
    "Tab": "defaultTab", "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
    "Esc": "singleSelection"
  };
  // Note that the save and find-related commands aren't defined by
  // default. User code or addons can define them. Unknown commands
  // are simply ignored.
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown",
    "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
    fallthrough: "basic"
  };
  // Very basic readline/emacs-style bindings, which are standard on Mac.
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
    "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
    "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight",
    "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd",
    fallthrough: ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;

  // KEYMAP DISPATCH

  function normalizeKeyName(name) {
    var parts = name.split(/-(?!$)/), name = parts[parts.length - 1];
    var alt, ctrl, shift, cmd;
    for (var i = 0; i < parts.length - 1; i++) {
      var mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod)) cmd = true;
      else if (/^a(lt)?$/i.test(mod)) alt = true;
      else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true;
      else if (/^s(hift)$/i.test(mod)) shift = true;
      else throw new Error("Unrecognized modifier name: " + mod);
    }
    if (alt) name = "Alt-" + name;
    if (ctrl) name = "Ctrl-" + name;
    if (cmd) name = "Cmd-" + name;
    if (shift) name = "Shift-" + name;
    return name;
  }

  // This is a kludge to keep keymaps mostly working as raw objects
  // (backwards compatibility) while at the same time support features
  // like normalization and multi-stroke key bindings. It compiles a
  // new normalized keymap, and then updates the old object to reflect
  // this.
  CodeMirror.normalizeKeyMap = function(keymap) {
    var copy = {};
    for (var keyname in keymap) if (keymap.hasOwnProperty(keyname)) {
      var value = keymap[keyname];
      if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) continue;
      if (value == "...") { delete keymap[keyname]; continue; }

      var keys = map(keyname.split(" "), normalizeKeyName);
      for (var i = 0; i < keys.length; i++) {
        var val, name;
        if (i == keys.length - 1) {
          name = keys.join(" ");
          val = value;
        } else {
          name = keys.slice(0, i + 1).join(" ");
          val = "...";
        }
        var prev = copy[name];
        if (!prev) copy[name] = val;
        else if (prev != val) throw new Error("Inconsistent bindings for " + name);
      }
      delete keymap[keyname];
    }
    for (var prop in copy) keymap[prop] = copy[prop];
    return keymap;
  };

  var lookupKey = CodeMirror.lookupKey = function(key, map, handle, context) {
    map = getKeyMap(map);
    var found = map.call ? map.call(key, context) : map[key];
    if (found === false) return "nothing";
    if (found === "...") return "multi";
    if (found != null && handle(found)) return "handled";

    if (map.fallthrough) {
      if (Object.prototype.toString.call(map.fallthrough) != "[object Array]")
        return lookupKey(key, map.fallthrough, handle, context);
      for (var i = 0; i < map.fallthrough.length; i++) {
        var result = lookupKey(key, map.fallthrough[i], handle, context);
        if (result) return result;
      }
    }
  };

  // Modifier key presses don't count as 'real' key presses for the
  // purpose of keymap fallthrough.
  var isModifierKey = CodeMirror.isModifierKey = function(value) {
    var name = typeof value == "string" ? value : keyNames[value.keyCode];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  };

  // Look up the name of a key as indicated by an event object.
  var keyName = CodeMirror.keyName = function(event, noShift) {
    if (presto && event.keyCode == 34 && event["char"]) return false;
    var base = keyNames[event.keyCode], name = base;
    if (name == null || event.altGraphKey) return false;
    if (event.altKey && base != "Alt") name = "Alt-" + name;
    if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") name = "Ctrl-" + name;
    if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Cmd") name = "Cmd-" + name;
    if (!noShift && event.shiftKey && base != "Shift") name = "Shift-" + name;
    return name;
  };

  function getKeyMap(val) {
    return typeof val == "string" ? keyMap[val] : val;
  }

  // FROMTEXTAREA

  CodeMirror.fromTextArea = function(textarea, options) {
    options = options ? copyObj(options) : {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabIndex)
      options.tabindex = textarea.tabIndex;
    if (!options.placeholder && textarea.placeholder)
      options.placeholder = textarea.placeholder;
    // Set autofocus to true if this textarea is focused, or if it has
    // autofocus and no other element is focused.
    if (options.autofocus == null) {
      var hasFocus = activeElt();
      options.autofocus = hasFocus == textarea ||
        textarea.getAttribute("autofocus") != null && hasFocus == document.body;
    }

    function save() {textarea.value = cm.getValue();}
    if (textarea.form) {
      on(textarea.form, "submit", save);
      // Deplorable hack to make the submit method do the right thing.
      if (!options.leaveSubmitMethodAlone) {
        var form = textarea.form, realSubmit = form.submit;
        try {
          var wrappedSubmit = form.submit = function() {
            save();
            form.submit = realSubmit;
            form.submit();
            form.submit = wrappedSubmit;
          };
        } catch(e) {}
      }
    }

    options.finishInit = function(cm) {
      cm.save = save;
      cm.getTextArea = function() { return textarea; };
      cm.toTextArea = function() {
        cm.toTextArea = isNaN; // Prevent this from being ran twice
        save();
        textarea.parentNode.removeChild(cm.getWrapperElement());
        textarea.style.display = "";
        if (textarea.form) {
          off(textarea.form, "submit", save);
          if (typeof textarea.form.submit == "function")
            textarea.form.submit = realSubmit;
        }
      };
    };

    textarea.style.display = "none";
    var cm = CodeMirror(function(node) {
      textarea.parentNode.insertBefore(node, textarea.nextSibling);
    }, options);
    return cm;
  };

  // STRING STREAM

  // Fed to the mode parsers, provides helper functions to make
  // parsers more succinct.

  var StringStream = CodeMirror.StringStream = function(string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
  };

  StringStream.prototype = {
    eol: function() {return this.pos >= this.string.length;},
    sol: function() {return this.pos == this.lineStart;},
    peek: function() {return this.string.charAt(this.pos) || undefined;},
    next: function() {
      if (this.pos < this.string.length)
        return this.string.charAt(this.pos++);
    },
    eat: function(match) {
      var ch = this.string.charAt(this.pos);
      if (typeof match == "string") var ok = ch == match;
      else var ok = ch && (match.test ? match.test(ch) : match(ch));
      if (ok) {++this.pos; return ch;}
    },
    eatWhile: function(match) {
      var start = this.pos;
      while (this.eat(match)){}
      return this.pos > start;
    },
    eatSpace: function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
      return this.pos > start;
    },
    skipToEnd: function() {this.pos = this.string.length;},
    skipTo: function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {this.pos = found; return true;}
    },
    backUp: function(n) {this.pos -= n;},
    column: function() {
      if (this.lastColumnPos < this.start) {
        this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
        this.lastColumnPos = this.start;
      }
      return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    },
    indentation: function() {
      return countColumn(this.string, null, this.tabSize) -
        (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    },
    match: function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function(str) {return caseInsensitive ? str.toLowerCase() : str;};
        var substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) this.pos += pattern.length;
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) return null;
        if (match && consume !== false) this.pos += match[0].length;
        return match;
      }
    },
    current: function(){return this.string.slice(this.start, this.pos);},
    hideFirstChars: function(n, inner) {
      this.lineStart += n;
      try { return inner(); }
      finally { this.lineStart -= n; }
    }
  };

  // TEXTMARKERS

  // Created with markText and setBookmark methods. A TextMarker is a
  // handle that can be used to clear or find a marked position in the
  // document. Line objects hold arrays (markedSpans) containing
  // {from, to, marker} object pointing to such marker objects, and
  // indicating that such a marker is present on that line. Multiple
  // lines may point to the same marker when it spans across lines.
  // The spans will have null for their from/to properties when the
  // marker continues beyond the start/end of the line. Markers have
  // links back to the lines they currently touch.

  var nextMarkerId = 0;

  var TextMarker = CodeMirror.TextMarker = function(doc, type) {
    this.lines = [];
    this.type = type;
    this.doc = doc;
    this.id = ++nextMarkerId;
  };
  eventMixin(TextMarker);

  // Clear the marker.
  TextMarker.prototype.clear = function() {
    if (this.explicitlyCleared) return;
    var cm = this.doc.cm, withOp = cm && !cm.curOp;
    if (withOp) startOperation(cm);
    if (hasHandler(this, "clear")) {
      var found = this.find();
      if (found) signalLater(this, "clear", found.from, found.to);
    }
    var min = null, max = null;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (cm && !this.collapsed) regLineChange(cm, lineNo(line), "text");
      else if (cm) {
        if (span.to != null) max = lineNo(line);
        if (span.from != null) min = lineNo(line);
      }
      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
      if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm)
        updateLineHeight(line, textHeight(cm.display));
    }
    if (cm && this.collapsed && !cm.options.lineWrapping) for (var i = 0; i < this.lines.length; ++i) {
      var visual = visualLine(this.lines[i]), len = lineLength(visual);
      if (len > cm.display.maxLineLength) {
        cm.display.maxLine = visual;
        cm.display.maxLineLength = len;
        cm.display.maxLineChanged = true;
      }
    }

    if (min != null && cm && this.collapsed) regChange(cm, min, max + 1);
    this.lines.length = 0;
    this.explicitlyCleared = true;
    if (this.atomic && this.doc.cantEdit) {
      this.doc.cantEdit = false;
      if (cm) reCheckSelection(cm.doc);
    }
    if (cm) signalLater(cm, "markerCleared", cm, this);
    if (withOp) endOperation(cm);
    if (this.parent) this.parent.clear();
  };

  // Find the position of the marker in the document. Returns a {from,
  // to} object by default. Side can be passed to get a specific side
  // -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
  // Pos objects returned contain a line object, rather than a line
  // number (used to prevent looking up the same line twice).
  TextMarker.prototype.find = function(side, lineObj) {
    if (side == null && this.type == "bookmark") side = 1;
    var from, to;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (span.from != null) {
        from = Pos(lineObj ? line : lineNo(line), span.from);
        if (side == -1) return from;
      }
      if (span.to != null) {
        to = Pos(lineObj ? line : lineNo(line), span.to);
        if (side == 1) return to;
      }
    }
    return from && {from: from, to: to};
  };

  // Signals that the marker's widget changed, and surrounding layout
  // should be recomputed.
  TextMarker.prototype.changed = function() {
    var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
    if (!pos || !cm) return;
    runInOp(cm, function() {
      var line = pos.line, lineN = lineNo(pos.line);
      var view = findViewForLine(cm, lineN);
      if (view) {
        clearLineMeasurementCacheFor(view);
        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
      }
      cm.curOp.updateMaxLine = true;
      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
        var oldHeight = widget.height;
        widget.height = null;
        var dHeight = widgetHeight(widget) - oldHeight;
        if (dHeight)
          updateLineHeight(line, line.height + dHeight);
      }
    });
  };

  TextMarker.prototype.attachLine = function(line) {
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1)
        (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
    }
    this.lines.push(line);
  };
  TextMarker.prototype.detachLine = function(line) {
    this.lines.splice(indexOf(this.lines, line), 1);
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
    }
  };

  // Collapsed markers have unique ids, in order to be able to order
  // them, which is needed for uniquely determining an outer marker
  // when they overlap (they may nest, but not partially overlap).
  var nextMarkerId = 0;

  // Create a marker, wire it up to the right lines, and
  function markText(doc, from, to, options, type) {
    // Shared markers (across linked documents) are handled separately
    // (markTextShared will call out to this again, once per
    // document).
    if (options && options.shared) return markTextShared(doc, from, to, options, type);
    // Ensure we are in an operation.
    if (doc.cm && !doc.cm.curOp) return operation(doc.cm, markText)(doc, from, to, options, type);

    var marker = new TextMarker(doc, type), diff = cmp(from, to);
    if (options) copyObj(options, marker, false);
    // Don't connect empty markers unless clearWhenEmpty is false
    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false)
      return marker;
    if (marker.replacedWith) {
      // Showing up as a widget implies collapsed (widget replaces text)
      marker.collapsed = true;
      marker.widgetNode = elt("span", [marker.replacedWith], "CodeMirror-widget");
      if (!options.handleMouseEvents) marker.widgetNode.setAttribute("cm-ignore-events", "true");
      if (options.insertLeft) marker.widgetNode.insertLeft = true;
    }
    if (marker.collapsed) {
      if (conflictingCollapsedRange(doc, from.line, from, to, marker) ||
          from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker))
        throw new Error("Inserting collapsed marker partially overlapping an existing one");
      sawCollapsedSpans = true;
    }

    if (marker.addToHistory)
      addChangeToHistory(doc, {from: from, to: to, origin: "markText"}, doc.sel, NaN);

    var curLine = from.line, cm = doc.cm, updateMaxLine;
    doc.iter(curLine, to.line + 1, function(line) {
      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine)
        updateMaxLine = true;
      if (marker.collapsed && curLine != from.line) updateLineHeight(line, 0);
      addMarkedSpan(line, new MarkedSpan(marker,
                                         curLine == from.line ? from.ch : null,
                                         curLine == to.line ? to.ch : null));
      ++curLine;
    });
    // lineIsHidden depends on the presence of the spans, so needs a second pass
    if (marker.collapsed) doc.iter(from.line, to.line + 1, function(line) {
      if (lineIsHidden(doc, line)) updateLineHeight(line, 0);
    });

    if (marker.clearOnEnter) on(marker, "beforeCursorEnter", function() { marker.clear(); });

    if (marker.readOnly) {
      sawReadOnlySpans = true;
      if (doc.history.done.length || doc.history.undone.length)
        doc.clearHistory();
    }
    if (marker.collapsed) {
      marker.id = ++nextMarkerId;
      marker.atomic = true;
    }
    if (cm) {
      // Sync editor state
      if (updateMaxLine) cm.curOp.updateMaxLine = true;
      if (marker.collapsed)
        regChange(cm, from.line, to.line + 1);
      else if (marker.className || marker.title || marker.startStyle || marker.endStyle || marker.css)
        for (var i = from.line; i <= to.line; i++) regLineChange(cm, i, "text");
      if (marker.atomic) reCheckSelection(cm.doc);
      signalLater(cm, "markerAdded", cm, marker);
    }
    return marker;
  }

  // SHARED TEXTMARKERS

  // A shared marker spans multiple linked documents. It is
  // implemented as a meta-marker-object controlling multiple normal
  // markers.
  var SharedTextMarker = CodeMirror.SharedTextMarker = function(markers, primary) {
    this.markers = markers;
    this.primary = primary;
    for (var i = 0; i < markers.length; ++i)
      markers[i].parent = this;
  };
  eventMixin(SharedTextMarker);

  SharedTextMarker.prototype.clear = function() {
    if (this.explicitlyCleared) return;
    this.explicitlyCleared = true;
    for (var i = 0; i < this.markers.length; ++i)
      this.markers[i].clear();
    signalLater(this, "clear");
  };
  SharedTextMarker.prototype.find = function(side, lineObj) {
    return this.primary.find(side, lineObj);
  };

  function markTextShared(doc, from, to, options, type) {
    options = copyObj(options);
    options.shared = false;
    var markers = [markText(doc, from, to, options, type)], primary = markers[0];
    var widget = options.widgetNode;
    linkedDocs(doc, function(doc) {
      if (widget) options.widgetNode = widget.cloneNode(true);
      markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
      for (var i = 0; i < doc.linked.length; ++i)
        if (doc.linked[i].isParent) return;
      primary = lst(markers);
    });
    return new SharedTextMarker(markers, primary);
  }

  function findSharedMarkers(doc) {
    return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())),
                         function(m) { return m.parent; });
  }

  function copySharedMarkers(doc, markers) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i], pos = marker.find();
      var mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
      if (cmp(mFrom, mTo)) {
        var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
        marker.markers.push(subMark);
        subMark.parent = marker;
      }
    }
  }

  function detachSharedMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i], linked = [marker.primary.doc];;
      linkedDocs(marker.primary.doc, function(d) { linked.push(d); });
      for (var j = 0; j < marker.markers.length; j++) {
        var subMarker = marker.markers[j];
        if (indexOf(linked, subMarker.doc) == -1) {
          subMarker.parent = null;
          marker.markers.splice(j--, 1);
        }
      }
    }
  }

  // TEXTMARKER SPANS

  function MarkedSpan(marker, from, to) {
    this.marker = marker;
    this.from = from; this.to = to;
  }

  // Search an array of spans for a span matching the given marker.
  function getMarkedSpanFor(spans, marker) {
    if (spans) for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.marker == marker) return span;
    }
  }
  // Remove a span from an array, returning undefined if no spans are
  // left (we don't store arrays for lines without spans).
  function removeMarkedSpan(spans, span) {
    for (var r, i = 0; i < spans.length; ++i)
      if (spans[i] != span) (r || (r = [])).push(spans[i]);
    return r;
  }
  // Add a span to a line.
  function addMarkedSpan(line, span) {
    line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
    span.marker.attachLine(line);
  }

  // Used for the algorithm that adjusts markers for a change in the
  // document. These functions cut an array of spans at a given
  // character position, returning an array of remaining chunks (or
  // undefined if nothing remains).
  function markedSpansBefore(old, startCh, isInsert) {
    if (old) for (var i = 0, nw; i < old.length; ++i) {
      var span = old[i], marker = span.marker;
      var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
      if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
        (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
      }
    }
    return nw;
  }
  function markedSpansAfter(old, endCh, isInsert) {
    if (old) for (var i = 0, nw; i < old.length; ++i) {
      var span = old[i], marker = span.marker;
      var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
      if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
        (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh,
                                              span.to == null ? null : span.to - endCh));
      }
    }
    return nw;
  }

  // Given a change object, compute the new set of marker spans that
  // cover the line in which the change took place. Removes spans
  // entirely within the change, reconnects spans belonging to the
  // same marker that appear on both sides of the change, and cuts off
  // spans partially within the change. Returns an array of span
  // arrays with one element for each line in (after) the change.
  function stretchSpansOverChange(doc, change) {
    if (change.full) return null;
    var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
    var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
    if (!oldFirst && !oldLast) return null;

    var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
    // Get the spans that 'stick out' on both sides
    var first = markedSpansBefore(oldFirst, startCh, isInsert);
    var last = markedSpansAfter(oldLast, endCh, isInsert);

    // Next, merge those two ends
    var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
    if (first) {
      // Fix up .to properties of first
      for (var i = 0; i < first.length; ++i) {
        var span = first[i];
        if (span.to == null) {
          var found = getMarkedSpanFor(last, span.marker);
          if (!found) span.to = startCh;
          else if (sameLine) span.to = found.to == null ? null : found.to + offset;
        }
      }
    }
    if (last) {
      // Fix up .from in last (or move them into first in case of sameLine)
      for (var i = 0; i < last.length; ++i) {
        var span = last[i];
        if (span.to != null) span.to += offset;
        if (span.from == null) {
          var found = getMarkedSpanFor(first, span.marker);
          if (!found) {
            span.from = offset;
            if (sameLine) (first || (first = [])).push(span);
          }
        } else {
          span.from += offset;
          if (sameLine) (first || (first = [])).push(span);
        }
      }
    }
    // Make sure we didn't create any zero-length spans
    if (first) first = clearEmptySpans(first);
    if (last && last != first) last = clearEmptySpans(last);

    var newMarkers = [first];
    if (!sameLine) {
      // Fill gap with whole-line-spans
      var gap = change.text.length - 2, gapMarkers;
      if (gap > 0 && first)
        for (var i = 0; i < first.length; ++i)
          if (first[i].to == null)
            (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i].marker, null, null));
      for (var i = 0; i < gap; ++i)
        newMarkers.push(gapMarkers);
      newMarkers.push(last);
    }
    return newMarkers;
  }

  // Remove spans that are empty and don't have a clearWhenEmpty
  // option of false.
  function clearEmptySpans(spans) {
    for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false)
        spans.splice(i--, 1);
    }
    if (!spans.length) return null;
    return spans;
  }

  // Used for un/re-doing changes from the history. Combines the
  // result of computing the existing spans with the set of spans that
  // existed in the history (so that deleting around a span and then
  // undoing brings back the span).
  function mergeOldSpans(doc, change) {
    var old = getOldSpans(doc, change);
    var stretched = stretchSpansOverChange(doc, change);
    if (!old) return stretched;
    if (!stretched) return old;

    for (var i = 0; i < old.length; ++i) {
      var oldCur = old[i], stretchCur = stretched[i];
      if (oldCur && stretchCur) {
        spans: for (var j = 0; j < stretchCur.length; ++j) {
          var span = stretchCur[j];
          for (var k = 0; k < oldCur.length; ++k)
            if (oldCur[k].marker == span.marker) continue spans;
          oldCur.push(span);
        }
      } else if (stretchCur) {
        old[i] = stretchCur;
      }
    }
    return old;
  }

  // Used to 'clip' out readOnly ranges when making a change.
  function removeReadOnlyRanges(doc, from, to) {
    var markers = null;
    doc.iter(from.line, to.line + 1, function(line) {
      if (line.markedSpans) for (var i = 0; i < line.markedSpans.length; ++i) {
        var mark = line.markedSpans[i].marker;
        if (mark.readOnly && (!markers || indexOf(markers, mark) == -1))
          (markers || (markers = [])).push(mark);
      }
    });
    if (!markers) return null;
    var parts = [{from: from, to: to}];
    for (var i = 0; i < markers.length; ++i) {
      var mk = markers[i], m = mk.find(0);
      for (var j = 0; j < parts.length; ++j) {
        var p = parts[j];
        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) continue;
        var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom)
          newParts.push({from: p.from, to: m.from});
        if (dto > 0 || !mk.inclusiveRight && !dto)
          newParts.push({from: m.to, to: p.to});
        parts.splice.apply(parts, newParts);
        j += newParts.length - 1;
      }
    }
    return parts;
  }

  // Connect or disconnect spans from a line.
  function detachMarkedSpans(line) {
    var spans = line.markedSpans;
    if (!spans) return;
    for (var i = 0; i < spans.length; ++i)
      spans[i].marker.detachLine(line);
    line.markedSpans = null;
  }
  function attachMarkedSpans(line, spans) {
    if (!spans) return;
    for (var i = 0; i < spans.length; ++i)
      spans[i].marker.attachLine(line);
    line.markedSpans = spans;
  }

  // Helpers used when computing which overlapping collapsed span
  // counts as the larger one.
  function extraLeft(marker) { return marker.inclusiveLeft ? -1 : 0; }
  function extraRight(marker) { return marker.inclusiveRight ? 1 : 0; }

  // Returns a number indicating which of two overlapping collapsed
  // spans is larger (and thus includes the other). Falls back to
  // comparing ids when the spans cover exactly the same range.
  function compareCollapsedMarkers(a, b) {
    var lenDiff = a.lines.length - b.lines.length;
    if (lenDiff != 0) return lenDiff;
    var aPos = a.find(), bPos = b.find();
    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
    if (fromCmp) return -fromCmp;
    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
    if (toCmp) return toCmp;
    return b.id - a.id;
  }

  // Find out whether a line ends or starts in a collapsed span. If
  // so, return the marker for that span.
  function collapsedSpanAtSide(line, start) {
    var sps = sawCollapsedSpans && line.markedSpans, found;
    if (sps) for (var sp, i = 0; i < sps.length; ++i) {
      sp = sps[i];
      if (sp.marker.collapsed && (start ? sp.from : sp.to) == null &&
          (!found || compareCollapsedMarkers(found, sp.marker) < 0))
        found = sp.marker;
    }
    return found;
  }
  function collapsedSpanAtStart(line) { return collapsedSpanAtSide(line, true); }
  function collapsedSpanAtEnd(line) { return collapsedSpanAtSide(line, false); }

  // Test whether there exists a collapsed span that partially
  // overlaps (covers the start or end, but not both) of a new span.
  // Such overlap is not allowed.
  function conflictingCollapsedRange(doc, lineNo, from, to, marker) {
    var line = getLine(doc, lineNo);
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) for (var i = 0; i < sps.length; ++i) {
      var sp = sps[i];
      if (!sp.marker.collapsed) continue;
      var found = sp.marker.find(0);
      var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
      var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
      if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) continue;
      if (fromCmp <= 0 && (cmp(found.to, from) > 0 || (sp.marker.inclusiveRight && marker.inclusiveLeft)) ||
          fromCmp >= 0 && (cmp(found.from, to) < 0 || (sp.marker.inclusiveLeft && marker.inclusiveRight)))
        return true;
    }
  }

  // A visual line is a line as drawn on the screen. Folding, for
  // example, can cause multiple logical lines to appear on the same
  // visual line. This finds the start of the visual line that the
  // given line is part of (usually that is the line itself).
  function visualLine(line) {
    var merged;
    while (merged = collapsedSpanAtStart(line))
      line = merged.find(-1, true).line;
    return line;
  }

  // Returns an array of logical lines that continue the visual line
  // started by the argument, or undefined if there are no such lines.
  function visualLineContinued(line) {
    var merged, lines;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
      (lines || (lines = [])).push(line);
    }
    return lines;
  }

  // Get the line number of the start of the visual line that the
  // given line number is part of.
  function visualLineNo(doc, lineN) {
    var line = getLine(doc, lineN), vis = visualLine(line);
    if (line == vis) return lineN;
    return lineNo(vis);
  }
  // Get the line number of the start of the next visual line after
  // the given line.
  function visualLineEndNo(doc, lineN) {
    if (lineN > doc.lastLine()) return lineN;
    var line = getLine(doc, lineN), merged;
    if (!lineIsHidden(doc, line)) return lineN;
    while (merged = collapsedSpanAtEnd(line))
      line = merged.find(1, true).line;
    return lineNo(line) + 1;
  }

  // Compute whether a line is hidden. Lines count as hidden when they
  // are part of a visual line that starts with another line, or when
  // they are entirely covered by collapsed, non-widget span.
  function lineIsHidden(doc, line) {
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) for (var sp, i = 0; i < sps.length; ++i) {
      sp = sps[i];
      if (!sp.marker.collapsed) continue;
      if (sp.from == null) return true;
      if (sp.marker.widgetNode) continue;
      if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp))
        return true;
    }
  }
  function lineIsHiddenInner(doc, line, span) {
    if (span.to == null) {
      var end = span.marker.find(1, true);
      return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
    }
    if (span.marker.inclusiveRight && span.to == line.text.length)
      return true;
    for (var sp, i = 0; i < line.markedSpans.length; ++i) {
      sp = line.markedSpans[i];
      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to &&
          (sp.to == null || sp.to != span.from) &&
          (sp.marker.inclusiveLeft || span.marker.inclusiveRight) &&
          lineIsHiddenInner(doc, line, sp)) return true;
    }
  }

  // LINE WIDGETS

  // Line widgets are block elements displayed above or below a line.

  var LineWidget = CodeMirror.LineWidget = function(doc, node, options) {
    if (options) for (var opt in options) if (options.hasOwnProperty(opt))
      this[opt] = options[opt];
    this.doc = doc;
    this.node = node;
  };
  eventMixin(LineWidget);

  function adjustScrollWhenAboveVisible(cm, line, diff) {
    if (heightAtLine(line) < ((cm.curOp && cm.curOp.scrollTop) || cm.doc.scrollTop))
      addToScrollPos(cm, null, diff);
  }

  LineWidget.prototype.clear = function() {
    var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
    if (no == null || !ws) return;
    for (var i = 0; i < ws.length; ++i) if (ws[i] == this) ws.splice(i--, 1);
    if (!ws.length) line.widgets = null;
    var height = widgetHeight(this);
    updateLineHeight(line, Math.max(0, line.height - height));
    if (cm) runInOp(cm, function() {
      adjustScrollWhenAboveVisible(cm, line, -height);
      regLineChange(cm, no, "widget");
    });
  };
  LineWidget.prototype.changed = function() {
    var oldH = this.height, cm = this.doc.cm, line = this.line;
    this.height = null;
    var diff = widgetHeight(this) - oldH;
    if (!diff) return;
    updateLineHeight(line, line.height + diff);
    if (cm) runInOp(cm, function() {
      cm.curOp.forceUpdate = true;
      adjustScrollWhenAboveVisible(cm, line, diff);
    });
  };

  function widgetHeight(widget) {
    if (widget.height != null) return widget.height;
    var cm = widget.doc.cm;
    if (!cm) return 0;
    if (!contains(document.body, widget.node)) {
      var parentStyle = "position: relative;";
      if (widget.coverGutter)
        parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
      if (widget.noHScroll)
        parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
      removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
    }
    return widget.height = widget.node.parentNode.offsetHeight;
  }

  function addLineWidget(doc, handle, node, options) {
    var widget = new LineWidget(doc, node, options);
    var cm = doc.cm;
    if (cm && widget.noHScroll) cm.display.alignWidgets = true;
    changeLine(doc, handle, "widget", function(line) {
      var widgets = line.widgets || (line.widgets = []);
      if (widget.insertAt == null) widgets.push(widget);
      else widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget);
      widget.line = line;
      if (cm && !lineIsHidden(doc, line)) {
        var aboveVisible = heightAtLine(line) < doc.scrollTop;
        updateLineHeight(line, line.height + widgetHeight(widget));
        if (aboveVisible) addToScrollPos(cm, null, widget.height);
        cm.curOp.forceUpdate = true;
      }
      return true;
    });
    return widget;
  }

  // LINE DATA STRUCTURE

  // Line objects. These hold state related to a line, including
  // highlighting info (the styles array).
  var Line = CodeMirror.Line = function(text, markedSpans, estimateHeight) {
    this.text = text;
    attachMarkedSpans(this, markedSpans);
    this.height = estimateHeight ? estimateHeight(this) : 1;
  };
  eventMixin(Line);
  Line.prototype.lineNo = function() { return lineNo(this); };

  // Change the content (text, markers) of a line. Automatically
  // invalidates cached information and tries to re-estimate the
  // line's height.
  function updateLine(line, text, markedSpans, estimateHeight) {
    line.text = text;
    if (line.stateAfter) line.stateAfter = null;
    if (line.styles) line.styles = null;
    if (line.order != null) line.order = null;
    detachMarkedSpans(line);
    attachMarkedSpans(line, markedSpans);
    var estHeight = estimateHeight ? estimateHeight(line) : 1;
    if (estHeight != line.height) updateLineHeight(line, estHeight);
  }

  // Detach a line from the document tree and its markers.
  function cleanUpLine(line) {
    line.parent = null;
    detachMarkedSpans(line);
  }

  function extractLineClasses(type, output) {
    if (type) for (;;) {
      var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
      if (!lineClass) break;
      type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
      var prop = lineClass[1] ? "bgClass" : "textClass";
      if (output[prop] == null)
        output[prop] = lineClass[2];
      else if (!(new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)")).test(output[prop]))
        output[prop] += " " + lineClass[2];
    }
    return type;
  }

  function callBlankLine(mode, state) {
    if (mode.blankLine) return mode.blankLine(state);
    if (!mode.innerMode) return;
    var inner = CodeMirror.innerMode(mode, state);
    if (inner.mode.blankLine) return inner.mode.blankLine(inner.state);
  }

  function readToken(mode, stream, state, inner) {
    for (var i = 0; i < 10; i++) {
      if (inner) inner[0] = CodeMirror.innerMode(mode, state).mode;
      var style = mode.token(stream, state);
      if (stream.pos > stream.start) return style;
    }
    throw new Error("Mode " + mode.name + " failed to advance stream.");
  }

  // Utility for getTokenAt and getLineTokens
  function takeToken(cm, pos, precise, asArray) {
    function getObj(copy) {
      return {start: stream.start, end: stream.pos,
              string: stream.current(),
              type: style || null,
              state: copy ? copyState(doc.mode, state) : state};
    }

    var doc = cm.doc, mode = doc.mode, style;
    pos = clipPos(doc, pos);
    var line = getLine(doc, pos.line), state = getStateBefore(cm, pos.line, precise);
    var stream = new StringStream(line.text, cm.options.tabSize), tokens;
    if (asArray) tokens = [];
    while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
      stream.start = stream.pos;
      style = readToken(mode, stream, state);
      if (asArray) tokens.push(getObj(true));
    }
    return asArray ? tokens : getObj();
  }

  // Run the given mode's parser over a line, calling f for each token.
  function runMode(cm, text, mode, state, f, lineClasses, forceToEnd) {
    var flattenSpans = mode.flattenSpans;
    if (flattenSpans == null) flattenSpans = cm.options.flattenSpans;
    var curStart = 0, curStyle = null;
    var stream = new StringStream(text, cm.options.tabSize), style;
    var inner = cm.options.addModeClass && [null];
    if (text == "") extractLineClasses(callBlankLine(mode, state), lineClasses);
    while (!stream.eol()) {
      if (stream.pos > cm.options.maxHighlightLength) {
        flattenSpans = false;
        if (forceToEnd) processLine(cm, text, state, stream.pos);
        stream.pos = text.length;
        style = null;
      } else {
        style = extractLineClasses(readToken(mode, stream, state, inner), lineClasses);
      }
      if (inner) {
        var mName = inner[0].name;
        if (mName) style = "m-" + (style ? mName + " " + style : mName);
      }
      if (!flattenSpans || curStyle != style) {
        while (curStart < stream.start) {
          curStart = Math.min(stream.start, curStart + 50000);
          f(curStart, curStyle);
        }
        curStyle = style;
      }
      stream.start = stream.pos;
    }
    while (curStart < stream.pos) {
      // Webkit seems to refuse to render text nodes longer than 57444 characters
      var pos = Math.min(stream.pos, curStart + 50000);
      f(pos, curStyle);
      curStart = pos;
    }
  }

  // Compute a style array (an array starting with a mode generation
  // -- for invalidation -- followed by pairs of end positions and
  // style strings), which is used to highlight the tokens on the
  // line.
  function highlightLine(cm, line, state, forceToEnd) {
    // A styles array always starts with a number identifying the
    // mode/overlays that it is based on (for easy invalidation).
    var st = [cm.state.modeGen], lineClasses = {};
    // Compute the base array of styles
    runMode(cm, line.text, cm.doc.mode, state, function(end, style) {
      st.push(end, style);
    }, lineClasses, forceToEnd);

    // Run overlays, adjust style array.
    for (var o = 0; o < cm.state.overlays.length; ++o) {
      var overlay = cm.state.overlays[o], i = 1, at = 0;
      runMode(cm, line.text, overlay.mode, true, function(end, style) {
        var start = i;
        // Ensure there's a token end at the current position, and that i points at it
        while (at < end) {
          var i_end = st[i];
          if (i_end > end)
            st.splice(i, 1, end, st[i+1], i_end);
          i += 2;
          at = Math.min(end, i_end);
        }
        if (!style) return;
        if (overlay.opaque) {
          st.splice(start, i - start, end, "cm-overlay " + style);
          i = start + 2;
        } else {
          for (; start < i; start += 2) {
            var cur = st[start+1];
            st[start+1] = (cur ? cur + " " : "") + "cm-overlay " + style;
          }
        }
      }, lineClasses);
    }

    return {styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null};
  }

  function getLineStyles(cm, line, updateFrontier) {
    if (!line.styles || line.styles[0] != cm.state.modeGen) {
      var state = getStateBefore(cm, lineNo(line));
      var result = highlightLine(cm, line, line.text.length > cm.options.maxHighlightLength ? copyState(cm.doc.mode, state) : state);
      line.stateAfter = state;
      line.styles = result.styles;
      if (result.classes) line.styleClasses = result.classes;
      else if (line.styleClasses) line.styleClasses = null;
      if (updateFrontier === cm.doc.frontier) cm.doc.frontier++;
    }
    return line.styles;
  }

  // Lightweight form of highlight -- proceed over this line and
  // update state, but don't save a style array. Used for lines that
  // aren't currently visible.
  function processLine(cm, text, state, startAt) {
    var mode = cm.doc.mode;
    var stream = new StringStream(text, cm.options.tabSize);
    stream.start = stream.pos = startAt || 0;
    if (text == "") callBlankLine(mode, state);
    while (!stream.eol()) {
      readToken(mode, stream, state);
      stream.start = stream.pos;
    }
  }

  // Convert a style as returned by a mode (either null, or a string
  // containing one or more styles) to a CSS style. This is cached,
  // and also looks for line-wide styles.
  var styleToClassCache = {}, styleToClassCacheWithMode = {};
  function interpretTokenStyle(style, options) {
    if (!style || /^\s*$/.test(style)) return null;
    var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
    return cache[style] ||
      (cache[style] = style.replace(/\S+/g, "cm-$&"));
  }

  // Render the DOM representation of the text of a line. Also builds
  // up a 'line map', which points at the DOM nodes that represent
  // specific stretches of text, and is used by the measuring code.
  // The returned object contains the DOM node, this map, and
  // information about line-wide styles that were set by the mode.
  function buildLineContent(cm, lineView) {
    // The padding-right forces the element to have a 'border', which
    // is needed on Webkit to be able to get line-level bounding
    // rectangles for it (in measureChar).
    var content = elt("span", null, null, webkit ? "padding-right: .1px" : null);
    var builder = {pre: elt("pre", [content], "CodeMirror-line"), content: content,
                   col: 0, pos: 0, cm: cm,
                   splitSpaces: (ie || webkit) && cm.getOption("lineWrapping")};
    lineView.measure = {};

    // Iterate over the logical lines that make up this visual line.
    for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
      var line = i ? lineView.rest[i - 1] : lineView.line, order;
      builder.pos = 0;
      builder.addToken = buildToken;
      // Optionally wire in some hacks into the token-rendering
      // algorithm, to deal with browser quirks.
      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line)))
        builder.addToken = buildTokenBadBidi(builder.addToken, order);
      builder.map = [];
      var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
      insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
      if (line.styleClasses) {
        if (line.styleClasses.bgClass)
          builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
        if (line.styleClasses.textClass)
          builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
      }

      // Ensure at least a single node is present, for measuring.
      if (builder.map.length == 0)
        builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));

      // Store the map and a cache object for the current logical line
      if (i == 0) {
        lineView.measure.map = builder.map;
        lineView.measure.cache = {};
      } else {
        (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
        (lineView.measure.caches || (lineView.measure.caches = [])).push({});
      }
    }

    // See issue #2901
    if (webkit && /\bcm-tab\b/.test(builder.content.lastChild.className))
      builder.content.className = "cm-tab-wrap-hack";

    signal(cm, "renderLine", cm, lineView.line, builder.pre);
    if (builder.pre.className)
      builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");

    return builder;
  }

  function defaultSpecialCharPlaceholder(ch) {
    var token = elt("span", "\u2022", "cm-invalidchar");
    token.title = "\\u" + ch.charCodeAt(0).toString(16);
    token.setAttribute("aria-label", token.title);
    return token;
  }

  // Build up the DOM representation for a single token, and add it to
  // the line map. Takes care to render special characters separately.
  function buildToken(builder, text, style, startStyle, endStyle, title, css) {
    if (!text) return;
    var displayText = builder.splitSpaces ? text.replace(/ {3,}/g, splitSpaces) : text;
    var special = builder.cm.state.specialChars, mustWrap = false;
    if (!special.test(text)) {
      builder.col += text.length;
      var content = document.createTextNode(displayText);
      builder.map.push(builder.pos, builder.pos + text.length, content);
      if (ie && ie_version < 9) mustWrap = true;
      builder.pos += text.length;
    } else {
      var content = document.createDocumentFragment(), pos = 0;
      while (true) {
        special.lastIndex = pos;
        var m = special.exec(text);
        var skipped = m ? m.index - pos : text.length - pos;
        if (skipped) {
          var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
          if (ie && ie_version < 9) content.appendChild(elt("span", [txt]));
          else content.appendChild(txt);
          builder.map.push(builder.pos, builder.pos + skipped, txt);
          builder.col += skipped;
          builder.pos += skipped;
        }
        if (!m) break;
        pos += skipped + 1;
        if (m[0] == "\t") {
          var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
          var txt = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
          txt.setAttribute("role", "presentation");
          txt.setAttribute("cm-text", "\t");
          builder.col += tabWidth;
        } else if (m[0] == "\r" || m[0] == "\n") {
          var txt = content.appendChild(elt("span", m[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
          txt.setAttribute("cm-text", m[0]);
          builder.col += 1;
        } else {
          var txt = builder.cm.options.specialCharPlaceholder(m[0]);
          txt.setAttribute("cm-text", m[0]);
          if (ie && ie_version < 9) content.appendChild(elt("span", [txt]));
          else content.appendChild(txt);
          builder.col += 1;
        }
        builder.map.push(builder.pos, builder.pos + 1, txt);
        builder.pos++;
      }
    }
    if (style || startStyle || endStyle || mustWrap || css) {
      var fullStyle = style || "";
      if (startStyle) fullStyle += startStyle;
      if (endStyle) fullStyle += endStyle;
      var token = elt("span", [content], fullStyle, css);
      if (title) token.title = title;
      return builder.content.appendChild(token);
    }
    builder.content.appendChild(content);
  }

  function splitSpaces(old) {
    var out = " ";
    for (var i = 0; i < old.length - 2; ++i) out += i % 2 ? " " : "\u00a0";
    out += " ";
    return out;
  }

  // Work around nonsense dimensions being reported for stretches of
  // right-to-left text.
  function buildTokenBadBidi(inner, order) {
    return function(builder, text, style, startStyle, endStyle, title, css) {
      style = style ? style + " cm-force-border" : "cm-force-border";
      var start = builder.pos, end = start + text.length;
      for (;;) {
        // Find the part that overlaps with the start of this text
        for (var i = 0; i < order.length; i++) {
          var part = order[i];
          if (part.to > start && part.from <= start) break;
        }
        if (part.to >= end) return inner(builder, text, style, startStyle, endStyle, title, css);
        inner(builder, text.slice(0, part.to - start), style, startStyle, null, title, css);
        startStyle = null;
        text = text.slice(part.to - start);
        start = part.to;
      }
    };
  }

  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
    var widget = !ignoreWidget && marker.widgetNode;
    if (widget) builder.map.push(builder.pos, builder.pos + size, widget);
    if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
      if (!widget)
        widget = builder.content.appendChild(document.createElement("span"));
      widget.setAttribute("cm-marker", marker.id);
    }
    if (widget) {
      builder.cm.display.input.setUneditable(widget);
      builder.content.appendChild(widget);
    }
    builder.pos += size;
  }

  // Outputs a number of spans to make up a line, taking highlighting
  // and marked text into account.
  function insertLineContent(line, builder, styles) {
    var spans = line.markedSpans, allText = line.text, at = 0;
    if (!spans) {
      for (var i = 1; i < styles.length; i+=2)
        builder.addToken(builder, allText.slice(at, at = styles[i]), interpretTokenStyle(styles[i+1], builder.cm.options));
      return;
    }

    var len = allText.length, pos = 0, i = 1, text = "", style, css;
    var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, title, collapsed;
    for (;;) {
      if (nextChange == pos) { // Update current marker set
        spanStyle = spanEndStyle = spanStartStyle = title = css = "";
        collapsed = null; nextChange = Infinity;
        var foundBookmarks = [], endStyles
        for (var j = 0; j < spans.length; ++j) {
          var sp = spans[j], m = sp.marker;
          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
            foundBookmarks.push(m);
          } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
            if (sp.to != null && sp.to != pos && nextChange > sp.to) {
              nextChange = sp.to;
              spanEndStyle = "";
            }
            if (m.className) spanStyle += " " + m.className;
            if (m.css) css = (css ? css + ";" : "") + m.css;
            if (m.startStyle && sp.from == pos) spanStartStyle += " " + m.startStyle;
            if (m.endStyle && sp.to == nextChange) (endStyles || (endStyles = [])).push(m.endStyle, sp.to)
            if (m.title && !title) title = m.title;
            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0))
              collapsed = sp;
          } else if (sp.from > pos && nextChange > sp.from) {
            nextChange = sp.from;
          }
        }
        if (endStyles) for (var j = 0; j < endStyles.length; j += 2)
          if (endStyles[j + 1] == nextChange) spanEndStyle += " " + endStyles[j]

        if (!collapsed || collapsed.from == pos) for (var j = 0; j < foundBookmarks.length; ++j)
          buildCollapsedSpan(builder, 0, foundBookmarks[j]);
        if (collapsed && (collapsed.from || 0) == pos) {
          buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos,
                             collapsed.marker, collapsed.from == null);
          if (collapsed.to == null) return;
          if (collapsed.to == pos) collapsed = false;
        }
      }
      if (pos >= len) break;

      var upto = Math.min(len, nextChange);
      while (true) {
        if (text) {
          var end = pos + text.length;
          if (!collapsed) {
            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
            builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle,
                             spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title, css);
          }
          if (end >= upto) {text = text.slice(upto - pos); pos = upto; break;}
          pos = end;
          spanStartStyle = "";
        }
        text = allText.slice(at, at = styles[i++]);
        style = interpretTokenStyle(styles[i++], builder.cm.options);
      }
    }
  }

  // DOCUMENT DATA STRUCTURE

  // By default, updates that start and end at the beginning of a line
  // are treated specially, in order to make the association of line
  // widgets and marker elements with the text behave more intuitive.
  function isWholeLineUpdate(doc, change) {
    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" &&
      (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
  }

  // Perform a change on the document data structure.
  function updateDoc(doc, change, markedSpans, estimateHeight) {
    function spansFor(n) {return markedSpans ? markedSpans[n] : null;}
    function update(line, text, spans) {
      updateLine(line, text, spans, estimateHeight);
      signalLater(line, "change", line, change);
    }
    function linesFor(start, end) {
      for (var i = start, result = []; i < end; ++i)
        result.push(new Line(text[i], spansFor(i), estimateHeight));
      return result;
    }

    var from = change.from, to = change.to, text = change.text;
    var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
    var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;

    // Adjust the line structure
    if (change.full) {
      doc.insert(0, linesFor(0, text.length));
      doc.remove(text.length, doc.size - text.length);
    } else if (isWholeLineUpdate(doc, change)) {
      // This is a whole-line replace. Treated specially to make
      // sure line objects move the way they are supposed to.
      var added = linesFor(0, text.length - 1);
      update(lastLine, lastLine.text, lastSpans);
      if (nlines) doc.remove(from.line, nlines);
      if (added.length) doc.insert(from.line, added);
    } else if (firstLine == lastLine) {
      if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
      } else {
        var added = linesFor(1, text.length - 1);
        added.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight));
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        doc.insert(from.line + 1, added);
      }
    } else if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
      doc.remove(from.line + 1, nlines);
    } else {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
      var added = linesFor(1, text.length - 1);
      if (nlines > 1) doc.remove(from.line + 1, nlines - 1);
      doc.insert(from.line + 1, added);
    }

    signalLater(doc, "change", doc, change);
  }

  // The document is represented as a BTree consisting of leaves, with
  // chunk of lines in them, and branches, with up to ten leaves or
  // other branch nodes below them. The top node is always a branch
  // node, and is the document object itself (meaning it has
  // additional methods and properties).
  //
  // All nodes have parent links. The tree is used both to go from
  // line numbers to line objects, and to go from objects to numbers.
  // It also indexes by height, and is used to convert between height
  // and line object, and to find the total height of the document.
  //
  // See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html

  function LeafChunk(lines) {
    this.lines = lines;
    this.parent = null;
    for (var i = 0, height = 0; i < lines.length; ++i) {
      lines[i].parent = this;
      height += lines[i].height;
    }
    this.height = height;
  }

  LeafChunk.prototype = {
    chunkSize: function() { return this.lines.length; },
    // Remove the n lines at offset 'at'.
    removeInner: function(at, n) {
      for (var i = at, e = at + n; i < e; ++i) {
        var line = this.lines[i];
        this.height -= line.height;
        cleanUpLine(line);
        signalLater(line, "delete");
      }
      this.lines.splice(at, n);
    },
    // Helper used to collapse a small branch into a single leaf.
    collapse: function(lines) {
      lines.push.apply(lines, this.lines);
    },
    // Insert the given array of lines at offset 'at', count them as
    // having the given height.
    insertInner: function(at, lines, height) {
      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i = 0; i < lines.length; ++i) lines[i].parent = this;
    },
    // Used to iterate over a part of the tree.
    iterN: function(at, n, op) {
      for (var e = at + n; at < e; ++at)
        if (op(this.lines[at])) return true;
    }
  };

  function BranchChunk(children) {
    this.children = children;
    var size = 0, height = 0;
    for (var i = 0; i < children.length; ++i) {
      var ch = children[i];
      size += ch.chunkSize(); height += ch.height;
      ch.parent = this;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }

  BranchChunk.prototype = {
    chunkSize: function() { return this.size; },
    removeInner: function(at, n) {
      this.size -= n;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at), oldHeight = child.height;
          child.removeInner(at, rm);
          this.height -= oldHeight - child.height;
          if (sz == rm) { this.children.splice(i--, 1); child.parent = null; }
          if ((n -= rm) == 0) break;
          at = 0;
        } else at -= sz;
      }
      // If the result is smaller than 25 lines, ensure that it is a
      // single leaf node.
      if (this.size - n < 25 &&
          (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },
    collapse: function(lines) {
      for (var i = 0; i < this.children.length; ++i) this.children[i].collapse(lines);
    },
    insertInner: function(at, lines, height) {
      this.size += lines.length;
      this.height += height;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at <= sz) {
          child.insertInner(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            while (child.lines.length > 50) {
              var spilled = child.lines.splice(child.lines.length - 25, 25);
              var newleaf = new LeafChunk(spilled);
              child.height -= newleaf.height;
              this.children.splice(i + 1, 0, newleaf);
              newleaf.parent = this;
            }
            this.maybeSpill();
          }
          break;
        }
        at -= sz;
      }
    },
    // When a node has grown, check whether it should be split.
    maybeSpill: function() {
      if (this.children.length <= 10) return;
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) { // Become the parent node
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
        } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10);
      me.parent.maybeSpill();
    },
    iterN: function(at, n, op) {
      for (var i = 0; i < this.children.length; ++i) {
        var child = this.children[i], sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op)) return true;
          if ((n -= used) == 0) break;
          at = 0;
        } else at -= sz;
      }
    }
  };

  var nextDocId = 0;
  var Doc = CodeMirror.Doc = function(text, mode, firstLine, lineSep) {
    if (!(this instanceof Doc)) return new Doc(text, mode, firstLine, lineSep);
    if (firstLine == null) firstLine = 0;

    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
    this.first = firstLine;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = false;
    this.cleanGeneration = 1;
    this.frontier = firstLine;
    var start = Pos(firstLine, 0);
    this.sel = simpleSelection(start);
    this.history = new History(null);
    this.id = ++nextDocId;
    this.modeOption = mode;
    this.lineSep = lineSep;
    this.extend = false;

    if (typeof text == "string") text = this.splitLines(text);
    updateDoc(this, {from: start, to: start, text: text});
    setSelection(this, simpleSelection(start), sel_dontScroll);
  };

  Doc.prototype = createObj(BranchChunk.prototype, {
    constructor: Doc,
    // Iterate over the document. Supports two forms -- with only one
    // argument, it calls that for each line in the document. With
    // three, it iterates over the range given by the first two (with
    // the second being non-inclusive).
    iter: function(from, to, op) {
      if (op) this.iterN(from - this.first, to - from, op);
      else this.iterN(this.first, this.first + this.size, from);
    },

    // Non-public interface for adding and removing lines.
    insert: function(at, lines) {
      var height = 0;
      for (var i = 0; i < lines.length; ++i) height += lines[i].height;
      this.insertInner(at - this.first, lines, height);
    },
    remove: function(at, n) { this.removeInner(at - this.first, n); },

    // From here, the methods are part of the public interface. Most
    // are also available from CodeMirror (editor) instances.

    getValue: function(lineSep) {
      var lines = getLines(this, this.first, this.first + this.size);
      if (lineSep === false) return lines;
      return lines.join(lineSep || this.lineSeparator());
    },
    setValue: docMethodOp(function(code) {
      var top = Pos(this.first, 0), last = this.first + this.size - 1;
      makeChange(this, {from: top, to: Pos(last, getLine(this, last).text.length),
                        text: this.splitLines(code), origin: "setValue", full: true}, true);
      setSelection(this, simpleSelection(top));
    }),
    replaceRange: function(code, from, to, origin) {
      from = clipPos(this, from);
      to = to ? clipPos(this, to) : from;
      replaceRange(this, code, from, to, origin);
    },
    getRange: function(from, to, lineSep) {
      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
      if (lineSep === false) return lines;
      return lines.join(lineSep || this.lineSeparator());
    },

    getLine: function(line) {var l = this.getLineHandle(line); return l && l.text;},

    getLineHandle: function(line) {if (isLine(this, line)) return getLine(this, line);},
    getLineNumber: function(line) {return lineNo(line);},

    getLineHandleVisualStart: function(line) {
      if (typeof line == "number") line = getLine(this, line);
      return visualLine(line);
    },

    lineCount: function() {return this.size;},
    firstLine: function() {return this.first;},
    lastLine: function() {return this.first + this.size - 1;},

    clipPos: function(pos) {return clipPos(this, pos);},

    getCursor: function(start) {
      var range = this.sel.primary(), pos;
      if (start == null || start == "head") pos = range.head;
      else if (start == "anchor") pos = range.anchor;
      else if (start == "end" || start == "to" || start === false) pos = range.to();
      else pos = range.from();
      return pos;
    },
    listSelections: function() { return this.sel.ranges; },
    somethingSelected: function() {return this.sel.somethingSelected();},

    setCursor: docMethodOp(function(line, ch, options) {
      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
    }),
    setSelection: docMethodOp(function(anchor, head, options) {
      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
    }),
    extendSelection: docMethodOp(function(head, other, options) {
      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
    }),
    extendSelections: docMethodOp(function(heads, options) {
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    extendSelectionsBy: docMethodOp(function(f, options) {
      var heads = map(this.sel.ranges, f);
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    setSelections: docMethodOp(function(ranges, primary, options) {
      if (!ranges.length) return;
      for (var i = 0, out = []; i < ranges.length; i++)
        out[i] = new Range(clipPos(this, ranges[i].anchor),
                           clipPos(this, ranges[i].head));
      if (primary == null) primary = Math.min(ranges.length - 1, this.sel.primIndex);
      setSelection(this, normalizeSelection(out, primary), options);
    }),
    addSelection: docMethodOp(function(anchor, head, options) {
      var ranges = this.sel.ranges.slice(0);
      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
      setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
    }),

    getSelection: function(lineSep) {
      var ranges = this.sel.ranges, lines;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
        lines = lines ? lines.concat(sel) : sel;
      }
      if (lineSep === false) return lines;
      else return lines.join(lineSep || this.lineSeparator());
    },
    getSelections: function(lineSep) {
      var parts = [], ranges = this.sel.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
        if (lineSep !== false) sel = sel.join(lineSep || this.lineSeparator());
        parts[i] = sel;
      }
      return parts;
    },
    replaceSelection: function(code, collapse, origin) {
      var dup = [];
      for (var i = 0; i < this.sel.ranges.length; i++)
        dup[i] = code;
      this.replaceSelections(dup, collapse, origin || "+input");
    },
    replaceSelections: docMethodOp(function(code, collapse, origin) {
      var changes = [], sel = this.sel;
      for (var i = 0; i < sel.ranges.length; i++) {
        var range = sel.ranges[i];
        changes[i] = {from: range.from(), to: range.to(), text: this.splitLines(code[i]), origin: origin};
      }
      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
      for (var i = changes.length - 1; i >= 0; i--)
        makeChange(this, changes[i]);
      if (newSel) setSelectionReplaceHistory(this, newSel);
      else if (this.cm) ensureCursorVisible(this.cm);
    }),
    undo: docMethodOp(function() {makeChangeFromHistory(this, "undo");}),
    redo: docMethodOp(function() {makeChangeFromHistory(this, "redo");}),
    undoSelection: docMethodOp(function() {makeChangeFromHistory(this, "undo", true);}),
    redoSelection: docMethodOp(function() {makeChangeFromHistory(this, "redo", true);}),

    setExtending: function(val) {this.extend = val;},
    getExtending: function() {return this.extend;},

    historySize: function() {
      var hist = this.history, done = 0, undone = 0;
      for (var i = 0; i < hist.done.length; i++) if (!hist.done[i].ranges) ++done;
      for (var i = 0; i < hist.undone.length; i++) if (!hist.undone[i].ranges) ++undone;
      return {undo: done, redo: undone};
    },
    clearHistory: function() {this.history = new History(this.history.maxGeneration);},

    markClean: function() {
      this.cleanGeneration = this.changeGeneration(true);
    },
    changeGeneration: function(forceSplit) {
      if (forceSplit)
        this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
      return this.history.generation;
    },
    isClean: function (gen) {
      return this.history.generation == (gen || this.cleanGeneration);
    },

    getHistory: function() {
      return {done: copyHistoryArray(this.history.done),
              undone: copyHistoryArray(this.history.undone)};
    },
    setHistory: function(histData) {
      var hist = this.history = new History(this.history.maxGeneration);
      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
    },

    addLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
        var prop = where == "text" ? "textClass"
                 : where == "background" ? "bgClass"
                 : where == "gutter" ? "gutterClass" : "wrapClass";
        if (!line[prop]) line[prop] = cls;
        else if (classTest(cls).test(line[prop])) return false;
        else line[prop] += " " + cls;
        return true;
      });
    }),
    removeLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
        var prop = where == "text" ? "textClass"
                 : where == "background" ? "bgClass"
                 : where == "gutter" ? "gutterClass" : "wrapClass";
        var cur = line[prop];
        if (!cur) return false;
        else if (cls == null) line[prop] = null;
        else {
          var found = cur.match(classTest(cls));
          if (!found) return false;
          var end = found.index + found[0].length;
          line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
        }
        return true;
      });
    }),

    addLineWidget: docMethodOp(function(handle, node, options) {
      return addLineWidget(this, handle, node, options);
    }),
    removeLineWidget: function(widget) { widget.clear(); },

    markText: function(from, to, options) {
      return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
    },
    setBookmark: function(pos, options) {
      var realOpts = {replacedWith: options && (options.nodeType == null ? options.widget : options),
                      insertLeft: options && options.insertLeft,
                      clearWhenEmpty: false, shared: options && options.shared,
                      handleMouseEvents: options && options.handleMouseEvents};
      pos = clipPos(this, pos);
      return markText(this, pos, pos, realOpts, "bookmark");
    },
    findMarksAt: function(pos) {
      pos = clipPos(this, pos);
      var markers = [], spans = getLine(this, pos.line).markedSpans;
      if (spans) for (var i = 0; i < spans.length; ++i) {
        var span = spans[i];
        if ((span.from == null || span.from <= pos.ch) &&
            (span.to == null || span.to >= pos.ch))
          markers.push(span.marker.parent || span.marker);
      }
      return markers;
    },
    findMarks: function(from, to, filter) {
      from = clipPos(this, from); to = clipPos(this, to);
      var found = [], lineNo = from.line;
      this.iter(from.line, to.line + 1, function(line) {
        var spans = line.markedSpans;
        if (spans) for (var i = 0; i < spans.length; i++) {
          var span = spans[i];
          if (!(span.to != null && lineNo == from.line && from.ch > span.to ||
                span.from == null && lineNo != from.line ||
                span.from != null && lineNo == to.line && span.from > to.ch) &&
              (!filter || filter(span.marker)))
            found.push(span.marker.parent || span.marker);
        }
        ++lineNo;
      });
      return found;
    },
    getAllMarks: function() {
      var markers = [];
      this.iter(function(line) {
        var sps = line.markedSpans;
        if (sps) for (var i = 0; i < sps.length; ++i)
          if (sps[i].from != null) markers.push(sps[i].marker);
      });
      return markers;
    },

    posFromIndex: function(off) {
      var ch, lineNo = this.first;
      this.iter(function(line) {
        var sz = line.text.length + 1;
        if (sz > off) { ch = off; return true; }
        off -= sz;
        ++lineNo;
      });
      return clipPos(this, Pos(lineNo, ch));
    },
    indexFromPos: function (coords) {
      coords = clipPos(this, coords);
      var index = coords.ch;
      if (coords.line < this.first || coords.ch < 0) return 0;
      this.iter(this.first, coords.line, function (line) {
        index += line.text.length + 1;
      });
      return index;
    },

    copy: function(copyHistory) {
      var doc = new Doc(getLines(this, this.first, this.first + this.size),
                        this.modeOption, this.first, this.lineSep);
      doc.scrollTop = this.scrollTop; doc.scrollLeft = this.scrollLeft;
      doc.sel = this.sel;
      doc.extend = false;
      if (copyHistory) {
        doc.history.undoDepth = this.history.undoDepth;
        doc.setHistory(this.getHistory());
      }
      return doc;
    },

    linkedDoc: function(options) {
      if (!options) options = {};
      var from = this.first, to = this.first + this.size;
      if (options.from != null && options.from > from) from = options.from;
      if (options.to != null && options.to < to) to = options.to;
      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep);
      if (options.sharedHist) copy.history = this.history;
      (this.linked || (this.linked = [])).push({doc: copy, sharedHist: options.sharedHist});
      copy.linked = [{doc: this, isParent: true, sharedHist: options.sharedHist}];
      copySharedMarkers(copy, findSharedMarkers(this));
      return copy;
    },
    unlinkDoc: function(other) {
      if (other instanceof CodeMirror) other = other.doc;
      if (this.linked) for (var i = 0; i < this.linked.length; ++i) {
        var link = this.linked[i];
        if (link.doc != other) continue;
        this.linked.splice(i, 1);
        other.unlinkDoc(this);
        detachSharedMarkers(findSharedMarkers(this));
        break;
      }
      // If the histories were shared, split them again
      if (other.history == this.history) {
        var splitIds = [other.id];
        linkedDocs(other, function(doc) {splitIds.push(doc.id);}, true);
        other.history = new History(null);
        other.history.done = copyHistoryArray(this.history.done, splitIds);
        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
      }
    },
    iterLinkedDocs: function(f) {linkedDocs(this, f);},

    getMode: function() {return this.mode;},
    getEditor: function() {return this.cm;},

    splitLines: function(str) {
      if (this.lineSep) return str.split(this.lineSep);
      return splitLinesAuto(str);
    },
    lineSeparator: function() { return this.lineSep || "\n"; }
  });

  // Public alias.
  Doc.prototype.eachLine = Doc.prototype.iter;

  // Set up methods on CodeMirror's prototype to redirect to the editor's document.
  var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
  for (var prop in Doc.prototype) if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0)
    CodeMirror.prototype[prop] = (function(method) {
      return function() {return method.apply(this.doc, arguments);};
    })(Doc.prototype[prop]);

  eventMixin(Doc);

  // Call f for all linked documents.
  function linkedDocs(doc, f, sharedHistOnly) {
    function propagate(doc, skip, sharedHist) {
      if (doc.linked) for (var i = 0; i < doc.linked.length; ++i) {
        var rel = doc.linked[i];
        if (rel.doc == skip) continue;
        var shared = sharedHist && rel.sharedHist;
        if (sharedHistOnly && !shared) continue;
        f(rel.doc, shared);
        propagate(rel.doc, doc, shared);
      }
    }
    propagate(doc, null, true);
  }

  // Attach a document to an editor.
  function attachDoc(cm, doc) {
    if (doc.cm) throw new Error("This document is already in use.");
    cm.doc = doc;
    doc.cm = cm;
    estimateLineHeights(cm);
    loadMode(cm);
    if (!cm.options.lineWrapping) findMaxLine(cm);
    cm.options.mode = doc.modeOption;
    regChange(cm);
  }

  // LINE UTILITIES

  // Find the line object corresponding to the given line number.
  function getLine(doc, n) {
    n -= doc.first;
    if (n < 0 || n >= doc.size) throw new Error("There is no line " + (n + doc.first) + " in the document.");
    for (var chunk = doc; !chunk.lines;) {
      for (var i = 0;; ++i) {
        var child = chunk.children[i], sz = child.chunkSize();
        if (n < sz) { chunk = child; break; }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }

  // Get the part of a document between two positions, as an array of
  // strings.
  function getBetween(doc, start, end) {
    var out = [], n = start.line;
    doc.iter(start.line, end.line + 1, function(line) {
      var text = line.text;
      if (n == end.line) text = text.slice(0, end.ch);
      if (n == start.line) text = text.slice(start.ch);
      out.push(text);
      ++n;
    });
    return out;
  }
  // Get the lines between from and to, as array of strings.
  function getLines(doc, from, to) {
    var out = [];
    doc.iter(from, to, function(line) { out.push(line.text); });
    return out;
  }

  // Update the height of a line, propagating the height change
  // upwards to parent nodes.
  function updateLineHeight(line, height) {
    var diff = height - line.height;
    if (diff) for (var n = line; n; n = n.parent) n.height += diff;
  }

  // Given a line object, find its line number by walking up through
  // its parent links.
  function lineNo(line) {
    if (line.parent == null) return null;
    var cur = line.parent, no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0;; ++i) {
        if (chunk.children[i] == cur) break;
        no += chunk.children[i].chunkSize();
      }
    }
    return no + cur.first;
  }

  // Find the line at the given vertical position, using the height
  // information in the document tree.
  function lineAtHeight(chunk, h) {
    var n = chunk.first;
    outer: do {
      for (var i = 0; i < chunk.children.length; ++i) {
        var child = chunk.children[i], ch = child.height;
        if (h < ch) { chunk = child; continue outer; }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i], lh = line.height;
      if (h < lh) break;
      h -= lh;
    }
    return n + i;
  }


  // Find the height above the given line.
  function heightAtLine(lineObj) {
    lineObj = visualLine(lineObj);

    var h = 0, chunk = lineObj.parent;
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i];
      if (line == lineObj) break;
      else h += line.height;
    }
    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
      for (var i = 0; i < p.children.length; ++i) {
        var cur = p.children[i];
        if (cur == chunk) break;
        else h += cur.height;
      }
    }
    return h;
  }

  // Get the bidi ordering for the given line (and cache it). Returns
  // false for lines that are fully left-to-right, and an array of
  // BidiSpan objects otherwise.
  function getOrder(line) {
    var order = line.order;
    if (order == null) order = line.order = bidiOrdering(line.text);
    return order;
  }

  // HISTORY

  function History(startGen) {
    // Arrays of change events and selections. Doing something adds an
    // event to done and clears undo. Undoing moves events from done
    // to undone, redoing moves them in the other direction.
    this.done = []; this.undone = [];
    this.undoDepth = Infinity;
    // Used to track when changes can be merged into a single undo
    // event
    this.lastModTime = this.lastSelTime = 0;
    this.lastOp = this.lastSelOp = null;
    this.lastOrigin = this.lastSelOrigin = null;
    // Used by the isClean() method
    this.generation = this.maxGeneration = startGen || 1;
  }

  // Create a history change event from an updateDoc-style change
  // object.
  function historyChangeFromChange(doc, change) {
    var histChange = {from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to)};
    attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    linkedDocs(doc, function(doc) {attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);}, true);
    return histChange;
  }

  // Pop all selection events off the end of a history array. Stop at
  // a change event.
  function clearSelectionEvents(array) {
    while (array.length) {
      var last = lst(array);
      if (last.ranges) array.pop();
      else break;
    }
  }

  // Find the top change event in the history. Pop off selection
  // events that are in the way.
  function lastChangeEvent(hist, force) {
    if (force) {
      clearSelectionEvents(hist.done);
      return lst(hist.done);
    } else if (hist.done.length && !lst(hist.done).ranges) {
      return lst(hist.done);
    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
      hist.done.pop();
      return lst(hist.done);
    }
  }

  // Register a change in the history. Merges changes that are within
  // a single operation, ore are close together with an origin that
  // allows merging (starting with "+") into a single event.
  function addChangeToHistory(doc, change, selAfter, opId) {
    var hist = doc.history;
    hist.undone.length = 0;
    var time = +new Date, cur;

    if ((hist.lastOp == opId ||
         hist.lastOrigin == change.origin && change.origin &&
         ((change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay) ||
          change.origin.charAt(0) == "*")) &&
        (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
      // Merge this change into the last event
      var last = lst(cur.changes);
      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
        // Optimized case for simple insertion -- don't want to add
        // new changesets for every character typed
        last.to = changeEnd(change);
      } else {
        // Add new sub-event
        cur.changes.push(historyChangeFromChange(doc, change));
      }
    } else {
      // Can not be merged, start a new event.
      var before = lst(hist.done);
      if (!before || !before.ranges)
        pushSelectionToHistory(doc.sel, hist.done);
      cur = {changes: [historyChangeFromChange(doc, change)],
             generation: hist.generation};
      hist.done.push(cur);
      while (hist.done.length > hist.undoDepth) {
        hist.done.shift();
        if (!hist.done[0].ranges) hist.done.shift();
      }
    }
    hist.done.push(selAfter);
    hist.generation = ++hist.maxGeneration;
    hist.lastModTime = hist.lastSelTime = time;
    hist.lastOp = hist.lastSelOp = opId;
    hist.lastOrigin = hist.lastSelOrigin = change.origin;

    if (!last) signal(doc, "historyAdded");
  }

  function selectionEventCanBeMerged(doc, origin, prev, sel) {
    var ch = origin.charAt(0);
    return ch == "*" ||
      ch == "+" &&
      prev.ranges.length == sel.ranges.length &&
      prev.somethingSelected() == sel.somethingSelected() &&
      new Date - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
  }

  // Called whenever the selection changes, sets the new selection as
  // the pending selection in the history, and pushes the old pending
  // selection into the 'done' array when it was significantly
  // different (in number of selected ranges, emptiness, or time).
  function addSelectionToHistory(doc, sel, opId, options) {
    var hist = doc.history, origin = options && options.origin;

    // A new event is started when the previous origin does not match
    // the current, or the origins don't allow matching. Origins
    // starting with * are always merged, those starting with + are
    // merged when similar and close together in time.
    if (opId == hist.lastSelOp ||
        (origin && hist.lastSelOrigin == origin &&
         (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin ||
          selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))))
      hist.done[hist.done.length - 1] = sel;
    else
      pushSelectionToHistory(sel, hist.done);

    hist.lastSelTime = +new Date;
    hist.lastSelOrigin = origin;
    hist.lastSelOp = opId;
    if (options && options.clearRedo !== false)
      clearSelectionEvents(hist.undone);
  }

  function pushSelectionToHistory(sel, dest) {
    var top = lst(dest);
    if (!(top && top.ranges && top.equals(sel)))
      dest.push(sel);
  }

  // Used to store marked span information in the history.
  function attachLocalSpans(doc, change, from, to) {
    var existing = change["spans_" + doc.id], n = 0;
    doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
      if (line.markedSpans)
        (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
      ++n;
    });
  }

  // When un/re-doing restores text containing marked spans, those
  // that have been explicitly cleared should not be restored.
  function removeClearedSpans(spans) {
    if (!spans) return null;
    for (var i = 0, out; i < spans.length; ++i) {
      if (spans[i].marker.explicitlyCleared) { if (!out) out = spans.slice(0, i); }
      else if (out) out.push(spans[i]);
    }
    return !out ? spans : out.length ? out : null;
  }

  // Retrieve and filter the old marked spans stored in a change event.
  function getOldSpans(doc, change) {
    var found = change["spans_" + doc.id];
    if (!found) return null;
    for (var i = 0, nw = []; i < change.text.length; ++i)
      nw.push(removeClearedSpans(found[i]));
    return nw;
  }

  // Used both to provide a JSON-safe object in .getHistory, and, when
  // detaching a document, to split the history in two
  function copyHistoryArray(events, newGroup, instantiateSel) {
    for (var i = 0, copy = []; i < events.length; ++i) {
      var event = events[i];
      if (event.ranges) {
        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
        continue;
      }
      var changes = event.changes, newChanges = [];
      copy.push({changes: newChanges});
      for (var j = 0; j < changes.length; ++j) {
        var change = changes[j], m;
        newChanges.push({from: change.from, to: change.to, text: change.text});
        if (newGroup) for (var prop in change) if (m = prop.match(/^spans_(\d+)$/)) {
          if (indexOf(newGroup, Number(m[1])) > -1) {
            lst(newChanges)[prop] = change[prop];
            delete change[prop];
          }
        }
      }
    }
    return copy;
  }

  // Rebasing/resetting history to deal with externally-sourced changes

  function rebaseHistSelSingle(pos, from, to, diff) {
    if (to < pos.line) {
      pos.line += diff;
    } else if (from < pos.line) {
      pos.line = from;
      pos.ch = 0;
    }
  }

  // Tries to rebase an array of history events given a change in the
  // document. If the change touches the same lines as the event, the
  // event, and everything 'behind' it, is discarded. If the change is
  // before the event, the event's positions are updated. Uses a
  // copy-on-write scheme for the positions, to avoid having to
  // reallocate them all on every rebase, but also avoid problems with
  // shared position objects being unsafely updated.
  function rebaseHistArray(array, from, to, diff) {
    for (var i = 0; i < array.length; ++i) {
      var sub = array[i], ok = true;
      if (sub.ranges) {
        if (!sub.copied) { sub = array[i] = sub.deepCopy(); sub.copied = true; }
        for (var j = 0; j < sub.ranges.length; j++) {
          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
        }
        continue;
      }
      for (var j = 0; j < sub.changes.length; ++j) {
        var cur = sub.changes[j];
        if (to < cur.from.line) {
          cur.from = Pos(cur.from.line + diff, cur.from.ch);
          cur.to = Pos(cur.to.line + diff, cur.to.ch);
        } else if (from <= cur.to.line) {
          ok = false;
          break;
        }
      }
      if (!ok) {
        array.splice(0, i + 1);
        i = 0;
      }
    }
  }

  function rebaseHist(hist, change) {
    var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
    rebaseHistArray(hist.done, from, to, diff);
    rebaseHistArray(hist.undone, from, to, diff);
  }

  // EVENT UTILITIES

  // Due to the fact that we still support jurassic IE versions, some
  // compatibility wrappers are needed.

  var e_preventDefault = CodeMirror.e_preventDefault = function(e) {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  };
  var e_stopPropagation = CodeMirror.e_stopPropagation = function(e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  };
  function e_defaultPrevented(e) {
    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
  }
  var e_stop = CodeMirror.e_stop = function(e) {e_preventDefault(e); e_stopPropagation(e);};

  function e_target(e) {return e.target || e.srcElement;}
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1) b = 1;
      else if (e.button & 2) b = 3;
      else if (e.button & 4) b = 2;
    }
    if (mac && e.ctrlKey && b == 1) b = 3;
    return b;
  }

  // EVENT HANDLING

  // Lightweight event framework. on/off also work on DOM nodes,
  // registering native DOM handlers.

  var on = CodeMirror.on = function(emitter, type, f) {
    if (emitter.addEventListener)
      emitter.addEventListener(type, f, false);
    else if (emitter.attachEvent)
      emitter.attachEvent("on" + type, f);
    else {
      var map = emitter._handlers || (emitter._handlers = {});
      var arr = map[type] || (map[type] = []);
      arr.push(f);
    }
  };

  var noHandlers = []
  function getHandlers(emitter, type, copy) {
    var arr = emitter._handlers && emitter._handlers[type]
    if (copy) return arr && arr.length > 0 ? arr.slice() : noHandlers
    else return arr || noHandlers
  }

  var off = CodeMirror.off = function(emitter, type, f) {
    if (emitter.removeEventListener)
      emitter.removeEventListener(type, f, false);
    else if (emitter.detachEvent)
      emitter.detachEvent("on" + type, f);
    else {
      var handlers = getHandlers(emitter, type, false)
      for (var i = 0; i < handlers.length; ++i)
        if (handlers[i] == f) { handlers.splice(i, 1); break; }
    }
  };

  var signal = CodeMirror.signal = function(emitter, type /*, values...*/) {
    var handlers = getHandlers(emitter, type, true)
    if (!handlers.length) return;
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < handlers.length; ++i) handlers[i].apply(null, args);
  };

  var orphanDelayedCallbacks = null;

  // Often, we want to signal events at a point where we are in the
  // middle of some work, but don't want the handler to start calling
  // other methods on the editor, which might be in an inconsistent
  // state or simply not expect any other events to happen.
  // signalLater looks whether there are any handlers, and schedules
  // them to be executed when the last operation ends, or, if no
  // operation is active, when a timeout fires.
  function signalLater(emitter, type /*, values...*/) {
    var arr = getHandlers(emitter, type, false)
    if (!arr.length) return;
    var args = Array.prototype.slice.call(arguments, 2), list;
    if (operationGroup) {
      list = operationGroup.delayedCallbacks;
    } else if (orphanDelayedCallbacks) {
      list = orphanDelayedCallbacks;
    } else {
      list = orphanDelayedCallbacks = [];
      setTimeout(fireOrphanDelayed, 0);
    }
    function bnd(f) {return function(){f.apply(null, args);};};
    for (var i = 0; i < arr.length; ++i)
      list.push(bnd(arr[i]));
  }

  function fireOrphanDelayed() {
    var delayed = orphanDelayedCallbacks;
    orphanDelayedCallbacks = null;
    for (var i = 0; i < delayed.length; ++i) delayed[i]();
  }

  // The DOM events that CodeMirror handles can be overridden by
  // registering a (non-DOM) handler on the editor for the event name,
  // and preventDefault-ing the event in that handler.
  function signalDOMEvent(cm, e, override) {
    if (typeof e == "string")
      e = {type: e, preventDefault: function() { this.defaultPrevented = true; }};
    signal(cm, override || e.type, cm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore;
  }

  function signalCursorActivity(cm) {
    var arr = cm._handlers && cm._handlers.cursorActivity;
    if (!arr) return;
    var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
    for (var i = 0; i < arr.length; ++i) if (indexOf(set, arr[i]) == -1)
      set.push(arr[i]);
  }

  function hasHandler(emitter, type) {
    return getHandlers(emitter, type).length > 0
  }

  // Add on and off methods to a constructor's prototype, to make
  // registering events on such objects more convenient.
  function eventMixin(ctor) {
    ctor.prototype.on = function(type, f) {on(this, type, f);};
    ctor.prototype.off = function(type, f) {off(this, type, f);};
  }

  // MISC UTILITIES

  // Number of pixels added to scroller and sizer to hide scrollbar
  var scrollerGap = 30;

  // Returned or thrown by various protocols to signal 'I'm not
  // handling this'.
  var Pass = CodeMirror.Pass = {toString: function(){return "CodeMirror.Pass";}};

  // Reused option objects for setSelection & friends
  var sel_dontScroll = {scroll: false}, sel_mouse = {origin: "*mouse"}, sel_move = {origin: "+move"};

  function Delayed() {this.id = null;}
  Delayed.prototype.set = function(ms, f) {
    clearTimeout(this.id);
    this.id = setTimeout(f, ms);
  };

  // Counts the column offset in a string, taking tabs into account.
  // Used mostly to find indentation.
  var countColumn = CodeMirror.countColumn = function(string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) end = string.length;
    }
    for (var i = startIndex || 0, n = startValue || 0;;) {
      var nextTab = string.indexOf("\t", i);
      if (nextTab < 0 || nextTab >= end)
        return n + (end - i);
      n += nextTab - i;
      n += tabSize - (n % tabSize);
      i = nextTab + 1;
    }
  };

  // The inverse of countColumn -- find the offset that corresponds to
  // a particular column.
  var findColumn = CodeMirror.findColumn = function(string, goal, tabSize) {
    for (var pos = 0, col = 0;;) {
      var nextTab = string.indexOf("\t", pos);
      if (nextTab == -1) nextTab = string.length;
      var skipped = nextTab - pos;
      if (nextTab == string.length || col + skipped >= goal)
        return pos + Math.min(skipped, goal - col);
      col += nextTab - pos;
      col += tabSize - (col % tabSize);
      pos = nextTab + 1;
      if (col >= goal) return pos;
    }
  }

  var spaceStrs = [""];
  function spaceStr(n) {
    while (spaceStrs.length <= n)
      spaceStrs.push(lst(spaceStrs) + " ");
    return spaceStrs[n];
  }

  function lst(arr) { return arr[arr.length-1]; }

  var selectInput = function(node) { node.select(); };
  if (ios) // Mobile Safari apparently has a bug where select() is broken.
    selectInput = function(node) { node.selectionStart = 0; node.selectionEnd = node.value.length; };
  else if (ie) // Suppress mysterious IE10 errors
    selectInput = function(node) { try { node.select(); } catch(_e) {} };

  function indexOf(array, elt) {
    for (var i = 0; i < array.length; ++i)
      if (array[i] == elt) return i;
    return -1;
  }
  function map(array, f) {
    var out = [];
    for (var i = 0; i < array.length; i++) out[i] = f(array[i], i);
    return out;
  }

  function nothing() {}

  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing();
    }
    if (props) copyObj(props, inst);
    return inst;
  };

  function copyObj(obj, target, overwrite) {
    if (!target) target = {};
    for (var prop in obj)
      if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
        target[prop] = obj[prop];
    return target;
  }

  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){return f.apply(null, args);};
  }

  var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  var isWordCharBasic = CodeMirror.isWordChar = function(ch) {
    return /\w/.test(ch) || ch > "\x80" &&
      (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
  };
  function isWordChar(ch, helper) {
    if (!helper) return isWordCharBasic(ch);
    if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) return true;
    return helper.test(ch);
  }

  function isEmpty(obj) {
    for (var n in obj) if (obj.hasOwnProperty(n) && obj[n]) return false;
    return true;
  }

  // Extending unicode characters. A series of a non-extending char +
  // any number of extending chars is treated as a single unit as far
  // as editing and measuring is concerned. This is not fully correct,
  // since some scripts/fonts/browsers also treat other configurations
  // of code points as a group.
  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function isExtendingChar(ch) { return ch.charCodeAt(0) >= 768 && extendingChars.test(ch); }

  // DOM UTILITIES

  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (style) e.style.cssText = style;
    if (typeof content == "string") e.appendChild(document.createTextNode(content));
    else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
    return e;
  }

  var range;
  if (document.createRange) range = function(node, start, end, endNode) {
    var r = document.createRange();
    r.setEnd(endNode || node, end);
    r.setStart(node, start);
    return r;
  };
  else range = function(node, start, end) {
    var r = document.body.createTextRange();
    try { r.moveToElementText(node.parentNode); }
    catch(e) { return r; }
    r.collapse(true);
    r.moveEnd("character", end);
    r.moveStart("character", start);
    return r;
  };

  function removeChildren(e) {
    for (var count = e.childNodes.length; count > 0; --count)
      e.removeChild(e.firstChild);
    return e;
  }

  function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e);
  }

  var contains = CodeMirror.contains = function(parent, child) {
    if (child.nodeType == 3) // Android browser always returns false when child is a textnode
      child = child.parentNode;
    if (parent.contains)
      return parent.contains(child);
    do {
      if (child.nodeType == 11) child = child.host;
      if (child == parent) return true;
    } while (child = child.parentNode);
  };

  function activeElt() {
    var activeElement = document.activeElement;
    while (activeElement && activeElement.root && activeElement.root.activeElement)
      activeElement = activeElement.root.activeElement;
    return activeElement;
  }
  // Older versions of IE throws unspecified error when touching
  // document.activeElement in some cases (during loading, in iframe)
  if (ie && ie_version < 11) activeElt = function() {
    try { return document.activeElement; }
    catch(e) { return document.body; }
  };

  function classTest(cls) { return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*"); }
  var rmClass = CodeMirror.rmClass = function(node, cls) {
    var current = node.className;
    var match = classTest(cls).exec(current);
    if (match) {
      var after = current.slice(match.index + match[0].length);
      node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
    }
  };
  var addClass = CodeMirror.addClass = function(node, cls) {
    var current = node.className;
    if (!classTest(cls).test(current)) node.className += (current ? " " : "") + cls;
  };
  function joinClasses(a, b) {
    var as = a.split(" ");
    for (var i = 0; i < as.length; i++)
      if (as[i] && !classTest(as[i]).test(b)) b += " " + as[i];
    return b;
  }

  // WINDOW-WIDE EVENTS

  // These must be handled carefully, because naively registering a
  // handler for each editor will cause the editors to never be
  // garbage collected.

  function forEachCodeMirror(f) {
    if (!document.body.getElementsByClassName) return;
    var byClass = document.body.getElementsByClassName("CodeMirror");
    for (var i = 0; i < byClass.length; i++) {
      var cm = byClass[i].CodeMirror;
      if (cm) f(cm);
    }
  }

  var globalsRegistered = false;
  function ensureGlobalHandlers() {
    if (globalsRegistered) return;
    registerGlobalHandlers();
    globalsRegistered = true;
  }
  function registerGlobalHandlers() {
    // When the window resizes, we need to refresh active editors.
    var resizeTimer;
    on(window, "resize", function() {
      if (resizeTimer == null) resizeTimer = setTimeout(function() {
        resizeTimer = null;
        forEachCodeMirror(onResize);
      }, 100);
    });
    // When the window loses focus, we want to show the editor as blurred
    on(window, "blur", function() {
      forEachCodeMirror(onBlur);
    });
  }

  // FEATURE DETECTION

  // Detect drag-and-drop
  var dragAndDrop = function() {
    // There is *some* kind of drag-and-drop support in IE6-8, but I
    // couldn't get it to work yet.
    if (ie && ie_version < 9) return false;
    var div = elt('div');
    return "draggable" in div || "dragDrop" in div;
  }();

  var zwspSupported;
  function zeroWidthElement(measure) {
    if (zwspSupported == null) {
      var test = elt("span", "\u200b");
      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
      if (measure.firstChild.offsetHeight != 0)
        zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
    }
    var node = zwspSupported ? elt("span", "\u200b") :
      elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
    node.setAttribute("cm-text", "");
    return node;
  }

  // Feature-detect IE's crummy client rect reporting for bidi text
  var badBidiRects;
  function hasBadBidiRects(measure) {
    if (badBidiRects != null) return badBidiRects;
    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
    var r0 = range(txt, 0, 1).getBoundingClientRect();
    if (!r0 || r0.left == r0.right) return false; // Safari returns null in some cases (#2780)
    var r1 = range(txt, 1, 2).getBoundingClientRect();
    return badBidiRects = (r1.right - r0.right < 3);
  }

  // See if "".split is the broken IE version, if so, provide an
  // alternative way to split lines.
  var splitLinesAuto = CodeMirror.splitLines = "\n\nb".split(/\n/).length != 3 ? function(string) {
    var pos = 0, result = [], l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1) nl = string.length;
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result;
  } : function(string){return string.split(/\r\n?|\n/);};

  var hasSelection = window.getSelection ? function(te) {
    try { return te.selectionStart != te.selectionEnd; }
    catch(e) { return false; }
  } : function(te) {
    try {var range = te.ownerDocument.selection.createRange();}
    catch(e) {}
    if (!range || range.parentElement() != te) return false;
    return range.compareEndPoints("StartToEnd", range) != 0;
  };

  var hasCopyEvent = (function() {
    var e = elt("div");
    if ("oncopy" in e) return true;
    e.setAttribute("oncopy", "return;");
    return typeof e.oncopy == "function";
  })();

  var badZoomedRects = null;
  function hasBadZoomedRects(measure) {
    if (badZoomedRects != null) return badZoomedRects;
    var node = removeChildrenAndAdd(measure, elt("span", "x"));
    var normal = node.getBoundingClientRect();
    var fromRange = range(node, 0, 1).getBoundingClientRect();
    return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
  }

  // KEY NAMES

  var keyNames = CodeMirror.keyNames = {
    3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
    19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
    36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
    46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod",
    106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 127: "Delete",
    173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
    221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
    63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"
  };
  (function() {
    // Number keys
    for (var i = 0; i < 10; i++) keyNames[i + 48] = keyNames[i + 96] = String(i);
    // Alphabetic keys
    for (var i = 65; i <= 90; i++) keyNames[i] = String.fromCharCode(i);
    // Function keys
    for (var i = 1; i <= 12; i++) keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
  })();

  // BIDI HELPERS

  function iterateBidiSections(order, from, to, f) {
    if (!order) return f(from, to, "ltr");
    var found = false;
    for (var i = 0; i < order.length; ++i) {
      var part = order[i];
      if (part.from < to && part.to > from || from == to && part.to == from) {
        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr");
        found = true;
      }
    }
    if (!found) f(from, to, "ltr");
  }

  function bidiLeft(part) { return part.level % 2 ? part.to : part.from; }
  function bidiRight(part) { return part.level % 2 ? part.from : part.to; }

  function lineLeft(line) { var order = getOrder(line); return order ? bidiLeft(order[0]) : 0; }
  function lineRight(line) {
    var order = getOrder(line);
    if (!order) return line.text.length;
    return bidiRight(lst(order));
  }

  function lineStart(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLine(line);
    if (visual != line) lineN = lineNo(visual);
    var order = getOrder(visual);
    var ch = !order ? 0 : order[0].level % 2 ? lineRight(visual) : lineLeft(visual);
    return Pos(lineN, ch);
  }
  function lineEnd(cm, lineN) {
    var merged, line = getLine(cm.doc, lineN);
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
      lineN = null;
    }
    var order = getOrder(line);
    var ch = !order ? line.text.length : order[0].level % 2 ? lineLeft(line) : lineRight(line);
    return Pos(lineN == null ? lineNo(line) : lineN, ch);
  }
  function lineStartSmart(cm, pos) {
    var start = lineStart(cm, pos.line);
    var line = getLine(cm.doc, start.line);
    var order = getOrder(line);
    if (!order || order[0].level == 0) {
      var firstNonWS = Math.max(0, line.text.search(/\S/));
      var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
      return Pos(start.line, inWS ? 0 : firstNonWS);
    }
    return start;
  }

  function compareBidiLevel(order, a, b) {
    var linedir = order[0].level;
    if (a == linedir) return true;
    if (b == linedir) return false;
    return a < b;
  }
  var bidiOther;
  function getBidiPartAt(order, pos) {
    bidiOther = null;
    for (var i = 0, found; i < order.length; ++i) {
      var cur = order[i];
      if (cur.from < pos && cur.to > pos) return i;
      if ((cur.from == pos || cur.to == pos)) {
        if (found == null) {
          found = i;
        } else if (compareBidiLevel(order, cur.level, order[found].level)) {
          if (cur.from != cur.to) bidiOther = found;
          return i;
        } else {
          if (cur.from != cur.to) bidiOther = i;
          return found;
        }
      }
    }
    return found;
  }

  function moveInLine(line, pos, dir, byUnit) {
    if (!byUnit) return pos + dir;
    do pos += dir;
    while (pos > 0 && isExtendingChar(line.text.charAt(pos)));
    return pos;
  }

  // This is needed in order to move 'visually' through bi-directional
  // text -- i.e., pressing left should make the cursor go left, even
  // when in RTL text. The tricky part is the 'jumps', where RTL and
  // LTR text touch each other. This often requires the cursor offset
  // to move more than one unit, in order to visually move one unit.
  function moveVisually(line, start, dir, byUnit) {
    var bidi = getOrder(line);
    if (!bidi) return moveLogically(line, start, dir, byUnit);
    var pos = getBidiPartAt(bidi, start), part = bidi[pos];
    var target = moveInLine(line, start, part.level % 2 ? -dir : dir, byUnit);

    for (;;) {
      if (target > part.from && target < part.to) return target;
      if (target == part.from || target == part.to) {
        if (getBidiPartAt(bidi, target) == pos) return target;
        part = bidi[pos += dir];
        return (dir > 0) == part.level % 2 ? part.to : part.from;
      } else {
        part = bidi[pos += dir];
        if (!part) return null;
        if ((dir > 0) == part.level % 2)
          target = moveInLine(line, part.to, -1, byUnit);
        else
          target = moveInLine(line, part.from, 1, byUnit);
      }
    }
  }

  function moveLogically(line, start, dir, byUnit) {
    var target = start + dir;
    if (byUnit) while (target > 0 && isExtendingChar(line.text.charAt(target))) target += dir;
    return target < 0 || target > line.text.length ? null : target;
  }

  // Bidirectional ordering algorithm
  // See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
  // that this (partially) implements.

  // One-char codes used for character types:
  // L (L):   Left-to-Right
  // R (R):   Right-to-Left
  // r (AL):  Right-to-Left Arabic
  // 1 (EN):  European Number
  // + (ES):  European Number Separator
  // % (ET):  European Number Terminator
  // n (AN):  Arabic Number
  // , (CS):  Common Number Separator
  // m (NSM): Non-Spacing Mark
  // b (BN):  Boundary Neutral
  // s (B):   Paragraph Separator
  // t (S):   Segment Separator
  // w (WS):  Whitespace
  // N (ON):  Other Neutrals

  // Returns null if characters are ordered as they appear
  // (left-to-right), or an array of sections ({from, to, level}
  // objects) in the order in which they occur visually.
  var bidiOrdering = (function() {
    // Character types for codepoints 0 to 0xff
    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
    // Character types for codepoints 0x600 to 0x6ff
    var arabicTypes = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
    function charType(code) {
      if (code <= 0xf7) return lowTypes.charAt(code);
      else if (0x590 <= code && code <= 0x5f4) return "R";
      else if (0x600 <= code && code <= 0x6ed) return arabicTypes.charAt(code - 0x600);
      else if (0x6ee <= code && code <= 0x8ac) return "r";
      else if (0x2000 <= code && code <= 0x200b) return "w";
      else if (code == 0x200c) return "b";
      else return "L";
    }

    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
    // Browsers seem to always treat the boundaries of block elements as being L.
    var outerType = "L";

    function BidiSpan(level, from, to) {
      this.level = level;
      this.from = from; this.to = to;
    }

    return function(str) {
      if (!bidiRE.test(str)) return false;
      var len = str.length, types = [];
      for (var i = 0, type; i < len; ++i)
        types.push(type = charType(str.charCodeAt(i)));

      // W1. Examine each non-spacing mark (NSM) in the level run, and
      // change the type of the NSM to the type of the previous
      // character. If the NSM is at the start of the level run, it will
      // get the type of sor.
      for (var i = 0, prev = outerType; i < len; ++i) {
        var type = types[i];
        if (type == "m") types[i] = prev;
        else prev = type;
      }

      // W2. Search backwards from each instance of a European number
      // until the first strong type (R, L, AL, or sor) is found. If an
      // AL is found, change the type of the European number to Arabic
      // number.
      // W3. Change all ALs to R.
      for (var i = 0, cur = outerType; i < len; ++i) {
        var type = types[i];
        if (type == "1" && cur == "r") types[i] = "n";
        else if (isStrong.test(type)) { cur = type; if (type == "r") types[i] = "R"; }
      }

      // W4. A single European separator between two European numbers
      // changes to a European number. A single common separator between
      // two numbers of the same type changes to that type.
      for (var i = 1, prev = types[0]; i < len - 1; ++i) {
        var type = types[i];
        if (type == "+" && prev == "1" && types[i+1] == "1") types[i] = "1";
        else if (type == "," && prev == types[i+1] &&
                 (prev == "1" || prev == "n")) types[i] = prev;
        prev = type;
      }

      // W5. A sequence of European terminators adjacent to European
      // numbers changes to all European numbers.
      // W6. Otherwise, separators and terminators change to Other
      // Neutral.
      for (var i = 0; i < len; ++i) {
        var type = types[i];
        if (type == ",") types[i] = "N";
        else if (type == "%") {
          for (var end = i + 1; end < len && types[end] == "%"; ++end) {}
          var replace = (i && types[i-1] == "!") || (end < len && types[end] == "1") ? "1" : "N";
          for (var j = i; j < end; ++j) types[j] = replace;
          i = end - 1;
        }
      }

      // W7. Search backwards from each instance of a European number
      // until the first strong type (R, L, or sor) is found. If an L is
      // found, then change the type of the European number to L.
      for (var i = 0, cur = outerType; i < len; ++i) {
        var type = types[i];
        if (cur == "L" && type == "1") types[i] = "L";
        else if (isStrong.test(type)) cur = type;
      }

      // N1. A sequence of neutrals takes the direction of the
      // surrounding strong text if the text on both sides has the same
      // direction. European and Arabic numbers act as if they were R in
      // terms of their influence on neutrals. Start-of-level-run (sor)
      // and end-of-level-run (eor) are used at level run boundaries.
      // N2. Any remaining neutrals take the embedding direction.
      for (var i = 0; i < len; ++i) {
        if (isNeutral.test(types[i])) {
          for (var end = i + 1; end < len && isNeutral.test(types[end]); ++end) {}
          var before = (i ? types[i-1] : outerType) == "L";
          var after = (end < len ? types[end] : outerType) == "L";
          var replace = before || after ? "L" : "R";
          for (var j = i; j < end; ++j) types[j] = replace;
          i = end - 1;
        }
      }

      // Here we depart from the documented algorithm, in order to avoid
      // building up an actual levels array. Since there are only three
      // levels (0, 1, 2) in an implementation that doesn't take
      // explicit embedding into account, we can build up the order on
      // the fly, without following the level-based algorithm.
      var order = [], m;
      for (var i = 0; i < len;) {
        if (countsAsLeft.test(types[i])) {
          var start = i;
          for (++i; i < len && countsAsLeft.test(types[i]); ++i) {}
          order.push(new BidiSpan(0, start, i));
        } else {
          var pos = i, at = order.length;
          for (++i; i < len && types[i] != "L"; ++i) {}
          for (var j = pos; j < i;) {
            if (countsAsNum.test(types[j])) {
              if (pos < j) order.splice(at, 0, new BidiSpan(1, pos, j));
              var nstart = j;
              for (++j; j < i && countsAsNum.test(types[j]); ++j) {}
              order.splice(at, 0, new BidiSpan(2, nstart, j));
              pos = j;
            } else ++j;
          }
          if (pos < i) order.splice(at, 0, new BidiSpan(1, pos, i));
        }
      }
      if (order[0].level == 1 && (m = str.match(/^\s+/))) {
        order[0].from = m[0].length;
        order.unshift(new BidiSpan(0, 0, m[0].length));
      }
      if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
        lst(order).to -= m[0].length;
        order.push(new BidiSpan(0, len - m[0].length, len));
      }
      if (order[0].level == 2)
        order.unshift(new BidiSpan(1, order[0].to, order[0].to));
      if (order[0].level != lst(order).level)
        order.push(new BidiSpan(order[0].level, len, len));

      return order;
    };
  })();

  // THE END

  CodeMirror.version = "5.13.2";

  return CodeMirror;
});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// TODO actually recognize syntax of TypeScript constructs

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

function expressionAllowed(stream, state, backUp) {
  return /^(?:operator|sof|keyword c|case|new|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
    (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
}

CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var statementIndent = parserConfig.statementIndent;
  var jsonldMode = parserConfig.jsonld;
  var jsonMode = parserConfig.json || jsonldMode;
  var isTS = parserConfig.typescript;
  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

    var jsKeywords = {
      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": C, "break": C, "continue": C, "new": kw("new"), "delete": C, "throw": C, "debugger": C,
      "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C
    };

    // Extend the 'normal' keywords with the TypeScript language extensions
    if (isTS) {
      var type = {type: "variable", style: "variable-3"};
      var tsKeywords = {
        // object-like things
        "interface": kw("class"),
        "implements": C,
        "namespace": C,
        "module": kw("module"),
        "enum": kw("module"),

        // scope modifiers
        "public": kw("modifier"),
        "private": kw("modifier"),
        "protected": kw("modifier"),
        "abstract": kw("modifier"),

        // operators
        "as": operator,

        // types
        "string": type, "number": type, "boolean": type, "any": type
      };

      for (var attr in tsKeywords) {
        jsKeywords[attr] = tsKeywords[attr];
      }
    }

    return jsKeywords;
  }();

  var isOperatorChar = /[+\-*&%=<>!?|~^]/;
  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

  function readRegexp(stream) {
    var escaped = false, next, inSet = false;
    while ((next = stream.next()) != null) {
      if (!escaped) {
        if (next == "/" && !inSet) return;
        if (next == "[") inSet = true;
        else if (inSet && next == "]") inSet = false;
      }
      escaped = !escaped && next == "\\";
    }
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }
  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
      return ret("number", "number");
    } else if (ch == "." && stream.match("..")) {
      return ret("spread", "meta");
    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      return ret(ch);
    } else if (ch == "=" && stream.eat(">")) {
      return ret("=>", "operator");
    } else if (ch == "0" && stream.eat(/x/i)) {
      stream.eatWhile(/[\da-f]/i);
      return ret("number", "number");
    } else if (ch == "0" && stream.eat(/o/i)) {
      stream.eatWhile(/[0-7]/i);
      return ret("number", "number");
    } else if (ch == "0" && stream.eat(/b/i)) {
      stream.eatWhile(/[01]/i);
      return ret("number", "number");
    } else if (/\d/.test(ch)) {
      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
      return ret("number", "number");
    } else if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      } else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (expressionAllowed(stream, state, 1)) {
        readRegexp(stream);
        stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
        return ret("regexp", "string-2");
      } else {
        stream.eatWhile(isOperatorChar);
        return ret("operator", "operator", stream.current());
      }
    } else if (ch == "`") {
      state.tokenize = tokenQuasi;
      return tokenQuasi(stream, state);
    } else if (ch == "#") {
      stream.skipToEnd();
      return ret("error", "error");
    } else if (isOperatorChar.test(ch)) {
      stream.eatWhile(isOperatorChar);
      return ret("operator", "operator", stream.current());
    } else if (wordRE.test(ch)) {
      stream.eatWhile(wordRE);
      var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
      return (known && state.lastType != ".") ? ret(known.type, known.style, word) :
                     ret("variable", "variable", word);
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next;
      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
        state.tokenize = tokenBase;
        return ret("jsonld-keyword", "meta");
      }
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) break;
        escaped = !escaped && next == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenQuasi(stream, state) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
        state.tokenize = tokenBase;
        break;
      }
      escaped = !escaped && next == "\\";
    }
    return ret("quasi", "string-2", stream.current());
  }

  var brackets = "([{}])";
  // This is a crude lookahead trick to try and notice that we're
  // parsing the argument patterns for a fat-arrow function before we
  // actually hit the arrow token. It only works if the arrow is on
  // the same line as the arguments and there's no strange noise
  // (comments) in between. Fallback is to only notice when we hit the
  // arrow, and not declare the arguments as locals for the arrow
  // body.
  function findFatArrow(stream, state) {
    if (state.fatArrowAt) state.fatArrowAt = null;
    var arrow = stream.string.indexOf("=>", stream.start);
    if (arrow < 0) return;

    var depth = 0, sawSomething = false;
    for (var pos = arrow - 1; pos >= 0; --pos) {
      var ch = stream.string.charAt(pos);
      var bracket = brackets.indexOf(ch);
      if (bracket >= 0 && bracket < 3) {
        if (!depth) { ++pos; break; }
        if (--depth == 0) break;
      } else if (bracket >= 3 && bracket < 6) {
        ++depth;
      } else if (wordRE.test(ch)) {
        sawSomething = true;
      } else if (/["'\/]/.test(ch)) {
        return;
      } else if (sawSomething && !depth) {
        ++pos;
        break;
      }
    }
    if (sawSomething && !depth) state.fatArrowAt = pos;
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
    for (var cx = state.context; cx; cx = cx.prev) {
      for (var v = cx.vars; v; v = v.next)
        if (v.name == varname) return true;
    }
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function register(varname) {
    function inList(list) {
      for (var v = list; v; v = v.next)
        if (v.name == varname) return true;
      return false;
    }
    var state = cx.state;
    cx.marked = "def";
    if (state.context) {
      if (inList(state.localVars)) return;
      state.localVars = {name: varname, next: state.localVars};
    } else {
      if (inList(state.globalVars)) return;
      if (parserConfig.globalVars)
        state.globalVars = {name: varname, next: state.globalVars};
    }
  }

  // Combinators

  var defaultVars = {name: "this", next: {name: "arguments"}};
  function pushcontext() {
    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
    cx.state.localVars = defaultVars;
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars;
    cx.state.context = cx.state.context.prev;
  }
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state, indent = state.indented;
      if (state.lexical.type == "stat") indent = state.lexical.indented;
      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
        indent = outer.indented;
      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    function exp(type) {
      if (type == wanted) return cont();
      else if (wanted == ";") return pass();
      else return cont(exp);
    };
    return exp;
  }

  function statement(type, value) {
    if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), expression, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "{") return cont(pushlex("}"), block, poplex);
    if (type == ";") return cont();
    if (type == "if") {
      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
        cx.state.cc.pop()();
      return cont(pushlex("form"), expression, statement, poplex, maybeelse);
    }
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
    if (type == "variable") return cont(pushlex("stat"), maybelabel);
    if (type == "switch") return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"),
                                      block, poplex, poplex);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
                                     statement, poplex, popcontext);
    if (type == "class") return cont(pushlex("form"), className, poplex);
    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
    if (type == "module") return cont(pushlex("form"), pattern, pushlex("}"), expect("{"), block, poplex, poplex)
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function expression(type) {
    return expressionInner(type, false);
  }
  function expressionNoComma(type) {
    return expressionInner(type, true);
  }
  function expressionInner(type, noComma) {
    if (cx.state.fatArrowAt == cx.stream.start) {
      var body = noComma ? arrowBodyNoComma : arrowBody;
      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext);
      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
    }

    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
    if (type == "function") return cont(functiondef, maybeop);
    if (type == "keyword c") return cont(noComma ? maybeexpressionNoComma : maybeexpression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, comprehension, expect(")"), poplex, maybeop);
    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
    if (type == "quasi") return pass(quasi, maybeop);
    if (type == "new") return cont(maybeTarget(noComma));
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }
  function maybeexpressionNoComma(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expressionNoComma);
  }

  function maybeoperatorComma(type, value) {
    if (type == ",") return cont(expression);
    return maybeoperatorNoComma(type, value, false);
  }
  function maybeoperatorNoComma(type, value, noComma) {
    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
    var expr = noComma == false ? expression : expressionNoComma;
    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
    if (type == "operator") {
      if (/\+\+|--/.test(value)) return cont(me);
      if (value == "?") return cont(expression, expect(":"), expr);
      return cont(expr);
    }
    if (type == "quasi") { return pass(quasi, me); }
    if (type == ";") return;
    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
    if (type == ".") return cont(property, me);
    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
  }
  function quasi(type, value) {
    if (type != "quasi") return pass();
    if (value.slice(value.length - 2) != "${") return cont(quasi);
    return cont(expression, continueQuasi);
  }
  function continueQuasi(type) {
    if (type == "}") {
      cx.marked = "string-2";
      cx.state.tokenize = tokenQuasi;
      return cont(quasi);
    }
  }
  function arrowBody(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expression);
  }
  function arrowBodyNoComma(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expressionNoComma);
  }
  function maybeTarget(noComma) {
    return function(type) {
      if (type == ".") return cont(noComma ? targetNoComma : target);
      else return pass(noComma ? expressionNoComma : expression);
    };
  }
  function target(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
  }
  function targetNoComma(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperatorComma, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(getterSetter);
      return cont(afterprop);
    } else if (type == "number" || type == "string") {
      cx.marked = jsonldMode ? "property" : (cx.style + " property");
      return cont(afterprop);
    } else if (type == "jsonld-keyword") {
      return cont(afterprop);
    } else if (type == "modifier") {
      return cont(objprop)
    } else if (type == "[") {
      return cont(expression, expect("]"), afterprop);
    } else if (type == "spread") {
      return cont(expression);
    }
  }
  function getterSetter(type) {
    if (type != "variable") return pass(afterprop);
    cx.marked = "property";
    return cont(functiondef);
  }
  function afterprop(type) {
    if (type == ":") return cont(expressionNoComma);
    if (type == "(") return pass(functiondef);
  }
  function commasep(what, end) {
    function proceed(type) {
      if (type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
        return cont(what, proceed);
      }
      if (type == end) return cont();
      return cont(expect(end));
    }
    return function(type) {
      if (type == end) return cont();
      return pass(what, proceed);
    };
  }
  function contCommasep(what, end, info) {
    for (var i = 3; i < arguments.length; i++)
      cx.cc.push(arguments[i]);
    return cont(pushlex(end, info), commasep(what, end), poplex);
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function maybetype(type) {
    if (isTS && type == ":") return cont(typedef);
  }
  function maybedefault(_, value) {
    if (value == "=") return cont(expressionNoComma);
  }
  function typedef(type) {
    if (type == "variable") {cx.marked = "variable-3"; return cont();}
  }
  function vardef() {
    return pass(pattern, maybetype, maybeAssign, vardefCont);
  }
  function pattern(type, value) {
    if (type == "modifier") return cont(pattern)
    if (type == "variable") { register(value); return cont(); }
    if (type == "spread") return cont(pattern);
    if (type == "[") return contCommasep(pattern, "]");
    if (type == "{") return contCommasep(proppattern, "}");
  }
  function proppattern(type, value) {
    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
      register(value);
      return cont(maybeAssign);
    }
    if (type == "variable") cx.marked = "property";
    if (type == "spread") return cont(pattern);
    if (type == "}") return pass();
    return cont(expect(":"), pattern, maybeAssign);
  }
  function maybeAssign(_type, value) {
    if (value == "=") return cont(expressionNoComma);
  }
  function vardefCont(type) {
    if (type == ",") return cont(vardef);
  }
  function maybeelse(type, value) {
    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
  }
  function forspec(type) {
    if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef, expect(";"), forspec2);
    if (type == ";") return cont(forspec2);
    if (type == "variable") return cont(formaybeinof);
    return pass(expression, expect(";"), forspec2);
  }
  function formaybeinof(_type, value) {
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
    return cont(maybeoperatorComma, forspec2);
  }
  function forspec2(type, value) {
    if (type == ";") return cont(forspec3);
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
    return pass(expression, expect(";"), forspec3);
  }
  function forspec3(type) {
    if (type != ")") cont(expression);
  }
  function functiondef(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, statement, popcontext);
  }
  function funarg(type) {
    if (type == "spread") return cont(funarg);
    return pass(pattern, maybetype, maybedefault);
  }
  function className(type, value) {
    if (type == "variable") {register(value); return cont(classNameAfter);}
  }
  function classNameAfter(type, value) {
    if (value == "extends") return cont(expression, classNameAfter);
    if (type == "{") return cont(pushlex("}"), classBody, poplex);
  }
  function classBody(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      if (value == "static") {
        cx.marked = "keyword";
        return cont(classBody);
      }
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(classGetterSetter, functiondef, classBody);
      return cont(functiondef, classBody);
    }
    if (value == "*") {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == ";") return cont(classBody);
    if (type == "}") return cont();
  }
  function classGetterSetter(type) {
    if (type != "variable") return pass();
    cx.marked = "property";
    return cont();
  }
  function afterExport(_type, value) {
    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
    return pass(statement);
  }
  function afterImport(type) {
    if (type == "string") return cont();
    return pass(importSpec, maybeFrom);
  }
  function importSpec(type, value) {
    if (type == "{") return contCommasep(importSpec, "}");
    if (type == "variable") register(value);
    if (value == "*") cx.marked = "keyword";
    return cont(maybeAs);
  }
  function maybeAs(_type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
  }
  function maybeFrom(_type, value) {
    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
  }
  function arrayLiteral(type) {
    if (type == "]") return cont();
    return pass(expressionNoComma, maybeArrayComprehension);
  }
  function maybeArrayComprehension(type) {
    if (type == "for") return pass(comprehension, expect("]"));
    if (type == ",") return cont(commasep(maybeexpressionNoComma, "]"));
    return pass(commasep(expressionNoComma, "]"));
  }
  function comprehension(type) {
    if (type == "for") return cont(forspec, comprehension);
    if (type == "if") return cont(expression, comprehension);
  }

  function isContinuedStatement(state, textAfter) {
    return state.lastType == "operator" || state.lastType == "," ||
      isOperatorChar.test(textAfter.charAt(0)) ||
      /[,.]/.test(textAfter.charAt(0));
  }

  // Interface

  return {
    startState: function(basecolumn) {
      var state = {
        tokenize: tokenBase,
        lastType: "sof",
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        context: parserConfig.localVars && {vars: parserConfig.localVars},
        indented: basecolumn || 0
      };
      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
        state.globalVars = parserConfig.globalVars;
      return state;
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
        findFatArrow(stream, state);
      }
      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize == tokenComment) return CodeMirror.Pass;
      if (state.tokenize != tokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
      // Kludge to prevent 'maybelse' from blocking lexical scope pops
      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
        var c = state.cc[i];
        if (c == poplex) lexical = lexical.prev;
        else if (c != maybeelse) break;
      }
      if (lexical.type == "stat" && firstChar == "}") lexical = lexical.prev;
      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
        lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;

      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "form") return lexical.indented + indentUnit;
      else if (type == "stat")
        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
    blockCommentStart: jsonMode ? null : "/*",
    blockCommentEnd: jsonMode ? null : "*/",
    lineComment: jsonMode ? null : "//",
    fold: "brace",
    closeBrackets: "()[]{}''\"\"``",

    helperType: jsonMode ? "json" : "javascript",
    jsonldMode: jsonldMode,
    jsonMode: jsonMode,

    expressionAllowed: expressionAllowed,
    skipExpression: function(state) {
      var top = state.cc[state.cc.length - 1]
      if (top == expression || top == expressionNoComma) state.cc.pop()
    }
  };
});

CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/x-javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });

});

/*function MoveTool()
{
	//Super
	THREE.Scene.call(this);

	//Move components
	this.x = new THREE.Scene();
	this.y = new THREE.Scene();
	this.z = new THREE.Scene();

	var pid2 = Math.PI / 2;

	//Material
	this.material_red = new THREE.MeshBasicMaterial({color: 0xff0000});
	this.material_green = new THREE.MeshBasicMaterial({color: 0x00ff00});
	this.material_blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
	this.material_yellow = new THREE.MeshBasicMaterial({color: 0xffff00});

	//X
	var geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
	var mesh = new THREE.Mesh(geometry, this.material_red);
	mesh.position.set(0, 0.5, 0);
	this.x.add(mesh);
	geometry = new THREE.CylinderGeometry(0, 0.05, 0.15, 8);
	mesh = new THREE.Mesh(geometry, this.material_red);
	mesh.position.set(0, 1, 0);
	this.x.add(mesh);
	this.x.rotateOnAxis(new THREE.Vector3(0,0,1) , -pid2);
	this.x.updateMatrix();

	//Y
	geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
	mesh = new THREE.Mesh(geometry, this.material_green);
	mesh.position.set(0, 0.5, 0);
	this.y.add(mesh);
	geometry = new THREE.CylinderGeometry(0, 0.05, 0.15, 8);
	mesh = new THREE.Mesh(geometry, this.material_green);
	mesh.position.set(0, 1, 0);
	this.y.add(mesh);

	//Z
	geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
	mesh = new THREE.Mesh(geometry, this.material_blue);
	mesh.position.set(0, 0.5, 0);
	this.z.add(mesh);
	geometry = new THREE.CylinderGeometry(0, 0.05, 0.15, 8);
	mesh = new THREE.Mesh(geometry, this.material_blue);
	mesh.position.set(0, 1, 0);
	this.z.add(mesh);
	this.z.rotateOnAxis(new THREE.Vector3(1,0,0), pid2);
	this.z.updateMatrix();
	
	//Center
	geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
	this.block = new THREE.Mesh(geometry, this.material_yellow);
	
	//Add to super
	this.add(this.x);
	this.add(this.y);
	this.add(this.z);
	this.add(this.block);
}

//Functions Prototype
MoveTool.prototype = Object.create(THREE.Scene.prototype);
//Highligth selected compoonents and return witch are selected
MoveTool.prototype.highlightSelectedComponents = function(raycaster)
{
	var selected = false;
	var x = false, y = false, z = false;

	//X Component
	if(raycaster.intersectObject(this.x, true).length > 0)
	{
		selected = true;
		x = true;
		this.x.children[0].material = this.material_yellow;
		this.x.children[1].material = this.material_yellow;
	}
	else
	{
		this.x.children[0].material = this.material_red;
		this.x.children[1].material = this.material_red;
	}

	//Y Component
	if(raycaster.intersectObject(this.y, true).length > 0)
	{
		selected = true;
		y = true;
		this.y.children[0].material = this.material_yellow;
		this.y.children[1].material = this.material_yellow;
	}
	else
	{
		this.y.children[0].material = this.material_green;
		this.y.children[1].material = this.material_green;
	}

	//Z Component
	if(raycaster.intersectObject(this.z, true).length > 0)
	{
		selected = true;
		z = true;
		this.z.children[0].material = this.material_yellow;
		this.z.children[1].material = this.material_yellow;
	}
	else
	{
		this.z.children[0].material = this.material_blue;
		this.z.children[1].material = this.material_blue;
	}

	return {selected, x, y, z};
}*/

class MoveTool extends THREE.Scene {
	constructor() {
		super()

		//Move components
		this.x = new THREE.Scene();
		this.y = new THREE.Scene();
		this.z = new THREE.Scene();

		var pid2 = Math.PI / 2;

		//Material
		this.material_red = new THREE.MeshBasicMaterial({color: 0xff0000});
		this.material_green = new THREE.MeshBasicMaterial({color: 0x00ff00});
		this.material_blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
		this.material_yellow = new THREE.MeshBasicMaterial({color: 0xffff00});

		//X
		var geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
		var mesh = new THREE.Mesh(geometry, this.material_red);
		mesh.position.set(0, 0.5, 0);
		this.x.add(mesh);
		geometry = new THREE.CylinderGeometry(0, 0.05, 0.15, 8);
		mesh = new THREE.Mesh(geometry, this.material_red);
		mesh.position.set(0, 1, 0);
		this.x.add(mesh);
		this.x.rotateOnAxis(new THREE.Vector3(0,0,1) , -pid2);
		this.x.updateMatrix();

		//Y
		geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
		mesh = new THREE.Mesh(geometry, this.material_green);
		mesh.position.set(0, 0.5, 0);
		this.y.add(mesh);
		geometry = new THREE.CylinderGeometry(0, 0.05, 0.15, 8);
		mesh = new THREE.Mesh(geometry, this.material_green);
		mesh.position.set(0, 1, 0);
		this.y.add(mesh);

		//Z
		geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
		mesh = new THREE.Mesh(geometry, this.material_blue);
		mesh.position.set(0, 0.5, 0);
		this.z.add(mesh);
		geometry = new THREE.CylinderGeometry(0, 0.05, 0.15, 8);
		mesh = new THREE.Mesh(geometry, this.material_blue);
		mesh.position.set(0, 1, 0);
		this.z.add(mesh);
		this.z.rotateOnAxis(new THREE.Vector3(1,0,0), pid2);
		this.z.updateMatrix();
	
		//Center
		geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
		this.block = new THREE.Mesh(geometry, this.material_yellow);
	
		//Add to super
		this.add(this.x);
		this.add(this.y);
		this.add(this.z);

		this.x.updateMatrix()
		this.x.matrixAutoUpdate = false
		this.y.updateMatrix()
		this.y.matrixAutoUpdate = false
		this.z.updateMatrix()
		this.z.matrixAutoUpdate = false

		this.add(this.block);
	}

	highlightSelectedComponents(raycaster) {
		var selected = false;
		var x = false, y = false, z = false;

		//X Component
		if(raycaster.intersectObject(this.x, true).length > 0)
		{
			selected = true;
			x = true;
			this.x.children[0].material = this.material_yellow;
			this.x.children[1].material = this.material_yellow;
		}
		else
		{
			this.x.children[0].material = this.material_red;
			this.x.children[1].material = this.material_red;
		}

		//Y Component
		if(raycaster.intersectObject(this.y, true).length > 0)
		{
			selected = true;
			y = true;
			this.y.children[0].material = this.material_yellow;
			this.y.children[1].material = this.material_yellow;
		}
		else
		{
			this.y.children[0].material = this.material_green;
			this.y.children[1].material = this.material_green;
		}

		//Z Component
		if(raycaster.intersectObject(this.z, true).length > 0)
		{
			selected = true;
			z = true;
			this.z.children[0].material = this.material_yellow;
			this.z.children[1].material = this.material_yellow;
		}
		else
		{
			this.z.children[0].material = this.material_blue;
			this.z.children[1].material = this.material_blue;
		}
	
		return {selected, x, y, z};
	}
}
/*function ResizeTool()
{
	//Super
	THREE.Scene.call(this);

	//Move components
	this.x = new THREE.Scene();
	this.y = new THREE.Scene();
	this.z = new THREE.Scene();

	var pid2 = Math.PI / 2;

	//Material
	this.material_red = new THREE.MeshBasicMaterial({color: 0xff0000});
	this.material_green = new THREE.MeshBasicMaterial({color: 0x00ff00});
	this.material_blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
	this.material_yellow = new THREE.MeshBasicMaterial({color: 0xffff00});
	this.material_white = new THREE.MeshBasicMaterial({color: 0xffffff});

	//X
	var geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
	var mesh = new THREE.Mesh(geometry, this.material_red);
	mesh.position.set(0, 0.5, 0);
	this.x.add(mesh);
	geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
	mesh = new THREE.Mesh(geometry, this.material_red);
	mesh.position.set(0, 1, 0);
	this.x.add(mesh);
	this.x.rotateOnAxis(new THREE.Vector3(0,0,1) , -pid2);
	this.x.updateMatrix();

	//Y
	geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
	mesh = new THREE.Mesh(geometry, this.material_green);
	mesh.position.set(0, 0.5, 0);
	this.y.add(mesh);
	geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
	mesh = new THREE.Mesh(geometry, this.material_green);
	mesh.position.set(0, 1, 0);
	this.y.add(mesh);

	//Z
	geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
	mesh = new THREE.Mesh(geometry, this.material_blue);
	mesh.position.set(0, 0.5, 0);
	this.z.add(mesh);
	geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
	mesh = new THREE.Mesh(geometry, this.material_blue);
	mesh.position.set(0, 1, 0);
	this.z.add(mesh);
	this.z.rotateOnAxis(new THREE.Vector3(1,0,0), pid2);
	this.z.updateMatrix();
	
	//Center
	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	this.block = new THREE.Mesh(geometry, this.material_yellow);

	//Add to super
	this.add(this.x);
	this.add(this.y);
	this.add(this.z);
	this.add(this.block);
}

//Functions Prototype
ResizeTool.prototype = Object.create(THREE.Scene.prototype);
//Highligth selected compoonents and return witch are selected
ResizeTool.prototype.highlightSelectedComponents = function(raycaster)
{
	var x = false, y = false, z = false, w = false;
	var selected = false;
	
	//X Component
	if(raycaster.intersectObject(this.x, true).length > 0)
	{
		x = true;
		selected = true;
		this.x.children[0].material = this.material_yellow;
		this.x.children[1].material = this.material_yellow;
	}
	else
	{
		this.x.children[0].material = this.material_red;
		this.x.children[1].material = this.material_red;
	}

	//Y Component
	if(raycaster.intersectObject(this.y, true).length > 0)
	{
		y = true;
		selected = true;
		this.y.children[0].material = this.material_yellow;
		this.y.children[1].material = this.material_yellow;
	}
	else
	{
		this.y.children[0].material = this.material_green;
		this.y.children[1].material = this.material_green;
	}

	//Z Component
	if(raycaster.intersectObject(this.z, true).length > 0)
	{
		z = true;
		selected = true;
		this.z.children[0].material = this.material_yellow;
		this.z.children[1].material = this.material_yellow;
	}
	else
	{
		this.z.children[0].material = this.material_blue;
		this.z.children[1].material = this.material_blue;
	}

	//Center Block Component
	if(raycaster.intersectObject(this.block, true).length > 0)
	{
		w = true;
		selected = true;
		this.block.material = this.material_yellow;
	}
	else
	{
		this.block.material = this.material_white;
	}

	return {selected, x, y, z, w};
}*/

class ResizeTool extends THREE.Scene {
	constructor() {
		super()

		//Move components
		this.x = new THREE.Scene();
		this.y = new THREE.Scene();
		this.z = new THREE.Scene();
	
		var pid2 = Math.PI / 2;
	
		//Material
		this.material_red = new THREE.MeshBasicMaterial({color: 0xff0000});
		this.material_green = new THREE.MeshBasicMaterial({color: 0x00ff00});
		this.material_blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
		this.material_yellow = new THREE.MeshBasicMaterial({color: 0xffff00});
		this.material_white = new THREE.MeshBasicMaterial({color: 0xffffff});
	
		//X
		var geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
		var mesh = new THREE.Mesh(geometry, this.material_red);
		mesh.position.set(0, 0.5, 0);
		this.x.add(mesh);
		geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
		mesh = new THREE.Mesh(geometry, this.material_red);
		mesh.position.set(0, 1, 0);
		this.x.add(mesh);
		this.x.rotateOnAxis(new THREE.Vector3(0,0,1) , -pid2);
		this.x.updateMatrix();
	
		//Y
		geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
		mesh = new THREE.Mesh(geometry, this.material_green);
		mesh.position.set(0, 0.5, 0);
		this.y.add(mesh);
		geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
		mesh = new THREE.Mesh(geometry, this.material_green);
		mesh.position.set(0, 1, 0);
		this.y.add(mesh);
	
		//Z
		geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
		mesh = new THREE.Mesh(geometry, this.material_blue);
		mesh.position.set(0, 0.5, 0);
		this.z.add(mesh);
		geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
		mesh = new THREE.Mesh(geometry, this.material_blue);
		mesh.position.set(0, 1, 0);
		this.z.add(mesh);
		this.z.rotateOnAxis(new THREE.Vector3(1,0,0), pid2);
		this.z.updateMatrix();
		
		//Center
		geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
		this.block = new THREE.Mesh(geometry, this.material_yellow);
	
		this.x.updateMatrix()
		this.x.matrixAutoUpdate = false
		this.y.updateMatrix()
		this.y.matrixAutoUpdate = false
		this.z.updateMatrix()
		this.z.matrixAutoUpdate = false

		//Add to super
		this.add(this.x);
		this.add(this.y);
		this.add(this.z);
		this.add(this.block);
	}

	highlightSelectedComponents(raycaster) {
		var x = false, y = false, z = false, w = false;
		var selected = false;
		
		//X Component
		if(raycaster.intersectObject(this.x, true).length > 0)
		{
			x = true;
			selected = true;
			this.x.children[0].material = this.material_yellow;
			this.x.children[1].material = this.material_yellow;
		}
		else
		{
			this.x.children[0].material = this.material_red;
			this.x.children[1].material = this.material_red;
		}
	
		//Y Component
		if(raycaster.intersectObject(this.y, true).length > 0)
		{
			y = true;
			selected = true;
			this.y.children[0].material = this.material_yellow;
			this.y.children[1].material = this.material_yellow;
		}
		else
		{
			this.y.children[0].material = this.material_green;
			this.y.children[1].material = this.material_green;
		}
	
		//Z Component
		if(raycaster.intersectObject(this.z, true).length > 0)
		{
			z = true;
			selected = true;
			this.z.children[0].material = this.material_yellow;
			this.z.children[1].material = this.material_yellow;
		}
		else
		{
			this.z.children[0].material = this.material_blue;
			this.z.children[1].material = this.material_blue;
		}
	
		//Center Block Component
		if(raycaster.intersectObject(this.block, true).length > 0)
		{
			w = true;
			selected = true;
			this.block.material = this.material_yellow;
		}
		else
		{
			this.block.material = this.material_white;
		}
	
		return {selected, x, y, z, w};
	}
}
/*function RotateTool()
{
	//Super
	THREE.Scene.call(this);

	var pid2 = Math.PI / 2;

	this.material_red = new THREE.MeshBasicMaterial({color: 0xff0000});
	this.material_green = new THREE.MeshBasicMaterial({color: 0x00ff00});
	this.material_blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
	this.material_yellow = new THREE.MeshBasicMaterial({color: 0xffff00});

	//X
	var geometry = new THREE.TorusGeometry(1, 0.02, 5, 64);
	this.x = new THREE.Mesh(geometry, this.material_red);
	this.x.rotateOnAxis(new THREE.Vector3(0,1,0), pid2);

	//Y
	geometry = new THREE.TorusGeometry(1, 0.02, 5, 64);
	this.y = new THREE.Mesh(geometry, this.material_green);
	this.y.rotateOnAxis(new THREE.Vector3(1,0,0), pid2);

	//Z
	geometry = new THREE.TorusGeometry(1, 0.02, 5, 64);
	this.z = new THREE.Mesh(geometry, this.material_blue);

	//Add to super
	this.add(this.x);
	this.add(this.y);
	this.add(this.z);
}

//Functions Prototype
RotateTool.prototype = Object.create(THREE.Scene.prototype);
//Highligth selected compoonents and return witch are selected
RotateTool.prototype.highlightSelectedComponents = function(raycaster)
{
	var x = false, y = false, z = false;
	var selected = false;

	//X Component
	if(raycaster.intersectObject(this.x, false).length > 0)
	{
		selected = true;
		x = true;
		this.x.material = this.material_yellow;
	}
	else
	{
		this.x.material = this.material_red;
	}

	//Y Component
	if(raycaster.intersectObject(this.y, false).length > 0)
	{
		selected = true;
		y = true;
		this.y.material = this.material_yellow;
	}
	else
	{
		this.y.material = this.material_green;
	}

	//Z Component
	if(raycaster.intersectObject(this.z, false).length > 0)
	{
		selected = true;
		z = true;
		this.z.material = this.material_yellow;
	}
	else
	{
		this.z.material = this.material_blue;
	}

	return {selected, x, y, z};
}*/

class RotateTool extends THREE.Scene {
	constructor() {
		super()

		var pid2 = Math.PI / 2;
	
		this.material_red = new THREE.MeshBasicMaterial({color: 0xff0000});
		this.material_green = new THREE.MeshBasicMaterial({color: 0x00ff00});
		this.material_blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
		this.material_yellow = new THREE.MeshBasicMaterial({color: 0xffff00});
	
		//X
		var geometry = new THREE.TorusGeometry(1, 0.02, 5, 64);
		this.x = new THREE.Mesh(geometry, this.material_red);
		this.x.rotateOnAxis(new THREE.Vector3(0,1,0), pid2);
	
		//Y
		geometry = new THREE.TorusGeometry(1, 0.02, 5, 64);
		this.y = new THREE.Mesh(geometry, this.material_green);
		this.y.rotateOnAxis(new THREE.Vector3(1,0,0), pid2);
	
		//Z
		geometry = new THREE.TorusGeometry(1, 0.02, 5, 64);
		this.z = new THREE.Mesh(geometry, this.material_blue);
	
		// Disable components auto matrix update
		this.x.updateMatrix()
		this.x.matrixAutoUpdate = false
		this.y.updateMatrix()
		this.y.matrixAutoUpdate = false
		this.z.updateMatrix()
		this.z.matrixAutoUpdate = false

		//Add to super
		this.add(this.x);
		this.add(this.y);
		this.add(this.z);
	}

	highlightSelectedComponents(raycaster) {
		var x = false, y = false, z = false;
		var selected = false;
	
		//X Component
		if(raycaster.intersectObject(this.x, false).length > 0)
		{
			selected = true;
			x = true;
			this.x.material = this.material_yellow;
		}
		else
		{
			this.x.material = this.material_red;
		}
	
		//Y Component
		if(raycaster.intersectObject(this.y, false).length > 0)
		{
			selected = true;
			y = true;
			this.y.material = this.material_yellow;
		}
		else
		{
			this.y.material = this.material_green;
		}
	
		//Z Component
		if(raycaster.intersectObject(this.z, false).length > 0)
		{
			selected = true;
			z = true;
			this.z.material = this.material_yellow;
		}
		else
		{
			this.z.material = this.material_blue;
		}
	
		return {selected, x, y, z};
	}
}
class CodeEditor {
	constructor(parent) {
		this.parent = parent

		this.element = document.createElement("div")
		this.element.id = "code"
		this.element.style.position = "absolute"

		// CodeMirror Editor
		this.code = new CodeMirror(this.element, {value: "//TODO <Insert Code here>\n", lineNumbers: true, mode: "javascript"})
		this.code.setOption("theme", "monokai")
		this.code.setOption("mode", "javascript")

		// Code changed event
		var self = this
		this.code.on("change", function() {
			self.updateScript()
		})

		// Script attached to the editor
		this.script = null

		this.parent.appendChild(this.element)
	}

	setMode(mode) {
		this.code.setOption("mode", mode)
	}

	getText() {
		return this.code.getValue()
	}

	setText(text) {
		this.code.setValue(text)
	}

	attachScript(script) {
		this.script = script
		this.setText(script.code)
	}

	updateScript() {
		if (this.script != null) {
			this.script.setLoopCode(this.code.getValue())
		}
	}

	updateInterface() {
		this.code.setSize(EditorUI.mainarea.getSection(0).getWidth(), EditorUI.mainarea.getSection(0).getHeight()-EditorUI.assetEx_height-24)

		this.element.style.top = this.parent.style.top
		this.element.style.left = this.parent.style.left
		this.element.style.width = this.parent.style.width
		this.element.style.height= this.parent.style.height
	}
}
function Editor(){}

//Editor state
Editor.STATE_IDLE = 8; //Editing scripts
Editor.STATE_EDITING = 9; //Editing a scene
Editor.STATE_TESTING = 11; //Testing a scene

//Editor editing modes
Editor.MODE_SELECT = 0;
Editor.MODE_MOVE = 1;
Editor.MODE_RESIZE = 2;
Editor.MODE_ROTATE = 3;

//Initialize Main
Editor.initialize = function(canvas)
{
	//Editor initial state
	Editor.tool_mode = Editor.MODE_SELECT;
	Editor.state = Editor.STATE_EDITING;

	// Auxiliar values
	Editor.pid2 = Math.PI/2

	//Editor Selected object
	Editor.selected_object = null;
	Editor.block_camera_move = false;
	Editor.is_editing_object = false;
	Editor.editing_object_args = null;

	//Initialize User Interface
	EditorUI.Initialize();

	//Set mouse lock true
	App.setMouseLock(false);
	App.showStats(false);

	//Set render canvas
	Editor.canvas = EditorUI.canvas;
	Mouse.canvas = Editor.canvas;

	//Editor program and scene
	Editor.program = null;
	Editor.scene = null
	Editor.createNewProgram()

	//Debug Elements
	Editor.tool_scene = new THREE.Scene();
	Editor.tool_scene_top = new THREE.Scene();
	Editor.cannon_renderer = new THREE.CannonDebugRenderer(Editor.tool_scene, Editor.scene.world);

	//Editor Camera
	Editor.camera = new PerspectiveCamera(60, Editor.canvas.width/Editor.canvas.height, 0.1, 100000);
	Editor.camera.position.set(0, 5, -5);
	Editor.camera_rotation = new THREE.Vector2(0,0);
	Editor.setCameraRotation(Editor.camera_rotation, Editor.camera);

	//Raycaster
	Editor.raycaster = new THREE.Raycaster();

	//Renderer
	Editor.renderer = new THREE.WebGLRenderer({canvas: Editor.canvas});
	Editor.renderer.autoClear = false;
	Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height);
	Editor.renderer.shadowMap.enabled = true;
	Editor.renderer.shadowMap.type = THREE.PCFShadowMap;

	//Update interface
	EditorUI.updateInterface();

	//Grid and axis helpers
	Editor.grid_helper = new THREE.GridHelper(200, 5);
	Editor.tool_scene.add(Editor.grid_helper);
	Editor.axis_helper = new THREE.AxisHelper(100);
	Editor.tool_scene.add(Editor.axis_helper);

	//Box helper
	Editor.box_helper = new THREE.BoxHelper();
	Editor.box_helper.visible = false
	Editor.tool_scene.add(Editor.box_helper);

	// Camera Helper
	Editor.camera_helper = new THREE.CameraHelper(Editor.camera)
	Editor.activateHelper(Editor.camera_helper, false)
	Editor.tool_scene.add(Editor.camera_helper)

	// DirectionalLight Helper
	Editor.directional_light_helper = new THREE.DirectionalLightHelper(new THREE.DirectionalLight(), 1)
	Editor.activateHelper(Editor.directional_light_helper, false)
	Editor.tool_scene.add(Editor.directional_light_helper)

	// PointLight Helper
	Editor.point_light_helper = new THREE.PointLightHelper(new THREE.PointLight(), 1)
	Editor.activateHelper(Editor.point_light_helper, false)
	Editor.tool_scene.add(Editor.point_light_helper)

	// SpotLight Helper
	Editor.spot_light_helper = new THREE.SpotLightHelper(new THREE.SpotLight(), 1)
	Editor.activateHelper(Editor.spot_light_helper, false)
	Editor.tool_scene.add(Editor.spot_light_helper)

	// Move Tool
	Editor.move_tool = new MoveTool();
	Editor.move_tool.visible = false;
	Editor.tool_scene_top.add(Editor.move_tool);

	// Resize Tool
	Editor.resize_tool = new ResizeTool();
	Editor.resize_tool.visible = false;
	Editor.tool_scene_top.add(Editor.resize_tool);

	// Rotate Tool
	Editor.rotate_tool = new RotateTool();
	Editor.rotate_tool.visible = false;
	Editor.tool_scene_top.add(Editor.rotate_tool);

	// TODO: Delete
	Editor.updateTreeView()
}

//Update Editor
Editor.update = function()
{
	Editor.block_camera_move = false;

	//Editing a scene
	if(Editor.state === Editor.STATE_EDITING)
	{
		//If object select display tools
		if(Editor.selected_object !== null)
		{
			Editor.updateObjectHelper()

			if(Editor.tool_mode === Editor.MODE_MOVE)
			{
				Editor.move_tool.visible = true;
				Editor.rotate_tool.visible = false;
				Editor.resize_tool.visible = false;

				var distance = Editor.camera.position.distanceTo(Editor.selected_object.position)/5
				Editor.move_tool.scale.set(distance, distance, distance)
				Editor.move_tool.position.copy(Editor.objectAbsolutePosition(Editor.selected_object));
			}
			else if(Editor.tool_mode === Editor.MODE_RESIZE)
			{
				Editor.resize_tool.visible = true;
				Editor.move_tool.visible = false;
				Editor.rotate_tool.visible = false;

				var distance = Editor.camera.position.distanceTo(Editor.selected_object.position)/5
				Editor.resize_tool.scale.set(distance, distance, distance)
				Editor.resize_tool.position.copy(Editor.objectAbsolutePosition(Editor.selected_object));
				
			}
			else if(Editor.tool_mode === Editor.MODE_ROTATE)
			{
				Editor.rotate_tool.visible = true;
				Editor.move_tool.visible = false;
				Editor.resize_tool.visible = false;

				var distance = Editor.camera.position.distanceTo(Editor.selected_object.position)/5
				Editor.rotate_tool.scale.set(distance, distance, distance)
				Editor.rotate_tool.rotation.copy(Editor.selected_object.rotation)
				Editor.rotate_tool.position.copy(Editor.objectAbsolutePosition(Editor.selected_object));
			}
			else
			{
				Editor.move_tool.visible = false;
				Editor.rotate_tool.visible = false;
				Editor.resize_tool.visible = false;
			}
		}
		else
		{
			Editor.move_tool.visible = false;
			Editor.rotate_tool.visible = false;
			Editor.resize_tool.visible = false;
		}

		//Check if editing object
		if(Editor.is_editing_object)
		{	
			//If mouse button released exit edit mode
			if(Mouse.buttonJustReleased(Mouse.LEFT))
			{
				Editor.is_editing_object = false;
			}
			else
			{
				Editor.block_camera_move = true;

				//Moving object
				if(Editor.tool_mode === Editor.MODE_MOVE)
				{
					var speed = Editor.camera.position.distanceTo(Editor.selected_object.position)/500;
					if(Editor.editing_object_args.x)
					{
						Editor.selected_object.position.x -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x);
						Editor.selected_object.position.x -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x);
					}
					else if(Editor.editing_object_args.y)
					{
						Editor.selected_object.position.y -= Mouse.pos_diff.y * speed;
					}
					else if(Editor.editing_object_args.z)
					{
						Editor.selected_object.position.z -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x + Editor.pid2);
						Editor.selected_object.position.z -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x + Editor.pid2);
					}
				}
				//Resize mode
				else if(Editor.tool_mode === Editor.MODE_RESIZE)
				{
					var speed = Editor.camera.position.distanceTo(Editor.selected_object.position)/1000;
					if(Editor.editing_object_args.x)
					{
						Editor.selected_object.scale.x -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x);
						Editor.selected_object.scale.x -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x);
					}
					else if(Editor.editing_object_args.y)
					{
						Editor.selected_object.scale.y -= Mouse.pos_diff.y * speed;
					}
					else if(Editor.editing_object_args.z)
					{
						Editor.selected_object.scale.z -= Mouse.pos_diff.y * speed * Math.sin(Editor.camera_rotation.x + Editor.pid2);
						Editor.selected_object.scale.z -= Mouse.pos_diff.x * speed * Math.cos(Editor.camera_rotation.x + Editor.pid2);
					}
				}
				//Rotate Mode
				else if(Editor.tool_mode === Editor.MODE_ROTATE)
				{
					var speed = 1/200;
					if(Editor.editing_object_args.x)
					{
						Editor.selected_object.rotation.x -= Mouse.pos_diff.y * speed;
						Editor.selected_object.rotation.x -= Mouse.pos_diff.x * speed;
					}
					else if(Editor.editing_object_args.y)
					{
						Editor.selected_object.rotation.y -= Mouse.pos_diff.y * speed;
						Editor.selected_object.rotation.y -= Mouse.pos_diff.x * speed;
					}
					else if(Editor.editing_object_args.z)
					{
						Editor.selected_object.rotation.z += Mouse.pos_diff.y * speed;
						Editor.selected_object.rotation.z += Mouse.pos_diff.x * speed;
					}
				}
			}
		}

		//Check if mouse inside canvas
		if(Mouse.insideCanvas())
		{
			//Select objects
			if(Editor.tool_mode === Editor.MODE_SELECT)
			{
				if(Mouse.buttonJustPressed(Mouse.LEFT))
				{
					Editor.updateRaycaster();
					var intersects =  Editor.raycaster.intersectObjects(Editor.scene.children, true);
					if(intersects.length > 0)
					{
						Editor.selected_object = intersects[0].object;
					}
				}
			}

			//Move objects
			else if(Editor.tool_mode === Editor.MODE_MOVE)
			{
				Editor.updateRaycaster();
				var move = Editor.move_tool.highlightSelectedComponents(Editor.raycaster);
				if(move.selected && Mouse.buttonJustPressed(Mouse.LEFT))
				{	
					Editor.editing_object_args = move;
					Editor.is_editing_object = true;
					Editor.block_camera_move = true;
				}
			}

			//Resize
			else if(Editor.tool_mode === Editor.MODE_RESIZE)
			{
				Editor.updateRaycaster();
				var resize = Editor.resize_tool.highlightSelectedComponents(Editor.raycaster);
				if(resize.selected && Mouse.buttonJustPressed(Mouse.LEFT))
				{	
					Editor.editing_object_args = resize;
					Editor.is_editing_object = true;
					Editor.block_camera_move = true;
				}
			}

			//Rotate
			else if(Editor.tool_mode === Editor.MODE_ROTATE)
			{
				Editor.updateRaycaster();
				var rotate = Editor.rotate_tool.highlightSelectedComponents(Editor.raycaster);
				if(rotate.selected && Mouse.buttonJustPressed(Mouse.LEFT))
				{	
					Editor.editing_object_args = rotate;
					Editor.is_editing_object = true;
					Editor.block_camera_move = true;
				}
			}

			//Rotate camera
			if(Mouse.buttonPressed(Mouse.LEFT) && !Editor.block_camera_move)
			{
				Editor.camera_rotation.x -= 0.01 * Mouse.SENSITIVITY * Mouse.pos_diff.x;
				Editor.camera_rotation.y -= 0.01 * Mouse.SENSITIVITY * Mouse.pos_diff.y;

				//Limit Vertical Rotation to 90 degrees
				var pid2 = 1.57;
				if(Editor.camera_rotation.y < -pid2)
				{
					Editor.camera_rotation.y = -pid2;
				}
				else if(Editor.camera_rotation.y > pid2)
				{
					Editor.camera_rotation.y = pid2;
				}

				Editor.setCameraRotation(Editor.camera_rotation, Editor.camera);
			}

			//Move Camera on X and Z
			else if(Mouse.buttonPressed(Mouse.RIGHT))
			{
				//Move Camera Front and Back
				var speed = 0.1;
				var angle_cos = Math.cos(Editor.camera_rotation.x);
				var angle_sin = Math.sin(Editor.camera_rotation.x);
				Editor.camera.position.z += Mouse.pos_diff.y * speed * angle_cos;
				Editor.camera.position.x += Mouse.pos_diff.y * speed * angle_sin;

				//Move Camera Lateral
				var angle_cos = Math.cos(Editor.camera_rotation.x + Editor.pid2);
				var angle_sin = Math.sin(Editor.camera_rotation.x + Editor.pid2);
				Editor.camera.position.z += Mouse.pos_diff.x * speed * angle_cos;
				Editor.camera.position.x += Mouse.pos_diff.x * speed * angle_sin;
			}
			
			//Move in camera direction using mouse scroll
			if(Mouse.wheel != 0)
			{
				var direction = Editor.camera.getWorldDirection();
				var speed = 0.01 * Mouse.wheel;
				Editor.camera.position.x -= speed * direction.x;
				Editor.camera.position.y -= speed * direction.y;
				Editor.camera.position.z -= speed * direction.z;
			}
		}
	}
	//Update Scene if on test mode
	else if(Editor.state === Editor.STATE_TESTING)
	{
		Editor.scene.update();
	}
}

// Add object to actual scene
Editor.addToActualScene = function(obj) {
	Editor.scene.add(obj)
	Editor.updateTreeView()
}

// Update Tree View to Match Actual Scene
Editor.updateTreeView = function() {
	EditorUI.hierarchyFromScene(Editor.scene)
}

//Draw stuff into screen
Editor.draw = function()
{
	Editor.renderer.clear();

	//Render scene
	Editor.renderer.render(Editor.scene, Editor.camera);

	//Render debug scene
	if(Editor.state == Editor.STATE_EDITING)
	{
		Editor.cannon_renderer.update();
		Editor.renderer.render(Editor.tool_scene, Editor.camera);

		Editor.renderer.clearDepth();
		Editor.renderer.render(Editor.tool_scene_top, Editor.camera);
	}
}

//Resize to fit window
Editor.resize = function()
{
	EditorUI.updateInterface();
    Editor.resizeCamera()
}

// Show appropriate helper to selected object
Editor.updateObjectHelper = function() {
	Editor.activateHelper(Editor.box_helper, false)
	Editor.activateHelper(Editor.camera_helper, false)
	Editor.activateHelper(Editor.point_light_helper, false)
	Editor.activateHelper(Editor.spot_light_helper, false)
	Editor.activateHelper(Editor.directional_light_helper, false)

	if (Editor.selected_object !== null) {
		
		if (Editor.selected_object instanceof THREE.Camera) {
			Editor.activateHelper(Editor.camera_helper, true)
			Editor.camera_helper.camera = Editor.selected_object
			Editor.camera_helper.position.copy(Editor.selected_object.position)
			Editor.camera_helper.rotation.copy(Editor.selected_object.rotation)
			Editor.camera_helper.update()
		} else if (Editor.selected_object instanceof THREE.DirectionalLight) {
			Editor.activateHelper(Editor.directional_light_helper, true)
			Editor.directional_light_helper.light = Editor.selected_object
			Editor.directional_light_helper.position.copy(Editor.selected_object.position)
			Editor.directional_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.PointLight) {
			Editor.activateHelper(Editor.point_light_helper, true)
			Editor.point_light_helper.light = Editor.selected_object
			Editor.point_light_helper.position.copy(Editor.selected_object.position)
			Editor.point_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.SpotLight) {
			Editor.activateHelper(Editor.spot_light_helper, true)
			Editor.spot_light_helper.light = Editor.selected_object
			Editor.spot_light_helper.position.copy(Editor.selected_object.position)
			Editor.spot_light_helper.update()
		} else if (Editor.selected_object instanceof THREE.Mesh) {
			Editor.activateHelper(Editor.box_helper, true)
			Editor.box_helper.update(Editor.selected_object)
		}
	
	}
}

// Return object absolute position (not relative to parent)
Editor.objectAbsolutePosition = function(obj) {
	if (obj.parent != null) {
		var position = obj.position.clone()
		position.add(Editor.objectAbsolutePosition(obj.parent))
		return position
	}

	return obj.position
}

// Activate Helper
Editor.activateHelper = function(helper, value) {
	helper.visible = value
	helper.matrixAutoUpdate = value
}

//Resize Camera
Editor.resizeCamera = function()
{
	Editor.renderer.setSize(Editor.canvas.width, Editor.canvas.height);
	Editor.camera.aspect = Editor.canvas.width/Editor.canvas.height;
	Editor.camera.updateProjectionMatrix();
}

//Set camera rotation
Editor.setCameraRotation = function(camera_rotation, camera)
{
	//Calculate direction vector
	var cos_angle_y = Math.cos(camera_rotation.y);
	var direction = new THREE.Vector3(Math.sin(camera_rotation.x)*cos_angle_y, Math.sin(camera_rotation.y), Math.cos(camera_rotation.x)*cos_angle_y);

	//Add position offset and set camera direction
	direction.x += camera.position.x;
	direction.y += camera.position.y;
	direction.z += camera.position.z;
	camera.lookAt(direction);
}

//Update editor raycaster
Editor.updateRaycaster = function()
{
	var mouse = new THREE.Vector2((Mouse.pos.x/Editor.canvas.width )*2 - 1, -(Mouse.pos.y/Editor.canvas.height)*2 + 1);
	Editor.raycaster.setFromCamera(mouse, Editor.camera);
}

// Reset editing flags
Editor.resetEditingFlags = function() {
	Editor.selected_object = null
	Editor.block_camera_move = false
	Editor.is_editing_object = false
	Editor.editing_object_args = null
}

// New Program
Editor.createNewProgram = function() {
	Editor.program = new Program()
	Editor.program.addDefaultScene()
	Editor.scene = Editor.program.actual_scene

	Editor.resetEditingFlags()
}

// Exit Editor
Editor.exit = function() {
	process.exit()
}
function EditorUI() {}

// Due to scope, I declare some variables here
//var mainarea, canvas
EditorUI.mainarea
EditorUI.canvas

// Elements
//var hierarchy, asset_explorer, folder_explorer, explorer, tabs_widget
EditorUI.hierarchy
EditorUI.hierarchy_panel
EditorUI.asset_explorer
EditorUI.asset_explorer_menu
EditorUI.explorer
EditorUI.tabs_widget
EditorUI.topmenu
EditorUI.code

EditorUI.bot_tabs
EditorUI.asset_explorer_tab
EditorUI.console

EditorUI.assetEx_height = 200

// Areas
//var mainarea, left_area, right_area 
EditorUI.mainarea
EditorUI.left_area
EditorUI.right_area

EditorUI.Initialize = function() {

    // Initializing the LiteGUI library
    LiteGUI.init()

    // ----- TOP MENU -----
    EditorUI.topmenu = new LiteGUI.Menubar("topmenubar")
    LiteGUI.add(EditorUI.topmenu)

    // ----- FILE -----
    EditorUI.topmenu.add("File/New", {callback: () => {
        // TODO: Confirm Action
        Editor.createNewProgram()
        Editor.updateTreeView()
        Editor.updateObjectHelper()
    }})
   
    EditorUI.topmenu.add("File/Open", {callback: () => {
        //TODO: Open Project
    }})
    
    EditorUI.topmenu.add("File/Save", {callback: () => {
        //TODO: Save Project
    }})

    EditorUI.topmenu.add("File/Exit", {callback: () => {
        Editor.exit()
    }})

    // TODO: Tools in a sidebar to make its interface easier to use
        
    // ----- TOOLS -----

    EditorUI.topmenu.add("Edit/Tools/Select", {callback: () => {
        //TODO: Select Tool
        Editor.tool_mode = Editor.MODE_SELECT
        // TODO: Highlight this tool (Only this one)
    }})

    EditorUI.topmenu.add("Edit/Tools/Move", {callback: () => {
        //TODO: Move Tool
        Editor.tool_mode = Editor.MODE_MOVE
        //TODO: Highlight this tool (Only this one)
    }})

    EditorUI.topmenu.add("Edit/Tools/Resize", {callback: () => {
        //TODO: Resize Tool
        Editor.tool_mode = Editor.MODE_RESIZE
        //TODO: Highlight this tool (Only this one)
    }})

    EditorUI.topmenu.add("Edit/Tools/Rotate", {callback: () => {
        //TODO: Rotate Tool
        Editor.tool_mode = Editor.MODE_ROTATE
        //TODO: Highlight this tool (Only this one)
    }})

    // ----- Preferences -----
    EditorUI.topmenu.add("Edit/Preferences", {callback: () => {
        EditorUI.tabs_widget.getTab("Preferences").tab.style.display = ""
        EditorUI.tabs_widget.selectTab("Preferences")
    }})

    // ----- Add -----

    // ----- Add/Primitives -----

    // Cube
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Cube", {callback: () => {
        var geometry = new THREE.BoxGeometry(1,1,1)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Cylinder
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Cylinder", {callback: () => {
        var geometry = new THREE.CylinderGeometry(1, 1, 2, 32)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Sphere
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Sphere", {callback: () => {
        var geometry = new THREE.SphereGeometry(0.6, 16, 16)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Torus
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Torus", {callback: () => {
        var geometry = new THREE.TorusGeometry(1, 0.5, 16, 100)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, material)
        model.receiveShadow = true
        model.castShadow = true
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Pyramid
    EditorUI.topmenu.add("Add/3D Objects/Primitives/Cone", {callback: () => {
        var geometry = new THREE.CylinderGeometry(0, 1, 2, 32)
        var material = new THREE.MeshPhongMaterial()
        var model = new Model3D(geometry, model)
        model.receiveShadow = true
        model.castShadow = true
        Editor.addToActualScene(model)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Text
    EditorUI.topmenu.add("Add/3D Objects/Empty", {callback: () => {
        Editor.addToActualScene(new Empty())
        EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/3D Objects/Text", {callback: () => {
        // TODO: This
    }})

    // ----- Add/Lights -----
    
    EditorUI.topmenu.add("Add/Lights/Point", {callback: () => {
        var light = new PointLight()
        light.castShadow = true
        light.shadow.camera.near = 1
        light.shadow.camera.far = 1
        light.shadow.bias = 0.01
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/Ambient", {callback: () => {
        var light = new AmbientLight()
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/SpotLight", {callback: () => {
        var light = new SpotLight()
        light.castShadow = true
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/Directional", {callback: () => {
        var light = new DirectionalLight()
        light.castShadow = true
        Editor.addToActualScene(light)

        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    EditorUI.topmenu.add("Add/Lights/Sky", {callback: () => {
        var light = new Sky()
        Editor.addToActualScene(light)
    }})

    // ----- Add/Cameras -----
    // Perspective Camera
    EditorUI.topmenu.add("Add/Cameras/Perspective", {callback: () => {
        Editor.addToActualScene(new PerspectiveCamera())
        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Orthographic Camera
    EditorUI.topmenu.add("Add/Cameras/Orthographic", {callback: () => {
        Editor.addToActualScene(new OrthographicCamera(1, 1, 1, 1, 1, 1))
        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // ----- Add/Scripts -----
    // Script
    EditorUI.topmenu.add("Add/Scripts/Script", {callback: () => {
        Editor.addToActualScene(new Script())
        //EditorUI.hierarchyFromScene(Editor.scene)
    }})

    // Blocks
    EditorUI.topmenu.add("Add/Scripts/Blocks", {callback: () => {
        // TODO: This
    }})

    // ----- RUN -----

    EditorUI.topmenu.add("Run", {callback: () => {
        // If added a new menu before of this one, change the "3" number
        var menuItem = EditorUI.topmenu.findMenu("Run")

        if(menuItem == null) {
            // If the menuItem name ain't Run but Stop
            var menuItem = EditorUI.topmenu.findMenu("Stop")
        }

        if(Editor.state === Editor.STATE_EDITING) {
            menuItem.name = "Stop"
            Editor.state = Editor.STATE_TESTING
        } else if(Editor.state === Editor.STATE_TESTING) {
            menuItem.name = "Run"
            Editor.state = Editor.STATE_EDITING
        }

        //EditorUI.updateInterface()
        EditorUI.topmenu.updateMenu()
    }})

    // ----- HELP -----
    
    // Documentation
    EditorUI.topmenu.add("Help/Documentation", {callback: () => {
        //TODO: Open Documentation
    }})

    // About
    EditorUI.topmenu.add("Help/About", {callback: () => {
        //TODO: Show About
    }})

    // ----- CANVAS -----
    EditorUI.canvas = document.createElement("canvas")
    EditorUI.canvas.id = "canvas"

    // ----- MAINAREA SPLIT ----- 
    EditorUI.mainarea = new LiteGUI.Area({autoresize: true, inmediateResize: true, height: "calc(100% - 20px)"})
    EditorUI.mainarea.split("horizontal", [null, 200], true)
    // Everytime the user resizes the canvas, the EditorUI.Resize function is called
    EditorUI.mainarea.onresize = EditorUI.Resize
    // Add the mainarea to the GUI
    LiteGUI.add(EditorUI.mainarea)

    EditorUI.left_area = EditorUI.mainarea.getSection(0)
    EditorUI.right_area = EditorUI.mainarea.getSection(1)

    // ----- TABS -----
    EditorUI.tabs_widget = new LiteGUI.Tabs()
    EditorUI.tabs_widget.addTab("Scene Editor", {selected: true, width: "100%", closable: false, onclose: EditorUI.selectSceneEditor})
    //EditorUI.tabs_widget.addTab("Script Editor", {selected: false, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
    //EditorUI.tabs_widget.addTab("Material Editor", {selected: false, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
    //EditorUI.tabs_widget.addTab("Preferences", {selected: false, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
    EditorUI.left_area.add(EditorUI.tabs_widget)

    // Add the Canvas to the Scene Editor tab
    EditorUI.tabs_widget.getTabContent("Scene Editor").appendChild(EditorUI.canvas)

    //EditorUI.tabs_widget.getTabContent("Script Editor").appendChild(EditorUI.code.element)

    // ----- CANVAS AREA SPLIT -----
    EditorUI.left_area.split("vertical", [null, EditorUI.assetEx_height], false)
    EditorUI.left_area.onresize = EditorUI.resizeCanvas


    // ----- BOT TABS -----

    EditorUI.bot_tabs = new LiteGUI.Tabs()
    EditorUI.bot_tabs.addTab("Explorer",{selected: true, width: "100%"})
    EditorUI.bot_tabs.addTab("Console", {selected: false, width: "100%"})
    EditorUI.left_area.getSection(1).add(EditorUI.bot_tabs)

    // ----- EXPLORER -----

    EditorUI.asset_explorer = new LiteGUI.Panel({title: "Explorer"})
    EditorUI.bot_tabs.getTab("Explorer").add(EditorUI.asset_explorer)

    // ----- ASSET EXPLORER MENU -----

    EditorUI.asset_explorer_menu = new LiteGUI.Menubar()
    EditorUI.asset_explorer_menu.add("File/Import", {callback: () => {
        // TODO: This
    }})
    EditorUI.asset_explorer_menu.add("File/Export", {callback: () => {

    }})

    EditorUI.asset_explorer_menu.add("Add/Shader", {callback: () => {
        // TODO: This
    }})

    EditorUI.asset_explorer_menu.add("Add/Material", {callback: () => {
        // TODO: This
    }})

    EditorUI.asset_explorer_menu.add("Add/Terrain", {callback: () => {
        // TODO: This
    }})

    EditorUI.asset_explorer_menu.attachToPanel(EditorUI.asset_explorer)

    // ----- CONSOLE -----
    EditorUI.console = new LiteGUI.Console()
    EditorUI.bot_tabs.getTab("Console").add(EditorUI.console)

    // ----- INSPECTOR -----
    EditorUI.right_area.split("vertical", [null, EditorUI.assetEx_height+100], true)

    EditorUI.hierarchy_panel = new LiteGUI.Panel({title: "Hierarchy"})
    EditorUI.right_area.getSection(0).add(EditorUI.hierarchy_panel)

    // ----- TREE -----
    EditorUI.hierarchy = new LiteGUI.Tree({
        id: "Program",
        children: []
    }, {
        allow_drag: true,
        allow_rename: true,
        height: EditorUI.right_area.getSection(0).getHeight(),
    })
    EditorUI.hierarchy_panel.add(EditorUI.hierarchy)
    EditorUI.hierarchy.contextmenu = () => {console.log("a")}

    // When selecting an object in the hierarchy, that object will be selected
    LiteGUI.bind(EditorUI.hierarchy.root, "item_selected", function(e) {
        Editor.selected_object = e.detail.data.attachedTo
        //console.log(e.detail)
    })

    // When an item is moved, this will check if we should set a parent
    LiteGUI.bind(EditorUI.hierarchy.root, "item_moved", function(e) {
        //console.log(e.detail)

        if (e.detail.parent_item) {
            var parObj = e.detail.parent_item.data.attachedTo
            var obj = e.detail.item.data.attachedTo

            if (parObj != null) {
                parObj.add(obj)
                Editor.updateTreeView()
            }
        }
    })

    // If an item in the hierarchy is double clicked and that object can add a new tab, this will open it
    LiteGUI.bind(EditorUI.hierarchy.root, "item_dblclicked", function(e) {
        //console.log(e.detail.data)
        var data = e.detail.data

        // Script
        if (data.attachedTo instanceof Script) {
            EditorUI.tabs_widget.addTab("Script Editor", {selected: true, width: "100%", closable: true, onclose: EditorUI.selectSceneEditor})
            EditorUI.code = new CodeEditor(EditorUI.tabs_widget.getTabContent("Script Editor"))

            // TODO: Create a new array that will be iterated through in EditorUI.updateInterface calling updateInterface of each of its elements
            
            EditorUI.code.updateInterface()
            EditorUI.code.attachScript(data.attachedTo)
        }
    })

    // When renaming an object, renaming it in the scene
    LiteGUI.bind(EditorUI.hierarchy.root, "item_renamed", function(e) {
        console.log(e.detail.data)
    
        var obj = e.detail.data.attachedTo
        obj.name = e.detail.new_name
        Editor.updateTreeView()
    })

    EditorUI.inspector = new LiteGUI.Panel({title: "Inspector"})
    EditorUI.right_area.getSection(1).add(EditorUI.inspector)

    // Call to the resize method
    EditorUI.Resize()
}

EditorUI.selectSceneEditor = function() {
    // This function is called every-time a tab is closed
    EditorUI.tabs_widget.selectTab("Scene Editor")
}

EditorUI.updateInterface = function () {
    EditorUI.resizeCanvas()
}

EditorUI.hierarchyFromScene = function(scene) {
    EditorUI.hierarchy.updateTree({id: "Program", children: []})

    for(var i = 0; i < scene.children.length; i++) {
        var it = EditorUI.hierarchy.insertItem({id: scene.children[i].name + Editor.scene.children[i].id, attachedTo: scene.children[i]})
        it.addEventListener("contextmenu", function(e) {
            var item = it
            e.preventDefault()
            e.stopPropagation()

            if (e.button != 2) {
                return
            }

            return EditorUI.hierarchyContext(e, {item: item, data: item.data})
        })

        // The tree only displays a parent and a child, TODO: add support to infinite children

        if (scene.children[i].children.length > 0) {
            for(var j = 0; j < scene.children[i].children.length; j++) {
                EditorUI.hierarchy.insertItem(
                    {
                        id: scene.children[i].children[j].name + Editor.scene.children[i].children[j].id,
                        attachedTo: scene.children[i].children[j]
                    },
                    scene.children[i].name + Editor.scene.children[i].id)
            }
        }

    }
}

EditorUI.hierarchyContext = function(e, data) {
    var context = new LiteGUI.ContextMenu([
        {title: "Copy", callback: () => {
            // TODO: This
        }},
        {title: "Paste", callback: () => {
            // TODO: This
        }},
        {title: "Duplicate", callback: () => {
            // TODO: This
        }},
        {title: "Delete", callback: () => {
            // TODO: This            
        }}
    ], {title: "Edit item", event: e})
}

EditorUI.Resize = function() {
    EditorUI.resizeCanvas()
}

EditorUI.resizeCanvas = function() {
    canvas.width = EditorUI.left_area.getWidth()
    canvas.height= EditorUI.left_area.getHeight() - EditorUI.assetEx_height// - left_area.getSection().getHeight()
}

