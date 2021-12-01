//创建一个数组，后期定义为一个二维数组来表示棋子
var board = new Array();
var score =0 ;
var hasConflicted=new Array();

$(document).ready(function(){
    newgame();
})

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i = 0;i<4;i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
            //通过双重遍历获取每一个格子元素
            var gridCell=$("#grid-cell-"+i+"-"+j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top",getPosTop(i,j));
            //通过GetPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left",getPosLeft(i,j)); 
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for(var j=0;j<4;j++){
           //向棋盘格上增加数字格
           $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
           var numberCell = $("#number-cell-"+i+"-"+j);
           //如果棋盘格的值为0的话，设置数字格的高宽都为0
           if(board[i][j]==0){
               numberCell.css("width","0px");
               numberCell.css("height","0px");
               numberCell.css("top",getPosTop(i,j)+50);
               numberCell.css("left",getPosLeft(i,j)+50);
           }else{
            //如果棋盘格的值不为0，设置数字格为高宽75并设置背景色和前景色以及数字值
               numberCell.css("width","100px");
               numberCell.css("height","100px");
               numberCell.css("top",getPosTop(i,j));
               numberCell.css("left",getPosLeft(i,j));
               numberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
               numberCell.css("color",getNumberColor(board[i][j]));
               numberCell.text(board[i][j]);     
           }
           hasConflicted[i][j]=false;
        }
    }
}

//生成一个随机数字
function generateOneNumber(){
    if(nospace(board)){
        return false;
    }
    //随机一个x坐标的位置
    var randx = parseInt(Math.floor(Math.random()*4));
    //随机一个y坐标的位置
    var randy = parseInt(Math.floor(Math.random()*4));
    //定义一个死循环，完成生成随机空格子
    while(true){
        //如果生成的格子为0，意味着没有覆盖已有的格子，即生成成功
        if(board[randx][randy]==0){
            break;
        }
        //否则重新生成一个位置
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机生成2或者4
    var randNumber = Math.random()< 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    //实现随机数字显示的动画
    ShowNumberWithAnimaion(randx,randy,randNumber);  

    return true; 
}
//在离开页面时判断是否有未保存的输入值
var hasSaved = false;//是否有输入的内容未保存标志，初始值为false
function CheckUnsave(){
if(hasSaved==false){
alert("您的游戏尚未保存，请保存后再离开页面");
return false;}
//return true; //不能加这个语句
}

//保存了则改变状态
function ChangeState()
{
hasSaved = true;
}
