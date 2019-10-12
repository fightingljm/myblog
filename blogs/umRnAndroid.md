### react native 友盟统计 Android 端集成

<!-- TOC -->

- [react native 友盟统计 Android 端集成](#react-native-友盟统计-android-端集成)
    - [sdk集成部分](#sdk集成部分)
    - [android端配置](#android端配置)
    - [交互模块](#交互模块)
    - [RN端调用](#rn端调用)

<!-- /TOC -->

#### sdk集成部分

[友盟sdk下载地址](https://developer.umeng.com/sdk/reactnative)

 1.首先把 下载的sdk
 umeng-analytics-8.0.0.jar
 umeng-common-2.0.1.jar
 放到工程目录下的libs文件夹下

![um1](https://github.com/fightingljm/myblog/blob/master/src/image/um1.png)

![um2](https://github.com/fightingljm/myblog/blob/master/src/image/um2.png)

把jar包添加到工程中

```
// android/app/build.gradle
dependencies {
    ...
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile files('libs/umeng-analytics-8.0.0.jar')   ------> 添加
    compile files('libs/umeng-common-2.0.1.jar')   ------> 添加
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"  // From node_modules
}
```



image.png

```java
dependencies {
    compile files('libs/umeng-analytics-7.5.3.jar')
    compile files('libs/umeng-common-1.5.3.jar')
}
```

到这里Android端sdk已经集成了。

#### android端配置

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.projectname"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />

    <application
      android:name=".MainApplication"
      android:allowBackup="true"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:theme="@style/AppTheme">
      	...
        <!--友盟统计-->
        <meta-data
            android:name="UMENG_APPKEY"
            android:value="5c41db93f1f556817a000fa6" 
        />
        <meta-data android:value="Channel ID" android:name="UMENG_CHANNEL"/>
        ...
    </application>
</manifest>
```

#### 交互模块

接下来把官网下载下来的交互文件放到工程中，包括下面三个文件

![um3](https://github.com/fightingljm/myblog/blob/master/src/image/um3.png)

 DplusReactPackage.java
 RNUMConfigure.java
 AnalyticsModule.java

<img src="https://github.com/fightingljm/myblog/blob/master/src/image/um4.png" style="zoom:50%" />

之后，就是把相关 java代码，改下包路径 按照错误提示更改就行了

比如： package  项目包名.umtj;
 缺少类的 导入相关类即可。
 交互类 写完之后，在MainApplication中实例化一下

```java
import com.umeng.commonsdk.UMConfigure; ---> 添加
import 项目包名.umtj.DplusReactPackage; ---> 添加
import 项目包名.umtj.RNUMConfigure;  ---> 添加

@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new DplusReactPackage(), --->添加
      );
    }


 @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    UMConfigure.setLogEnabled(true);
    // 初始化组件化基础库, 统计SDK/推送SDK/分享SDK都必须调用此初始化接口
    RNUMConfigure.init(this, "[这里输入自己创建应用时候的appkey]", "UMENG_CHANNEL", UMConfigure.DEVICE_TYPE_PHONE,
            "");
  }
```

在MainActivity中也要初始化操作

```java
import com.umeng.analytics.MobclickAgent;

@Override
protected void onCreate(Bundle savedInstanceState) {
    MobclickAgent.setSessionContinueMillis(1000*40);   //设置统计的场景，以及发送间隔：
    MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_DUM_NORMAL);
    super.onCreate(savedInstanceState);
}

@Override
public void onResume() {   //友盟统计初始化
    super.onResume();
    MobclickAgent.onResume(this);
}

@Override
protected void onPause() { //友盟统计初始化
    super.onPause();
    MobclickAgent.onPause(this);
}
```

ok基本上按照步骤走的话，都很顺利，到这里就可以RN端调用了。

#### RN端调用

这里封装了一下 umtj.js 可作为参考

```javascript
import { NativeModules } from 'react-native';

const UMTJ = NativeModules.UMAnalyticsModule;

export const onPageStart = pageName => {
    //用于统计单个自定义页面的起始和onPageEnd同时使用，不可单独使用
    return UMTJ.onPageStart(pageName);
};
export const onPageEnd = pageName => {
    //用于统计单个Activity页面结束时间
    return UMTJ.onPageEnd(pageName);
};
export const onEvent = eventId => {
    //用于统计自定义事件的发生次数
    return UMTJ.onEvent(eventId);
};
export const onEventWithLable = (eventId, label) => {
    //用于统计自定义事件的发生次数 可传参数进去
    return UMTJ.onEventWithLable(eventId, label);
};
```

调用原生模块

```javascript
import {
    onEvent,
    onEventWithLable,
} from '../utils/umtj';

// 比如这里是个点击事件

click=()=>{
    onEvent('login');
    onEventWithLable('login', '登录成功');
}
```

这里的 “login” 是在友盟后台自定义的埋点值，可以进行手动埋点用来统计用户一些行为操作，方便产品运营

![um5](https://github.com/fightingljm/myblog/blob/master/src/image/um5.png)