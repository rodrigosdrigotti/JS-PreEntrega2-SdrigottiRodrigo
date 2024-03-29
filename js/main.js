let usuario = new Object();

let contador = 0;
let saldo = 50000;
let retiro = 0;
let deposito = 0;
let busquedaFecha;
let busquedaDescripion;

function limpiezaTicket(){
    document.getElementById("resultado").innerHTML = " ";
    document.getElementById("resultado2").innerHTML = " ";
    document.getElementById("listaMovimientos").innerHTML = `<li></li>`;  
}

function mostrarMovimientos(movimientos) {
    movimientos.forEach(movimiento  => {
        document.getElementById("listaMovimientos").innerHTML += `<li> ${Object.values(movimiento)} </li>`;  
    });
}

function noResultados(){
    document.getElementById("resultado").innerHTML = "SIN RESULTADOS";
    document.getElementById("resultado2").innerHTML = " ";
}

function filtrarFecha(movimiento){
   if(movimiento.fecha.includes(busquedaFecha)){
    return movimiento;
   } 
}

function filtrarDescripcion(movimiento){
    if(movimiento?.descripcion?.includes(busquedaDescripion)){
        return movimiento;
    } 
 }

function filtarMovimientosFecha(){
    let resul = movimientos.filter(filtrarFecha);
    if(resul.length){
        mostrarMovimientos(resul);
    }else{
        noResultados();
    }
}

function filtarMovimientosDescripcion(){
    let resul = movimientos.filter(filtrarDescripcion);
    if(resul.length){
        mostrarMovimientos(resul);
    }else{
        noResultados();
    }
}

function elegirOpcion() {
    let opcion = Number(prompt("Bienvenido al Sistema!!! \u270B \n \n"
        + "Opciones \u2705 \n \n" + "1. Consulta de Saldo \n"
        + "2. Retiro \n" + "3. Deposito \n"
        + "4. Ver todos los movimientos \n" + "5. Ver movimientos por Fecha \n" 
        + "6. Ver movimientos por Descripcion \n" 
        + "7. Salir \n"));
    switch (opcion) {
        case 1:
            document.getElementById("resultado").innerHTML = "Tu Saldo es: "+saldo;
            movimientos.push({fecha:diaHoy, operacion:" Consulta de saldo = " + saldo, saldo: " Saldo = " + saldo});
            break;
        case 2:
            retiro=Number(prompt("Cuanto vas a retirar"));
            if(retiro <= saldo && retiro != 0) {
                saldo -= retiro;
                document.getElementById("resultado").innerHTML = "Retiraste: "+retiro;
                document.getElementById("resultado2").innerHTML = "Tu Saldo actual es: "+saldo;
                movimientos.push({fecha:diaHoy, operacion:" Retiro = " + retiro, saldo: " Saldo = " + saldo});
            } else {
                alert("Fondos insuficientes ó no es valido");
            }
            break;
        case 3:
            deposito = Number(prompt("¿Cuanto depositas?"));
            saldo += deposito;
            document.getElementById("resultado").innerHTML = "Depositaste: "+deposito;
            document.getElementById("resultado2").innerHTML = "Tu Saldo actual es: "+saldo;
            movimientos.push({fecha:diaHoy, operacion:" Deposito = " + deposito, saldo: " Saldo = " + saldo});
            break;
        case 4:
            for (const values of movimientos) {
                document.getElementById("resultado").innerHTML = " ";
                document.getElementById("resultado2").innerHTML = " ";
                document.getElementById("listaMovimientos").innerHTML += `<li> ${Object.values(values)} </li>`;  
            }
            setTimeout(limpiezaTicket, 3500);
            break;
        case 5:
            busquedaFecha = prompt("BUSQUEDA POR FECHA: \n"
                            +"------------------------- \n"
                            +"Ingrese fecha a buscar (dd/mm) \n");

            filtarMovimientosFecha();
            setTimeout(limpiezaTicket, 3500);
            break;
        case 6:
            busquedaDescripion = prompt("BUSQUEDA POR DESCRIPCION: \n"
                                +"------------------------- \n"
                                +"Ingrese descripcion a buscar (retiro/deposito/consulta) \n").toUpperCase();
            
            filtarMovimientosDescripcion();
            setTimeout(limpiezaTicket, 3500);
            break;
        case 7:
            window.location.href = "pages/salir.html";
            break;
    }
}

function entrarAlCajero(nombreUsuario,clave) {
    while (usuario.nombreUsuario != usuario.nombreUsuarioLog) {
        usuario.nombreUsuarioLog = prompt("LOGIN: \n"
                            +"------------------------- \n"
                            +"Ingrese Nombre de Usuario \n");
        usuario.claveLog = Number(prompt("LOGIN: \n"
                                +"------------------------- \n"
                                +"Ingrese Clave \n"));
        contador+=1;
        if(contador == 3) {
            break;
        }
        if(contador == 2 && usuario.nombreUsuario != usuario.nombreUsuarioLog) {
            alert("Cuidado solo te resta una oportunidad");
        }
        if(contador == 1 && usuario.nombreUsuario != usuario.nombreUsuarioLog) {
            alert("Datos Incorrectos. Intente nuevamente");
        }
    } 
    if (usuario.nombreUsuario == usuario.nombreUsuarioLog) {
        document.getElementById("usuario").innerHTML = "BIENVENIDO: "+ usuario.nombreUsuario +".";
        console.log(usuario)
    } else {
        alert("Tarjeta retenida, comunicate con el Banco");
    }
}

function validarClave(clave,verifClave) {
    if(clave && verifClave){
        if(clave === verifClave){
            entrarAlCajero(usuario.nombreUsuario,usuario.clave);
        } else{
            alert ("Claves no coinciden");
            setTimeout(() => {
                document.location.reload();
              }, 100);
        }
    } else {
        alert ("Complete la clave para continuar");
        setTimeout(() => {
            document.location.reload();
          }, 100);
    }   
}

function ingresarClave(nombreUsuario) {
    if(nombreUsuario) {
        usuario.clave = Number(prompt("REGISTRO: \n"
                            +"------------------------- \n"
                            +"Ingrese una Clave \n"));
        usuario.verifClave = Number(prompt("REGISTRO: \n"
                            +"------------------------- \n"
                            +"Repita la Clave \n"));
        validarClave(usuario.clave,usuario.verifClave);    
    } else {
        alert ("Complete el Nombre para continuar");
        setTimeout(() => {
            document.location.reload();
          }, 100);
    } 
}

function registroUsuarioCajero() {
    usuario.nombreUsuario = prompt("REGISTRO: \n"
                        +"------------------------- \n"
                        +"Ingrese Nombre de Usuario \n");
    ingresarClave(usuario.nombreUsuario);
}

registroUsuarioCajero();





