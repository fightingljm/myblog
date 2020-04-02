### Error installing libwebp



Step one：终端执行

```bash

$ pod repo
$ find ~/.cocoapods/repos/master -iname libwebp
$ open /User/liujinmeng/.cocoapods/repos/master/Specs/1/9/2/libwebp

```

<img src="/Users/liujinmeng/Library/Application Support/typora-user-images/image-20190906152411495.png" alt="image-20190906152411495" style="zoom:50%;" />

Step two：用哪一个版本进入哪个版本的文件夹，打开 libwebp.podspec.json 文件

Step three：把 source - git 中的url更换成 https://github.com/webmproject/libwebp.git ，然后保存

Step four：最后重新执行 pod install