### Xcode 开发中遇到的问题及解决方法



- 'config.h' file not found

  >1. Close **Xcode**.
  >2. `cd <Project-Folder>/node_modules/react-native/third-party/glog-0.3.4`
  >3. Run `./configure`
  >4. Run `make`
  >5. Run `make install`
  >6. Open **Xcode** and try building the Project.

- React Native iOS使用Xcode打开，卡在Running custom shell scripts "install third party"

  一般这种问题基本上可以定位为网络问题。 主要是下面四个文件没下载完成：

  ```
  boost_1_63_0.tar.gz
  folly-2016.09.26.00.tar.gz
  double-conversion-1.1.5.tar.gz
  glog-0.3.4.tar.gz
  ```

  打开[链接](https://github.com/facebook/react-native/blob/master/scripts/ios-install-third-party.sh)，找到最下面的四行：

  ```
  fetch_and_unpack glog-0.3.5.tar.gz https://github.com/google/glog/archive/v0.3.5.tar.gz 61067502c5f9769d111ea1ee3f74e6ddf0a5f9cc "\"$SCRIPTDIR/ios-configure-glog.sh\""
  
  fetch_and_unpack double-conversion-1.1.6.tar.gz https://github.com/google/double-conversion/archive/v1.1.6.tar.gz 1c7d88afde3aaeb97bb652776c627b49e132e8e0
  
  fetch_and_unpack boost_1_63_0.tar.gz https://github.com/react-native-community/boost-for-react-native/releases/download/v1.63.0-0/boost_1_63_0.tar.gz c3f57e1d22a995e608983effbb752b54b6eab741
  
  fetch_and_unpack folly-2018.10.22.00.tar.gz https://github.com/facebook/folly/archive/v2018.10.22.00.tar.gz f70a75bfeb394363d2049a846bba118ffb3b368a
  ```

  下载对应的tar.gz包，然后放到用户目录的.rncache下面，如下： /Users/你的用户名/.rncache

  然后再尝试build，应该就可以启动了。

