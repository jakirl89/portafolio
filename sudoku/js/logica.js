
/**********************************variables*************************************/

var mSolucionPrincipiante = [[9,1,8,6,4,5,2,7,3],[2,7,4,8,3,9,5,1,6],[3,6,5,7,2,1,9,4,8],[1,8,2,4,6,7,3,5,9],[4,3,9,5,1,8,6,2,7],[7,5,6,3,9,2,4,8,1],[6,2,1,9,8,4,7,3,5],[5,4,3,1,7,6,8,9,2],[8,9,7,2,5,3,1,6,4]],
	mSolucionIntermedio = [[6,5,8,3,7,2,1,4,9],[9,4,2,6,1,8,3,7,5],[1,3,7,9,4,5,8,2,6],[5,6,1,7,3,4,2,9,8],[4,2,9,5,8,6,7,1,3],[8,7,3,1,2,9,5,6,4],[3,8,4,2,9,7,6,5,1],[2,9,6,8,5,1,4,3,7],[7,1,5,4,6,3,9,8,2]],
	mSolucionAvanzado = [[2,9,3,6,8,5,4,7,1],[8,7,6,9,4,1,3,5,2],[4,5,1,3,7,2,9,6,8],[9,8,2,4,5,7,6,1,3],[3,6,7,1,2,9,5,8,4],[1,4,5,8,6,3,2,9,7],[7,2,4,5,9,8,1,3,6],[6,3,9,7,1,4,8,2,5],[5,1,8,2,3,6,7,4,9]],
	mUsuario=new Array(9),
	numeroDigitado=0,
	numeroDigitadoij=0,
	validarColumna,
	validarFila,
	nivelSeleccionado,
	listadoDePistas,
	bConfirmar=true;

/**********************************function*************************************/
function inicializarMatriz(pMatriz){
	for(var i=0; i<pMatriz.length; i++){//  i fila j columna
		pMatriz[i]=new Array(9);
	}	
}

function llenarMatriz(pnumeroDigitado, i, j, pMatriz){
	pMatriz[i][j]=pnumeroDigitado;
}

function imprimirMatriz(pMatriz){// generico para 3 niveles
	for(var i=0; i<pMatriz.length; i++){
		//document.write('<br/>');
		for(var j=0; j<pMatriz[i].length; j++){
			console.log(pMatriz[i][j]);// este en ves de imprimir lo meto en un div para que aparezca en pantalla
		}
	}
}

function validarFila(pMatriz, i, pnumeroDigitado){
	var resultado=true;
	for(var j=0; j<pMatriz[i].length; j++){
		if(pnumeroDigitado==pMatriz[i][j]){
			resultado=false; 
			break;
		}
	}
	return resultado;
}

function validarColumna(pMatriz, j, pnumeroDigitado){
	var resultado=true;
	for(var i=0; i<pMatriz[j].length; i++){
		if(pnumeroDigitado==pMatriz[i][j]){
			resultado=false; 
			break; // para que apenas encuentre que se repite un caso se salga y no tenga que recorrer tooodo 
		}
	}
	return resultado;
}

function getValue(pInput){
	lblError.innerHTML = '';
	
	numeroDigitado=Number(pInput.value);
	numeroDigitadoij=(pInput.id).split('-');
	divIniciales=((pInput.parentElement.id).substr(1)).split('-');
	
	resultadoValidarNumero=validarNumero(numeroDigitado);
	if(resultadoValidarNumero === true){
		
		resultadoValidarFila=validarFila(mUsuario, Number(numeroDigitadoij[0]), Number(numeroDigitado));
		resultadoValidarColumna=validarColumna(mUsuario, Number(numeroDigitadoij[1]), Number(numeroDigitado));
		resultadoValidarCuadrante=validarCuadrante(mUsuario, Number(divIniciales[0]), Number(divIniciales[1]), Number(numeroDigitado));
		
			if(resultadoValidarFila===true && resultadoValidarColumna==true && resultadoValidarCuadrante===true){
					llenarMatriz(numeroDigitado, Number(numeroDigitadoij[0]), Number(numeroDigitadoij[1]), mUsuario);
					informarGane(mUsuario);
				}else{
				pInput.className='inputError';			
				pInput.value='';
				lblError.innerHTML = 'Regla de Juego: No epetir numeros en la misma fila, columna o cuadrante de 3x3';
				//pInput.focus();			
				//pInput.className='quitarColorError';
					} 
	}else{
		lblError.innerHTML = 'Regla de Juego: Digitar un numero de 1-9';
		pInput.value='';
	}
}

