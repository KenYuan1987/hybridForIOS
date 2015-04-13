//
//  XGWebViewController.h
//  hybrid
//
//  Created by ken on 15-3-3.
//  Copyright (c) 2015年 ken. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XGBridgeWebview.h"

@interface XGWebViewController : UIViewController<UIWebViewDelegate>
@property(nonatomic,readonly) XGBridgeWebview *webview;
@property(nonatomic,copy) NSString *urlString;
@property(nonatomic,copy) NSString *htmlString;
@property(nonatomic,assign) BOOL needNavBarAtBottom;
@property(nonatomic,assign) BOOL needRefreshWhenEnterForeground;
@end
