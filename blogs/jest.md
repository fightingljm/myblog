### 断言

- 普通匹配

    ```
    toBe - 是否完全相等
    not - 测试相反用例
    toEqual - 检查对象是否相等
    ```

- 布尔值匹配器

    ```
    toBeNull - 只匹配 null
    toBeUndefined - 只匹配 undefined
    toBeDefined - 与 toBeUndefined 相反
    toBeTruthy - 匹配任何 if 语句为真
    toBeFalsy - 匹配任何 if 语句为假
    ```

- 数字匹配器

    ```
    toBeGreaterThan - 大于
    toBeGreaterThanOrEqual - 大于等于
    toBeLessThan - 小于
    toBeLessThanOrEqual - 小于等于
    toBeCloseTo - 浮点数比较
    ```

- 字符串匹配器

    ```
    toMatch - 正则表达式的字符
    toHaveLength(number) - 判断一个有长度的对象的长度
    ```

- 数组匹配器

    ```
    toContain - 判断数组是否包含特定子项
    toContainEqual - 判断数组是否包含一个特定对象
    ```

- 对象匹配器

    ```
    toMatchObject(object) - 判断一个对象嵌套的key下面的value类型
    toHaveProperty(keyPath, valuee) - 判断在指定的 path 下是否有这个属性
    ```

### enzyme

shallow mount render 三者的区别

- shallow 只会渲染一层元素，对于子组件是不渲染的，所以叫做浅层渲染；
- 如果需要测试组件的生命周期用 mount - 完整渲染
- 如果需要想渲染多层组件，但并不关心生命周期使用 render - 静态渲染

建议是尽量使用 shallow ，性能会好点

**测试高阶组件**

```js
import React from 'react'
import { mount, shallow } from 'enzyme';

describe('EmployeeManage Commonent test', () => {
    const wrapper = mount(
        <Commonent />, {
            wrappingComponent: Provider,
            wrappingComponentProps: {
                store
            },
        }
    )

    it('EmployeeManage Commonent method', () => {
        expect(wrapper.find('Commonent').instance().onSubmit())
        // 因为是高阶组件，所以要拿到子组件也就是被包裹的组件，才能拿到它下面对应的实例
    })

})
```

> 测试Hoc组件时，mount 或 shallow 返回的包装的组件实际上不是它所构造的构造函数的实例，
返回的是高阶组件包着传进去的子组件。同时相应的props也render在子组件上面

[官方文档](https://enzymejs.github.io/enzyme/)
[参考](https://www.dazhuanlan.com/2019/10/01/5d928eb499f9b/)

