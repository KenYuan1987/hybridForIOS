//
//  XGWebViewController.m
//  hybrid
//
//  Created by ken on 15-3-3.
//  Copyright (c) 2015年 ken. All rights reserved.
//

#import "XGWebViewController.h"

@interface XGWebViewController ()
@property(nonatomic,readwrite) XGBridgeWebview *webview;
@property(nonatomic,strong) UIToolbar *toolBar;
@end

@implementation XGWebViewController

- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
}

-(UIWebView *)webview{
    if (!_webview) {
        _webview = [[XGBridgeWebview alloc] initWithFrame:CGRectZero];
        [self.view insertSubview:_webview atIndex:0];
        _webview.translatesAutoresizingMaskIntoConstraints = NO;
        NSDictionary *viewDic = @{@"webview":_webview};
        [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-0-[webview]-0-|" options:0 metrics:0 views:viewDic]];
        [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-0-[webview]-0-|" options:0 metrics:0 views:viewDic]];
        _webview.delegate = self;
    }
    return _webview;
}

-(void)setUrlString:(NSString *)urlString{
    _urlString = urlString;
    NSURL *url = [NSURL URLWithString:[urlString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    [self.webview loadRequest:[NSURLRequest requestWithURL:url]];
}

-(void)setHtmlString:(NSString *)htmlString{
    _htmlString = htmlString;
    [self.webview loadHTMLString:_htmlString baseURL:nil];
}

-(void)setNeedNavBarAtBottom:(BOOL)needNavBarAtBottom{
    _needNavBarAtBottom = needNavBarAtBottom;
    if(_needNavBarAtBottom)
    {
        [self.view addSubview:self.toolBar];
        self.toolBar.translatesAutoresizingMaskIntoConstraints = NO;
        NSDictionary *viewDic = @{@"toolBar":self.toolBar};
        [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-0-[toolBar]-0-|" options:0 metrics:0 views:viewDic]];
        [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:[toolBar(44)]-0-|" options:0 metrics:0 views:viewDic]];
        _webview.scrollView.contentInset = UIEdgeInsetsMake(0, 0, 44, 0);
    }
    else if(!_needNavBarAtBottom)
    {
        [self.toolBar removeFromSuperview];
        _webview.scrollView.contentInset = UIEdgeInsetsMake(0, 0, 0, 0);
    }
    [self.view setNeedsLayout];
    [self.view layoutIfNeeded];
}

-(UIToolbar *)toolBar{
    if (!_toolBar) {
        _toolBar = [[UIToolbar alloc]initWithFrame:CGRectZero];
        NSMutableArray *myToolBarItems = [NSMutableArray array];
        UIBarButtonItem *itemButtonEmpty = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace target:nil action:nil];
        itemButtonEmpty.width = 195;
        [myToolBarItems addObject:[[UIBarButtonItem alloc]
                                   initWithTitle:@"上一页"
                                   style:UIBarButtonItemStylePlain
                                   target:self
                                   action:@selector(last)]];
        [myToolBarItems addObject:itemButtonEmpty];
        [myToolBarItems addObject:[[UIBarButtonItem alloc]
                                   initWithTitle:@"下一页"
                                   style:UIBarButtonItemStylePlain
                                   target:self
                                   action:@selector(next)]];
        [_toolBar setItems:myToolBarItems animated:YES];
    }
    return _toolBar;
}

-(void)last
{
    [_webview goBack];
}

-(void)next
{
    [_webview goForward];
}

#pragma mark - webview delegate

- (void)webViewDidFinishLoad:(UIWebView *)webView{
    NSString *title=[webView stringByEvaluatingJavaScriptFromString:@"document.title"];
    [self.navigationItem setTitle:title];
}

@end
