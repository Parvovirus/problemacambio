//FUNCION Mete array bidimensional Key y valor (PAGO COMO LA CAJA)
const contarDinero = (...valores) => {
    let dinero = [["500", "200", "100", "50", "20", "10", "5", "2", "1",
        "0.50", "0.20", "0.10", "0.05", "0.02", "0.01"], valores];
    return dinero;
}


// let cajo = contarDinero(0, 0, 0, 1, 4, 8, 2, 5, 4, 0, 0, 1, 2, 3, 1);
// // ["500", 0],[200,0],[],[]
// console.log(cajo[1]);
// let paga = contarDinero(0, 0, 0, 0, 2, 1, 0, 0, 1, 2, 6, 0, 0, 1, 0);
// cajao= calcularTotal(caja);
// paga = calcularTotal(pago);

var cajita;
var paguita;
var caja;
var pago;

function iniciarCaja() {
    var cajita = [];
    var selInput = document.querySelectorAll(".cajaInput");
    for (i = 0; i < selInput.length; i++) {
        //Buscar si tiene string vacio
        var nulo = document.querySelectorAll(".cajaInput")[i].value == '';
        // ponerle 0 si es así
        if (nulo) {
            cajita.push(0);
            // sino poner la vaina de abajo y sumar y tal
        } else {
            cajita.push(parseInt(document.querySelectorAll(".cajaInput")[i].value));
        }
    }
    caja = contarDinero(cajita);
    caja = calcularTotal(caja);
    console.log(caja);
    // La suma del total de lo que hay en la caja
    var contTotal = document.createElement("p");
    var texTotal = document.createTextNode(`Total de la caja: ${caja[1][0][15]}`);
    contTotal.appendChild(texTotal);
    document.body.appendChild(contTotal);

    return caja;
}

function pagar() {
    var paguita = [];
    var selInput = document.querySelectorAll(".pagoInput");
    for (i = 0; i < selInput.length; i++) {
        //Buscar si tiene string vacio
        var nulo = document.querySelectorAll(".pagoInput")[i].value == '';
        // ponerle 0 si es así
        if (nulo) {
            paguita.push(0);
            // sino poner la vaina de abajo y sumar y tal
        } else {
            paguita.push(parseInt(document.querySelectorAll(".pagoInput")[i].value));
        }
    }
    pago = contarDinero(paguita); // pago = ([],paguita)

    pago = calcularTotal(pago);  // pago = ([],paguita, total)

    let precio = 73;
    //Es la devolción, el array del ticket
    let cambio = [[], []];

    //La diferencia de lo que paga la persona con el precio del producto.
    //Devolver = NumeroTotal.  pago[1][pago[1].length - 1] --> Total en numero del pago.
    let devolver = pago[1][0][pago[1][0].length - 1] - precio;

    devolver = Math.round(devolver * 100) / 100;


    if (devolver > caja[1][0][caja[1][0].length - 1]) {

        // para meter en el body el ticket
        var contCambio = document.createElement("p");
        var texCambio = document.createTextNode('No disponemos de cambio para tu compra, gracias y hasta luego');
        contCambio.appendChild(texCambio);
        document.body.appendChild(contCambio);

    } else {
        //Para cuando no tenemos que devolver nada. Pago es justo.
        if (devolver == 0) {
            console.log("Ya está, has pagado justo");

        } else {
            //Para cuando devolvamos todo lo que tenemos en la caja.
            if (devolver == caja[1][0][caja[1][0].length - 1]) {
                cambio[0] = caja[0].slice();
                cambio[1] = caja[1].slice();
                mostrarCambio(cambio);
                caja = vaciarCaja(caja);
                caja[0] = pago[0].slice();
                caja[1] = pago[1].slice();

            } else {
                let posicion = (primerElemento(devolver, caja));
                cambio = [["500", "200", "100", "50", "20", "10", "5", "2", "1",
                    "0.50", "0.20", "0.10", "0.05", "0.02", "0.01"], []];
                inicializarCambio(cambio, cambio[0].length);
                //console.log(cambio);

                for (let i = posicion; i < caja[1][0].length - 1; i++) {
                    [devolver, caja, cambio] = recopilarCambio(devolver, caja, cambio, i);
                }
                console.log(cambio);

                if (devolver > 0) {

                    console.log(pago[1][0][5]);
                    // Sumamos a la caja el pago del cliente.
                    for (i = 0; i < caja[0].length - 1; i++) {
                        caja[1][0][i] = (caja[1][0][i]) + (pago[1][0][i]);
                    }
                    let posicion = (primerElemento(devolver, caja));
                    cambio = [["500", "200", "100", "50", "20", "10", "5", "2", "1",
                        "0.50", "0.20", "0.10", "0.05", "0.02", "0.01"], []];
                    inicializarCambio(cambio, cambio[0].length);

                    for (let i = posicion; i < caja[1][0].length - 1; i++) {
                        [devolver, caja, cambio] = recopilarCambio(devolver, caja, cambio, i);
                    }

                    if (devolver == 0) {
                        console.log(caja);
                        mostrarCambio(cambio);

                    } else {
                        console.log(caja);
                        console.log(cambio);

                        for (i = 0; i < caja[0].length - 1; i++) {
                            caja[1][0][i] = (caja[1][0][i]) - (cambio[1][i]);
                        }
                        console.log(caja);
                      
                        console.log("no hay cambio suficiente pero si tenemos dinero en la caja");
                    }


                    //Restablecer el dniero de nuevo a la caja
                } else {
                    mostrarCambio(cambio);

                }

            }
        }
    }


}

