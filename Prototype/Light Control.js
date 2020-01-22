
var iseasy = true;
var ismedium = false;
var ishard = false;
var isendless = false;
var input = [];
var sequence = [];
var correct = true;
var roundcomplete = true;

const easy = document.getElementById('Easy');
easy.addEventListener("click", seteasy);

function seteasy() {

    iseasy = true;
    ismedium = false;
    ishard = false;
    isendless = false;
    console.log("easy");
};

const medium = document.getElementById('Medium');
medium.addEventListener("click", setmedium);

function setmedium() {

    iseasy = false;
    ismedium = true;
    ishard = false;
    isendless = false;
    console.log("medium");
}

const hard = document.getElementById('Hard');
hard.addEventListener("click", sethard);

function sethard() {

    iseasy = false;
    ismedium = false;
    ishard = true;
    isendless = false;
    console.log("hard");
}

const endless = document.getElementById('Endless');
endless.addEventListener("click", setendless)

function setendless() {

    iseasy = false;
    ismedium = false;
    ishard = false;
    isendless = true;
    console.log("endless");
}
const red = document.getElementById('red');
red.addEventListener("click", add1);
function add1() {
    input.push(1);
    checkinput();
}
const orange = document.getElementById('orange');
orange.addEventListener("click", add2);
function add2() {
    input.push(2);
    checkinput();
}
const purple = document.getElementById('purple');
purple.addEventListener("click", add3);
function add3() {
    input.push(3);
    checkinput();
}
const blue = document.getElementById('blue');
blue.addEventListener("click", add4);
function add4() {
    input.push(4);
    checkinput();
}
const green = document.getElementById('green');
green.addEventListener("click", add5);
function add5() {
    input.push(5);
    checkinput();
}
const yellow = document.getElementById('yellow');
yellow.addEventListener("click", add6);
function add6() {
    input.push(6);
    checkinput();
}

function getdifficulty(sequencetotal){
    if(iseasy == true){
        sequencetotal = 6
    }
    if(ismedium == true){
        sequencetotal = 12

    }
    if(ishard == true){
        sequencetotal = 18
    }
    if(isendless == true){
        sequencetotal = 128
    }
    return sequencetotal
}

const game = document.getElementById('StartGame');
game.addEventListener("click", startgame);
function startgame()
{
    input = [];
    sequence = [];
    roundcomplete = true;
    correct = true;
    startround();

}

function startround()
{
    var sequencetotal;

    sequencetotal = getdifficulty();

    while ((sequence.length < sequencetotal) && (correct == true) && (roundcomplete == true))
    {
        roundcomplete = false;
        sequence = sequencegenerator(sequence);
        // CONTROLL LIGHTS
        checkinput(sequence, input);
    }
    if (correct == false)
    {
        // set lights red
        alert("Incorrect GAME OVER")
    }
    if ((correct == true) && (sequencetotal == sequence.length))
    {
        // set lights green
        alert("You Win!!!")
    }

}

function sequencegenerator()
{
        var nextnum = Math.floor(Math.random() * 6) + 1;
        sequence.push(nextnum);
        console.log(sequence);
return sequence;
}






function checkinput()
{

if(input.length == sequence.length)
    {
        var z = true;
        var y = 0;
        var x = sequence.length;
       while((y != x) && (z == true))
       {
           if((sequence[y] == input[y]) && (z == true))
           {
            y ++;
           }
           else
           {
            z = false;
           }


       }



        if (z == true)
        {
            console.log("correct");
            console.log(sequence);
            console.log(input);
            input = [];
            correct = true;
            roundcomplete = true;
            startround()
        }

        if (z == false)
        {
            console.log("incorrect");
            correct = false;
            startround()
        }
    }
}








function getLightURI(element)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + element.attr("id")+"/";
}

function activatelight(element)
{
    var getState = $.getJSON(getLightURI(element), function (data)
    {
        var state = data["state"]["on"];
        if (state)
        {
            state = false;
        }
        else
        {
            state = true;
        }

        var lightState = {"on" : state};

        $.ajax({
            url: getLightURI(element) + "state/",
            type: "PUT",
            data: JSON.stringify(lightState)
        })
    });
}