/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 */

//
// http://ejohn.org/blog/simple-javascript-inheritance/
// http://www.cnblogs.com/enein/archive/2012/12/03/2799160.html
//

//核心代码，非常简洁
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    this.Class = function(){};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];

/*
if (typeof prop[name] == "function" 
        && typeof _super[name] == "function" 
        && fnTest.test(prop[name])) {

    prototype[name] = (function(name, fn){
        return function() {
            // special handling for _super
        };
    })(name, prop[name]);

} else {
    // just copy the property
    prototype[name] = prop[name];
}
*/
        }
        function Class() {
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();
