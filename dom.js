var contPrincipal = document.createElement("div");
contPrincipal.setAttribute("class", "principal");


///////////////////////////////////////////////////////////////
var contParraf = document.createElement("p");
var textparraf = document.createTextNode("Introduzca el estado inicial de la caja");
contParraf.appendChild(textparraf);


var nombreVisa = ["500", "200", "100", "50", "20", "10", "5", "2", "1",
"0.50", "0.20", "0.10", "0.05", "0.02", "0.01"];

var contPago = document.createElement("div");
contPago.setAttribute("id", "caja");
contPago.appendChild(textparraf);

for (i = 0; i < nombreVisa.length; i++) {
    var input1 = document.createElement("input");
    input1.setAttribute("class", "cajaInput");
    input1.setAttribute("placeholder", nombreVisa[i]);
    contPago.appendChild(input1);
}
contPrincipal.appendChild(contPago);

document.body.appendChild(contPrincipal);

// boton de enviar los dineros
var botonenviar = document.createElement("input");
botonenviar.setAttribute("type", "button");
botonenviar.setAttribute("value", "Iniciar Caja");
botonenviar.setAttribute("id", "botonenviar");
botonenviar.setAttribute("onclick", "iniciarCaja()");
contPago.appendChild(botonenviar);



/////////// parrafo 1 del DOM   /////////////
var contParraf = document.createElement("p");
var textparraf = document.createTextNode("Introduzca su forma de pago");
contParraf.appendChild(textparraf);


var nombreVisa = ["500", "200", "100", "50", "20", "10", "5", "2", "1",
"0.50", "0.20", "0.10", "0.05", "0.02", "0.01"];



var contPago = document.createElement("div");
contPago.setAttribute("id", "cliente");
contPago.appendChild(textparraf);

for (i = 0; i < nombreVisa.length; i++) {
    var input1 = document.createElement("input");
    input1.setAttribute("class", "pagoInput");
    input1.setAttribute("placeholder", nombreVisa[i]);
    contPago.appendChild(input1);
}
contPrincipal.appendChild(contPago);

document.body.appendChild(contPrincipal);

// boton de enviar los dineros
var botonenviar = document.createElement("input");
botonenviar.setAttribute("type", "button");
botonenviar.setAttribute("value", "Pagar");
botonenviar.setAttribute("id", "botonenviar");
botonenviar.setAttribute("onclick", "pagar()");
contPago.appendChild(botonenviar);