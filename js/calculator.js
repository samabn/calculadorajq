let fecha = new Date(), saludo = $('#saludo'), display = $("#display"), operandos = $("#operandos"), resultado = $("#resultado"), operador = "", inverso = $("#inverso"), 
cuadrado = $("#cuadrado"), xy = $("#xy"), int = $("#int"), raiz = $("#raiz"), posneg = $("#pos-neg"), dosn = $("#2n"), reset = $("#reset"), fact = $("#fact"), csvm =$("#csvm"),
csvs = $("#csvs"), coma = $("#coma"), siete = $("#7"), 	ocho = $("#8"), nueve = $("#9"), prod = $("#prod"), cuatro = $("#4"), cinco = $("#5"), seis = $("#6"), divi = $("#divi"),
uno = $("#1"), dos = $("#2"), tres = $("#3"), mas = $("#mas"), cero = $("#0"), punto = $("#punto"), igual = $("#btnigual"), menos = $("#menos")

if (fecha.getHours() < 12) {
    showMsj("Buenos días");
} else if (fecha.getHours() >= 12){
    showMsj("Buenas tardes");
} else if (fecha.getHours() >= 19) {
    showMsj("Buenas noches");
}

/* ESTE BUCLE ES PARA AGREGAR EL EVENTO CLICK A LOS BOTONES 0 - 9 */
for (let i = 0; i < 10; i++) {
    $("#" + i).on("click", () => {
        if (operandos.html() === "0") {
            operandos.html("");
        }
        operandos.html(operandos.html() + i);
    });  
}
 /** INVERSO **/
inverso.on("click", () => {
    res = 1 / operandos.html();
    operandos.html("1 / " + operandos.html() + " = ")
    addClass();
    resultado.html(res.toFixed(3));
});

/** CUADRADO **/
cuadrado.on("click", () => {
    let numero = operandos.html()
    operandos.append("<sup class='sup'>2</sup>")
    operandos.append("<span class='igual'>=</span>")
    resultado.html(+numero * +numero)
    addClass();
})

/** POTENCIA **/
document.getElementById("potencia").addEventListener("click", () => {
    operador = "^";
    operandos.html(operandos.html() + " ^ ");    
})

/** ENTERO **/
int.on("click", () => {
    let numero = 0;
    numero = +operandos.html();
    if (numero < 0) {     
        operandos.html(-Math.ceil(-(numero)));
    } else {
        operandos.html(Math.floor(numero));
    }
});

/** RAIZ **/
document.getElementById("raiz").addEventListener("click", () => {
    if (operandos.html() === "0") {
        operandos.html("&radic; ")
        operador = "R";
    } else {
        let numero = +operandos.html();
        addClass();
        operandos.html("&radic;" + operandos.html() + " = ")
        resultado.html(raiz(numero))
    }
});

/** POSITIVO NEGATIVO **/
posneg.on("click", () => {
    console.log("posneg");
    
    let numero = +operandos.html()
    if (operandos.html() === "0") {
        operandos.html("-")
    } else {
        if(+operandos.html() === numero) {
            operandos.html(-+operandos.html());
        }
    }
});

/** PORCENTAJE **/
document.getElementById("percent").addEventListener("click", () => {
    if (operandos.html() !== "0") {
        operador = "%";
        operandos.html( operandos.html() + " % ")
    }
});

/** LIMPIAR **/
clear.on("click", () => {
    operandos.removeClass("move-operandos")
    operandos.html("0")
    resultado.html("")
});

/** MULTIPLICACIÓN **/
document.getElementById("signo-multiplicacion").addEventListener("click", () => {
    operador = "*"
    operandos.innerHTML += " * ";
});

/** DIVISIÓN **/
document.getElementById("signo-division").addEventListener("click", () => {
    operador = "/"
    operandos.innerHTML += " / ";
});

/** SIGNO MAS **/
document.getElementById("signo-mas").addEventListener("click", () => {
    operador = "+";
    operandos.innerHTML += " + ";
});

/** SIGNO MENOS **/
document.getElementById("signo-menos").addEventListener("click", () => {
    operador = "-";
    operandos.innerHTML += " - ";
});

/** PUNTO **/
document.getElementById("dot").addEventListener("click", () => {
    if (operandos.html() === "0") {
        operandos.html("")
    }
    operandos.html(operandos.html() + ".")
});

/** IGUAL **/
document.getElementById("igual").addEventListener("click", () => {
    operacionAritmetica();
    operandos.innerHTML += "=";
    addClass();
});

function showMsj(msj) {
    saludo.innerHTML = msj;    
}

function addClass() {
    //operandos.classList.toggle("move-operandos");//AGREGA LA CLASE move-operandos SIN ELIMINAR LAS QUE YA TIENE
    operandos.addClass("move-operandos")
}

function operacionAritmetica() {
    let res;
    cadena = operandos.html().split("" + operador + "");
    switch(operador) {
		case "*":
			res = 1;
			for(i = 0; i < cadena.length; i++) {
				res = res * +cadena[i];
			}
		break;
		case "/":
			res = +cadena[0] / +cadena[1];
		break;
		case "+" :
			res = 0;
			for(i = 0; i < cadena.length; i++) {
				res += +cadena[i];
			}
		break;
		case "-" :
            res = +cadena[0];         
			for(i = 1; i < cadena.length; i++) {
                res -= +cadena[i];                
			}
		break;
		case "^":
            res = Math.pow(+cadena[0], +cadena[1]);
		break;
		case "%" :
			res = +cadena[0];
            res = (res / 100) * +cadena[1];
        break;
        case "R" :
            cadena = operandos.html().split(" ");            
            res = raizCuadrada(+cadena[1]);
        break;
    }
    if (res.toString().length > 14) {
        resultado.addClass("font-small")
    }
    resultado.html(res)
}

function raizCuadrada(num) {
    if (num < 0) {
        return "Error";
    } else {
        return Math.sqrt(+num);
    }
}