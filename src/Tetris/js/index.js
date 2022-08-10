var GX = 0; //블럭을 생성할 초기 위치 X
var GY = 3; //블럭을 생서할 초기 위치 Y
var NGY = 17;
var TURN = 0;
var TYPE = Math.round(Math.random()*6);
var NTYPE = Math.round(Math.random()*6);
var BLOCKTYPE=6, BLOCKROTATE=3;
var GAME_SPEED = 2000;
 
window.onload = function(){
    drawMap();
    drawNextTetris(NTYPE);
    myFunction();
    action(); //action 함수 추가
}

/**
 * 동작 메소드
 * interval 함수로 입력시간마다 동작
 * (GAME_SPEED에 따라 떨어지는 속도가 변경)
 */
function action(){
    //keyEvent
    document.addEventListener("keypress", function(){
        myFunction(event.keyCode);
    });

    var intervalID = setInterval(function(){
        erase(GX, TYPE, TURN); //생성한 전위치 블럭 삭제
        if(isMove(TYPE, TURN, GX+1, GY)){
            GX++; //한줄씩 내리기
        }
        drawTetris(GX, TYPE, TURN); //테트리스를 그린다.
    }, GAME_SPEED);
}

function drawMap(){
    var rowLen = MAP.length;
    var tag = "<table>";
    var x = 0;
    var y = 0;
    for(var i=0; i<rowLen; i++){
        tag += "<tr>"
        var colLen = MAP[i].length;
        for(var j=0; j<colLen; j++){
            var className = "";
            var idValue = "";
            if(MAP[i][j] == 0){
                className = "map";
                idValue = "x"+(i-2)+"y"+(j-2);
            }else if(MAP[i][j] == 2){
                className = "map";
                idValue = "xn"+(i-1)+"yn"+(j-16);
            }else if(MAP[i][j] == 3){
                className = "guard";
            }else if(MAP[i][j] == 4){
                className = "board";
            }

            if(idValue != ""){
                tag += "<td id="+idValue+" class="+className+"></td>"
            }else{
                tag += "<td class="+className+"></td>"
            }
            
        }
        tag += "</tr>"
    }
    document.getElementById("container").innerHTML = tag + "</table>";
};

function ChangeColor(x, y, cN){
    document.getElementById("x"+x+"y"+y).className = cN;
}

//다음에 그려질 방향의 테트리스 그리기
function drawNextTetris(NTYPE){
    for(var x=0; x<4; x++){
        for(var y=0; y<4; y++){
            if(TETRIS[NTYPE][0][x][y] == 1){
                ChangeColor("n"+(x+1), "n"+y, "block"+NTYPE);                
            }
        }
    }
}

function erase(GX, TYPE, TURN){
    for(var x=0; x<TETRIS[BLOCKTYPE][BLOCKROTATE].length; x++){
        for(var y=0; y<TETRIS[BLOCKTYPE][BLOCKROTATE][x].length; y++){
            if(TETRIS[TYPE][TURN][x][y]==1){
                ChangeColor(x+GX, y+GY, "map");
            }
        }
    }
}

//테트리스 그리기
function drawTetris(GX, TYPE, TURN){
    for(var x=0; x<TETRIS[BLOCKTYPE][BLOCKROTATE].length; x++){
        for(var y=0; y<TETRIS[BLOCKTYPE][BLOCKROTATE][x].length; y++){
            if(TETRIS[TYPE][TURN][x][y] == 1){
                ChangeColor(x+GX, y+GY, "block"+TYPE);
            }
        }
    }
}

function myFunction(input){
    //그리기 전에 지우기
    erase(GX, TYPE, TURN);
    switch(input){
        case 53://회전
            if(isMove(TYPE, TURN+1, GX, GY)){
                TURN++;
                TURN = TURN % 4;
            }
            break;
        case 49://블럭왼쪽이동
            if(isMove(TYPE, TURN, GX, GY-1)){
                GY--;
            }
            break;
        case 51://블럭오른쪽이동
            if(isMove(TYPE, TURN, GX, GY+1)){
                GY++;
            }
            break;
        case 50://블럭아래로이동
            if(isMove(TYPE, TURN, GX+1, GY)){
                GX++;
            }
            break;
        case 32://스페이스
            while(isMove(TYPE, TURN, GX+1, GY)){
                GX++;
            }
            break;
    }
    //테트리스 블럭 그리기
    drawTetris(GX, TYPE, TURN);
}
 
function isMove(TYPE, TURN, GX, GY){
    TURN = TURN > 3 ? TURN % 4 : TURN;
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(TETRIS[TYPE][TURN][i][j] == 1){ //테트리스의 블럭모양이 나왔는데
                if(MAP[GX+2+i][GY+2+j] != 0){ //닿을곳이 맵이 아니면
                    return false;
                }
            }
        }
    }
    return true;
}