document.getElementById('lettres').onkeyup = function(){
    var letters = document.getElementById("lettres").value.split("");
    compute(dic, letters);
};

function compute(tab, letters){

    var res  =[];
    for(var i = 0; i < tab.length; ++i)
    {
        var temp = letters.slice();
        var test  = true;
        for(var j = 0; j < tab[i].length; ++j)
        {
            var pos = temp.indexOf(tab[i][j].toLowerCase());
            if(pos == -1)
            {
                test = false;
                break;
            }
            temp.splice(pos,1);
        }
        if(test) res.push(tab[i]);
    }
    var max = "";
    for(var i = 0; i < res.length; ++i)
        if(res[i].length > max.length) max = res[i];

    res.sort(function(a,b){return b.length - a.length;});

    var text = "";
    for(var j = 0; j < res.length; ++j)
            text += '<p>' + res[j].length + " letters : <b>" + res[j] + "</b></p>";
    document.getElementById("result").innerHTML = text;
}