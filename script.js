//FUNCION Mete array bidimensional Key y valor (PAGO COMO LA CAJA)
const contarDinero = (...valores) => {
    let dinero = [["500", "200", "100", "50", "20", "10", "5", "2", "1",
        "0.50", "0.20", "0.10", "0.05", "0.02", "0.01"], valores];
    return dinero;
}


// let caja = contarDinero(0, 0, 0, 1, 4, 8, 2, 5, 4, 0, 0, 1, 2, 3, 1);
// // ["500", 0],[200,0],[],[]
// console.log(caja);
// let pago = contarDinero(0, 0, 0, 0, 2, 1, 0, 0, 1, 2, 6, 0, 0, 1, 0);
// caja = calcularTotal(caja);
// pago = calcularTotal(pago);

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

    calcularTotal(caja);
    console.log(caja);
    // La suma del total de lo que hay en la caja
    var contTotal = document.createElement("p");
    var texTotal = document.createTextNode(`Total de la caja: ${caja[1][1]}`);
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
    // console.log(pago);
    pago = (calcularTotal(pago));  // pago = ([],paguita, total)
    // console.log(pago);
    let precio = 50;
    //Es la devolción, el array del ticket
    let cambio = [[], []];

    //La diferencia de lo que paga la persona con el precio del producto.
    //Devolver = NumeroTotal.  pago[1][pago[1].length - 1] --> Total en numero del pago.
    let devolver = pago[1][pago[1].length - 1] - precio;
    devolver = Math.round(devolver * 100) / 100
    if (devolver > caja[1][caja[1].length - 1]) {
         
        // para meter en el body el ticket
        var contCambio = document.createElement("p");
        var texCambio = document.createTextNode('No disponemos de cambio para tu compra, gracias y hasta luego');
        contCambio.appendChild(texCambio);
        document.body.appendChild(contCambio);

    } else {
        if (devolver == caja[1][caja[1].length - 1]) {

            cambio[0] = caja[0].slice();
            cambio[1] = caja[1].slice();
            caja = vaciarCaja(caja);
            mostrarCambio(cambio);
        } else {
            let posicion = (primerElemento(devolver, caja));
            cambio = [["500", "200", "100", "50", "20", "10", "5", "2", "1",
                "0.50", "0.20", "0.10", "0.05", "0.02", "0.01"], []];
            inicializarCambio(cambio, cambio[0].length);
            // function recopilarCambio(devolver, caja, cambio, posicion) {
            for (let i = posicion; i < caja[1].length - 1; i++) {
                [devolver, caja, cambio] = recopilarCambio(devolver, caja, cambio, i);
            }
            //mostrarCambio(cambio);
            // console.log(devolver);
            // console.log(caja);
            // console.log(cambio);
        }
    }


}


// //FUNCION QUE CUENTA LO PAGADO Y LO DE LA CAJA

const calcularTotal = function (cash) {
    const keys = cash[0];
    const values = cash[1][0];
    let total = 0;
    for (let i = 0; i < keys.length; i++) {
        total += (Number(keys[i]) * values[i]);
        // console.log(total);
    }
    cash[0].push("total");
    cash[1].push(Math.round(total * 100) / 100);

    return cash;

}




//FUNCION PARA CUANDO HAY QUE DEVOLVER JUSTO TODO LO QUE TIENE LA CAJA
function vaciarCaja(caja) {
    const values = caja[1];
    for (let i = 0; i < values.length; i++) {
        values[i] = 0;
        // console.log(caja[keys[i]]);
    }
    return caja;
}

// FUNCION QUE MUESTRA EL CAMBIO EN ALERT (CMABIARLO A DOM)
function mostrarCambio(dinero) {
    var contDiv = document.createElement("div");
    contDiv.setAttribute("id","devo");
    document.body.appendChild(contDiv);

    var contDevo = document.getElementById("devo");

    var contCambio = document.createElement("p");
    var texCambio = document.createTextNode( "Devolución: ");
    contCambio.appendChild(texCambio);
    contDevo.appendChild(contCambio);
    
    const keys = dinero[0];
    const values = dinero[1][0];
    // [Array(15), 50]
    for (let i = 0; i < keys.length; i++) {
        ;
        // para mostrar el cambio
        var contCambio = document.createElement("p");
        var texCambio = document.createTextNode( `${keys[i]} de ${values[i]},`);
        contCambio.appendChild(texCambio);
        contDevo.appendChild(contCambio);
    }
    // alert(cadenaCambio)
       
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

//FUNCION PARA PONER LOS VALORES DEL CAMBIO A CERO.
function inicializarCambio(cambio, posicion) {
    for (let i = 0; i < posicion; i++) {
        cambio[1][i] = 0;
    }
    return cambio;
}

//LA BUSQUEDA DE ENCONTRAR LA PRIMERA POSICION A PAGAR.
function recopilarCambio(devolver, caja, cambio, posicion) {
    //ej-> posicion 3->    caja[0][posicion] ->  50 .
    if (devolver >= caja[0][posicion]) {
        var parte1 = Math.floor(devolver / Number(caja[0][posicion]));

        if (parte1 <= caja[1][posicion]) {
            caja[1][posicion] = caja[1][posicion] - parte1;
            cambio[1][posicion] = (parte1);
            devolver = devolver - Number(parte1 * caja[0][posicion]);
            console.log(caja[0][posicion]);
        } else {
            if (caja[1][posicion] > 0) {
                cambio[1][posicion] = (caja[1][posicion]);
                devolver = devolver - Number(caja[0][posicion]) * caja[1][posicion];
                caja[1][posicion] = 0;
            }

        }
    }
    devolver = Math.round(devolver * 100) / 100
    // console.log("devolver: ", devolver);
    return [devolver, caja, cambio];
}
// console.log(caja);




// TE FALTA DINERO
// NO HAY CAMBIO

