
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



var StoreInformationModel = function(jsonstr){
	this.name = '';
	this.imageUrl = '';
	this.address = '';
    this.discount1 = '';
    this.discount2 = '';
    this.discount3 = '';
    this.discount4 = '';
    this.discount5 = '';
    this.discount7 = '';
    this.discount8 = '';
    this.discount9 = '';
	var jsonObj = new Object();
	
	this.initProperty = function(){
		for(var element in this){
			if(typeof element != 'function')
				this[element] = (typeof jsonObj[element] == 'undefined')?null:jsonObj[element];
		}
        for(var i = 0; i < global.discountLevel.length;i++){
            var level = global.discountLevel[i].index;
            global.discountLevel[i].discount = Math.round(this['discount'+level]*100)/10+'';
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
    var discountLevelHTML = _.template($("#moreDiscount-discountLevel").html(), global.discountLevel);
    $(".js-moreDiscount-discountLevel").html( discountLevelHTML);
}



/*************外部调用范例**********/
var testStoreInformation = '{"location":"广东省广州市天河区天河南一路","businessHours":"8:00-23:00","shopId":"001@test","discount1":0.95,"recommend":"烤全羊","category":"餐饮","discount3":0.88,"name":"1920酒吧1920酒吧1920酒吧1920酒吧1920酒吧1920酒吧1920酒吧","discount5":0.8100000000000001,"distance":1.112262902112102,"isFollowed":true,"servicePhone":"10086","address":"天河南一路","instruction":"\\t","next_discount":0.88,"discount":0.91,"logo":"http:\/\/supercard.xiaogu8.com\/1.320x320.jpg","discount4":0.84,"discount2":0.91,"imageUrlList":["http:\/\/supercard.xiaogu8.com\/images\/shop\/5e547938-3c88-42e8-bddd-e6d4615c0f5d.160x160.png"],"partnerId":"test","description":"1","imageUrl":"http:\/\/supercard.xiaogu8.com\/images\/shop\/f16bed59-e5d8-4c86-a962-a8af6f60f23d.320x320.png","businessZone":"新天地"}';
setStoreInformation(testStoreInformation)

