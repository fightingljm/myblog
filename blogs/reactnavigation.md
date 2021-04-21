```bash
**保证清空所有的 react-navigation 相关的包**

$ yarn remove react-navigation react-navigation-stack react-navigation-tabs

$ yarn add @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

#### Package names

- `react-navigation` -> `@react-navigation/native`
- `react-navigation-stack` -> `@react-navigation/stack`
- `react-navigation-tabs` -> `@react-navigation/bottom-tabs`, `@react-navigation/material-top-tabs`

#### mcloud-mobile actionSheet *react-navigation*

#### 注释报错

- *@react-navigation/stack/src/views/assets/back-icon.ios.png*
- *import StackViewStyleInterpolator from '@react-navigation/stack/src/views/StackView/StackViewStyleInterpolator';*

#### createBottomTabNavigator

​	过程中报错

 ![image-20200520113347905](/Users/liujinmeng/Desktop/markdown/myblog/src/image/image-20200520113347905.png)

If you use `npm`:

```sh
rm -rf node_modules
rm package-lock.json
npm install
```

If you use `yarn`:

```sh
rm -rf node_modules
rm yarn.lock
yarn
```

#### 移除 withNavigation

