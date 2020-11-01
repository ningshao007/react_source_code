## 1.useState
- 定义状态然后获得状态和改变状态的函数
- 如果状态变更逻辑简单，可以使用useState

## 2.userReducer
- useState只是useReducer的语法糖或者说简单使用
- 当你变更状态逻辑比较复杂的时候 userReducer

## 3.useCallback
- 都有依赖项
- 如果依赖项数组的变化了就重新得到新的函数，如果没变就用老的函数

## 4.useMemo
- 都有依赖项
- 如果依赖项数组的变化了就重新得到新的对象，如果没变就用老的对象

第一个作用
函数组件默认情况下根本不考虑属性变了没有，不管变没变都会更新渲染
- React.memo()配合，因为经过memo处理过的组件，当属性变化了会更新渲染，如果没变化不重新渲染
第二个作用
- 可以减少计算量，缓存结果

## 5.useContext
- 从上下文对象中获取value  Provider._currentValue获取一个值

## 6.useEffect和useLayoutEffect
- 都是处理副作用的 可以调用数据接口，改变外部变量
- 都是组件渲染之后执行的
- useLayoutEffect是在浏览器浏览前执行
- useEffect是在浏览器渲染之后执行

## 7.useRef
- 类似于React.createRef()
- current的值是可以改的，但是ref对象是保持不变的
- forwardRef 如果想给函数组件添加ref的话，就必须让函数组件传给forwardRef来包裹一下
- useImperativeHandle 使用声明式处理，可以在组件的内部自定义暴露给外部的ref对象,保护内部的DOM元素不能被任意修改


