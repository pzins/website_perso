function calc() 
{ 

	var ope1 = document.getElementById("ope1").value;
	var ope2 = document.getElementById("ope2").value;
	var o = document.getElementById("op").value;
	
	var res;
	var a = parseFloat(ope1);
	var b = parseFloat(ope2);
	if(isNaN(a) || isNaN(b))
	{
		alert('OPERANDE(S) NON VALIDE(S)');
		return;
	} 
	
	if (o == '+') res = a + b;
	else if (o == '-') res =a - b;
	else if (o == '*') res = a*b;
	else if (o == '/')
	{
		if (b == 0)
		{
		 alert("DIVISION PAR ZERO!!!");
		 return 0;
		}
		else res = parseFloat(a/b);
	}
	else 
	{
		alert("OPERATEUR NON VALIDE");
		return 0;
	}

	var a = document.getElementById("resultat");
	//alert("resultat =  " + res.toFixed(2));
	a.innerHTML = "resultat =  " + res.toFixed(2);
} 