//FUNCION PARA PONER LOS VALORES DEL CAMBIO A CERO.
function inicializarCambio(cambio, posicion) {
    for (let i = 0; i < posicion; i++) {
        cambio[1][i] = 0;
    }
    return cambio;
}

//LA BUSQUEDA DE ENCONTRAR LA PRIMERA POSICION A PAGAR.
function recopilarCambio(devolver, caja, cambio, posicion) {
    //60 ej-> posicion 4->    caja[0][posicion] ->  "0" .
    if (devolver >= caja[0][posicion]) {
        var parteEntera = Math.floor(devolver / Number(caja[0][posicion]));

        if (parteEntera <= caja[1][0][posicion]) {
            caja[1][0][posicion] = caja[1][0][posicion] - parteEntera;
            cambio[1][posicion] = (parteEntera);
            devolver = devolver - Number(parteEntera * caja[0][posicion]);

        } else {
            if (caja[1][0][posicion] > 0) {
                cambio[1][posicion] = (caja[1][0][posicion]);
                devolver = devolver - Number(caja[0][posicion]) * caja[1][0][posicion];
                caja[1][0][posicion] = 0;
            }

        }
    }
    devolver = Math.round(devolver * 100) / 100

    return [devolver, caja, cambio];
}
// FUNCION QUE MUESTRA EL CAMBIO EN ALERT (CMABIARLO A DOM)
function mostrarCambio(dinero) {
    console.log(dinero);
    var contDiv = document.createElement("div");
    contDiv.setAttribute("id", "devo");
    document.body.appendChild(contDiv);

    var contDevo = document.getElementById("devo");

    var contCambio = document.createElement("p");
    var texCambio = document.createTextNode("Devolución: ");
    contCambio.appendChild(texCambio);
    contDevo.appendChild(contCambio);
    dinero = calcularTotalCambio(dinero);
    // console.log(dinero);

    // [Array(15), 50]
    for (let i = 0; i < dinero[0].length; i++) {
        // para mostrar el cambio
        var contCambio = document.createElement("p");
        var texCambio = document.createTextNode(`${dinero[0][i]} de ${dinero[1][i]},`);
        contCambio.appendChild(texCambio);
        contDevo.appendChild(contCambio);
    }


    //  alert(cadenaCambio)

}
// console.log(caja);

//FUNCION QUE CUENTA LO PAGADO Y LO DE LA CAJA

const calcularTotal = function (cash) {
    const keys = cash[0];
    const values = cash[1][0];
    let total = 0;
    for (let i = 0; i < keys.length; i++) {
        total += (Number(keys[i]) * values[i]);
        // console.log(total);
    }
    cash[0].push("total");
    cash[1][0].push(Math.round(total * 100) / 100);

    return cash;

}
const calcularTotalCambio = function (cash) {
    const keys = cash[0];
    const values = cash[1];
    let total = 0;
    for (let i = 0; i < keys.length; i++) {
        total += (Number(keys[i]) * values[i]);
    }
    console.log(total);
    cash[0].push("total");
    cash[1].push(Math.round(total * 100) / 100);
    console.log(cash);
    return cash;

}


//FUNCION PARA CUANDO HAY QUE DEVOLVER JUSTO TODO LO QUE TIENE LA CAJA
function vaciarCaja(caja) {
    const keys = caja[0];
    const values = caja[1][0];
    for (let i = 0; i < values.length; i++) {
        caja[keys[i]];
        values[i] = 0;
    }
    return caja;
}

//FUNCION BUSCA LA POSICION A EMPEZAR A PAGAR
function primerElemento(parteEntera, dinero) {
    // const values = dinero[1];
    const keys = dinero[0];
    // console.log(parteEntera);
    let i = 0;
    let encontrado = false;
    while (i < keys.length && !encontrado) {
        if (keys[i] <= parteEntera) {
            encontrado = true;
        }
        i++;
    }
    return i - 1;
}

// TE FALTA DINERO
// NO HAY CAMBIO


