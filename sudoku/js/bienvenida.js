
// VALIDAR FORMULARIO

function validarFormulario(){
	var txtContrasena=document.getElementById('txtContrasena');
		txtConfirmarContrasena=document.getElementById('txtConfirmarContrasena');
		resultado=validarContrasena(txtContrasena.value,txtConfirmarContrasena.value);

		return resultado;
}

function validarContrasena(pContrasena, pConfirmar){
	var lblError=document.getElementById('lblError');
		  resultadoValidarContrasena=true;
	//1 mayúscula 1 caracter especial, 1 número y no pueden haber letras repetidas
	//var expRegularContrasena= new RegExp('^[a-zA-Z0-9]*$');
	var expRegularContrasena= new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
	//var expRegularContrasena = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$');
	
		if(expRegularContrasena.test(pContrasena) === false ||  pConfirmar === " "){			
			lblError.innerHTML='Las contrase&ntilde;as debe cumplir con: 1 mayuscula 1 caracter especial, 1 numero y no pueden haber letras repetidas';
			resultadoValidarContrasena=false;					
		}else{
			if(pContrasena !== pConfirmar){				
					lblError.innerHTML = 'Las contrase&ntilde;as no coinciden';
					lblError.className = 'labelError';
					txtContrasena.className = 'txtError';							
					resultadoValidarContrasena=false;				
			}
		}
		
		return resultadoValidarContrasena;
}

