//
//  ViewController.m
//  hybrid
//
//  Created by ken on 15-3-3.
//  Copyright (c) 2015年 ken. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.urlString = [[NSBundle mainBundle] pathForResource:@"tradeRecord" ofType:@"html" inDirectory:@"webviews"];
    [self.webview callJsMethod:@"setTradeRecords" withParams:@"[{\"totalFee\":12000,\"createTime\":\"2015-01-19T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":200,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":12000,\"createTime\":\"2015-01-15T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":1400,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":0,\"createTime\":\"2015-01-31T16:40:25\",\"shopName\":\"\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":2600,\"rechargeType\":\"超币充值\",\"rechargeFee\":2600,\"serialNumber\":\"1234567890\",\"type\":\"RECHARGE\",\"partnerId\":\"test\"},{\"totalFee\":12000,\"createTime\":\"2014-12-19T16:40:25\",\"shopName\":\"1920酒吧1920酒吧1920酒吧1920酒吧1920酒吧1920酒吧1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":200,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":12000,\"createTime\":\"2014-12-15T16:40:25\",\"shopName\":\"1920酒吧\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":1400,\"rechargeType\":\"\",\"rechargeFee\":0,\"serialNumber\":\"1234567890\",\"type\":\"CONSUME\",\"partnerId\":\"test\"},{\"totalFee\":0,\"createTime\":\"2014-03-31T16:40:25\",\"shopName\":\"\",\"bonus\":0,\"shopId\":\"001@test\",\"getBonus\":0,\"balance\":2600,\"rechargeType\":\"超币充值\",\"rechargeFee\":2600,\"serialNumber\":\"1234567890\",\"type\":\"RECHARGE\",\"partnerId\":\"test\"}]"];
    [self.webview addTarget:self actionCallFromJs:@selector(fuck:)];
    self.needNavBarAtBottom = YES;
}

-(void)fuck:(NSString *)data{
    NSLog(@"%@",data);
}

@end
