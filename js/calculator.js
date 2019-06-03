let fecha = new Date(), saludo = $('#saludo'), display = $("#display"), operandos = $("#operandos"), resultado = $("#resultado"), operador = "", inverso = $("#inverso"), 
cuadrado = $("#cuadrado"), potencia = $("#potencia"), int = $("#int"), raiz = $("#raiz"), posneg = $("#pos-neg"), percent = $("#percent"), clear = $("#clear"), toN = $("#toN"),
factorial = $("#factorial"), _csvProducto = $("#csv-producto"), _csvSuma = $("#csv-suma"), division = $("#signo-division"), producto = $("#signo-multiplicacion"),
_signoMas = $("#signo-mas"), dot = $("#dot"), coma = $("#coma"), _signoMenos = $("#signo-menos"), igual = $("#btnigual")

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
potencia.on("click", () => {
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
raiz.on("click", () => {
    if (operandos.html() === "0") {
        operandos.html("&radic; ")
        operador = "R";
    } else {
        let numero = +operandos.html();
        operandos.html("&radic;" + operandos.html() )
        pintaResultado(raizCuadrada(numero))
    }
});

/** POSITIVO NEGATIVO **/
posneg.on("click", () => {    
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
percent.on("click", () => {
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

/** POTENCIA 2 DE N **/
toN.on("click", () => {
    if (operandos.html() !== "0") {
        let numero = +operandos.html();
        operandos.append("<sup class='sup'>2</sup>")
        pintaResultado(Math.pow(2, numero))
        addClass();
    }
})

/** FACTORIAL **/
factorial.on("click", () => {
    if (operandos.html() !== "0") {
        let numero = +operandos.html()
        let facto = 1;
        for (let i = 0; i < numero; i++) {
            facto += facto * i;
        }
        operandos.html(operandos.html() + "!")
        pintaResultado(facto);
    }
})

/** PRODUCTO CSV **/
_csvProducto.on("click", () => {
    if (operandos.html() !== "0") {
        array = operandos.html().split(",")
        let acumulado = 1;
        for (let i = 0; i < array.length; i++) {
            acumulado *= +array[i];
        }
        /*addClass()
        operandos.html(operandos.html() + " = ")*/
        pintaResultado(acumulado)
    }
})

/** SUMA CSV **/
_csvSuma.on("click", () => {
    if (operandos.html() !== "0") {
        array = operandos.html().split(",")
        let acumulado = 0;
        for (let i = 0; i < array.length; i++) {
            acumulado += +array[i];
        }
        /*addClass()
        operandos.html(operandos.html() + " = ")*/
        pintaResultado(acumulado)
    }
})

/** DIVISIÓN **/
division.on("click", () => {
    operador = "/"
    operandos.html(operandos.html() + " / ")
});

/** MULTIPLICACIÓN **/
producto.on("click", () => {
    operador = "*"
    operandos.html(operandos.html()  + " * ");
});

/** SIGNO MAS **/
_signoMas.on("click", () => {
    operador = "+";
    operandos.html(operandos.html() + " + ")
});

/** PUNTO **/
document.getElementById("dot").addEventListener("click", () => {
    if (operandos.html() === "0") {
        operandos.html("")
    }
    operandos.html(operandos.html() + ".")
});

/** COMA **/
coma.on("click", () => {
    operandos.html(operandos.html() + ", ")
})

/** SIGNO MENOS **/
_signoMenos.on("click", () => {
    operador = "-";
    operandos.html(operandos.html() + " - ")
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

    pintaResultado(res);

}

function raizCuadrada(num) {
    if (num < 0) {
        return "Error";
    } else {
        return Math.sqrt(+num);
    }
}

function pintaResultado(res) {
    if (res.toString().length > 14) {
        resultado.addClass("font-small")
    }
    addClass();
    operandos.html(operandos.html() + " = ")
    resultado.html(res)
}