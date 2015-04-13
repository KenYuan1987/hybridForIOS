var global = {
	discountLevel : new Object,
	storeInformation : new Object,
	tradeRecords : new Object
}
global.discountLevel = [
	{
		index:5,
		url: "img/moreDiscount/VIP5@2x.png",
		name:"VIP 5 青卡",
		discount:'8.5'
	},
	
	{
		index:4,
		url: "img/moreDiscount/VIP4@2x.png",
		name:"VIP 4 绿卡",
		discount:'9.0'
	},
	{
		index:3,
		url: "img/moreDiscount/VIP3@2x.png",
		name:"VIP 3 黄卡",
		discount:'9.5'
	},
	
	{
		index:2,
		url: "img/moreDiscount/VIP2@2x.png",
		name:"VIP 2 橙卡",
		discount:'9.8'
	},
	
	{
		index:1,
		url: "img/moreDiscount/VIP1@2x.png",
		name:"VIP 1 红卡",
		discount:'9.9'
	}
];   










var CreateTradeRecords = function(jsonstr){
	var recordLists = this.setRecordLists(jsonstr);
	var tradeRecords = new Array();
	this.months =  new Array();
	this.getTradeRecords = function(){
		if(recordLists)
		{
			var newTradeRecords = this.createRecordByMonth(recordLists,tradeRecords);
			tradeRecords = this.initLastMonth(newTradeRecords,recordLists);
			return newTradeRecords;		
		}
		return null;
	} 
	
}
CreateTradeRecords.prototype = {
	setRecordLists : function(jsonstr){
		return $.parseJSON(jsonstr);
	},
	initLastMonth : function(tradeRecords,recordLists){
		tradeRecords[0].month = '本';
		tradeRecords[0].currentLess = recordLists[0].balance;
		return tradeRecords
	},
	 checkMonth : function(month){
		 var i =0 
		 for( len = this.months.length; i<len; i++){
			if(this.months[i] == month)
				return i==0?-1:i;
		 }
		 this.months.push(month)
		 return false;
	},
	createRecordByMonth : function(recordLists,tradeRecords){
		for(var i = 0 , len = recordLists.length;i<len;i++){
			var time = recordLists[i].createTime?recordLists[i].createTime.split("-"):null;
			var month =recordLists[i].createTime? time[0]+'年'+time[1] :'本';
			var record = recordLists[i].createTime?{
				type : recordLists[i].type,
				tradeName : recordLists[i].type == 'RECHARGE'?recordLists[i].rechargeType:recordLists[i].shopName,
				payWay : recordLists[i].type == 'RECHARGE'?recordLists[i].rechargeType:null,
				tradeMoneyNumber : recordLists[i].type == 'RECHARGE'?recordLists[i].rechargeFee:recordLists[i].totalFee,
				dateTime : recordLists[i].createTime,
				countLess : recordLists[i].balance
			}:null;
			tradeRecords = this.addRecordToMonths(month,tradeRecords,record);
		}
		return tradeRecords;
	},
	addRecordToMonths : function(month,tradeRecords,record){
		var monthsIndex = this.checkMonth(month);
		if(monthsIndex){
			if(monthsIndex == -1){
				tradeRecords[0].records.push(record);
			}	
			else{
				tradeRecords[monthsIndex].records.push(record);	
			}
		}
		else{
			var tradeRecord = {
				month : month,
				records: [record]
			}
			tradeRecords.push(tradeRecord);
		}
		return tradeRecords;
	}
}

	 
/**********数据接口**********/
	
var setStoreInformation = function(jsonstr){
	var storeInformation = $.parseJSON(jsonstr);
	global.storeInformation = {
		name : storeInformation.name,
		url : storeInformation.imageUrl,
		address : storeInformation.address
	}
}


var setTradeRecords = function(jsonstr){
	var createTradeRecords = new CreateTradeRecords(jsonstr);
	global.tradeRecords = createTradeRecords.getTradeRecords();
}

window.onerror=handleErr
var txt=""

function handleErr(msg,url,l)
{
txt="本页中存在错误。\n\n"
txt+="错误：" + msg + "\n"
txt+="URL: " + url + "\n"
txt+="行：" + l + "\n\n"
txt+="点击“确定”继续。\n\n"
alert(txt)
return true
}


var testTradeRecords = "[{\"totalFee\":12000,\"createTime\":\"2014-12-31T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":0,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"}]"

//var obj = $.parseJSON(testTradeRecords);
 setTradeRecords(testTradeRecords);


