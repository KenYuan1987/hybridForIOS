//
//  XGWebview.m
//  hybrid
//
//  Created by ken on 15-3-3.
//  Copyright (c) 2015年 ken. All rights reserved.
//

#import "XGBridgeWebview.h"
#import "WebViewJavascriptBridge.h"

@interface XGBridgeWebview()
@property(nonatomic,strong) WebViewJavascriptBridge *bridge;
@end

@implementation XGBridgeWebview

-(instancetype)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if (self) {
        [self initialize];
    }
    return self;
}

-(instancetype)initWithCoder:(NSCoder *)aDecoder{
    self = [super initWithCoder:aDecoder];
    if (self) {
        [self initialize];
    }
    return self;
}

-(void)initialize{
    self.bridge = [WebViewJavascriptBridge bridgeForWebView:self handler:^(id data, WVJBResponseCallback responseCallback) {
    }];
    self.scrollView.decelerationRate = UIScrollViewDecelerationRateNormal;
}

-(void)callJsMethod:(NSString *)method{
    if(!self.bridge.isReady){
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self callJsMethod:method];
        });
    }else{
        [self.bridge callHandler:method];
    }
}

-(void)callJsMethod:(NSString *)method withParams:(id)params{
    if(!self.bridge.isReady){
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self callJsMethod:method withParams:params];
        });
    }else{
        [self.bridge callHandler:method data:params];
    }
}

-(void)callJsMethod:(NSString *)method withParams:(id)params withResponse:(ResponseFromJs)response{
    if(!self.bridge.isReady){
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self callJsMethod:method withParams:params withResponse:response];
        });
    }else{
        [self.bridge callHandler:method data:params responseCallback:^(id responseData) {
            if (response) {
                response(responseData);
            }
        }];
    }
}

-(void)addTarget:(id)target actionCallFromJs:(SEL)action{
    NSString *methodName = NSStringFromSelector(action);
    NSAssert([methodName hasSuffix:@":"], @"selector必须有一个参数");
    [self.bridge registerHandler:[methodName substringToIndex:[methodName length] - 1] handler:^(id data, WVJBResponseCallback responseCallback) {
        if ([target respondsToSelector:action]) {
            ((void (*)(id, SEL,id))[target methodForSelector:action])(target, action,data);
        }
    }];
}

-(void)setDelegate:(id<UIWebViewDelegate>)delegate{
    if ([delegate isKindOfClass:[WebViewJavascriptBridge class]]) {
        [super setDelegate:delegate];
    }else{
        self.bridge.webViewDelegate = delegate;
    }
}

@end
