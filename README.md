# 简易版的2048小游戏

[TOC]



## 一. 游戏介绍

每次可以选择上下左右其中一个方向去滑动，每滑动一次，所有的数字方块都会往滑动的方向靠拢外，系统也会在空白的地方乱数出现一个数字方块，相同数字的方块在靠拢、相撞时会相加。不断的叠加最终拼凑出2048这个数字就算成功。

##### **游戏主要实现的功能**

1.初始化时随机生成两个数字为2或4的格子

2.方块的移动和合并。 根据移动后的值,改变方块的颜色和位置

3.判断在某个方向上是否可以移动。

4.在随机生成数字的时候判断16宫格中是否还有空间，有则生成下一块。

5.判输。 需要满足条件 1.16宫格中没有空间生成新的格子。2.上下左右四个方向上无法移动   同时满足两项条件则判输。

6.分数。任意两个格子合并后，新增分数为合并后格子的值。

7.保存。按下保存按钮后游戏分数保存。



## 二. 界面布局

棋盘格上方设有一级标题、开始和保存游戏的按钮以及记分器。

> ```html
> <header>
>         <h1>My 2048!</h1>
>         <a href="javascript:newgame();" id="newgamebutton">New Game</a>
>         <input type="submit" name="Submit" value="保 存" onClick="ChangeState();">
>         <p>score:<span id="score">0</span></p>
> </header>  
> ```

`href = "javascript:newgame();"`意味着我们点击New Game的按钮就会执行newgame()方法。

棋盘格为4x4排列的16个div盒子。 通过类选择器统一设定css样式。并通过id选择器grid-cell-x-y确定每个格子具体在棋盘格的位置。

> ```html
> <div id="grid-container">
> 	<div id="grid-cell-0-0" class="grid-cell"></div>
> 	<div id="grid-cell-0-1" class="grid-cell"></div>
> 	......
> 	<div id="grid-cell-3-2" class="grid-cell"></div>
> 	<div id="grid-cell-3-3" class="grid-cell"></div>
> </div>
> ```

#### **New Game按钮的结冰效果**

鼠标悬置在按钮上方时产生从左至右的结冰效果

> ```css
> header #newgamebutton {
>     display: flex;
>     align-items: center;
>     justify-content: center;
>     outline: none;
>     background-image: linear-gradient(to right,#25aae1,#40e495);
>     box-shadow: 0 0 15px 0 rgba(49, 196, 190, 0.75);
>     position: relative;
> }
> header #newgamebutton:before {
>     content: '';
>     display: block;
>     background: linear-gradient(to left,rgba(255,255,255,0)50%,rgba(255,255,255,0.4)50%);
>     background-size: 210% 100%;
>     background-position: right bottom;
>     height: 100%;
>     width: 100%;
>     position: absolute;
>     top: 0;
>     bottom: 0;
>     right: 0;
>     left: 0;
>     border-radius: 10px;
>     transition: all 1s;
>     -webkit-transition: all 1s;
> }
> header #newgamebutton:hover:before {
>     background-position: left bottom;
> ```



## 三. 游戏功能的具体实现

- jQuery文件
- support文件
- animation文件
- main文件
- game文件

### 相关JS文件的引用

> ```html
> <script type="text/javascript" src="script/jquery-3.5.1.min.js"></script>
> <script type="text/javascript" src="script/.js"></script>
> <script type="text/javascript" src="script/.js"></script>
> <script type="text/javascript" src="script/.js"></script>
> <script type="text/javascript" src="script/.js"></script> 
> ```
>
> 顺序也有一定要求。所创建的文件都是基于jQuery的，所以jQuery文件的引入应该在其他文件之前。其他文件的顺序按照A是基于B写的文件，则B在A之前被引用。

### 1.jQuery文件

jQuery是一个**JavaScript函数库(框架)**。**简化JS开发**。
jQuery是一个快速、简洁的JavaScript框架（本质就是一些js文件，封装了js的原生代码），是继Prototype之后又一个优秀的JavaScript代码库（或JavaScript框架）。jQuery设计的宗旨    是“write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互。

### 2.support文件

