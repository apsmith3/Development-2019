const sequence1 = new seqgeneasy();
console.log(sequence1);
const sequence2 = new seqgenmedium();
console.log(sequence1);
const sequence3 = new seqgenhard();
console.log(sequence1);

function seqgeneasy(sequence)
{
sequence = [];
if (sequence.length < 6)
    {
        var nextnum = Math.floor(Math.random() * 6) + 1;
        sequence.push(nextnum);
    }
return sequence;
}
function seqgenmedium(sequence)
{
    sequence = [];
    if (sequence.length < 12)
    {
        var nextnum = Math.floor(Math.random() * 6) + 1;
        sequence.push(nextnum);
    }
    return sequence;
}
function seqgenhard(sequence)
{
    sequence = [];
    if (sequence.length < 18)
    {
        var nextnum = Math.floor(Math.random() * 6) + 1;
        sequence.push(nextnum);
    }
    return sequence;
}




function getLightURI(element)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + element.attr("id")+"/";
}

function togglelight(element)
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