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

/*
serialNumber(string)：流水号
type(string):交易类型（CONSUME：消费，RECHARGE:充值）
shopId(string)：门店ID(type:CONSUME)
shopName(string)：门店名称(type:CONSUME)
partnerId(string):商户ID(type:CONSUME)
createTime(string):时间
getBonus(int)：获取积分(type:CONSUME)
balance(int)：交易后余额（单位：分）
totalFee(int)：消费金额（单位：分）(type:CONSUME)
rechargeFee(int)：充值金额（单位：分）(type:RECHARGE)
rechargeType(string)：充值类型(type:RECHARGE)*/

var TradeRecordModel = function(tradeRecord){
	
	this.serialNumber = '';
	this.type = '';
	this.shopId = '';
	this.shopName = '';
	this.partnerId = '';
	this.createTime = '';
	this.getBonus = 0;
	this.balance = 0;
	this.totalFee = 0;
	this.rechargeFee = 0;
	this.rechargeType = 0;
	this.payWay = '';
	
	this._createTimeFormat = function(){
		if(this.createTime){
			var time = this.createTime.split('T');
			this.createTime = time[0];
			for(var i = 1,len = time.length; i <len; i++){
				this.createTime += time[i];
			}
		}
	};
	

	this._setAllPropertyValue = 	function(tradeRecord){
		var element ; 
		for(element in this){
			if(typeof this[element] != 'function'){
				this[element] = typeof tradeRecord[element] == 'undefined' ? null : tradeRecord[element];
			}	
		}
		this._createTimeFormat();
		this.defaultPayWay();
	};
	
	this.defaultPayWay = function(){
		this.payWay = '微信支付'
	}
	
	this.getFomatedYearMonth = function(){
		if(this.createTime){
			var createTime = this.createTime.split('-');
			var month = createTime[0]+'年'+createTime[1]+'月';
			return month;
		}	
		return null;
	};
	
	/*
	this.clone = function(){
		var newObj = TradeRecordModel();
		var element ;
		foreach(element in newObj){
			if(newObj[element] != 'function'){
				newObj[element] = typeof tradeRecord[element] == 'undefined' ? null || this[element];
			}	
		}
	}
	*/
	
	this._setAllPropertyValue(tradeRecord);
}

var MonthsRecordModel = function(month,records){
	this.month = month ;
	this.records = records || new Array();
}

var MonthsRecordcollector = function(tradeRecordsJsonStr){
	this._tradeRecordJsonObjects = new Array(); 
	this._tradeRecords = new Array();
	this._monthsRecords = new Array();
	
	this._init = function(tradeRecordsJsonStr){
		this._setTradeRecordJsonObjects(tradeRecordsJsonStr);
		this._setTradeRecords();
		this.setMonthsRecords();
	}
	
	this._setTradeRecordJsonObjects = function(tradeRecordsJsonStr){
		if(tradeRecordsJsonStr)
			this._tradeRecordJsonObjects = $.parseJSON(tradeRecordsJsonStr);	
		else
			this._tradeRecordJsonObjects = null;
	};
	
	this._setTradeRecords = function(){
		if(this._tradeRecordJsonObjects){
			for(var i=0 ,len = this._tradeRecordJsonObjects.length; i<len; i++){
				var tradeRecord = new TradeRecordModel(this._tradeRecordJsonObjects[i]);
				this._tradeRecords.push(tradeRecord);
			}	
		}
	};
	
	this.setMonthsRecords = function(){
		for(var i = 0 , len = this._tradeRecords.length ; i<len; i++){
			var month = this._tradeRecords[i].getFomatedYearMonth();
			var monthIndex = this._getMonthIndex(month);
			if(!this._monthsRecords[monthIndex]){
				this._monthsRecords[monthIndex] =  new MonthsRecordModel(month);
			}
			this._monthsRecords[monthIndex].records.push(this._tradeRecords[i]);
		}	
	};
	
	this.getMonthsRecords = function(){
		return 	this._monthsRecords;
	};
	
	this._getMonthIndex = function(month){
		for(var i =0 , len = this._monthsRecords.length ; i<len ; i++){
			if(month == this._monthsRecords[i].month){
				return i;	
			}
		}
		return this._monthsRecords.length;
	}
	
	this._init(tradeRecordsJsonStr);
}

var StoreInformationModel = function(jsonstr){
	this.name = '';
	this.imageUrl = '';
	this.address = '';
	var jsonObj = new Object();
	
	this.initProperty = function(){
		for(var element in this){
			if(typeof element != 'function')
				this[element] = (typeof jsonObj[element] == 'undefined')?null:jsonObj[element];
		}	
	};
	
	this.setJsonObj = function(jsonstr){
		jsonObj = $.parseJSON(jsonstr);
	};
	
	this.init = function(){
		this.setJsonObj(jsonstr);
		this.initProperty();
	};
	
	this.init();
}

/**********数据接口**********/
	
var setStoreInformation = function(jsonstr){
	storeInformation = new StoreInformationModel(jsonstr);
	storeInformationHTML = _.template($("#moreDiscount-storeInformation").html(), storeInformation);
	$(".js-moreDiscount-storeInformation").html( storeInformationHTML);
}


var setTradeRecords = function(jsonstr){
	var monthsRecordcollector = new MonthsRecordcollector(jsonstr);
	tradeRecords = monthsRecordcollector.getMonthsRecords();
	tradeRecords = renderLastMonthData(tradeRecords);
	var tradeRecordsHTML = _.template($("#js-tradeRecords").html(), tradeRecords);
	$(".js-tradeRecords").html( tradeRecordsHTML);
}

var renderLastMonthData = function(tradeRecords){
	if(tradeRecords.length>0){
		tradeRecords[0].balance = tradeRecords[0].records[0].balance;
		var date = new Date();
		var currentMonth = (date.getMonth()+1);
			currentMonth = currentMonth>9?currentMonth:('0'+currentMonth);
		var currentYearMonth = date.getFullYear()+'年'+currentMonth+'月';
		if(tradeRecords[0].month == currentYearMonth){
			tradeRecords[0].month = '本月';
		}	
	}
	return tradeRecords;
}

/*
var testTradeRecords = "[{\"totalFee\":12000,\"createTime\":\"2015-01-19T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":200,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":12000,\"createTime\":\"2015-01-15T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":1400,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":0,\"createTime\":\"2015-01-31T16:40:25\",\"shopName\":\"\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":2600,\"rechargeType\":\"超币充值\",\"rechargeFee\":2600,\"serialNumber\":\"1234567890\",\"type\":\"RECHARGE\",\"partnerId\":\"test\"},{\"totalFee\":12000,\"createTime\":\"2014-12-19T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":200,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":12000,\"createTime\":\"2014-12-15T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":1400,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":0,\"createTime\":\"2014-03-31T16:40:25\",\"shopName\":\"\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":2600,\"rechargeType\":\"超币充值\",\"rechargeFee\":2600,\"serialNumber\":\"1234567890\",\"type\":\"RECHARGE\",\"partnerId\":\"test\"}]"

//var obj = $.parseJSON(testTradeRecords);
 setTradeRecords(testTradeRecords);*/


var testStoreInformation = '{"name":"什么七麻辣养生馆","imageUrl":"img/moreDiscount/showRecordIcon.png","address":"阳春市八甲镇"}';
setStoreInformation(testStoreInformation)
