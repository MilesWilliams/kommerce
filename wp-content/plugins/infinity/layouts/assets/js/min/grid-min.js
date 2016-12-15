function filterSelect(e){var t=e.find(".magnet-filter"),i=e.find(".magnet-item");t.change(function(){var t=jQuery(this).val();i.each(function(){var i=jQuery(this);i.hasClass(t)||"all"===t?e.magnet("show",i):e.magnet("hide",i)})})}function initBoxfish(e,t,i){e.boxfish({columns:t,breakpoints:i})}function initInfiniteScroll(e,t,i,o,n,a){var s=e.find(".item").last();e.infinitescroll({loading:{msgText:"<em>Loading the next set of posts...</em>",img:n},navSelector:"#pagenav",nextSelector:"#pagenav a",itemSelector:".item"},function(){s.nextAll().addClass("hidden"),setTimeout(function(){var n=e.find("article");initBoxfish(n,i,o),jQuery().magnet&&t.magnet("refresh"),"fade"==a&&(s.nextAll().hide().removeClass("hidden"),s.nextAll().fadeIn()),s.nextAll().removeClass("hidden")},700)})}function initMagnet(e,t,i){imagesLoaded(e,function(){e.magnet({layoutMode:"tiled",animationType:i,duration:t})})}function addEvent(e,t,i){if(e.addEventListener)e.addEventListener(t,i,!1);else{if(!e.attachEvent)throw new Error("not supported or DOM not loaded");e.attachEvent("on"+t,function(){i.call(e)})}}function addResizeEvent(e){var t;addEvent(window,"resize",function(){t&&clearTimeout(t),t=setTimeout(e,100)})}!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e,t){"use strict";e.infinitescroll=function(t,i,o){this.element=e(o),this._create(t,i)||(this.failed=!0)},e.infinitescroll.defaults={loading:{finished:t,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"data:image/gif;base64,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",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:"fast",start:t},state:{isDuringAjax:!1,isInvalidPage:!1,isDestroyed:!1,isDone:!1,isPaused:!1,isBeyondMaxPage:!1,currPage:1},debug:!1,behavior:t,binder:e(window),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:!1,pathParse:t,dataType:"html",appendCallback:!0,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:t,path:t,prefill:!1,maxPage:t},e.infinitescroll.prototype={_binding:function(e){var i=this,o=i.options;return o.v="2.0b2.120520",o.behavior&&this["_binding_"+o.behavior]!==t?void this["_binding_"+o.behavior].call(this):"bind"!==e&&"unbind"!==e?(this._debug("Binding value  "+e+" not valid"),!1):("unbind"===e?this.options.binder.unbind("smartscroll.infscr."+i.options.infid):this.options.binder[e]("smartscroll.infscr."+i.options.infid,function(){i.scroll()}),void this._debug("Binding",e))},_create:function(i,o){var n=e.extend(!0,{},e.infinitescroll.defaults,i);this.options=n;var a=e(window),s=this;if(!s._validate(i))return!1;var r=e(n.nextSelector).attr("href");if(!r)return this._debug("Navigation selector not found"),!1;n.path=n.path||this._determinepath(r),n.contentSelector=n.contentSelector||this.element,n.loading.selector=n.loading.selector||n.contentSelector,n.loading.msg=n.loading.msg||e('<div id="infscr-loading"><img alt="Loading..." src="'+n.loading.img+'" /><div>'+n.loading.msgText+"</div></div>"),(new Image).src=n.loading.img,n.pixelsFromNavToBottom===t&&(n.pixelsFromNavToBottom=e(document).height()-e(n.navSelector).offset().top,this._debug("pixelsFromNavToBottom: "+n.pixelsFromNavToBottom));var l=this;return n.loading.start=n.loading.start||function(){e(n.navSelector).hide(),n.loading.msg.appendTo(n.loading.selector).show(n.loading.speed,e.proxy(function(){this.beginAjax(n)},l))},n.loading.finished=n.loading.finished||function(){n.state.isBeyondMaxPage||n.loading.msg.fadeOut(n.loading.speed)},n.callback=function(i,s,r){n.behavior&&i["_callback_"+n.behavior]!==t&&i["_callback_"+n.behavior].call(e(n.contentSelector)[0],s,r),o&&o.call(e(n.contentSelector)[0],s,n,r),n.prefill&&a.bind("resize.infinite-scroll",i._prefill)},i.debug&&(!Function.prototype.bind||"object"!=typeof console&&"function"!=typeof console||"object"!=typeof console.log||["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(e){console[e]=this.call(console[e],console)},Function.prototype.bind)),this._setup(),n.prefill&&this._prefill(),!0},_prefill:function(){function t(){return e(i.options.contentSelector).height()<=o.height()}var i=this,o=e(window);this._prefill=function(){t()&&i.scroll(),o.bind("resize.infinite-scroll",function(){t()&&(o.unbind("resize.infinite-scroll"),i.scroll())})},this._prefill()},_debug:function(){!0===this.options.debug&&("undefined"!=typeof console&&"function"==typeof console.log?console.log(1===Array.prototype.slice.call(arguments).length&&"string"==typeof Array.prototype.slice.call(arguments)[0]?Array.prototype.slice.call(arguments).toString():Array.prototype.slice.call(arguments)):Function.prototype.bind||"undefined"==typeof console||"object"!=typeof console.log||Function.prototype.call.call(console.log,console,Array.prototype.slice.call(arguments)))},_determinepath:function(e){var i=this.options;if(i.behavior&&this["_determinepath_"+i.behavior]!==t)return this["_determinepath_"+i.behavior].call(this,e);if(i.pathParse)return this._debug("pathParse manual"),i.pathParse(e,this.options.state.currPage+1);if(e.match(/^(.*?)\b2\b(.*?$)/))e=e.match(/^(.*?)\b2\b(.*?$)/).slice(1);else if(e.match(/^(.*?)2(.*?$)/)){if(e.match(/^(.*?page=)2(\/.*|$)/))return e=e.match(/^(.*?page=)2(\/.*|$)/).slice(1);e=e.match(/^(.*?)2(.*?$)/).slice(1)}else{if(e.match(/^(.*?page=)1(\/.*|$)/))return e=e.match(/^(.*?page=)1(\/.*|$)/).slice(1);this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."),i.state.isInvalidPage=!0}return this._debug("determinePath",e),e},_error:function(e){var i=this.options;return i.behavior&&this["_error_"+i.behavior]!==t?void this["_error_"+i.behavior].call(this,e):("destroy"!==e&&"end"!==e&&(e="unknown"),this._debug("Error",e),("end"===e||i.state.isBeyondMaxPage)&&this._showdonemsg(),i.state.isDone=!0,i.state.currPage=1,i.state.isPaused=!1,i.state.isBeyondMaxPage=!1,void this._binding("unbind"))},_loadcallback:function(i,o,n){var a=this.options,s=this.options.callback,r=a.state.isDone?"done":a.appendCallback?"append":"no-append",l;if(a.behavior&&this["_loadcallback_"+a.behavior]!==t)return void this["_loadcallback_"+a.behavior].call(this,i,o);switch(r){case"done":return this._showdonemsg(),!1;case"no-append":if("html"===a.dataType&&(o="<div>"+o+"</div>",o=e(o).find(a.itemSelector)),0===o.length)return this._error("end");break;case"append":var c=i.children();if(0===c.length)return this._error("end");for(l=document.createDocumentFragment();i[0].firstChild;)l.appendChild(i[0].firstChild);this._debug("contentSelector",e(a.contentSelector)[0]),e(a.contentSelector)[0].appendChild(l),o=c.get()}if(a.loading.finished.call(e(a.contentSelector)[0],a),a.animate){var h=e(window).scrollTop()+e(a.loading.msg).height()+a.extraScrollPx+"px";e("html,body").animate({scrollTop:h},800,function(){a.state.isDuringAjax=!1})}a.animate||(a.state.isDuringAjax=!1),s(this,o,n),a.prefill&&this._prefill()},_nearbottom:function(){var i=this.options,o=0+e(document).height()-i.binder.scrollTop()-e(window).height();return i.behavior&&this["_nearbottom_"+i.behavior]!==t?this["_nearbottom_"+i.behavior].call(this):(this._debug("math:",o,i.pixelsFromNavToBottom),o-i.bufferPx<i.pixelsFromNavToBottom)},_pausing:function(e){var i=this.options;if(i.behavior&&this["_pausing_"+i.behavior]!==t)return void this["_pausing_"+i.behavior].call(this,e);switch("pause"!==e&&"resume"!==e&&null!==e&&this._debug("Invalid argument. Toggling pause value instead"),e=!e||"pause"!==e&&"resume"!==e?"toggle":e){case"pause":i.state.isPaused=!0;break;case"resume":i.state.isPaused=!1;break;case"toggle":i.state.isPaused=!i.state.isPaused}return this._debug("Paused",i.state.isPaused),!1},_setup:function(){var e=this.options;return e.behavior&&this["_setup_"+e.behavior]!==t?void this["_setup_"+e.behavior].call(this):(this._binding("bind"),!1)},_showdonemsg:function(){var i=this.options;return i.behavior&&this["_showdonemsg_"+i.behavior]!==t?void this["_showdonemsg_"+i.behavior].call(this):(i.loading.msg.find("img").hide().parent().find("div").html(i.loading.finishedMsg).animate({opacity:1},2e3,function(){e(this).parent().fadeOut(i.loading.speed)}),void i.errorCallback.call(e(i.contentSelector)[0],"done"))},_validate:function(t){for(var i in t)if(i.indexOf&&i.indexOf("Selector")>-1&&0===e(t[i]).length)return this._debug("Your "+i+" found no elements."),!1;return!0},bind:function(){this._binding("bind")},destroy:function(){return this.options.state.isDestroyed=!0,this.options.loading.finished(),this._error("destroy")},pause:function(){this._pausing("pause")},resume:function(){this._pausing("resume")},beginAjax:function(i){var o=this,n=i.path,a,s,r,l;if(i.state.currPage++,i.maxPage!==t&&i.state.currPage>i.maxPage)return i.state.isBeyondMaxPage=!0,void this.destroy();switch(a=e(e(i.contentSelector).is("table, tbody")?"<tbody/>":"<div/>"),s="function"==typeof n?n(i.state.currPage):n.join(i.state.currPage),o._debug("heading into ajax",s),r="html"===i.dataType||"json"===i.dataType?i.dataType:"html+callback",i.appendCallback&&"html"===i.dataType&&(r+="+callback"),r){case"html+callback":o._debug("Using HTML via .load() method"),a.load(s+" "+i.itemSelector,t,function(e){o._loadcallback(a,e,s)});break;case"html":o._debug("Using "+r.toUpperCase()+" via $.ajax() method"),e.ajax({url:s,dataType:i.dataType,complete:function(e,t){l="undefined"!=typeof e.isResolved?e.isResolved():"success"===t||"notmodified"===t,l?o._loadcallback(a,e.responseText,s):o._error("end")}});break;case"json":o._debug("Using "+r.toUpperCase()+" via $.ajax() method"),e.ajax({dataType:"json",type:"GET",url:s,success:function(e,n,r){if(l="undefined"!=typeof r.isResolved?r.isResolved():"success"===n||"notmodified"===n,i.appendCallback)if(i.template!==t){var c=i.template(e);a.append(c),l?o._loadcallback(a,c):o._error("end")}else o._debug("template must be defined."),o._error("end");else l?o._loadcallback(a,e,s):o._error("end")},error:function(){o._debug("JSON ajax request failed."),o._error("end")}})}},retrieve:function(i){i=i||null;var o=this,n=o.options;return n.behavior&&this["retrieve_"+n.behavior]!==t?void this["retrieve_"+n.behavior].call(this,i):n.state.isDestroyed?(this._debug("Instance is destroyed"),!1):(n.state.isDuringAjax=!0,void n.loading.start.call(e(n.contentSelector)[0],n))},scroll:function(){var e=this.options,i=e.state;return e.behavior&&this["scroll_"+e.behavior]!==t?void this["scroll_"+e.behavior].call(this):void(i.isDuringAjax||i.isInvalidPage||i.isDone||i.isDestroyed||i.isPaused||this._nearbottom()&&this.retrieve())},toggle:function(){this._pausing()},unbind:function(){this._binding("unbind")},update:function(t){e.isPlainObject(t)&&(this.options=e.extend(!0,this.options,t))}},e.fn.infinitescroll=function(t,i){var o=typeof t;switch(o){case"string":var n=Array.prototype.slice.call(arguments,1);this.each(function(){var i=e.data(this,"infinitescroll");return i&&e.isFunction(i[t])&&"_"!==t.charAt(0)?void i[t].apply(i,n):!1});break;case"object":this.each(function(){var o=e.data(this,"infinitescroll");o?o.update(t):(o=new e.infinitescroll(t,i,this),o.failed||e.data(this,"infinitescroll",o))})}return this};var i=e.event,o;i.special.smartscroll={setup:function(){e(this).bind("scroll",i.special.smartscroll.handler)},teardown:function(){e(this).unbind("scroll",i.special.smartscroll.handler)},handler:function(t,i){var n=this,a=arguments;t.type="smartscroll",o&&clearTimeout(o),o=setTimeout(function(){e(n).trigger("smartscroll",a)},"execAsap"===i?0:100)}},e.fn.smartscroll=function(e){return e?this.bind("smartscroll",e):this.trigger("smartscroll",["execAsap"])}}),/**
 * BoxFish.js
 *
 * jQuery plugin to create dynamic resizing columnar boxes.
 *
 * @version: 0.2
 * @authors: Jeremy Harris
 * @license: MIT
 */
