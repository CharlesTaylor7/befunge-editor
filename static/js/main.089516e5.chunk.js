(window["webpackJsonpreact-befunge-editor"]=window["webpackJsonpreact-befunge-editor"]||[]).push([[0],{33:function(t,e,n){t.exports=n(48)},43:function(t,e,n){},44:function(t,e,n){},45:function(t,e,n){},47:function(t,e,n){},48:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),i=n(16),c=n.n(i),o=n(9),u=(n(43),n(44),n(45),n(49)),s=n(53),d=n(57),f=n(31),h=function(t,e){var n,r=t%e;return{quot:-0===(n=(t-r)/e)?0:n,rem:r}},p=function(t,e){var n=h(t,e),r=n.quot,a=n.rem;return Math.sign(a)===-Math.sign(e)?{div:r-1,mod:a+e}:{div:r,mod:a}},l=function(t,e){return h(t,e).rem},m=function(t,e){return h(t,e).quot},g=function(t,e){return p(t,e).mod},E=d.a("x"),v=d.a("y"),w=function(t){var e=t.direction,n=t.dimensions,r=t.jumpSize,a=void 0===r?1:r,i=n.width,c=n.height;switch(e){case"Right":return f.a(E,function(t){return g(t+a,i)});case"Down":return f.a(v,function(t){return g(t+a,c)});case"Left":return f.a(E,function(t){return g(t-a,i)});case"Up":return f.a(v,function(t){return g(t-a,c)});default:throw new Error("Unrecognized direction!")}},_=Object(o.b)(function(t,e){return{value:t.grid[e.id],inFocus:s.a(e.position,t.editorFocus),isExecuting:s.a(e.position,t.executionPointer),gridDimensions:t.dimensions}})(function(t){var e=t.position,n=t.value,i=t.inFocus,c=t.isCurrentInstruction,o=t.gridDimensions,s=t.dispatch,d=Object(r.useRef)(null),f=e.x,h=e.y;Object(r.useEffect)(function(){i&&d.current.focus()},[i]);return a.a.createElement("div",{"data-testid":"cell-div-".concat(f,"-").concat(h),className:c?"highlighted cell":"cell",onClick:function(){return s({type:"SET_EDITOR_FOCUS",position:e})},onKeyDown:function(t){return function(t){var r=u.a(/^Arrow(.*)$/,t)[1];r?s({type:"SET_EDITOR_FOCUS",position:w({direction:r,dimensions:o})(e)}):"Backspace"!==t||""!==n&&null!==n&&void 0!==n||s({type:"SET_EDITOR_FOCUS",position:w({direction:"Left",dimensions:o})(e)})}(t.key)}},a.a.createElement("input",{"data-testid":"cell-input-".concat(f,"-").concat(h),className:"input",type:"text",maxLength:"1",ref:d,value:n,onChange:function(t){return function(t){if(s({type:"EDIT_CELL",position:e,value:t}),""!==t){var n=o.width,r=o.height,a=(f+1)%n;s({type:"SET_EDITOR_FOCUS",position:{x:a,y:0===a?(h+1)%r:h}})}}(t.target.value)}}))}),y=Object(o.b)()(function(t){var e=t.dispatch;return Object(r.useEffect)(function(){e({type:"SET_GRID_DIMENSIONS",height:9,width:9})},[e]),a.a.createElement("div",{className:"grid"},Array(81).fill().map(function(t,e){var n=Math.floor(e/9),r=e%9;return a.a.createElement(_,{key:"cell-".concat(e),position:{x:r,y:n}})}))}),O=Object(o.b)()(function(t){var e=t.dispatch;return a.a.createElement("div",{className:"app"},a.a.createElement("div",{className:"header"},"Welcome to Befunge!",a.a.createElement("div",{className:"button",onClick:function(){return console.log("Undo: To Be implemented.")}},"<"),a.a.createElement("div",{className:"button",onClick:function(){return function(t){t({type:"EXECUTE"}),t({type:"ADVANCE"})}(e)}},">")),a.a.createElement(y,null))}),b=n(17),k=n(59),C=n(58),S=n(54),D=n(15),x=n(55),I=n(52),T=n(14),U=n.n(T),N=n(28),j=n(56),R=n(50),A=n(32),L=n(51),F=U.a.mark(B),M=function t(){return Object(N.a)(this,t),this[Symbol.iterator]=U.a.mark(function t(){return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t)}),Object.freeze(this)};function B(){return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.__head;case 2:return t.delegateYield(this.__tail,"t0",3);case 3:case"end":return t.stop()}},F,this)}var z,X=function t(e,n){if(Object(N.a)(this,t),r=n,!j.a(function(t){return t===r.constructor.name},[M.name,X.name]))throw new Error("Tail must be a stack.");var r;return this.__head=e,this.__tail=n,this[Symbol.iterator]=B.bind(this),Object.freeze(this)},V=new M,P=function(t){return t.constructor.name===M.name},q=R.a(function(t,e){return new X(t,e)}),G=R.a(function(t,e){for(var n=[],r=0;r<t;r++)P(e)?n.push(0):(n.push(e.__head),e=e.__tail);return n.push(e),n}),J={empty:V,isEmpty:P,push:q,pop:G,fromArray:function(t){return A.a(function(t,e){return q(e,t)},V,L.a(t))}},$=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e[Math.floor(Math.random()*e.length)]},K=function(t){var e=t.x,n=t.y;return x.a(["grid","".concat(e,"-").concat(n)])},W=function(t){var e=t.executionPointer,n=I.a(K(e),t);return void 0===n||""===n?" ":n},Y=function(t){return f.a(d.a("stack"),function(e){var n=J.pop(2,e),r=Object(D.a)(n,3),a=r[0],i=r[1],c=r[2],o=t(a,i);return J.push(o,c)})},H=function(t,e){switch(e.type){case"SET_GRID_DIMENSIONS":var n=e.height,r=e.width;return C.a(d.a("dimensions"),{height:n,width:r},t);case"EDIT_CELL":var a=e.position,i=e.value;return C.a(K(a),i,t);case"SET_EDITOR_FOCUS":var c=e.position,o=c.x,u=c.y,s=t.dimensions,h=s.width,p=s.height;return o>=0&&o<h&&u>=0&&u<p?C.a(d.a("editorFocus"),e.position,t):t;case"ADVANCE":var g=t.activeBridge?2:1;return S.a(C.a(d.a("activeBridge"),!1),f.a(d.a("executionPointer"),w({jumpSize:g,direction:t.heading,dimensions:t.dimensions})));case"EXECUTE":return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:W(t);if("string"!==typeof e)throw new Error("Instruction is not a string.");if(1!==e.length)throw new Error("Instruction should be a single character.");if(t.stringMode&&'"'!==e)return f.a(d.a("stack"),J.push(e.charCodeAt(0)),t);var n=e.charCodeAt(0),r=n-"0".charCodeAt(0);if(r>=0&&r<10)return f.a(d.a("stack"),J.push(r),t);switch(e){case"+":return Y(function(t,e){return t+e})(t);case"-":return Y(function(t,e){return e-t})(t);case"*":return Y(function(t,e){return t*e})(t);case"/":return Y(function(t,e){return m(e,t)})(t);case"%":return Y(function(t,e){return l(e,t)})(t);case"!":return f.a(x.a(["stack","head"]),function(t){return 0===t?1:0},t);case"`":return Y(function(t,e){return e>t?1:0})(t);case">":return C.a(d.a("heading"),"Right",t);case"<":return C.a(d.a("heading"),"Left",t);case"^":return C.a(d.a("heading"),"Up",t);case"V":return C.a(d.a("heading"),"Down",t);case"?":return C.a(d.a("heading"),$("Right","Left","Up","Down"),t);case"_":return S.a(f.a(d.a("stack"),function(t){return t.tail}),C.a(d.a("heading"),t.stack.head?"Left":"Right"))(t);case"|":return S.a(f.a(d.a("stack"),function(t){return t.tail}),C.a(d.a("heading"),t.stack.head?"Up":"Down"))(t);case'"':return f.a(d.a("stringMode"),function(t){return!t},t);case":":return f.a(d.a("stack"),function(t){return J.push(t.head,t)},t);case"\\":return f.a(d.a("stack"),function(t){var e=J.pop(2,t),n=Object(D.a)(e,3),r=n[0],a=n[1],i=n[2];return J.push(a,J.push(r,i))},t);case"$":return C.a(d.a("stack"),function(t){return t.tail},t);case".":return S.a(f.a(d.a("stack"),function(t){return t.tail}),C.a(d.a("console"),function(e){return e+t.stack.head+" "}))(t);case",":return S.a(f.a(d.a("stack"),function(t){return t.tail}),C.a(d.a("console"),function(e){return e+String.fromCharCode(t.stack.head)}))(t);case"#":return C.a(d.a("activeBridge"),!0,t);case"g":return f.a(d.a("stack"),function(e){var n=J.pop(2,e),r=Object(D.a)(n,3),a=r[0],i=r[1],c=r[2],o=I.a(K({x:i,y:a}),t);return J.push(o.charCodeAt(0),c)},t);case"p":var a=J.pop(3,t.stack),i=Object(D.a)(a,4),c=i[0],o=i[1],u=i[2],s=i[3];return S.a(C.a(K({x:o,y:c}),String.fromCharCode(u)),C.a(d.a("stack"),s))(t);case"&":return C.a(d.a("pendingUserInput"),"Number",t);case"~":return C.a(d.a("pendingUserInput"),"Character",t);case"@":return C.a(d.a("executionComplete"),!0,t);case" ":return t;default:throw new Error("Unrecognized instruction: '".concat(e,"'."))}}(t);default:return t}},Q={editorFocus:{x:0,y:0},executionPointer:{x:0,y:0},heading:"Right",grid:{},dimensions:{height:0,width:0},stack:J.empty,console:"",activeBridge:!1,executionComplete:!1,stringMode:!1,pendingUserInput:!1};n(47);c.a.render(a.a.createElement(o.a,{store:Object(b.b)(H,k.a(k.a(Q,z),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()))},a.a.createElement(O,null)),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.089516e5.chunk.js.map