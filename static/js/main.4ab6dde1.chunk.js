(this.webpackJsonpweather_on_the_route=this.webpackJsonpweather_on_the_route||[]).push([[0],{62:function(e,t,a){e.exports=a(89)},89:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(7),r=a.n(i),s=a(10),l=a(27),c=a(16),d=a(45),u=a(46),h=a(53),g=a(47),m=a.n(g),p=a(126),b=a(127),f=a(131),v=a(129),_=a(130),w=a(128),y=a(51),E=a.n(y),O=a(52),j=a.n(O),k=a(48),S=a.n(k),C=a(123),L=a(125),I=a(29),W=a(120),x=a(12),B=Object(W.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:Object(s.a)({flexGrow:1,display:"none"},e.breakpoints.up("xs"),{display:"block"}),search:Object(s.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(x.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(x.b)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("xs"),{marginLeft:e.spacing(1),width:"auto"}),searchIcon:{width:e.spacing(7),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(s.a)({padding:e.spacing(1,1,1,7),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:120,"&:focus":{width:200}})}}));function P(e){var t=B();return o.a.createElement("div",{className:t.root},o.a.createElement(C.a,{position:"static"},o.a.createElement(L.a,null,o.a.createElement(I.a,{className:t.title,variant:"h6",noWrap:!0},e.title))))}var A={input:{marginBottom:10,marginLeft:5}},D=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).handleScriptLoad=function(){var e={};a.autocompleteOrigin=new google.maps.places.Autocomplete(document.getElementById("auto_origin"),e),a.autocompleteDestination=new google.maps.places.Autocomplete(document.getElementById("auto_destination"),e),a.autocompleteOrigin.setFields(["address_components","formatted_address"]),a.autocompleteDestination.setFields(["address_components","formatted_address"]),a.autocompleteOrigin.addListener("place_changed",a.handlePlaceSelect_origin),a.autocompleteDestination.addListener("place_changed",a.handlePlaceSelect_destination)},a.handleInputChange=function(e){var t,n=e.target,o="checkbox"===n.type?n.checked:n.value,i=n.name;if("origin"===i)a.setState((t={},Object(s.a)(t,i,o),Object(s.a)(t,"origin_googled",!1),t));else if("destination"===i){var r;a.setState((r={},Object(s.a)(r,i,o),Object(s.a)(r,"dest_googled",!1),r))}},a.handlePlaceSelect_destination=function(){var e=a.autocompleteDestination.getPlace();e.address_components&&a.setState({destination:e.formatted_address,dest_googled:!0})},a.handlePlaceSelect_origin=function(){var e=a.autocompleteOrigin.getPlace();e.address_components&&a.setState({origin:e.formatted_address,origin_googled:!0})},a.state={origin:"",destination:"",origin_googled:!1,dest_googled:!1,isLoading:!1,weathers:null},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.setState({origin:this.state.origin.trim(),destination:this.state.destination.trim(),isLoading:!0,weathers:null});var a=this.state,n=a.origin,o=a.destination,i=a.origin_googled,r=a.dest_googled;if(!i||!r)return this.setState({isLoading:!1}),console.log("can't submit"),void console.log(this.state);S.a.post("https://us-central1-snow-alert-262619.cloudfunctions.net/snowAlert",{origin:n,destination:o},{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(e.data),t.setState({weathers:e.data,isLoading:!1})}))}},{key:"render",value:function(){var e=this.state,t=e.weathers,a=e.isLoading,n=(this.props.classes,"https://maps.googleapis.com/maps/api/js?key=".concat("AIzaSyANW8BrVWspfz3Voy-uyZQOHj5zyYy8y1s","&libraries=places")),i=null;return null!==t&&(i=t.map((function(e,t){var a=e.observations.location[0];return o.a.createElement(p.a,{key:"".concat(t)+e.feedCreation},o.a.createElement(b.a,{primary:"\xb0C ".concat(a.observation[0].temperature," ").concat(a.observation[0].description),secondary:"".concat(a.city,", ").concat(a.state,", ").concat(a.country,"(").concat(a.observation[0].latitude,",").concat(a.observation[0].longitude,")")}))}))),o.a.createElement(o.a.Fragment,null,o.a.createElement(P,{title:"Weather on your route"}),o.a.createElement(m.a,{url:n,onLoad:this.handleScriptLoad}),o.a.createElement("br",null),o.a.createElement("form",{noValidate:!0,autoComplete:"off"},o.a.createElement("div",null,o.a.createElement(E.a,null),o.a.createElement(f.a,{id:"auto_origin",placeholder:"origin",value:this.state.origin,name:"origin",onChange:this.handleInputChange.bind(this),style:A.input,fullWidth:!0})),o.a.createElement("div",null,o.a.createElement(j.a,null),o.a.createElement(f.a,{id:"auto_destination",placeholder:"destination",value:this.state.destination,name:"destination",onChange:this.handleInputChange.bind(this),style:A.input,fullWidth:!0})),o.a.createElement(v.a,{variant:"contained",color:"primary",onClick:this.handleSubmit.bind(this),disabled:a},"get weathers on the route"),a&&o.a.createElement(_.a,{size:24})),o.a.createElement("div",null,o.a.createElement(w.a,{dense:!1},i)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[62,1,2]]]);
//# sourceMappingURL=main.4ab6dde1.chunk.js.map