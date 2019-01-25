```
* 原文地址：https://tutorialzine.com/2016/07/learn-typescript-in-30-minutes
* 原文作者: Danny Markov
* 译者:Jerry
* 译文首发地址: https://jerryjiao.life/
```
今天我们来学习Typescript,一门被设计用来开发大型和复杂apps的语言。相较于松散的，弱类型的Javascript,Typescript继承了很多其它高级语言（c#,java）的概念，进而更加的规范。

这篇入门针对于有一定的Javascript基础并且打算学习Typescript的人。我们覆盖了很多基础和关键的概念，并辅以很多例子来帮助你理解这门语言。让我们开始吧。

(译者说明：这篇文章不算新，16年底的文章。但是我浏览了其它一些英文的Typescript入门的文章,感觉还是这篇文章覆盖的内容全面一些，更适合初学者。而且一些基础内容，是变化不大的，所以选择了这篇文章。翻译这篇文章的时候，一些2.0新特性的简述的内容没有翻译，因为已经是发布过的了。)

## 使用Typescript的好处
![https://tutorialzine.com/media/2016/07/0__benefits.png](https://tutorialzine.com/media/2016/07/0__benefits.png)
Javascript已经很好了，我真的需要学习Typescript么？严格意义上讲，你不需要通过学习Typescript去变成一个好的程序员，大部分人没有使用Typescript依然很优秀。当然，使用Typescript编程也有一些显而易见的好处：
* 因为Typescript类型是固定的，用Typescript写的代码更加容易把控，也更易于调试。
* 得益于模块，命名空间和更好的面向对象编程的支持，使得Typescript更容易去构建大型和复杂的apps。
* 因为Typescript有编译成Javascript的过程，使其可以在项目上线运行和发生错误之前可以捕获到不同类型的错误。
* Angular2 是用Typescript写的，它也推荐开发人员使用Typescript去开发项目

最后也很主要的一点，对于大部分人去学Typescript。Angular 2是现在一个很火的编程语言，尽管开发者可以继续使用javascript去开发，但是很多教程和例子都是用Typescript写的。随着Angular2社区的扩展，自然越来越多的人会选择Typescript.
（译者注：这篇教程写自2016年，现在react,vue,babel都支持了Typescript。这篇文章中的Typescript的基础概念对现在还是适用的）

![https://tutorialzine.com/media/2016/07/tscript-trend.png](https://tutorialzine.com/media/2016/07/tscript-trend.png)
(近期Typescript普及度增加，数据来自谷歌趋势)
## Typescript的安装
![https://tutorialzine.com/media/2016/07/1_Installation.png](https://tutorialzine.com/media/2016/07/1_Installation.png)
最简单安装Typescript的方法是通过npm 工具，使用以下的命令我们可以全局安装Typescript,可以在我们的项目中使用Typescript转换器:
```
npm install -g typescript
```
在命令提示行中输入 `tsc -v` 可以检查Typescript是否被安装:
``` 
tsc -v
Version 1.8.10
```

## 支持Typescript的编辑器

![https://tutorialzine.com/media/2016/07/2_text_editors.png](https://tutorialzine.com/media/2016/07/2_text_editors.png)

Typescript是由微软支持和维护的一个开源项目，所以微软的Visual Studio原生支持Typescript。如今，有很多编辑器和IDE都可以原生的或者通过插件来支持Typescript的语法提示，自动补充建议，错误提醒甚至编译Typescript。

* [Visual Studio Code](https://code.visualstudio.com/) - 微软的轻量级的开源的编辑器。内建了对Typescript的支持
* Sublime Text的官方[免费插件](https://github.com/Microsoft/TypeScript-Sublime-Plugin)
* 最新版本的 [WebStorm](https://www.jetbrains.com/webstorm/)
* [更多](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support)Vim,Atom,Emac和其它的支持

## Typescript的编译
![https://tutorialzine.com/media/2016/07/3_compilation.png](https://tutorialzine.com/media/2016/07/3_compilation.png)

Typescript一般会写在.ts(或者.tsx对于jsx来说)文件中，.ts文件不能直接用在浏览器中，需要先被转义成.js文件。Typescript可以通过以下几种方式编译:
* 通过前文关注过的，命令行工具 `tsc`
* 直接在Visual Studio中或者其它IDE中
* 使用一些前端打包工具例如 `gulp`

我们发现第一种方式更加简单也对初学者更友好，所以在这篇文章中我们将会使用第一种方式。

下面的命令将会转换main.ts这个Typescript文件为main.js.如果main.js存在，它将会被覆盖。
```
tsc main.ts
```
我们也可以罗列多个文件或者使用通配符去编译:
```
# 将会编译出分离的Javascript文件: main.js worker.js
tsc main.ts worker.ts

# 编译所有的在这个目录下的所有ts文件，不能递归执行。
tsc *.ts
```
我们也可以使用--watch来自动编译Typescript文件在Typescript文件改变时：
```
# 初始化一个watcher的进程来保持main.js为最新
tsc main.ts --watch
```
更多Typescript的用户也使用创建 *tsconfig.json*, 包含不同的编译的配置。配置文件对一个包含很多的.ts文件的项目编译很便利，因为它定义了自动化的流程。你可以获得更多包含*tsconfig.json*的信息在[这个](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)文档中。
## 静态类型
![https://tutorialzine.com/media/2016/07/4_Static_typing.png](https://tutorialzine.com/media/2016/07/4_Static_typing.png)

Typescript一个非常明显的特征就是支持静态的类型。这就意味着，在声明变量的时候要同时声明变量的类型，编译器会保证变量不会被赋值为错误的类型。一旦变量的类型被声明，他们将会从你的代码中做到自动的推测。

 这里是一个例子，任何的变量，函数以及返回值在一开始都要被声明类型：
```javascript
 var burger: string = 'hamburger',  //String
 calories:number = 300, // Numberic
 tasty: boolean = true; //Boolean

 // 自然地，你也可以 省略变量的声明
 // var burger = 'hamburger'

 // 函数一般返回一个string或数字
 // 如果函数为void类型，它将不会返回什么东西

 function speak(food:string, energy:number):void {
    console.log("Our " + food + " has " + energy + " calories.");
 }
 speak(burger, calories);
```



 正因为Typescript将会被转为js， 一些没有语义和类型的字符，将会被移除：
```javascript
 // 一个Typescript转为js的例子
var burger = 'hamburger',
calories = 300,
tasty = true;

function speak(food, energy) {
console.log("Our " + food + " has " + energy + " calories.");
}

speak(burger, calories);
```
 当然，如果你的代码不符合规则，tsc命令行工具将会警告我们错误在哪，比如：
```javascript
 // 当变量被声明为boolean,但被赋值为string的时候
 var tasty: boolean = "I haven't tried it yet";
```
```javascript
 main.ts(1,5): error TS2322: Type 'string' is not assignable to type 'boolean'.
```
 如果我们写错函数的入参类型，tsc也会提示:
```javascript
function speak(food: string, energy: number): void{
console.log("Our " + food + " has " + energy + " calories.");
}

// 函数入参的类型错误
speak("tripple cheesburger", "a ton of");
```
```javascript
main.ts(5,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```
以下是一些最常用的数据类型：
* Number - 所有的数字类型都可以被声明为number 类型，它们不会被区分为int,float或者其它
* String - 字符串类型，和Javascript字符串类型一样，可以被单引号和双引号包括
* Boolean - true或者false,如果使用0或1将会报错
* Any - 这种变量它可以被赋值为各种类型，无论是string,number,或者其它各种类型。
* Arrays - 有两种可能的语法：my_arr:number[]; 或者 my_arr: Array<number>
* Void - 运用在不返回任何值的函数

[官方文档](http://www.typescriptlang.org/docs/handbook/basic-types.html)罗列了所有Typescript包含的数据类型
## 接口
![https://tutorialzine.com/media/2016/07/5_interfaces.png](https://tutorialzine.com/media/2016/07/5_interfaces.png)

接口被用来检查一个对象（object）是否符合固定的结构。通过定义接口，我们可以命名一个特殊的变量的组合，确保它们的是固定的。当转译为Javascript的时候，接口将会消失-接口的目标就是在开发过程中给予帮助。

下面的例子，我们定义一个简单的接口对函数的入参进行类型检查:
```
// 这里我们定义了一个 Food的接口，包含它的属性和其类型
interface Food {
    name: string;
    calories:number;
}

// 我们可以告诉函数我们希望的入参，来符合Food这个接口
// 这种方式可以保证属性永远的可用
function speak(food: Food): void {
    console.log("Our " + food.name + " has " + food.calories + " calories.");
}

// 我们定义一个对象，它满足Food接口规定的属性
// 注意 这个类型将被自动的推测

var ice_cream = {
    name: "ice cream",
    calories: 200
}

speak(ice_cream);

```
属性的顺序不重要，我们要保证属性名字和类型的正确。如果少了某些属性，或者写了错误的类型，或者名字不同，ts的编译器都会警告我们。

```
interface Food {
name: string;
calories: number;
}

function speak(food: Food): void{
console.log("Our " + food.name + " has " + food.calories + " grams.");
}

// 我们写了一个错误的属性名 nmae
var ice_cream = {
nmae: "ice cream",
calories: 200
}

speak(ice_cream);
```
报错信息：
```
main.ts(16,7): error TS2345: Argument of type '{ nmae: string; calories: number; }
is not assignable to parameter of type 'Food'.
Property 'name' is missing in type '{ nmae: string; calories: number; }'.
```
这是一个面对初学者的教程，如果你想获得更多关于interface的信息，请访问ts的[官方文档](https://www.tslang.cn/docs/handbook/interfaces.html)
## 类型和面向对象编程
![https://tutorialzine.com/media/2016/07/6_classes.png](https://tutorialzine.com/media/2016/07/6_classes.png)
当构建一个大型的apps的时候，大多数开发者喜欢面向对象编程，尤其是在java,c#这样的编程语言里。Typescript提供了类的系统，它很像Java，c#这样的语言。包含继承，抽象类，接口实现，setters/getters和其它。

我们同样也关注到最新Javascript的更新（ECMAScript 2015），Javascript原生对class提供了支持。Typescript和Javascript对类的应用很相似，但是有不同的地方。Typescript更严格一些。

延续之前food例子的风格，下面是一个简单的Typescript类的例子:
```
class Menu {
// 类中的属性:
// 默认的，它们是public的，也可以是private 或者 protected
items: Array<string>; // 在菜单中的项目，一个strings类型的数组
pages: number; // 菜单有多少页面，一个数字

// 构造函数
constructor(item_list: Array<string>, total_pages: number) {
// 这里的关键词是强制的
this.items = item_list;
this.pages = total_pages;
}

// 方法
list(): void {
console.log("Our menu for today:");
for(var i=0; i<this.items.length; i++) {
console.log(this.items[i]);
}
}

}

// 创建一个新的‘菜单’类实例
var sundayMenu = new Menu(["pancakes","waffles","orange juice"], 1);

// 执行list方法
sundayMenu.list();
```
熟悉java或c#的程序员对这种语法应该感觉很熟悉,下面是继承的例子:
```
class HappyMeal extends Menu {
// 父类属性将会被继承
// 需要定义一个新的构造函数

constructor(item_list: Array<string>, total_pages: number) {
// 在这个例子中，我们希望和父类有同样的构造函数
// 为了更方便额度复制父类的构造函数，这里使用了super函数-引用了父类的构造函数
super(item_list, total_pages);
}

// 和属性一样，父类函数也会被继承
// 当然我们也可以重写list()函数覆盖父类中的方法
list(): void{
console.log("Our special menu for children:");
for(var i=0; i<this.items.length; i++) {
console.log(this.items[i]);
}

}
}

// Create a new instance of the HappyMeal class.
var menu_for_children = new HappyMeal(["candy","drink","toy"], 1);

// This time the log message will begin with the special introduction.
menu_for_children.list();


```

如果想更深入的了解Typescript类的内容，请阅读[官方文档](https://www.tslang.cn/docs/handbook/classes.html)
## 泛型
![https://tutorialzine.com/media/2016/07/7_generics.png](https://tutorialzine.com/media/2016/07/7_generics.png)

泛型是一个模板，它允许函数接受不同类型的入参。相较于使用any这个类型，用泛型创建一个复用的组件会更好，因为泛型保留了进出变量的类型。

下面是一个简单的例子，这个函数会接收一个参数并且返回包含这个参数的数组。

```
// 在函数后面的<T>标识符表示了一个函数为泛型函数
// 当我们执行函数的时候，每一个T的实例将会被替换为真实提供的类型

// 接收一个入参，类型为T
// 返回一个数组，类型为T

function genericFunc<T>(argument: T): T[] {
var arrayOfT: T[] = []; //创建一个T类型的空数组
arrayOfT.push(argument); // 入参添加进这个数组中
return arrayOfT;
}

var arrayFromString = genericFunc<string>("beep");
console.log(arrayFromString[0]); // "beep"
console.log(typeof arrayFromString[0]) // String

var arrayFromNumber = genericFunc(42);
console.log(arrayFromNumber[0]); // 42
console.log(typeof arrayFromNumber[0]) // number
```

第一次我们执行函数的时候，我们不需要手动的传入的参数的类型（string），因为编译器可以识别到传递了什么参数，并自动决定什么类型最适合它；就像在第二个调用中那样，虽然这不是必须的，但是还是推荐每次都指定泛型的类型，因为编译器可能在复杂的情景下推测出错误的类型。

Typescript文档中包含了两个高级的例子，包含了泛型类，以及与接口结合使用的方法。如果想阅读更多，请[点击这里](https://www.tslang.cn/docs/handbook/generics.html)。
## 模块
![https://tutorialzine.com/media/2016/07/8_modules.png](https://tutorialzine.com/media/2016/07/8_modules.png)

另一个关于大型apps的概念是模块化。如果你的代码可以划分为许多小的，可重复使用的模块，将会使你的项目更加条理和易于理解的。比一个有10000行的文件好很多。

Typescript引入了一种语法去输出和引入模块，但是无法掌控文件间的实际连接。为了能使Typescript文件使用第三方的库，例如用在浏览器apps的[require.js](https://requirejs.org/)和Node.js的CommmonJs.让我们看一个简单的例子--Typescript模块和require.js:

我们有两个文件，一个输出函数，另一个引入它并且执行它：

expoter.ts
```
var sayHi = function():void {
    console.log("Hello!");    
}

export = sayHi;
```
importer.ts
 ```
 import sayHi = require('./exporter');
 sayHi();
 ```
 现在我们需要下载require.js并用<script>标签引入到文件中 - [这里会告诉你怎么做](https://requirejs.org/docs/start.html)。最后一个是转换这两个.ts文件。在转换的时候输入另一个参数，告诉编译器我们想使用AMD的方式引用，而不是 CommonJS 的方式
 
 ```
 tsc --module amd *.ts
 ```
 
 如果你想了解更多Typescript模块的内容可以[点击这里](https://www.tslang.cn/docs/handbook/modules.html)。

## 声明文件
![https://tutorialzine.com/media/2016/07/9_declaration_files.png](https://tutorialzine.com/media/2016/07/9_declaration_files.png)
当我们想使用之前Javascript中经常使用的库，我们需要去使用声明文件去使得这些库适用于ts。一个声明文件的扩展名为.d.ts，包含了关于库的信息和API。

ts声明文件经常是手写的，但是一些库也有其它人已经写好的.d.ts文件。[DefinitelyTyped](http://definitelytyped.org/)是最大的公共资源仓库，包含了很多的文件可引用。另一个著名的用node模块管理Typescript定义的叫[Typings.](https://github.com/typings/typings)

更多关于声明文件的内容可以看[这里](https://www.tslang.cn/docs/handbook/declaration-files/introduction.html)。
## 更多内容

刚开始，阅读官方文档的内容可能有点多，但是带来的收益是巨大的。我们的教程只是做一个入门的介绍，我们不可能覆盖所有文档的内容。下面是我们没有包含到的内容:

* [命名空间](https://www.tslang.cn/docs/handbook/namespaces.html)
* [枚举](https://www.tslang.cn/docs/handbook/enums.html)
* [高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)
* [用Ts写JSX](https://www.tslang.cn/docs/handbook/jsx.html)
## 最后
希望这篇入门教程能给你带来帮助。
如果你有任何想法或者想使用Typescript在你的项目里，可以在下面留言。