(function(t){function n(n){for(var a,s,r=n[0],l=n[1],c=n[2],p=0,d=[];p<r.length;p++)s=r[p],o[s]&&d.push(o[s][0]),o[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(n);while(d.length)d.shift()();return i.push.apply(i,c||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],a=!0,r=1;r<e.length;r++){var l=e[r];0!==o[l]&&(a=!1)}a&&(i.splice(n--,1),t=s(s.s=e[0]))}return t}var a={},o={app:0},i=[];function s(n){if(a[n])return a[n].exports;var e=a[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=t,s.c=a,s.d=function(t,n,e){s.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,n){if(1&n&&(t=s(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)s.d(e,a,function(n){return t[n]}.bind(null,a));return e},s.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(n,"a",n),n},s.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=n,r=r.slice();for(var c=0;c<r.length;c++)n(r[c]);var u=l;i.push([0,"chunk-vendors"]),e()})({0:function(t,n,e){t.exports=e("56d7")},"034f":function(t,n,e){"use strict";var a=e("64a9"),o=e.n(a);o.a},"1c64":function(t,n,e){},"3cf4":function(t,n,e){"use strict";var a=e("a57d"),o=e.n(a);o.a},5490:function(t,n,e){"use strict";var a=e("bdf3"),o=e.n(a);o.a},"56d7":function(t,n,e){"use strict";e.r(n);e("cadf"),e("551c"),e("f751"),e("097d");var a,o,i=e("2b0e"),s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("h1",{staticClass:"app__title"},[t._v("Make a route")]),e("div",{staticClass:"app__container"},[e("ControlPanel",{attrs:{points:t.points,onDelete:t.onDelete},on:{addPoint:t.addedPoint,pointChanged:t.pointChanged}}),e("Map",{attrs:{points:t.points},on:{addPointByClicked:t.addedPoint}})],1)])},r=[],l=(e("7f7f"),e("75fc")),c=(e("6b54"),e("d225")),u=e("cc98"),p=e.n(u),d=new i["a"],m=new i["a"],f=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"map__container"},[e("div",{staticClass:"map__wrapper"},[e("div",{staticClass:"map__modal-buttons"},[t.modalOpen?t._e():e("button",{staticClass:"map__button map__button--unobtrusive",on:{click:function(n){t.modalOpen=!0}}},[t._v("Map\n                types\n            ")]),t.modalOpen?e("div",{staticClass:"map__modal"},t._l(t.modalButtons,function(n){return e("button",{key:n,staticClass:"map__button",class:t.mapType===n&&"map__button--active",on:{click:function(e){return t.changeMapType(n)}}},[t._v(t._s(n)+"\n                ")])}),0):t._e()]),e("button",{staticClass:"map__button map__location-button",on:{click:t.getMyCurrentLocation}},[t._v("My Location")]),e("div",{ref:"googleMap",staticClass:"map"}),e("p",{staticClass:"map__distance"},[t._v("Distance: "),e("span",{staticClass:"map__calc"},[t._v(t._s(t.calcDistance))]),t._v(" km")])])])},h=[],g=(e("7514"),e("ac6a"),"AIzaSyARMzC3AfJY0o4MLOhssfgEe6UxOsYOao4"),v=function(t){var n=document.createElement("script");n.async=!0,n.defer=!0,n.src="https://maps.googleapis.com/maps/api/js?key=".concat(g,"&callback=initMap"),n.onload=t,n.onerror=function(t){return console.log(t)},document.querySelector("head").appendChild(n)},_=55.745326222517036,b=37.617511704752815;function y(t){navigator.geolocation?(o=navigator.geolocation,o.getCurrentPosition(k,C)):alert("Geolocation API not supported in your browser"),window.initMap=function(){a=new google.maps.Map(t,{center:{lat:_,lng:b},zoom:10,disableDefaultUI:!0})}}function k(t){var n=t.coords;_=n.latitude,b=n.longitude}function C(t){console.log("position Error: ".concat(t.message))}var P={name:"Map",data:function(){return{markers:[],paths:[],modalOpen:!1,modalButtons:["ROADMAP","SATELLITE","HYBRID","TERRAIN"],mapType:"ROADMAP"}},props:{points:Array},mounted:function(){try{var t=this.$refs.googleMap;y(t),v(this.addMarkerByClicking),m.$on("new-name",this.nameChanged)}catch(n){console.error(n)}},watch:{points:function(t,n){var e=t.length-n.length;switch(e){case 1:return this.setMarker(t[t.length-1]),void this.drawPath();case-1:return this.removeMarker(t),void this.drawPath();case 0:return this.pointsChanged(t),void this.drawPath();default:return}}},methods:{getMyCurrentLocation:function(){var t=this;o&&o.getCurrentPosition(function(n){var e={lat:n.coords.latitude,lng:n.coords.longitude};a.setCenter(e),t.registerMarker("My location",e)})},changeMapType:function(t){a.setMapTypeId(google.maps.MapTypeId[t]),this.mapType=t,this.modalOpen=!1},addMarkerByClicking:function(){var t=this;google.maps.event.addListener(a,"click",function(n){t.registerMarker(null,n.latLng)})},registerMarker:function(t,n){this.$emit("addPointByClicked",t,n)},drawPath:function(){this.clearPath();var t=this.markers.map(function(t){return{lat:t.getPosition().lat(),lng:t.getPosition().lng()}}),n=new google.maps.Polyline({path:t,geodesic:!0,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2});this.paths.push(n),n.setMap(a)},clearPath:function(){this.paths.length&&(this.paths.forEach(function(t){return t.setMap(null)}),this.paths=[])},setMarker:function(t){var n=this,e=t.id,o=t.name,i=t.location,s=new google.maps.Marker({position:i||{lat:a.getCenter().lat(),lng:a.getCenter().lng()},title:o,draggable:!0,map:a}),r=new google.maps.InfoWindow({content:s.title});s.id=e,s.info=r,this.markers.push(s),google.maps.event.addListener(s,"click",function(){s.info.open(a,s)}),google.maps.event.addListener(s,"dragend",function(){n.drawPath()})},nameChanged:function(t){var n=t.index,e=t.name,a=this.markers[n];a.setTitle(e),a.info.setContent(e)},pointsChanged:function(t){var n=this,e=[];t.forEach(function(t){n.markers.forEach(function(n){n.id===t.id&&e.push(n)})}),this.markers=e},removeMarker:function(t){var n=this;if(!t)return this.markers[0].setMap(null),void(this.markers=[]);this.markers.filter(function(e,a){if(!t.find(function(t){return e.id===t.id})){var o=n.markers[a];o.setMap(null),n.markers=[].concat(Object(l["a"])(n.markers.slice(0,a)),Object(l["a"])(n.markers.slice(a+1)))}})}},computed:{calcDistance:function(){var t=0;return this.markers.map(function(t){return new google.maps.LatLng(t.getPosition().lat(),t.getPosition().lng())}).forEach(function(n,e,a){e+1<a.length&&(t+=google.maps.geometry.spherical.computeDistanceBetween(n,a[e+1]))}),(t/1e3).toFixed(2)}}},w=P,M=(e("5490"),e("2877")),O=Object(M["a"])(w,f,h,!1,null,null,null),x=O.exports,D=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"panel"},[e("h3",{staticClass:"panel__title"},[t._v("Control Panel")]),e("form",{staticClass:"panel__form",on:{submit:function(t){t.preventDefault()}}},[e("label",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.newPoint,expression:"newPoint"}],staticClass:"panel__control",attrs:{placeholder:"Add point",type:"text"},domProps:{value:t.newPoint},on:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.addPoint(n)},input:function(n){n.target.composing||(t.newPoint=n.target.value)}}})])]),e("div",{staticClass:"panel__wrapper"},[e("draggable",{attrs:{disabled:t.modalOpen,tag:"ul"},on:{start:function(n){t.isDragging=!0},end:t.endDragging},model:{value:t.pointsList,callback:function(n){t.pointsList=n},expression:"pointsList"}},t._l(t.points,function(n,a){return e("Waypoint",{key:n.id,attrs:{point:{id:n.id,name:n.name,index:a},onDelete:t.onDelete}})}),1)],1)])},E=[],j=e("310e"),I=e.n(j),$=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("li",{staticClass:"panel__item"},[e("span",[t._v(t._s(t.point.name))]),e("div",{staticClass:"panel__buttons"},[e("ModalEditPoint",{attrs:{point:t.point}}),e("button",{staticClass:"panel__button",on:{click:function(n){return t.onDelete(t.point.index)}}},[e("span",{staticClass:"close close--button"},[t._v("×")])])],1)])},L=[],N=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("button",{staticClass:"modal__button",on:{click:t.open}},[e("span",[t._v("Edit point")])]),e("div",{ref:"modal",staticClass:"modal"},[e("div",{staticClass:"modal__content"},[e("span",{staticClass:"modal__close",attrs:{role:"button"},on:{click:t.close}},[t._v("×")]),e("form",{staticClass:"panel__form",on:{submit:function(t){t.preventDefault()}}},[e("label",[t._v("\n                    Edit point:\n                    "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.editName,expression:"editName"}],staticClass:"panel__control panel__control--editable",attrs:{type:"text"},domProps:{value:t.editName},on:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.changeName(n)},input:function(n){n.target.composing||(t.editName=n.target.value)}}})]),e("button",{staticClass:"modal__button modal__button--save",on:{click:t.changeName}},[t._v("Save")])])])])])},T=[],A={name:"ModalEditPoint",props:{point:Object},data:function(){return{editName:"",modalIsOpen:!1}},watch:{modalIsOpen:function(){d.$emit("modal-status",this.modalIsOpen)}},methods:{open:function(){var t=this.$refs.modal;t.style.display="block",this.modalIsOpen=!0,this.editName=this.point.name},close:function(){var t=this.$refs.modal;t.style.display="none",this.modalIsOpen=!1},changeName:function(){this.point.name===this.editName?this.close():(m.$emit("new-name",{name:this.editName,index:this.point.index}),this.close())}}},S=A,B=(e("73ee"),Object(M["a"])(S,N,T,!1,null,null,null)),R=B.exports,W={name:"Waypoint",props:["point","onDelete"],components:{ModalEditPoint:R},data:function(){return{}}},F=W,z=(e("be84"),Object(M["a"])(F,$,L,!1,null,"b94793ee",null)),J=z.exports,Y={name:"ControlPanel",data:function(){return{newPoint:"",isDragging:!1,pointsList:[],modalOpen:!1}},props:{points:Array,onDelete:Function},components:{draggable:I.a,Waypoint:J},mounted:function(){d.$on("modal-status",this.modal)},methods:{addPoint:function(){this.$emit("addPoint",this.newPoint),this.newPoint=""},endDragging:function(t){this.$emit("pointChanged",{futureIndex:t.newDraggableIndex,index:t.oldDraggableIndex}),this.isDragging=!1},modal:function(t){this.modalOpen=t}}},U=Y,q=(e("3cf4"),Object(M["a"])(U,D,E,!1,null,null,null)),G=q.exports,H=function t(n,e,a){Object(c["a"])(this,t),this.name=n,this.id=e,this.location=a},K={name:"app",components:{Map:x,ControlPanel:G},data:function(){return{points:[]}},mounted:function(){m.$on("new-name",this.nameChanged)},methods:{addedPoint:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=this.points.slice();e.push(new H(t||"point ".concat(Math.random().toString(36).slice(10)),p()(),n)),this.points=e},onDelete:function(t){this.points=[].concat(Object(l["a"])(this.points.slice(0,t)),Object(l["a"])(this.points.slice(t+1)))},pointChanged:function(t){var n=t.index,e=t.futureIndex,a=Object(l["a"])(this.points),o=function(t,n,e){var a=t[n];t.splice(n,1),t.splice(e,0,a)};o(a,n,e),this.points=a},nameChanged:function(t){var n=t.index,e=t.name;this.points[n].name=e}}},Q=K,V=(e("034f"),Object(M["a"])(Q,s,r,!1,null,null,null)),X=V.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(X)}}).$mount("#app")},"64a9":function(t,n,e){},"73ee":function(t,n,e){"use strict";var a=e("1c64"),o=e.n(a);o.a},9150:function(t,n,e){},a57d:function(t,n,e){},bdf3:function(t,n,e){},be84:function(t,n,e){"use strict";var a=e("9150"),o=e.n(a);o.a}});
//# sourceMappingURL=app.64ec7c08.js.map