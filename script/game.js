$(document).keydown(function (event){
    switch(event.keyCode){
        case 37://left
            if(moveLeft()){
                setTimeout("generateOneNumber();",210);
                setTimeout("isgameover();",300);
            }
            break;
        case 38://up
            if(moveUp()){
                setTimeout("generateOneNumber();",210);
                setTimeout("isgameover();",300);
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout("generateOneNumber();",210);
                setTimeout("isgameover();",300);
            }
            break;
        case 40://down
            if(moveDown()){
                setTimeout("generateOneNumber();",210);
                setTimeout("isgameover();",300);
            }
            break;
        default:
            break;
    }
})
function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}
function gameover(){
    alert('gameover!')
}
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //可以向左移动
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            //当前数字格是有值的
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0 && noBlokHorizontalCol(i,k,j,board)){
                        //可以向左移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j] &&noBlokHorizontalCol(i,k,j,board)&&!hasConflicted[i][k]){
                        //可以向左移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //可以向右移动
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            //当前数字格是有值的
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlokHorizontalCol(i,k,j,board)){
                        //可以向右移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j] &&noBlokHorizontalCol(i,k,j,board)&&!hasConflicted[i][k]){
                        //可以向右移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k]*=2;
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}
function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    //可以向上移动
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            //当前数字格是有值的
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlokVerticalCol(j,k,i,board)){
                        //可以向上移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j] &&noBlokVerticalCol(j,k,i,board)&&!hasConflicted[k][j]){
                        //可以向上移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j]*=2;
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    //可以向下移动
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            //当前数字格是有值的
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlokVerticalCol(j,i,k,board)){
                        //可以向下移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j] &&noBlokVerticalCol(j,i,k,board)&&!hasConflicted[k][j]){
                        //可以向下移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j]*=2;
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}