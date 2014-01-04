var plot = Alloy.Globals.plot;

var db = Ti.Database.open('couponDB');


var createDatabase = function() {
    db.execute('create table if not exists coupons(id integer primary key autoincrement, msg text, data text, cid text)');	
};

/*
 * db.execute('INSERT INTO city (name,continent,temp_f,temp_c,condition_id) VALUES (?,?,?,?,?)', importName, importContinent, importTempF, importTempC, dbConditionId);
var lastID = db.lastInsertRowID; // presumes `city` has an auto-increment column
 */
var insertCoupon = function(msg, data, cid) {
	db.execute("INSERT INTO coupons (msg, data, cid) VALUES (?,?,?)", msg, data, cid);
	return db.lastInsertRowId;
};

var getCoupons = function() {
	var sql = "select * from coupons";
	var results = [];
	
	var resultSet = db.execute(sql);
	while( resultSet.isValidRow()) {
		results.push({
			id: resultSet.fieldByName("id"),
			msg: resultSet.fieldByName("msg"),
			data: resultSet.fieldByName("data"),
			cid: resultSet.fieldByName('cid')
		});
		
		resultSet.next();
	}
	
	resultSet.close();
	return results;
};

createDatabase();

// Handle the receiving of an event:
//otification object, which has the fields "message", "data" and "id".
plot.addEventListener("plotNotificationReceived", function(notification) {
   var msg = notification.message;
   alert(msg);
   var data = notification.data;
   //alert(data);
   var cid = notification.id;
   if( typeof(id) == 'undefined') id = "undefined";
   if( id == null ) id = "unknown null";
   if( id == "") id = "unknown empty";
   //alert(id);
   insertCoupon(msg, data, cid);
   
});

plot.initPlot({ publicToken:'' });

function onTab2WindowFocus(e) {
	var allCoupons = getCoupons();
	if( allCoupons.length > 0 ) {
		var couponSummary = allCoupons[0].msg + "|" + allCoupons[0].data + "|" + allCoupons[0].cid;
		alert(couponSummary);
	} else {
		alert("No Coupons in the database");
	}
}

$.index.open();