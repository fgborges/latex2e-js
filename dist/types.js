// Generated by LiveScript 1.6.0
(function(){
  var makeLengthClass, Vector, out$ = typeof exports != 'undefined' && exports || this;
  out$.makeLengthClass = makeLengthClass = function(generator){
    return (function(){
      var g, unitsSp, prototype = constructor.prototype;
      g = generator;
      constructor.prototype._value = 0;
      constructor.prototype._unit = "";
      unitsSp = new Map([["sp", 1], ["pt", 65536], ["bp", 65536 * 72.27 / 72], ["pc", 65536 * 12], ["dd", 65536 * 1238 / 1157], ["cc", 65536 * 1238 / 1157 * 12], ["in", 65536 * 72.27], ["px", 65536 * 72.27 / 96], ["mm", 65536 * 7227 / 2540], ["cm", 65536 * 7227 / 254]]);
      constructor.zero = new constructor(0, "sp");
      function constructor(value, unit){
        if (!typeof value === "number") {
          g.error("Length CTOR: value needs to be a number!");
        }
        this._value = value;
        this._unit = unit;
        if (unitsSp.has(unit)) {
          this._value = value * unitsSp.get(unit);
          this._unit = "sp";
        }
      }
      Object.defineProperty(constructor.prototype, 'value', {
        get: function(){
          if (this._unit === "sp") {
            return g.round(this._value / unitsSp.get("px")) + "px";
          } else {
            return g.round(this._value) + this._unit;
          }
        },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(constructor.prototype, 'px', {
        get: function(){
          if (this._unit === "sp") {
            return g.round(this._value / unitsSp.get("px"));
          } else {
            return g.error("Length.px() called on relative length!");
          }
        },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(constructor.prototype, 'pxpct', {
        get: function(){
          if (this._unit === "sp") {
            return g.round(this._value / unitsSp.get("px"));
          } else {
            return g.round(this._value) + this._unit;
          }
        },
        configurable: true,
        enumerable: true
      });
      Object.defineProperty(constructor.prototype, 'unit', {
        get: function(){
          return this._unit;
        },
        configurable: true,
        enumerable: true
      });
      constructor.prototype.cmp = function(l){
        if (this._unit !== l._unit) {
          g.error("Length.cmp(): incompatible lengths! (" + this._unit + " and " + l._unit + ")");
        }
        if (this._value < l._value) {
          return -1;
        }
        if (this._value === l._value) {
          return 0;
        }
        return 1;
      };
      constructor.prototype.add = function(l){
        if (this._unit !== l._unit) {
          g.error("Length.add(): incompatible lengths! (" + this._unit + " and " + l._unit + ")");
        }
        return new g.Length(this._value + l._value, this._unit);
      };
      constructor.prototype.sub = function(l){
        if (this._unit !== l._unit) {
          g.error("Length.sub: incompatible lengths! (" + this._unit + " and " + l._unit + ")");
        }
        return new g.Length(this._value - l._value, this._unit);
      };
      constructor.prototype.mul = function(s){
        return new g.Length(this._value * s, this._unit);
      };
      constructor.prototype.div = function(s){
        return new g.Length(this._value / s, this._unit);
      };
      constructor.prototype.abs = function(){
        return new g.Length(Math.abs(this._value), this._unit);
      };
      constructor.prototype.ratio = function(l){
        if (this._unit !== l._unit) {
          g.error("Length.ratio: incompatible lengths! (" + this._unit + " and " + l._unit + ")");
        }
        return this._value / l._value;
      };
      constructor.prototype.norm = function(l){
        if (this._unit !== l._unit) {
          g.error("Length.norm: incompatible lengths! (" + this._unit + " and " + l._unit + ")");
        }
        return new g.Length(Math.sqrt(Math.pow(this._value, 2) + Math.pow(l._value, 2)), this._unit);
      };
      constructor.min = function(){
        return Array.from(arguments).reduce(function(a, b){
          if (a.cmp(b) < 0) {
            return a;
          } else {
            return b;
          }
        });
      };
      constructor.max = function(){
        return Array.from(arguments).reduce(function(a, b){
          if (a.cmp(b) > 0) {
            return a;
          } else {
            return b;
          }
        });
      };
      return constructor;
    }());
  };
  out$.Vector = Vector = (function(){
    Vector.displayName = 'Vector';
    var prototype = Vector.prototype, constructor = Vector;
    Vector.prototype._x = null;
    Vector.prototype._y = null;
    function Vector(x, y){
      this._x = x;
      this._y = y;
    }
    Object.defineProperty(Vector.prototype, 'x', {
      get: function(){
        return this._x;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(Vector.prototype, 'y', {
      get: function(){
        return this._y;
      },
      configurable: true,
      enumerable: true
    });
    Vector.prototype.add = function(v){
      return new Vector(this._x.add(v.x), this._y.add(v.y));
    };
    Vector.prototype.sub = function(v){
      return new Vector(this._x.sub(v.x), this._y.sub(v.y));
    };
    Vector.prototype.mul = function(s){
      return new Vector(this._x.mul(s), this._y.mul(s));
    };
    Vector.prototype.shift_start = function(l){
      var x, y, msq, imsq, dir_x, dir_y, sx, sy;
      if (this._x.unit !== this._y.unit) {
        throw new Error("Vector.shift_start: incompatible lengths! (" + this._x.unit + " and " + this._y.unit + ")");
      }
      x = this._x._value;
      y = this._y._value;
      msq = Math.sqrt(1 + y * y / (x * x));
      imsq = Math.sqrt(1 + x * x / (y * y));
      dir_x = x < 0 ? -1 : 1;
      dir_y = y < 0 ? -1 : 1;
      if (x !== 0 && y !== 0) {
        sx = l.div(msq).mul(-dir_x);
        sy = l.div(imsq).mul(-dir_y);
      } else if (y === 0) {
        sx = l.mul(-dir_x);
        sy = this._y.mul(0);
      } else {
        sx = this._x.mul(0);
        sy = l.mul(-dir_y);
      }
      return new Vector(sx, sy);
    };
    Vector.prototype.shift_end = function(l){
      var x, y, msq, imsq, dir_x, dir_y, ex, ey;
      if (this._x.unit !== this._y.unit) {
        throw new Error("Vector.shift_end: incompatible lengths! (" + this._x.unit + " and " + this._y.unit + ")");
      }
      x = this._x._value;
      y = this._y._value;
      msq = Math.sqrt(1 + y * y / (x * x));
      imsq = Math.sqrt(1 + x * x / (y * y));
      dir_x = x < 0 ? -1 : 1;
      dir_y = y < 0 ? -1 : 1;
      if (x !== 0 && y !== 0) {
        ex = this._x.add(l.div(msq).mul(dir_x));
        ey = this._y.add(l.div(imsq).mul(dir_y));
      } else if (y === 0) {
        ex = this._x.add(l.mul(dir_x));
        ey = this._y;
      } else {
        ex = this._x;
        ey = this._y.add(l.mul(dir_y));
      }
      return new Vector(ex, ey);
    };
    Vector.prototype.norm = function(){
      return this._x.norm(this._y);
    };
    return Vector;
  }());
}).call(this);

//# sourceMappingURL=data:application/json;base64,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LFFBQUEsQ0FBQTthQUNGLElBQUMsQ0FBQSxFQUFFLENBQUMsS0FBSyxJQUFDLENBQUEsRUFBRCIsImZpbGUiOiJ0eXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiMgVGhpcyBjbGFzcyBtYW5hZ2VzIGxlbmd0aHMuIEEgbGVuZ3RoIGlzIGltbXV0YWJsZS5cbiMgSW50ZXJuYWxseSwgbWF4aW11bSBwcmVjaXNpb24gaXMgdXNlZCBieSBzdG9yaW5nIGFic29sdXRlIGxlbmd0aHMgaW4gc3AuXG4jXG4jIFdlIG5lZWQgdGhlIExlbmd0aCBjbGFzcyBwZXIgZ2VuZXJhdG9yLCBzbyBzY29wZSBpdFxuZXhwb3J0IG1ha2VMZW5ndGhDbGFzcyA9IChnZW5lcmF0b3IpIC0+IGNsYXNzXG4gICAgIyBUT0RPOiB0ZXN0OiBMZW5ndGggPSBnZW5lcmF0b3IuTGVuZ3RoXG4gICAgZyA9IGdlbmVyYXRvclxuXG4gICAgIyBjb25jZXB0dWFsbHkgcHJpdmF0ZVxuICAgIF92YWx1ZTogMFxuICAgIF91bml0OiBcIlwiXG5cbiAgICAjIGFsbCB1bml0cyBpbiBUZVggc3BcbiAgICB1bml0c1NwID0gbmV3IE1hcChbXG4gICAgICAgICogXCJzcFwiICAxXG4gICAgICAgICogXCJwdFwiICA2NTUzNlxuICAgICAgICAqIFwiYnBcIiAgNjU1MzYgKiA3Mi4yNy83MiAgICAgICAgIyAxIGJwIGlzIHRoZSBub24tdHJhZGl0aW9uYWwgcHRcbiAgICAgICAgKiBcInBjXCIgIDY1NTM2ICogMTJcbiAgICAgICAgKiBcImRkXCIgIDY1NTM2ICogMTIzOC8xMTU3XG4gICAgICAgICogXCJjY1wiICA2NTUzNiAqIDEyMzgvMTE1NyAqIDEyXG4gICAgICAgICogXCJpblwiICA2NTUzNiAqIDcyLjI3XG4gICAgICAgICogXCJweFwiICA2NTUzNiAqIDcyLjI3Lzk2ICAgICAgICAjIDEgcHggaXMgMS85NiBpblxuICAgICAgICAqIFwibW1cIiAgNjU1MzYgKiA3MjI3LzI1NDBcbiAgICAgICAgKiBcImNtXCIgIDY1NTM2ICogNzIyNy8yNTRcbiAgICBdKVxuXG4gICAgIyB6ZXJvIGNsYXNzIGNvbnN0YW50XG4gICAgQHplcm8gPSBuZXcgQEAoMCwgXCJzcFwiKVxuXG4gICAgIyBDVE9SXG4gICAgKHZhbHVlLCB1bml0KSAtPlxuICAgICAgICBnLmVycm9yIFwiTGVuZ3RoIENUT1I6IHZhbHVlIG5lZWRzIHRvIGJlIGEgbnVtYmVyIVwiIGlmIG5vdCB0eXBlb2YgdmFsdWUgPT0gXCJudW1iZXJcIlxuXG4gICAgICAgIEBfdmFsdWUgPSB2YWx1ZVxuICAgICAgICBAX3VuaXQgPSB1bml0XG5cbiAgICAgICAgIyBpZiBub3QgcmVsYXRpdmUvdW5rbm93biB1bml0LCBjb252ZXJ0IHRvIHNwXG4gICAgICAgIGlmIHVuaXRzU3AuaGFzIHVuaXRcbiAgICAgICAgICAgIEBfdmFsdWUgPSB2YWx1ZSAqIHVuaXRzU3AuZ2V0IHVuaXRcbiAgICAgICAgICAgIEBfdW5pdCA9IFwic3BcIlxuXG5cbiAgICAjIGxlbmd0aCBhcyBzdHJpbmcgKGNvbnZlcnRlZCB0byBweCBpZiBub3QgcmVsYXRpdmUpLCByb3VuZGVkIHRvIGdsb2JhbCBwcmVjaXNpb25cbiAgICB2YWx1ZTp+IC0+XG4gICAgICAgIGlmIEBfdW5pdCA9PSBcInNwXCJcbiAgICAgICAgICAgIChnLnJvdW5kIEBfdmFsdWUgLyB1bml0c1NwLmdldCBcInB4XCIpICsgXCJweFwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGcucm91bmQoQF92YWx1ZSkgKyBAX3VuaXRcblxuICAgICMgdmFsdWUgaW4gcHggKHRocm93IGVycm9yIGlmIHJlbGF0aXZlKSwgcm91bmRlZCB0byBnbG9iYWwgcHJlY2lzaW9uXG4gICAgcHg6fiAtPlxuICAgICAgICBpZiBAX3VuaXQgPT0gXCJzcFwiXG4gICAgICAgICAgICBnLnJvdW5kIEBfdmFsdWUgLyB1bml0c1NwLmdldCBcInB4XCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZy5lcnJvciBcIkxlbmd0aC5weCgpIGNhbGxlZCBvbiByZWxhdGl2ZSBsZW5ndGghXCJcblxuICAgICMgdW5pdGxlc3MgdmFsdWUsIHVubGVzcyByZWxhdGl2ZS91bmtub3duIHVuaXRcbiAgICBweHBjdDp+IC0+XG4gICAgICAgIGlmIEBfdW5pdCA9PSBcInNwXCJcbiAgICAgICAgICAgIGcucm91bmQgQF92YWx1ZSAvIHVuaXRzU3AuZ2V0IFwicHhcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBnLnJvdW5kKEBfdmFsdWUpICsgQF91bml0XG5cblxuICAgIHVuaXQ6fiAtPiBAX3VuaXRcblxuXG4gICAgIyBjb21wYXJlIHRoaXMgbGVuZ3RoIHRvIGFub3RoZXIgbGVuZ3RoLCByZXR1cm4gLTEsIDAsIDEgaWYgdGhpcyBpcyBzbWFsbGVyLCBlcXVhbCwgZ3JlYXRlclxuICAgIGNtcDogKGwpIC0+XG4gICAgICAgIGcuZXJyb3IgXCJMZW5ndGguY21wKCk6IGluY29tcGF0aWJsZSBsZW5ndGhzISAoI3tAX3VuaXR9IGFuZCAje2wuX3VuaXR9KVwiIGlmIEBfdW5pdCAhPSBsLl91bml0XG4gICAgICAgIHJldHVybiAtMSBpZiBAX3ZhbHVlIDwgbC5fdmFsdWVcbiAgICAgICAgcmV0dXJuICAwIGlmIEBfdmFsdWUgPT0gbC5fdmFsdWVcbiAgICAgICAgcmV0dXJuICAxXG5cblxuICAgICMgYWRkIGFub3RoZXIgbGVuZ3RoIHRvIHRoaXMgbGVuZ3RoIGFuZCByZXR1cm4gdGhlIG5ldyBsZW5ndGhcbiAgICBhZGQ6IChsKSAtPlxuICAgICAgICBnLmVycm9yIFwiTGVuZ3RoLmFkZCgpOiBpbmNvbXBhdGlibGUgbGVuZ3RocyEgKCN7QF91bml0fSBhbmQgI3tsLl91bml0fSlcIiBpZiBAX3VuaXQgIT0gbC5fdW5pdFxuICAgICAgICBuZXcgZy5MZW5ndGggQF92YWx1ZSArIGwuX3ZhbHVlLCBAX3VuaXRcblxuICAgICMgc3VidHJhY3QgYW5vdGhlciBsZW5ndGggZnJvbSB0aGlzIGxlbmd0aFxuICAgIHN1YjogKGwpIC0+XG4gICAgICAgIGcuZXJyb3IgXCJMZW5ndGguc3ViOiBpbmNvbXBhdGlibGUgbGVuZ3RocyEgKCN7QF91bml0fSBhbmQgI3tsLl91bml0fSlcIiBpZiBAX3VuaXQgIT0gbC5fdW5pdFxuICAgICAgICBuZXcgZy5MZW5ndGggQF92YWx1ZSAtIGwuX3ZhbHVlLCBAX3VuaXRcblxuICAgICMgbXVsdGlwbHkgdGhpcyBsZW5ndGggd2l0aCBhIHNjYWxhclxuICAgIG11bDogKHMpIC0+XG4gICAgICAgIG5ldyBnLkxlbmd0aCBAX3ZhbHVlICogcywgQF91bml0XG5cbiAgICAjIGRpdmlkZSB0aGlzIGxlbmd0aCBieSBhIHNjYWxhclxuICAgIGRpdjogKHMpIC0+XG4gICAgICAgIG5ldyBnLkxlbmd0aCBAX3ZhbHVlIC8gcywgQF91bml0XG5cbiAgICAjIHJldHVybiB0aGUgYXJpdGhtZXRpYyBhYnNvbHV0ZSBsZW5ndGhcbiAgICBhYnM6IC0+XG4gICAgICAgIG5ldyBnLkxlbmd0aCBNYXRoLmFicyhAX3ZhbHVlKSwgQF91bml0XG5cbiAgICAjIGdldCB0aGUgcmF0aW8gb2YgdGhpcyBsZW5ndGggdG8gYW5vdGhlciBsZW5ndGhcbiAgICByYXRpbzogKGwpIC0+XG4gICAgICAgIGcuZXJyb3IgXCJMZW5ndGgucmF0aW86IGluY29tcGF0aWJsZSBsZW5ndGhzISAoI3tAX3VuaXR9IGFuZCAje2wuX3VuaXR9KVwiIGlmIEBfdW5pdCAhPSBsLl91bml0XG4gICAgICAgIEBfdmFsdWUgLyBsLl92YWx1ZVxuXG4gICAgIyBjYWxjdWxhdGUgdGhlIEwyIG5vcm0gb2YgdGhpcyBhbmQgYW5vdGhlciBsZW5ndGhcbiAgICBub3JtOiAobCkgLT5cbiAgICAgICAgZy5lcnJvciBcIkxlbmd0aC5ub3JtOiBpbmNvbXBhdGlibGUgbGVuZ3RocyEgKCN7QF91bml0fSBhbmQgI3tsLl91bml0fSlcIiBpZiBAX3VuaXQgIT0gbC5fdW5pdFxuICAgICAgICBuZXcgZy5MZW5ndGggTWF0aC5zcXJ0KEBfdmFsdWUqKjIgKyBsLl92YWx1ZSoqMiksIEBfdW5pdFxuXG5cbiAgICBAbWluID0gLT5cbiAgICAgICAgQXJyYXkuZnJvbSgmKS5yZWR1Y2UgKGEsIGIpIC0+XG4gICAgICAgICAgICBpZiBhLmNtcChiKSA8IDAgdGhlbiBhIGVsc2UgYlxuXG4gICAgQG1heCA9IC0+XG4gICAgICAgIEFycmF5LmZyb20oJikucmVkdWNlIChhLCBiKSAtPlxuICAgICAgICAgICAgaWYgYS5jbXAoYikgPiAwIHRoZW4gYSBlbHNlIGJcblxuXG4jIGEgcG9zaXRpb24gdmVjdG9yIChmcm9tIG9yaWdpbiB0byBwb2ludClcbmV4cG9ydCBjbGFzcyBWZWN0b3JcblxuICAgIF94OiBudWxsICMgTGVuZ3RoXG4gICAgX3k6IG51bGwgIyBMZW5ndGhcblxuXG4gICAgIyBDVE9SOiB4IGFuZCB5IGNhbiBiZSBMZW5ndGhzIFRPRE86IG9yIHVuaXRsZXNzIGNvb3JkaW5hdGVzP1xuICAgICh4LCB5KSAtPlxuICAgICAgICBAX3ggPSB4XG4gICAgICAgIEBfeSA9IHlcblxuXG4gICAgeDp+IC0+IEBfeFxuICAgIHk6fiAtPiBAX3lcblxuXG4gICAgYWRkOiAodikgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAX3guYWRkKHYueCksIEBfeS5hZGQodi55KVxuXG4gICAgc3ViOiAodikgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAX3guc3ViKHYueCksIEBfeS5zdWIodi55KVxuXG4gICAgbXVsOiAocykgLT5cbiAgICAgICAgbmV3IFZlY3RvciBAX3gubXVsKHMpLCBAX3kubXVsKHMpXG5cbiAgICAjIHNoaWZ0IHRoZSBzdGFydCBwb2ludCBvZiB0aGUgdmVjdG9yIGFsb25nIGl0cyBkaXJlY3Rpb24gdG8gc2hvcnRlbiAobCA8IDApIG9yIGxlbmd0aGVuIChsID4gMCkgdGhlIHZlY3RvclxuICAgICMgYW5kIHJldHVybiBhbm90aGVyIHBvc2l0aW9uIHZlY3RvciB0aGF0IHdpbGwgcG9pbnQgdG8gdGhlIG5ldyBzdGFydCBvZiB0aGUgdmVjdG9yXG4gICAgc2hpZnRfc3RhcnQ6IChsKSAtPlxuICAgICAgICBpZiBAX3gudW5pdCAhPSBAX3kudW5pdFxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVmVjdG9yLnNoaWZ0X3N0YXJ0OiBpbmNvbXBhdGlibGUgbGVuZ3RocyEgKCN7QF94LnVuaXR9IGFuZCAje0BfeS51bml0fSlcIlxuXG4gICAgICAgICMgbF4yID0geF4yICsgeV4yXG4gICAgICAgICNcbiAgICAgICAgIyB5ID0gbSp4XG4gICAgICAgICMgeCA9IHkvbVxuICAgICAgICAjIG0gPSB5L3hcbiAgICAgICAgI1xuICAgICAgICAjICA9PiBsXjIgPSB4XjIgKyB4XjIgKiBtXjIgICA9ICAgeF4yICogKDEgKyBtXjIpXG4gICAgICAgICMgID0+IGxeMiA9IHleMi9tXjIgKyB5XjIgICAgID0gICB5XjIgKiAoMSArIDEvbV4yKVxuICAgICAgICAjXG4gICAgICAgICMgID0+IHggPSBsL3NxcnQoMSArIG1eMilcbiAgICAgICAgIyAgPT4geSA9IGwvc3FydCgxICsgMS9tXjIpXG5cbiAgICAgICAgeCA9IEBfeC5fdmFsdWVcbiAgICAgICAgeSA9IEBfeS5fdmFsdWVcblxuICAgICAgICBtc3EgID0gTWF0aC5zcXJ0IDEgKyB5KnkgLyAoeCp4KVxuICAgICAgICBpbXNxID0gTWF0aC5zcXJ0IDEgKyB4KnggLyAoeSp5KVxuXG4gICAgICAgIGRpcl94ID0gaWYgeCA8IDAgdGhlbiAtMSBlbHNlIDFcbiAgICAgICAgZGlyX3kgPSBpZiB5IDwgMCB0aGVuIC0xIGVsc2UgMVxuXG4gICAgICAgICMgbmV3IHN0YXJ0IHBvaW50IG9mIGFycm93IGlzIGF0IGwgZGlzdGFuY2UgaW4gZGlyZWN0aW9uIG0gZnJvbSBvcmlnaW5cbiAgICAgICAgaWYgeCAhPSAwIGFuZCB5ICE9IDBcbiAgICAgICAgICAgIHN4ID0gbC5kaXYobXNxKS5tdWwgLWRpcl94XG4gICAgICAgICAgICBzeSA9IGwuZGl2KGltc3EpLm11bCAtZGlyX3lcbiAgICAgICAgZWxzZSBpZiB5ID09IDBcbiAgICAgICAgICAgIHN4ID0gbC5tdWwgLWRpcl94XG4gICAgICAgICAgICBzeSA9IEBfeS5tdWwgMFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzeCA9IEBfeC5tdWwgMFxuICAgICAgICAgICAgc3kgPSBsLm11bCAtZGlyX3lcblxuICAgICAgICBuZXcgVmVjdG9yIHN4LCBzeVxuXG5cbiAgICBzaGlmdF9lbmQ6IChsKSAtPlxuICAgICAgICBpZiBAX3gudW5pdCAhPSBAX3kudW5pdFxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVmVjdG9yLnNoaWZ0X2VuZDogaW5jb21wYXRpYmxlIGxlbmd0aHMhICgje0BfeC51bml0fSBhbmQgI3tAX3kudW5pdH0pXCJcblxuICAgICAgICB4ID0gQF94Ll92YWx1ZVxuICAgICAgICB5ID0gQF95Ll92YWx1ZVxuXG4gICAgICAgICMgc2hvcnRlbiB2ZWN0b3IgYnkgaGFsZiB0aGUgYXJyb3cgaGVhZCBsZW5ndGhcbiAgICAgICAgbXNxICA9IE1hdGguc3FydCAxICsgeSp5IC8gKHgqeClcbiAgICAgICAgaW1zcSA9IE1hdGguc3FydCAxICsgeCp4IC8gKHkqeSlcblxuICAgICAgICBkaXJfeCA9IGlmIHggPCAwIHRoZW4gLTEgZWxzZSAxXG4gICAgICAgIGRpcl95ID0gaWYgeSA8IDAgdGhlbiAtMSBlbHNlIDFcblxuICAgICAgICBpZiB4ICE9IDAgYW5kIHkgIT0gMFxuICAgICAgICAgICAgZXggPSBAX3guYWRkKGwuZGl2KG1zcSkubXVsIGRpcl94KVxuICAgICAgICAgICAgZXkgPSBAX3kuYWRkKGwuZGl2KGltc3EpLm11bCBkaXJfeSlcbiAgICAgICAgZWxzZSBpZiB5ID09IDBcbiAgICAgICAgICAgIGV4ID0gQF94LmFkZChsLm11bCBkaXJfeClcbiAgICAgICAgICAgIGV5ID0gQF95XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGV4ID0gQF94XG4gICAgICAgICAgICBleSA9IEBfeS5hZGQobC5tdWwgZGlyX3kpXG5cbiAgICAgICAgbmV3IFZlY3RvciBleCwgZXlcblxuXG4gICAgIyBjYWxjdWxhdGUgbGVuZ3RoIG9mIHZlY3RvcjsgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBMZW5ndGhcbiAgICBub3JtOiAtPlxuICAgICAgICBAX3gubm9ybSBAX3lcbiJdfQ==