support文件中写有一些支撑**游戏基础逻辑**实现的方法。其中：

**getPosTop(i,j)和getPosLeft(i,j)**确定新生成格子的位置以便覆盖在棋盘格上。

**getNumberBackgroundColor(number)和getNumberColor(number)**在animation文件中的ShowNumberWithAnimaion(i,j,randNumber)方法里初始化数字格时确定格子的背景色和前景色。

**canMoveLeft(board)、canMoveRight(board)、canMoveUp(board)和canMoveDown(board)**分别确定游戏玩家是否能使棋盘格中的数字格进行左移右移上移下移的操作。下面我们以左移的代码为例：

> ```javascript
> function canMoveLeft(board){
>     for(var i=0;i<4;i++){
>         for(var j=1;j<4;j++){
>             //没有数字格的位置初始化为0，所以不为0说明有数字格
>             if(board[i][j]!=0){
>                 //如果前一列为空或者前一列与当前列相等（即可以进行相加操作）就返回可以左移
>                 if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
>                     return true;
>                 }
>             }
>         }
>     }
>     //此时所有左侧数字格都不为空且相邻的左右两个格子不相等，所以无法进行左移操作 返回false
>     return false; 
> }
> ```

**noBlokHorizontalCol(row,col1,col2,board)和noBlokVerticalCol(col,row1,row2,board)**两个方法分别用来判断水平方向和竖直方向移动过程中左右和上下两边的数字格是否为空，从而辅助实现移动的四个方法。

> ```javascript
> function noBlokHorizontalCol(row,col1,col2,board){
>     for(var i=col1+1;i<col2;i++){
>         if(board[row][i]!=0){
>             return false;
>         }
>     }
>     return true;
> }
> function noBlokVerticalCol(col,row1,row2,board){
>     for(var i=row1+1;i<row2;i++){
>         if(board[i][col]!=0){
>             return false;
>         }
>     }
>     return true;
> }
> ```

**nospace(board)**方法在生成两个随机数的时候用来判断是否有位置给这新生成的两个数字格，如果没有就会导致游戏结束。**nomove(board)**方法用来判断棋盘格是否还能移动（上下左右移），任意一个可以就会返回true。

### 3.animation文件

animation是**游戏动画逻辑**文件，里面提供的方法可以产生我们需要的动画效果。

ShowNumberWithAnimaion(i,j,randNumber)方法定义了随机产生一个数字的动画效果。

> ```javascript
> function ShowNumberWithAnimaion(i,j,randNumber){
>     var numberCell = $("#number-cell-"+i+"-"+j);
>     numberCell.css("background-color",getNumberBackgroundColor(randNumber));
>     numberCell.css("color",getNumberColor(randNumber));
>     numberCell.text(randNumber);
>     numberCell.animate({
>         width:"100px",
>         height:"100px",
>         top:getPosTop(i,j),
>         left:getPosLeft(i,j)
>     },50);//50毫秒
> }
> function showMoveAnimation(fromx,fromy,tox,toy){
>     //获取当前数字格的元素
>     var numberCell = $("#number-cell-"+fromx+"-"+fromy);
>     numberCell.animate({
>         top:getPosTop(tox,toy),
>         left:getPosLeft(tox,toy)
>     },200);
> }
> function updateScore(score){
>     $('#score').text(score);
> }
> ```

### 4.main文件

main文件中写有**游戏主逻辑**实现的方法。

main文件中写有newgame()方法用于开始新的游戏。而开始新的游戏需要完成两件事，一是初始化棋盘格，二是在随机两个格子生成两个数字。本游戏中我们用init()和generateOneNumber()两个方法来完成上述事件。

> ```javascript
> $(document).ready(function(){
>     newgame();
> })
> 
> function newgame(){
>     //初始化棋盘格
>     init();
>     //在随机两个格子生成数字
>     generateOneNumber();
>     generateOneNumber();
> }
> ```

棋盘格的初始化我们通过编写init()方法来实现。棋盘格是一个4x4的16块方格，我们需要创建一个二维数组来表示。由于JS没办法创建一个二维数组，所以我们先创建一个JavaScript数组，通过嵌套循环的方式来定义二维数组。

