### IOS本地模块的应用

实际开发中，需要更为丰富的交互组件，但是RN中没有提供，这时候就需要用到RN的本地模块。本地模块既可以使用JS调用Native，也可以使用Native待用JS。



#### 类库及模块组件

##### 1.RCTBridgeModule

- RCTBridgeModule
  在React Native中，如果实现一个原生模块，需要实现RCTBridgeModule协议，其中RCT就是ReaCT的缩写
- RCT_EXPORT_MODULE()
  如果实现了RCTBridgeModule协议，我们的类需要包含RCT_EXPORT_MODULE()宏。这个宏也可以添加一个参数用来指定在Javascript中访问这个模块的名字。如果不指定，默认就会使用这个Objective-C类的名字。
- ECT_EXPORT_METHOD()
  与此同时我们需要声明ECT_EXPOTR_METHOD()宏来实现要给Javascript导出的方法，否则React Native不会导出任何方法。
- RCT_REMAP_METHOD()
  React Native还定义了一个RCT_REMAP_METHOD()宏，它可以知道JavaScript方法名，当许多方法的第一部分相同的时候用它来避免在JavaScript端的名字冲突。

##### 2.NativeModules

在JavaScript中如果想调用native的方法，需要使用RN提供的NativeModules模块

##### 3.NativeAppEventEmitter

事件监听处理的方法，在Javascript中，监听native调用的事件以及参数

#### Hello World（利用JS调用Native方法）

```objective-c

// HelloWorld.h ----------> 实现 RCTBridgeModule 协议
#import <React/RCTBridgeModule.h>
@interface HelloWorld: NSObject<RCTBridgeModule>
@end


// HelloWord.m -----------> 实现两个宏
#import "HelloWorld.h"
@implementation HelloWorld

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(sayHello:(NSString *)msg)
{
  NSLog(@"Hello %@!", msg);
};

@end
   
```

```jsx

import React,{ Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules
} from 'react-native'

export default class NativeModuleDemo extends Component {
  onPress = () => {
    NativeModules.HelloWorld.sayHello('liujinmeng')
  }
  render(){
    return(
      <View>
        <Button
          title="Say Hello"
          onPress={this.onPress}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('NativeModuleDemo',()=>NativeModuleDemo)

```

#### 特殊参数的传递

上面的例子传递了一个简单的string类型，但是实际开发中有多种复杂的类型，比如枚举、日期时间类型等，为此我们看看RN Bridge给我们提供了哪些类型参数。

- string (NSString)
- number (NSInteger, float, double, CGFloat, NSNumber)
- boolean (BOOL, NSNumber)
- array (NSArray) 包含本列表中任意类型
- object (NSDictionary) 包含string类型的键和本列表中任意类型的值
- function (RCTResponseSenderBlock)

时间和枚举类型需要用到RN提供的RCTConvert库，帮助我们进行类型转换

```objective-c

// MyDate.h ----------> 引入 RCTConvert 并 实现 RCTBridgeModule 协议
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
@interface MyDate: NSObject<RCTBridgeModule>
@end

// MyDate.m
#import "MyDate.h"
@implementation MyDate

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(printDate, date1:(nonnull NSNumber *)d1 date2:(nonnull NSNumber *)d2)
{
	NSDate *dt1 = [RCTConvert NSDate:d1];  	
  NSDate *dt2 = [RCTConvert NSDate:d2];
  NSComparisonResult result = [dt1 compare:dt2];
  
  switch(result){
    case NSOrderedAscending:
      {
        NSLog(@"开始时间小于结束时间");
      }
    case NSOrderedDescending:
      {
        NSLog(@"开始时间大于结束时间");
      }
  }
  
};

@end

```



```jsx

import React,{ Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  DatePickerIOS,
  NativeModules
} from 'react-native'

export default class NativeModuleDemo extends Component {
  constructor(){
    super();
    this.state = {
      startDate: newDate(),
      endDate: newDate()
    }
  }
  onPressDateValidation = () => {
    NativeModules.MyDate.printDate(this.state.startDate.getTime(),this.state.endDate.getTime())
  }
  render(){
    return(
      <View>
        <DatePickerIOS
          mode="date"
          date={this.state.startDate}
          onDateChange={date=>this.setState({ startDate: date })}
        />
        <DatePickerIOS
          mode="date"
          date={this.state.endDate}
          onDateChange={date=>this.setState({ endDate: date })}
        />
        <Button
          title="比较时间"
          onPress={this.onPressDateValidation}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('NativeModuleDemo',()=>NativeModuleDemo)

```

RCTConvert 还可以转换很多类型，比如字典类型：

