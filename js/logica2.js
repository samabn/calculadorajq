/*			DECLARACION DE VARIABLES		*/

	var display = $("#display"), inverso = $("#inverso"), cuadrado = $("#cuadrado"), xy = $("#xy"), int = $("#int"),
	raiz = $("#raiz"), posneg = $("#posneg"), dosn = $("#2n"), reset = $("#reset"), fact = $("#fact"), csvm =$("#csvm"),
	csvs = $("#csvs"), coma = $("#coma"), siete = $("#7"), 	ocho = $("#8"), nueve = $("#9"), prod = $("#prod"), 
	cuatro = $("#4"), cinco = $("#5"), seis = $("#6"), divi = $("#divi"), uno = $("#1"), dos = $("#2"), tres = $("#3"), 
	mas = $("#mas"), cero = $("#0"), punto = $("#punto"), igual = $("#btnigual"), menos = $("#menos"), dec = false, opc,
	del = "";

/*			FIN DECLARACION VARIABLES			*/

/*			DECLARACION FUNCIONES ANONIMAS			*/

display.on('click', function() {
	this.value = "";
	this.placeholder = "0";
	
});

inverso.on("click", function() {
	res = 1 / display.val();
	display.val("1 /" + display.val() + "=" + res);
});

cuadrado.on("click", function() {
	res = +display.val() * +display.val();
	display.val(display.val() + "^2 =" + res);
});

xy.on("click", function() {
	if (display.val() != "") {
		opc = "^";
		display.val(display.val() + "^");
	}
});

int.on("click", function() {
	if ((display.val() != "") || (+display.val() > 0)) {
		display.val(Math.floor(+display.val()));
	}
});

raiz.on("click", function() {
	if (display.val() != "") {
		display.val(Math.sqrt(+display.val()));
	}
});

posneg.on("click", function() {
	d = +display.val();
	if (d === +display.val()) {
		display.val(-d);
	} else {
		display.val(d);
	}
});

dosn.on("click", function() {
	if ((display.val() != "") && (display.val() > 0) ) {
		display.val("2^" + display.val() + "=" + Math.pow(2, display.val()));
	}
});

reset.on("click", function() {
	display.val("");
	display.placeholder = "0";
	dec = false;
	opc = "";
});

fact.on("click", function() {
	if ((display.val() != "") && (display.val() > 0)) {
		s = 1;
		for(i = 1; i < display.val(); i++) {
			s += s * i;
		}
		display.val(i + "!" + "=" + s);// + "+" + d);
	}
});

csvm.on("click", function() {
	if (opc == ",") {
		producto();
	}
});

csvs.on("click", function() {
	if (opc === ",") {
		suma();
	}
});

coma.on("click", function() {
	if (display.val() != "") {
		opc = ",";
		display.val(display.val() + ",");
	}
});

/*			BOTONES CON NUMEROS			*/

siete.on("click", function () {
	display.val(display.val() + 7);
});

ocho.on("click", function() {
	display.val(display.val() + 8);
});

nueve.on("click", function() {
	display.val(display.val() + 9);
});

cuatro.on("click", function() {
	display.val(display.val() + 4);
});

cinco.on("click", function() {
	display.val(display.val() + 5);
});

seis.on("click", function() {
	display.val(display.val() + 6);
});

uno.on("click", function() {
	display.val(display.val() + 1);
});

dos.on("click", function() {
	display.val(display.val() + 2);
});

tres.on("click", function() {
	display.val(display.val() + 3);
});

cero.on("click", function() {
	if (display.val() === "0") {
		display.val(0);	
	} else {
		display.val(display.val() + 0);
	}
});

/*			FIN BOTONES CON NUMEROS			*/

punto.on("click", function() {
	if ((display.val() === "") && (dec === false)) {
		dec = true;
		display.value(".");
	} else if(dec === false) {
		display.val(display.val() + ".");
		dec = true;
	}
});

prod.on("click", function() {
	opc = "*";
	display.val(display.val() + "*");
	dec = false;
});

divi.on("click", function() {
	opc = "/";
	display.val(display.val() + "/");
	dec = false;
});

mas.on("click", function () {
	opc = "+";
	display.val(display.val() + "+");
	dec = false;
});

menos.on("click", function() {
	opc = "-";
	display.val(display.val() + "-");
	dec = false;
});

igual.on("click", function() {
	switch(opc) {
		case "*":
			producto();
		break;
		case "/":
			arr = display.val().split("/");
			res = +arr[0] / arr[1];
			display.val(display.val() + "=" + res);
		break;
		case "+" :
			suma();
		break;
		case "-" :
			arr = display.val().split("-");
			res = +arr[0];
			for(i = 0; i < arr.length; i++) {
				if(i + 1 < arr.length) {
					res = res - arr[i + 1];
				}
			}
			display.val(display.val() + "=" + res);
		break;
		case "^":
			arr = display.val().split("^");
			display.val(display.val() + "=" + Math.pow(+arr[0], +arr[1]));
		break;
		case "%" :
			arr = display.val().split("%");
			res = arr[0];
			display.val(display.val() + "=" + +res / 100); 
		break;
	}
});

function suma() {
	if (opc === "+") {
		del = "+";
	} else if(opc === ",") {
		del = ","
	}
	arr = display.val().split(del);
	res = 0;
	for(i = 0; i < arr.length; i++) {
		res = res + +arr[i] ;
	}
	display.val(display.val() + "=" + res);
}

function producto() {
	var del = "";
	if (opc === "*") {
		del = "*";
	} else if(opc === ",") {
		del = ","
	}	
	arr = display.val().split(del);
	res = 1;
	for(i = 0; i < arr.length; i++) {
		res = res * +arr[i];				
	}
	display.val(display.val() + "=" + res);
}

/*			FIN DECLARACION FUNCIONES ANONIMAS			*/