let boxes= document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let playerNameDisplay = document.querySelector("#show-name");
let winMsg = document.querySelector("#win-msg");
let contain=document.querySelector(".container");
let inputBxs = document.querySelectorAll(".entry-box");
let player1 =document.querySelector("#player1");
let player2 =document.querySelector("#player2");
let count = 1;

let turnO=true ;
let winningPatter = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],
                    [2,5,8],[0,4,8],[2,4,6]];

const startGame = () =>{
    player1.disabled = true;
    player2.disabled = true;
    playerNameDisplay.innerHTML = `${player1.value}'s turn`;
    playerNameDisplay.classList.remove("show-name");
    playGame();
};

const playGame = () =>{
    boxes.forEach((box) =>{
        box.addEventListener("click", () => {
            if(turnO){
                box.innerText="O";
                turnO = false;
                if(count !== 9){
                    playerNameDisplay.innerHTML = `${player2.value}'s turn`;
                    playerNameDisplay.classList.remove("show-name");
                    count++;
                }
                else{
                    playerNameDisplay.classList.add("show-name");
                }
            }
            else{
                box.innerText="X";
                turnO = true;
                if(count !== 9){
                    playerNameDisplay.innerHTML = `${player1.value}'s turn`;
                    playerNameDisplay.classList.remove("show-name");
                    count++;
                }
                else{
                    playerNameDisplay.classList.add("show-name");
                }
            }
            box.disabled=true;
            checkWinner();
        });
    });
}



const checkWinner = () =>{
    console.log("game");
    for(let pattern of winningPatter){
        let val1=boxes[pattern[0]].innerText;
        let val2=boxes[pattern[1]].innerText;
        let val3=boxes[pattern[2]].innerText;

        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 === val3){
                if(val1 === "O"){
                    showWin(player1.value);
                    playerNameDisplay.classList.add("show-name");
                }
                else{
                    showWin(player2.value);
                    playerNameDisplay.classList.add("show-name");
                }
            }
        }
    }
};

const showWin=(winner)=>{
    winMsg.innerHTML = `Congratulations , Winner Is ${winner}`;
    winMsg.classList.remove("msg");
    disableBoxes();
};

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
    player1.disabled = false;
    player1.value = "";
    player2.disabled = false;
    player2.value = "";
};

const resetGame =()=>{
    turnO=true;
    enableBoxes();
    winMsg.classList.add("msg");
    playerNameDisplay.classList.add("show-name");
};


resetBtn.addEventListener("click", resetGame);