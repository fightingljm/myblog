## ReactNative通过gradlew assembleRelease打包的时候会报Duplicate file  重复文件

[drawable-xxxhdpi-v4/node_modules_reactnavigationstack_lib_module_views_asse......]



亲测解决方案：

用Android Studio打开android目录，找到res/drawable目录，把里面的图片文件都删掉（因为这些图片都是React Native自动生成的，所以删除即可）。再次重新执行gradlew assembleRelease命令就不会报错了。



## index.android bundle

终极解决方案： 

- 震动模拟器，选择Dev Settings
- 点击`Debug server & port for device`
- 填写电脑ip地址和端口8081
- 最后重新执行一次`react-native run-android` 问题解决~

![image-20191205085015619](/Users/liujinmeng/Library/Application Support/typora-user-images/image-20191205085015619.png)

![image-20191205085049974](/Users/liujinmeng/Library/Application Support/typora-user-images/image-20191205085049974.png)

![image-20191205085115134](/Users/liujinmeng/Library/Application Support/typora-user-images/image-20191205085115134.png)