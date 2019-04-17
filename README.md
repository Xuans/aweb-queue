# AWEB 自定义异步队列模块

## 描述

AWEB 自定义队列模块，兼容 ES5、ES6、Nodejs；

## 用法

```javascript
// example.js
    const Queue= require('@aweb-lib/aweb-queue');
    let queue=new Queue();

    queue
        //任务队列
        .done(function(queue){
            //task1
            queue.status('prop1','fail');       //暴露状态

            queue.next();
        })
        .done(function(queue){
            //task2
            if(queue.status('prop1')==='fail'){
                queue.stop();                   //终止任务
            }else{
                queue.next();                   //执行下一步
            }
        })
        .done(function(queue){
            //task3
            queue.next();
        })
        .prepend(function(){
            //task4
            queue.next();
        })
        .error(function(error,step){
            console.log(`执行到第${step}步，报错：${error.message}`);
        })
        .finally(function(step){
            console.log(`执行到第${step}步完毕！`);
        })
        .start();//开始执行

    //执行任务顺序 task4-->task1-->task2(终止任务)xxx->task3(task3未执行)
```

## 接口

- 添加任务

```javascript
    Queue.prototype.done(function:callback(Queur:queue，Number:step){});
    Queue.prototype.append(function:callback(Queur:queue，Number:step){});
    Queue.prototype.then(function:callback(Queur:queue，Number:step){});
```

- 前置添加任务

``` javascript
    Queue.prototype.prepend(function:callback(Queue:queue,Number:step){});
```

- 执行下一个任务

``` javascript
    Queue.prototype.next();
```

- 提前结束任务队列

``` javascript
    Queue.prototype.stop();
```

- 每任务都执行的错误异常处理（每一个任务，抛出异常时都会该回调）

``` javascript
    Queue.prototype.error(function:callback(Exception:error,Number:step));
```

- 每个任务都执行的步骤

``` javascript
    Queue.prototype.finally(function:callback(Number:step));
```

- 开始执行任务

``` javascript
    Queue.prototype.start();
```

<!--日志 Start-->

## 更新日志

- V6.0.1 初始化项目；

<!--日志 End-->

## License
[Anti 996](https://github.com/996icu/996.ICU/blob/master/LICENSE) 