> ```javascript
> //创建一个数组，后期定义为一个二维数组来表示棋子
> var board = new Array();
> 
> function init(){
>  for(var i = 0;i<4;i++){
>      board[i]=new Array();
>      hasConflicted[i]=new Array();
>      for(var j=0;j<4;j++){
>          board[i][j]=0;
>          hasConflicted[i][j]=false;
>          //通过双重遍历获取每一个格子元素
>          var gridCell=$("#grid-cell-"+i+"-"+j);
>          //通过getPosTop()方法设置每个格子距顶端的距离
>          gridCell.css("top",getPosTop(i,j));
>          //通过GetPosLeft()方法设置每个格子距左端的距离
>          gridCell.css("left",getPosLeft(i,j)); 
>      }
>  }
>  updateBoardView();
>  score = 0;
> }
> ```

仅仅初始化棋盘格是不能让我们显式看到的，所以我们需要用updateBoardView()方法产生一个4x4的格子来显示棋盘格上的数字格。即我们需要更新或者说修正棋盘格。

> ```javascript
> function updateBoardView() {
>     $(".number-cell").remove();
>     for(var i = 0;i<4;i++){
>         for(var j=0;j<4;j++){
>            //向棋盘格上增加数字格
>            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
>            var numberCell = $("#number-cell-"+i+"-"+j);
>            //如果棋盘格的值为0的话，设置数字格的高宽都为0
>            if(board[i][j]==0){
>                numberCell.css("width","0px");
>                numberCell.css("height","0px");
>                numberCell.css("top",getPosTop(i,j)+50);
>                numberCell.css("left",getPosLeft(i,j)+50);
>            }else{
>             //如果棋盘格的值不为0，设置数字格为高宽75并设置背景色和前景色以及数字值
>                numberCell.css("width","100px");
>                numberCell.css("height","100px");
>                numberCell.css("top",getPosTop(i,j));
>                numberCell.css("left",getPosLeft(i,j));
>                numberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
>                numberCell.css("color",getNumberColor(board[i][j]));
>                numberCell.text(board[i][j]);     
>            }
>            hasConflicted[i][j]=false;
>         }
>     }
> }
> ```

我们利用generateOneNumber()方法生成一个随机数字。该方法分为四步：1.判断当前棋盘格是否为空即能不能在这里生成一个新的格子。2.随机一个位置。3.生成一个随机数字。4.在生成的随机位置上显示已经生成的随机数字.

Math.random()随机生成一个浮点数，乘以4之后是一个0~4之间的浮点数。加上parseInt()即可完成生成一个0~4之间的整数的操作。

> ```javascript
> function generateOneNumber(){
>     if(nospace(board)){
>         return false;
>     }
>     //随机一个x坐标的位置
>     var randx = parseInt(Math.floor(Math.random()*4));
>     //随机一个y坐标的位置
>     var randy = parseInt(Math.floor(Math.random()*4));
>     //定义一个死循环，直到完成生成随机空格子才可跳出
>     while(true){
>         //如果生成的格子为0，意味着没有覆盖已有的格子，即生成成功
>         if(board[randx][randy]==0){
>             break;
>         }
>         //否则重新生成一个位置
>         var randx = parseInt(Math.floor(Math.random()*4));
>         var randy = parseInt(Math.floor(Math.random()*4));
>     }
>     //随机生成2或者4
>     var randNumber = Math.random()< 0.5 ? 2 : 4;
>     //在随机位置显示随机数字
>     board[randx][randy] = randNumber;
>     //实现随机数字显示的动画
>     ShowNumberWithAnimaion(randx,randy,randNumber);  
> 
>     return true; 
> }
> ```

游戏的保存功能。我们设定一个变量hasSaved来确定当前的游戏状态是否已经保存。如果已经保存了，我们令hasSaved = true即可直接关闭页面，否则会弹出窗口提醒玩家保存游戏进度。

