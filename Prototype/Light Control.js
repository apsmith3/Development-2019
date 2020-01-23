
var iseasy = true;
var ismedium = false;
var ishard = false;
var isendless = false;
var input = [];
var sequence = [];
var correct = true;
var roundcomplete = true;
var sequencetotal;
                    // Sets difficulty on button click
                    // easy
const easy = document.getElementById('Easy');
easy.addEventListener("click", seteasy);

function seteasy()
    {

        iseasy = true;
        ismedium = false;
        ishard = false;
        isendless = false;
        console.log("easy");
    }
                    // medium
const medium = document.getElementById('Medium');
medium.addEventListener("click", setmedium);

function setmedium()
    {

        iseasy = false;
        ismedium = true;
        ishard = false;
        isendless = false;
        console.log("medium");
    }
                    // hard
const hard = document.getElementById('Hard');
hard.addEventListener("click", sethard);

function sethard()
    {

        iseasy = false;
        ismedium = false;
        ishard = true;
        isendless = false;
        console.log("hard");
    }
                    // endless
const endless = document.getElementById('Endless');
endless.addEventListener("click", setendless)

function setendless()
    {

        iseasy = false;
        ismedium = false;
        ishard = false;
        isendless = true;
        console.log("endless");
    }
                    // user inputs for each light
                    // red/1
const red = document.getElementById('red');
red.addEventListener("click", add1);
function add1()
    {
        input.push(1);
        checkinput();
    }
                    //orange/2
const orange = document.getElementById('orange');
orange.addEventListener("click", add2);
function add2()
    {
        input.push(2);
        checkinput();
    }
                    //purple/3
const purple = document.getElementById('purple');
purple.addEventListener("click", add3);
function add3()
    {
        input.push(3);
        checkinput();
    }
                    //blue/4
const blue = document.getElementById('blue');
blue.addEventListener("click", add4);
function add4()
    {
        input.push(4);
        checkinput();
    }
                    //green/5
const green = document.getElementById('green');
green.addEventListener("click", add5);
function add5()
    {
        input.push(5);
        checkinput();
    }
                    //yellow/6
const yellow = document.getElementById('yellow');
yellow.addEventListener("click", add6);
function add6()
    {
        input.push(6);
        checkinput();
    }
                    // functions sets memory sequence length based on difficulty chosen
function getdifficulty(sequencetotal)
    {
        if(iseasy == true){
            sequencetotal = 7
        }
        if(ismedium == true){
            sequencetotal = 13

        }
        if(ishard == true){
            sequencetotal = 19
        }
        if(isendless == true){
            sequencetotal = 128
        }
        return sequencetotal
    }
                    // starts game on click resets game parameters and starts round
const game = document.getElementById('StartGame');
game.addEventListener("click", startgame);
function startgame()
    {
        input = [];
        sequence = [];
        roundcomplete = true;
        correct = true;
        sequencetotal = getdifficulty(); // total light sequence length based on difficulty
        startround();

    }
                    // a round
function startround()
    {



        while ((sequence.length <= sequencetotal) && (correct == true) && (roundcomplete == true))  // runs round while previous round is completed correctly and light sequence is less than total for game
        {
            roundcomplete = false;
            sequence = sequencegenerator(sequence);    // calls function to generate next sequence
            // CONTROLL LIGHTS
            checkinput(sequence, input);               // calls function to check user input
        }
        if (correct == false)                           // if correct is returned false
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
                    // randomly generates next light to be turned on and adds it to light sequence
function sequencegenerator()
    {
            var nextnum = Math.floor(Math.random() * 6) + 1;
            sequence.push(nextnum);
            console.log(sequence);
            return sequence;
    }





                    // checks user input
function checkinput()
    {

    if(input.length == sequence.length) // once input length has reached light sequence lenth
        {
            var z = true;
            var y = 0;
            var x = sequence.length;
           while((y != x) && (z == true))           // checks if both input and light sequence arrays are the same
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

            if (z == true)                  // if correct returns correct parameters and starts next round
            {
                                    //console.log("correct");
                                    //console.log(sequence);
                                    //console.log(input);
                input = [];
                correct = true;
                roundcomplete = true;
                startround()
            }

            if (z == false)             // returns incorrect parameters
            {
                                    //console.log("incorrect");
                correct = false;
                startround()
            }
        }
    }








function getLightURI(element)           // sets up light url to send to bridge
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + element.attr("id")+"/";
}

