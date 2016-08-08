/**
 * Created by pierre on 11/12/15.
 */

var grid = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

function readInput()
{
    tmp = document.getElementById("input").value;

    for(var i = 0; i < 9; ++i)
    {
        for(var j = 0; j < 9; j++)
        {
            grid[i][j] = tmp[i*10+j];
        }
    }
    isValid(0);
    var str = "";
    str += "*************************\n";
    for(var i = 0; i < 9; ++i)
    {
        str += "*";
        for(var j = 0; j < 9; j++)
        {
            str += ' '+grid[i][j];
            if((j+1) % 3 == 0 && j != 0 && j != 8)
            {
                str += " |";
            }
        }
        if((i+1)%3 == 0 && i != 0 && i != 8)
        {
            str += " *\n* --------------------- *\n"
        }
        else
        {
            str += ' *\n';
        }
    }
    str += "*************************\n";
    document.getElementById("output").innerHTML = str;

}

function isPresentLine(v, i)
{
    for(var j = 0; j < 9; ++j)
    {
        if(grid[i][j] == v){
            return true;
        }
    }
    return false;
}

function isPresentCol(v, j)
{
    for(var i = 0; i < 9; ++i)
    {
        if(grid[i][j] == v){
            return true;
        }
    }
    return false;
}


function isPresentBloc(v, x, y)
{
    var x_bloc = Math.floor(x/3)*3;
    var y_bloc = Math.floor(y/3)*3;
    for(var i = 0; i < 3; ++i)
    {
        for(var j = 0; j < 3; ++j)
        {
            if(grid[x_bloc+i][y_bloc+j] == v){
                return true;
            }
        }
    }
    return false;

}

function isValid(position)
{
    if(position == 9*9){
        return true;
    }
    var i = Math.floor(position/9);
    var j = position%9;
    if(grid[i][j] != 0)
    {
        return isValid(position+1);
    }
    for(var k = 1; k <= 9; ++k)
    {
        if(!isPresentLine(k,i) && !isPresentCol(k,j) && !isPresentBloc(k,i,j))
        {
            grid[i][j] = k;
            if(isValid(position+1)) {
                return true;
            }
        }
    }
    grid[i][j] = 0;
    return false;
}