function($){$.fn.boxfish=function(e){function t(){o()}function o(){B=h(),C=d(),n()}function n(){var e=g(),t=p.first();b=parseInt(t.css("margin-left"),10)+parseInt(t.css("margin-right"),10),v=parseInt(t.css("padding-left"),10)+parseInt(t.css("padding-right"),10),horizontalBorders=parseInt(t.css("border-left-width"),10)+parseInt(t.css("border-right-width"),10),p.each(function(i,o){if($(this).hasClass("w2")){var n=$(this).attr("data-span");$(this).width(t.outerWidth()*n+b*(n-1)-32)}else $(this).width(e-(b+v+horizontalBorders))})}function a(){}function s(){var e=[];for(x=0;x<p.length;x++)topPos=p[x].offsetTop,e[topPos]||(e[topPos]=[]),e[topPos].push(p[x]);for(var t in e){for(maxRowHeight=[],x=0;x<e[t].length;x++){var i=$(e[t][x]).outerHeight(!0);maxRowHeight[t]||(maxRowHeight[t]=0),maxRowHeight[t]<i&&(maxRowHeight[t]=i)}for(x=0;x<e[t].length;x++)$(e[t][x]).animate({height:maxRowHeight[t]},1)}}function r(){return $(p).css("clear","")}function l(){var e=$(p).first(),t=$(e),i=$(e),o=0,n=0;r(),$(p).css("border","1px solid #DDD"),p.each(function(a,s){o=$(s).offset(),console.log("/=====================================\\"),console.log($(s).attr("id")+": LEFT = "+o.left+" ... TOP = "+o.top),console.log($(i).offset()),console.log("\\=====================================/"),n>0&&o.left==e.offset().left&&o.top>=i.offset().top&&(console.log("BOX "+$(t).attr("id")+" CLEARED"),console.log("COUNT: "+n),console.log("LEFT OFFSET: "+o.left),$(t).css("border","1px solid red"),i=null,i=$(s)),n++,t=$(s)}),console.log("--------------"),console.log("--------------"),console.log("--------------"),console.log("--------------")}function c(){var e=p.find("img");return e.each(function(e,t){return t.complete?"undefined"!=typeof t.naturalWidth&&0===t.naturalWidth?!1:void 0:!1}),!0}function h(){return parseInt(m.width(),10)}function d(){return parseInt(m.height(),10)}function g(){var e=[0,0],t=u.columns;for(i=0;i<u.breakpoints.length;i++)u.breakpoints[i][0]<B&&u.breakpoints[i][0]>e[0]&&(e=u.breakpoints[i]);return e[1]>0&&(t=e[1]),B/t}function A(){var e=0,t=0;return p.each(function(i,o){t=$(this).outerHeight(!0),t>e&&(e=t)}),e}var u=$.extend({columns:3,breakpoints:[]},e),p=$(this),f=p.length,m=p.parent(),B=h(),C=d(),b=0,v=0,E;p.addClass("boxfish-box"),m.addClass("boxfish-container"),o(),$(window).on("resize",function(){clearTimeout(E),E=setTimeout(t,100)});var w=function(){setTimeout(function(){c()?a():w()},100)};return w(),this.addBreakpoint=function(e,t){e=parseInt(e,10),t=parseInt(t,10);var o=!1;for(i=0;i<u.breakpoints.length;i++)if(u.breakpoints[i][0]==e){u.breakpoints[i][1]=t,o=!0;break}return o||(u.breakpoints[u.breakpoints.length]=[e,t]),n(),this},this}}(jQuery);