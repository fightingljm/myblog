### 关于层级的  zIndex  evevation



- zIndex 是 react-native 在3.0开始支持的属性，是可以生效的；

- shadow  和   evevation
  - shadow可以在IOS上应用，Android中不生效
  - Android上对应的属性是 evevation
    设置 evevation 属性就等价于使用原生的API，因而也有同样的限制，比如最明显的就是需要Android5.0以上版本；此外还会影响到层叠视图在空间Z轴上的顺序。



> ⚠️注意：对于IOS，同层级的组件，Z轴的层叠关系只与摆放顺序和zIndex有关，与 evevation 无关



附录：对于Android，两个同一层级的定位组件（position: "absolute"），不同情况下的Z轴层叠关系如下表：

| 情况                     | 在Z轴的层叠关系                          |
| ------------------------ | ---------------------------------------- |
| ○ zIndex     ○ evevation | 由其摆放位置决定，放在下面的组件会在上面 |
| ● zIndex     ○ evevation | zIndex 大的在上层                        |
| ○ zIndex     ● evevation | evevation 大的在上层                     |
| ● zIndex     ● evevation | 以 evevation 为准                        |

