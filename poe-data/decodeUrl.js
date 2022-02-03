class byteDecoder {
    constructor() {
        this.init = function () {
            this.dataString = "", this.position = 0
        }
        this.bytesToInt16 = function (t) {
            return this.bytesToInt(t, 2)
        }
        this.bytesToInt = function (t, e) {
            e = e || 4;
            for (var i = 0, s = 0; s < e; ++s) i += t[s], s < e - 1 && (i <<= 8);
            return i
        }
        this.hasData = function () {
            return this.position < this.dataString.length
        }
        this.getDataString = function () {
            return this.dataString
        }
        this.setDataString = function (t) {
            this.dataString = t, this.position = 0
        }
        this.readInt8 = function () {
            return this.readInt(1)
        }
        this.readInt16 = function () {
            return this.readInt(2)
        }
        this.readInt = function (t) {
            t = t || 4;
            var e = this.position + t;
            if (e > this.dataString.length) throw "Integer read exceeds bounds";
            for (var i = []; this.position < e; ++this.position) i.push(this.dataString.charAt(this.position).charCodeAt(0));
            return this.bytesToInt(i, t)
        }
        this.init();
    }
}

module.exports.decode = function (str){
    let n = new byteDecoder();
    str = decodeURIComponent(str.replace(/-/g, "+").replace(/_/g, "/"));
    n.setDataString(atob(str));
    var s,a,r = 0,
        l = [],
        o = [],
        h = {};
    switch (n.readInt()) {
        case 4:
            for (s = n.readInt8(), a = n.readInt8(), r = n.readInt8(); n.hasData();) l.push(n.readInt16());
            break;
        case 5:
            s = n.readInt8(), a = n.readInt8();
            for (var c = n.readInt8(), d = 0; d < c; ++d) l.push(n.readInt16());
            var u = n.readInt8();
            for (d = 0; d < u; ++d) o.push(n.readInt16());
            break;
        case 6:
            s = n.readInt8(), a = n.readInt8();
            for (c = n.readInt8(), d = 0; d < c; ++d) l.push(n.readInt16());
            for (u = n.readInt8(), d = 0; d < u; ++d) o.push(n.readInt16());
            var v = n.readInt8();
            for (d = 0; d < v; ++d) {
                var f = n.readInt();
                h[65535 & f] = f >>> 16
            }
            break;
        default:
           return void alert("The build you are trying to load is using an old version of the passive tree and will not work.")
    }
    return l;
};