```objective-c
NSString *str = [RCTConvert NSString:details[@"key"]];
```

#### 回调函数的使用

```objective-c

// 上面的例子稍加修改
...
RCT_REMAP_METHOD(printDate, date1:(nonnull NSNumber *)d1 date2:(nonnull NSNumber *)d2 event:(RCTResponseSenderBlock)callback)
{
  ...
  NSArray *events = [NSArray arrayWithObjects:@"result",nil];
  callback(@[[NSNull null], events]);
}
...

```

> ⚠️注意：callback返回的是一个数组；第一个为错误信息

```jsx

onPressDateValidation = () => {
    NativeModules.MyDate.printDate(this.state.startDate.getTime(), this.state.endDate.getTime(), (err,result)=>{
      alert(result);
    })
}

```

#### Promises 回调处理

主要原理为最后两个参数是 RCTPromiseResolveBlock 和 RCTPromiseRejectBlock ,则对应的JS方法就会返回一个Promise对象。

```objective-c

// 同样用MyDate的例子做修改
...
RCT_REMAP_METHOD(printDate, date1:(nonnull NSNumber *)d1 date2:(nonnull NSNumber *)d2 resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  ...
  NSArray *events = [NSArray arrayWithObjects:@"result",nil];
  if(events) {
    resolve(events);
  }
  else {
    reject(@"",@"",nil);
  }
}
...
```

```jsx

onPressDateValidation = async() => {
    const result = await NativeModules.MyDate.printDate(this.state.startDate.getTime(), this.state.endDate.getTime())
}

```



#### Native 单向调用 JS 方法

```objective-c

// MyCallBack.m
#import "MyCallBack.h"
#import <React/RCTEventDispatcher.h>

@implementation MyCallBack

RCT_EXPORT_MODULE(); 
@synthesize bridge = _bridge; // 同步参数变量 _bridge
RCT_REMAP_METHOD(checkCallBack, str:(NSString *)str)
{
  [self.bridge.eventDispatcher sendAppEventWithName:@"EventCallBack" body@{@"name": @"jm"}];
}   ------------> // sendAppEventWithName 必须和JS中保持一致
  
@end

```

```jsx
import { NativeAppEventEmitter } from 'react-native'

const subscription = NativeAppEventEmitter.addListener("EventCallBack",(e)=>{
  alert(e.name);
})

```

> ⚠️注意：最后在componentWillUnMount函数中取消订阅



#### 常量枚举类型的导出事件

##### 1.常量

原生模块可以导出一些常量，这些常量在Javascript端随时可以访问。用这种方法来传递一些静态数据，可以避免通过bridge进行一次来回交互。

```objective-c

- (NSDictionary *)constantsToExport
{
  return @{ @"firstDayOfTheWeek": @"Monday" };
}

```

上面的 constantsToExport 为复写的方法，名字不可更改，否则无法调用。

```js
console.log(MyDate.firstDayOfTheWeek);
```

##### 2.枚举

用 NS_ENUM 定义的枚举类型

```objective-c

#import "EnumConstants.h"

typedef NS_ENUM(NSInteger, UIStatusBarAnimation) {
  UIStatusBarAnimationNone,
  UIStatusBarAnimationFade,
  UIStatusBarAnimationSlide,
}

@implementation EnumConstants
 
RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{ @"statusBarAnimationNone": @(UIStatusBarAnimationNone),
          		@"statusBarAnimationFade": @(UIStatusBarAnimationFade),
          		@"statusBarAnimationSlide": @(UIStatusBarAnimationSlide), }
}
  
@end

```

```js

onPressForEnum() {
  alert(NativeModules.EnumConstants.statusBarAnimationFade);
}

```

#### 线程的应用

首先我们创建一个 MyThread 类，复写methodQueue方法，如果返回 dispatch_get_main_queue，即为调用主线程。

```objective-c

#import "MyThread.h"

@implementation MyThread

RCT_EXPORT_MODULE();

// 如果一个操作需要花费很长时间，原生模块不应该阻塞住，而是应当声明一个用于执行操作的独立队列。
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

// 如果你的方法中“只有一个”是耗时较长的（或者是由于某种原因必须在不同的队列中运行的），你可以在函数体内用dispatch_async 方法来在另一个队列执行，而不影响其他方法：
RCT_REMAP_METHOD(doInThread, date1:(nonnull NSNumber *)d1 callback:(RCTResponseSenderBlock) callback)
{
	dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0),^{
    // 在这里执行长时间的操作
    ...
    // 你可以在任何线程/队列中执行回调
    callback(@[...]);
  })
}

@end

```





