> ```javascript
> //在离开页面时判断是否有未保存的输入值
> var hasSaved = false;//是否有输入的内容未保存标志，初始值为false
> function CheckUnsave(){
> if(hasSaved==false){
> alert("您的游戏尚未保存，请保存后再离开页面");
> return false;}
> //return true; //不能加这个语句
> }
> 
> //保存了则改变状态
> function ChangeState()
> {
> hasSaved = true;
> }
> ```

### 5.game文件

game文件中的方法主要用来实现玩家通过键盘对游戏的控制，即game文件是**游戏交互逻辑**文件。

keydowm事件表示键盘被按下。event是keydown事件自带的，event.keyCode可以取到我们键盘的内容。我们通过编写function (event)来处理键盘被按下后游戏的逻辑。我们以向左移动为例，首先需要判断是否能够向左移动，如果能就进行左移然后随机生成两个新的数字格并判断游戏是否结束。

> ```javascript
> $(document).keydown(function (event){
>     switch(event.keyCode){
>         case 37://left
>             if(moveLeft()){
>                 setTimeout("generateOneNumber();",210);
>                 setTimeout("isgameover();",300);
>             }
>             break;
>         case 38://up
>             if(moveUp()){
>                 setTimeout("generateOneNumber();",210);
>                 setTimeout("isgameover();",300);
>             }
>             break;
>         case 39://right
>             if(moveRight()){
>                 setTimeout("generateOneNumber();",210);
>                 setTimeout("isgameover();",300);
>             }
>             break;
>         case 40://down
>             if(moveDown()){
>                 setTimeout("generateOneNumber();",210);
>                 setTimeout("isgameover();",300);
>             }
>             break;
>         default:
>             break;
>     }
> })
> ```

**moveLeft()、moveRight()、moveUp()、moveDown()**四个方法分别用来实现游戏中棋盘格中的数字格向左右上下移动的操作。下面我们以向左移的方法代码为例：

> ```javascript
> function moveLeft(){
>  if(!canMoveLeft(board)){
>      return false;
>  }
>  //可以向左移动
>  //向左移动的时候第一列元素是不变的 所以不用遍历
>  for(var i=0;i<4;i++){
>      for(var j=1;j<4;j++){
>          //当前数字格是有值的
>          if(board[i][j]!=0){
>              for(var k=0;k<j;k++){
>                  if(board[i][k]==0 && noBlokHorizontalCol(i,k,j,board)){
>                      //可以向左移动
>                      showMoveAnimation(i,j,i,k);
>                      board[i][k]=board[i][j];
>                      board[i][j]=0;
>                      continue;
>                  }else if(board[i][k]==board[i][j] &&noBlokHorizontalCol(i,k,j,board)&&!hasConflicted[i][k]){
>                      //可以向左移动
>                      showMoveAnimation(i,j,i,k);
>                      board[i][k]+=board[i][j];
>                      board[i][j]=0;
>                      score+=board[i][k];
>                      updateScore(score);
>                      hasConflicted[i][k]=true;
>                      continue;
>                  }
>              }
>          }
>      }
>  }
>  setTimeout("updateBoardView();",200);
>  return true;
> }
> ```

判断游戏是否结束和游戏结束的方法。如果棋盘格没有位置生成两个随机的数字格并且不能进行上下左右的移动，那么游戏结束。

> ```javascript
> function isgameover(){
>     if(nospace(board)&&nomove(board)){
>         gameover();
>     }
> }
> function gameover(){
>     alert('gameover!')
> }
> ```



## 四. 亟待改进的内容

按照我以往玩游戏的经验，当我用鼠标点击游戏界面以后我再按键盘的上下键是不会引起整个网页上下滑动的。在这个游戏中，按上下键虽然可以使游戏中棋盘格里的数字格进行正常的上下移动，但是网页也会跟着一起上下移动。

点击“保存”按钮所保存的内容。我设置“保存”功能的本意是希望意外关闭游戏页面后，重新打开页面会复原我之前的游戏进度。但是在这个游戏中，目前只能保存之前游戏的得分数，并不能保存全部的数据。

当有相加产生的新数字格时，记分器会实时更新分数。但我觉得这样不太美观，应该加个动画让玩家能显式看到我进行这一步操作在已有分数的基础上具体又加了多少分。

