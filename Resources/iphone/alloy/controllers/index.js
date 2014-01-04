function Controller() {
    function onTab2WindowFocus() {
        var allCoupons = getCoupons();
        if (allCoupons.length > 0) {
            var couponSummary = allCoupons[0].msg + "|" + allCoupons[0].data + "|" + allCoupons[0].cid;
            alert(couponSummary);
        } else alert("No Coupons in the database");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId0 = [];
    $.__views.__alloyId2 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 1",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 1",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Tab 1",
        icon: "KS_nav_ui.png",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId5 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 2",
        id: "__alloyId5"
    });
    onTab2WindowFocus ? $.__views.__alloyId5.addEventListener("focus", onTab2WindowFocus) : __defers["$.__views.__alloyId5!focus!onTab2WindowFocus"] = true;
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 2",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var plot = Alloy.Globals.plot;
    var db = Ti.Database.open("couponDB");
    var createDatabase = function() {
        db.execute("create table if not exists coupons(id integer primary key autoincrement, msg text, data text, cid text)");
    };
    var insertCoupon = function(msg, data, cid) {
        db.execute("INSERT INTO coupons (msg, data, cid) VALUES (?,?,?)", msg, data, cid);
        return db.lastInsertRowId;
    };
    var getCoupons = function() {
        var sql = "select * from coupons";
        var results = [];
        var resultSet = db.execute(sql);
        while (resultSet.isValidRow()) {
            results.push({
                id: resultSet.fieldByName("id"),
                msg: resultSet.fieldByName("msg"),
                data: resultSet.fieldByName("data"),
                cid: resultSet.fieldByName("cid")
            });
            resultSet.next();
        }
        resultSet.close();
        return results;
    };
    createDatabase();
    plot.addEventListener("plotNotificationReceived", function(notification) {
        var msg = notification.message;
        alert(msg);
        var data = notification.data;
        var cid = notification.id;
        "undefined" == typeof id && (id = "undefined");
        null == id && (id = "unknown null");
        "" == id && (id = "unknown empty");
        insertCoupon(msg, data, cid);
    });
    plot.initPlot({
        publicToken: "le5yCJ9WZIxDJPfM"
    });
    $.index.open();
    __defers["$.__views.__alloyId5!focus!onTab2WindowFocus"] && $.__views.__alloyId5.addEventListener("focus", onTab2WindowFocus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;