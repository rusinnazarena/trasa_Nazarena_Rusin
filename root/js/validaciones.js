/*Proyecto realizado por Nazarena Florencia Rusin*/

//Valida que en el campo en el que se pide el nombre solo se puedan ingresar letras
function soloLetras(e){
    var key=e.keyCode || e.wich;
    var tecla=String.fromCharCode(key).toLocaleLowerCase();
    var letras ="áéíóúabcdefghijklmnñopqrstuvwxyz"
    var especiales=[8,37,39,46];
    var tecla_especial=false;

    for(var i in especiales){
        if(key==especiales[i]){
            tecla_especial=false;
            break;
        }
    }

    if(letras.indexOf(tecla)==-1 && !tecla_especial)
    return false;
}

//Valida que todos los parametros requeridos esten completos y que no se envie hasta que este como es requerido
$("#formulario").validate({
    rules: {
        name: {
            required: true,
        },

        email: {
            required: true,
            email:true,
        },

        subject: {
            required: true,
        },

        message: {
            required: true,

        }
    }
});

//Guarda lo que se ingreso en el formulario y muestras los pop-up

$("#guardar").click(function () {
    if ($("#formulario").valid() == false) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor vuelva a intentar'
          });
        return;
    }
    let name = $("#name").val();
    let email = $("#email").val();
    let subject = $("#subject").val();
    let message = $("#message").val();

    Swal.fire(
        'Enviado',
        'Nos comunicaremos a la brevedad',
        'success'
      );
});

