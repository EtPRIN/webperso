function creerTableau(x,y){
    let terrain=[];
    for(let i=0;i<x;i++){
        terrain.push([])
        for(let j=0;j<y;j++){
            terrain[i].push("vide")
        }
    }
    return terrain
}

function afficherTableau(map){
    let elt = document.querySelector("#snake")
    let tab = "";
    if(jeu){
        tab+="<div id='score'>Score = "+score+"</div>"
    }
    else{tab+="<div id='score'>Perdu ! Votre score = "+score+"</div>"}
    for (let i in map){
        tab+="<div id='ligne'>";
        for (let j in map[0]){
            tab+="<div id='"+map[i][j]+"'></div>";
        }
        tab+="</div>";
    }
    elt.innerHTML= tab;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function InitialiseFruit(){
    let emptyCase=false;
    let xRand=0;
    let yRand=0;
    while(!emptyCase){
        xRand=getRandomInt(x-1);
        yRand=getRandomInt(y-1);
        if (map[xRand][yRand]=="vide"){
            emptyCase=true;
        }
    }
    return [xRand,yRand]
}

function moveSnake(){
    switch (direction){
        case "pause":
            break;
        case "up":
            ver.unshift([ver[0][0]-1,ver[0][1]]);
            break;
        case "down":
            ver.unshift([ver[0][0]+1,ver[0][1]]);
            break;
        case "left":
            ver.unshift([ver[0][0],ver[0][1]-1]);
            break;
        case "right":
            ver.unshift([ver[0][0],ver[0][1]+1]);
            break;
    }
}

function UpdateTerrain(){
    map=creerTableau(x,y);
    for(let positionVer of ver){
        map[positionVer[0]][positionVer[1]]="snakeCorps";
    }
    map[positionFruit[0]][positionFruit[1]]="fruit";
}

function FruitIsEaten(){
    if((ver[0][0]==positionFruit[0])&&(ver[0][1]==positionFruit[1])){
        console.log("fruit Eaten");
        positionFruit=InitialiseFruit();
        score++;
    }else{
        if (direction!="pause"){
            ver.pop();
        }
    }
}

function moveIsAllowed(){
    if((ver[0][0]<0 || ver[0][0]>=x) || (ver[0][1]<0 || ver[0][1]>=y)){
        jeu=false;
        console.log("défaite");
        ver.shift();
    }
    let vertest=Object.values(ver);
    vertest.shift();
    vertest.pop();
    for(let i of vertest){
        if(ver[0][0]==i[0] && ver[0][1]==i[1]){
            jeu=false;
            ver.shift();
            console.log("défaite");
        }
    }
}

function snake_run(){
    if (jeu && direction!="pause"){
        moveSnake();
        changementDirectionFait=false;
        moveIsAllowed();
        FruitIsEaten();
        UpdateTerrain();
        afficherTableau(map);
        console.log("1");
    }else{
        if(relancer){
            relancerJeu();
        }
    }
}

function relancerJeu(){
    relancer=false;
    jeu=true;
    lastDirection="up";
    ver = [[Math.floor(x/2),Math.floor(y/2)]];
    direction="pause";
    map = Object.values(terrain);
    score=0;
    positionFruit=InitialiseFruit();
    UpdateTerrain();
    afficherTableau(map);
}





let elt = document.querySelector("#snake")
elt.innerHTML = "<h1>Error: Snake does not work</h1>"
let jeu=true;
let lastDirection="up";
let x=25;
let y=25;
let terrain = creerTableau(x,y);
let direction="pause";
let ver = [[Math.floor(x/2),Math.floor(y/2)]];
let map = Object.values(terrain);
let score=0;
let relancer = false;
let positionFruit=InitialiseFruit();
let changementDirectionFait=false;
console.log("Initialisation ended");
UpdateTerrain();
afficherTableau(map);
setInterval(snake_run, 70);


document.addEventListener('keydown', function (e){
    if (e.keyCode == 37 && direction!="right" && direction!="pause" && changementDirectionFait==false) {  
        changementDirectionFait=true;
        direction = "left";}
    if (e.keyCode == 38 && direction!="down" && direction!="pause" && changementDirectionFait==false){  
        changementDirectionFait=true;   
        direction = "up";}
    if (e.keyCode == 39 && direction!="left" && direction!="pause" && changementDirectionFait==false){  
        changementDirectionFait=true;   
        direction = "right";}
    if (e.keyCode == 40 && direction!="up" && direction!="pause" && changementDirectionFait==false){  
        changementDirectionFait=true;   
        direction = "down";}
    if (e.keyCode == 32){
        if(direction=="pause"){
            direction=lastDirection;
        }else{
            lastDirection=direction;
            direction="pause";
        }
    }
    if (e.keyCode == 13 && jeu==false){
        console.log("relancement")
        relancer=true;
    }
    }, false
    );