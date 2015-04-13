//
//  XGWebview.h
//  hybrid
//
//  Created by ken on 15-3-3.
//  Copyright (c) 2015年 ken. All rights reserved.
//

#import <UIKit/UIKit.h>
typedef void(^ResponseFromJs)(id data);

@interface XGBridgeWebview : UIWebView

-(void)callJsMethod:(NSString *)method;
-(void)callJsMethod:(NSString *)method withParams:(id)params;
-(void)callJsMethod:(NSString *)method withParams:(id)params withResponse:(ResponseFromJs)response;
-(void)addTarget:(id)target actionCallFromJs:(SEL)action;
@end