function devolverColorInput(pInput){
	pInput.className='quitarColorError';			
}

function validarNumero(pNumero){
	var expRegularNumero= new RegExp('^[1-9]{1}$');
			resultado=true;
		if(expRegularNumero.test(pNumero) === false ||  expRegularNumero === " "){			
			resultado=false;
		}
	return resultado;
}

function obtenerDireccion(){
	
	var sUrl = window.location.search.substr(1);// para quitar el ?
		  sPropiedadYvalor = sUrl.split ("&");// para quitar los &	
		  
	for ( var i = 0; i < sPropiedadYvalor.length; i++) {
		var propiedadYvalorDivididos= sPropiedadYvalor[i].split("=");// propiedadYvalorDivididos queda en un arreglo de 0 y 1
			   if(propiedadYvalorDivididos[0] ===  'nivel' ){ // name='choice'
					nivelSeleccionado= propiedadYvalorDivididos[1];// 1 es el valor seleccionado
					break;
			   }
	}
}

function inicializarJuego(pnivelSeleccionado){

			inicializarMatriz(mUsuario);
			switch(nivelSeleccionado){
				case  'nivelBasico':
					pistas(45);	/*mandar parametro de NIVELLLLLLLL*/
					
				break;
				
				case  'nivelintermedio':
					pistas(31);	/*mandar parametro de NIVELLLLLLLL*/
					
				break;
				
				case  'nivelAvanzado':
					pistas(20);	/*mandar parametro de NIVELLLLLLLL*/
				break;
			}
}

function informarGane(pMatriz){
	var resultadoInformarGane= true;
	for(var i=0; i<pMatriz.length; i++){
		for(var j=0; j<pMatriz[i].length; j++){
			if(pMatriz[i][j] === ''      ||      pMatriz[i][j] === undefined ){
				resultadoInformarGane=false;
			}						
		}
	}
	if(resultadoInformarGane === true){
		lblError.innerHTML='Felicidades Ganaste!'		
	}
}

function pistas(pNumeroPistas){// luego tiene q decir cuantas pistas envia de acuerdo al nivel
	var guardarPocisioni=0; // arreglo con pocisiones i
		guardarPocisionj=0; // arreglo con pocisiones j
		id='';
	for(var i=0;i<pNumeroPistas; i++){
		guardarPocisioni=Math.floor(Math.random() * (8  + 1)) ;// inicio y final del rango
		guardarPocisionj=Math.floor(Math.random() * (8  + 1)) ;// inicio y final del rango
		
		switch(nivelSeleccionado){
			case  'nivelBasico':
				mUsuario[guardarPocisioni][guardarPocisionj]=mSolucionPrincipiante[guardarPocisioni][guardarPocisionj];// dETERMNAR SOLUCIAN
				id=guardarPocisioni+ '-' +guardarPocisionj;
				document.getElementById(id).value=mSolucionPrincipiante[guardarPocisioni][guardarPocisionj];
				document.getElementById(id).className='pintarPistas';
			break;
			
			case  'nivelintermedio':
				mUsuario[guardarPocisioni][guardarPocisionj]=mSolucionIntermedio[guardarPocisioni][guardarPocisionj];// dETERMNAR SOLUCIAN
				id=guardarPocisioni+ '-' +guardarPocisionj;
				document.getElementById(id).value=mSolucionIntermedio[guardarPocisioni][guardarPocisionj];
				document.getElementById(id).className='pintarPistas';
			break;
			
			case  'nivelAvanzado':
				mUsuario[guardarPocisioni][guardarPocisionj]=mSolucionAvanzado[guardarPocisioni][guardarPocisionj];// dETERMNAR SOLUCIAN
				id=guardarPocisioni+ '-' +guardarPocisionj;
				document.getElementById(id).value=mSolucionAvanzado[guardarPocisioni][guardarPocisionj];
				document.getElementById(id).className='pintarPistas';
			break;
		}
		
	}
	
}

function validarCuadrante(pmUsuario, divi, divj, numeroDigitado){
	var resultado=true;
	for(var i= divi; i<divi+3; i++){
		for(var j=divj; j<divj+3 ; j++){
			if(numeroDigitado === pmUsuario[i][j]){
				resultado=false;
			}
		}
	}
	return resultado;
}


/**********************************main*************************************/
	obtenerDireccion();// antes de inicializar la matriz necesito saber cual nivel de soduko para su correspondiente matriz
	inicializarJuego(nivelSeleccionado);
	//imprimirMatriz(pInput);
	