	var conjuntoA = [];//['2e','6','2','6','7','5','9','8','9','10','11','12','13','10'];
	var conjuntoB = [];//['aaaa'];
	var conjuntoC = [];//['2','6','2','5','7','9','8','9','20','11','12','19','10'];
	var conjuntoUniverso = [];//['aaa','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'] ;
	var union = [];
	var errors ="";
	var salida ="";
	var flag = true;
	$('document').ready(function(){
		for(i = 0 ;i<$('div #universo').children().size();i++)
		{
			$('div #universo').children("div .conjuntos").eq(i).css({"background":"rgba("+Math.round(Math.random(10)*200)+",180,"+Math.round(Math.random(100)*120)*i+",.85)"});
		}
		$('div #universo').children("div .inter").mouseenter(function(){
			$(this).children('p').show();
		}).mouseleave(function(){
			$(this).children('p').hide();
		});
		$('div #universo').children("div .conjuntos").mouseenter(function(){
			$(this).children('p').show();
		}).mouseleave(function(){
			$(this).children('p').hide();
		});
		
	});
	function init(){
		salida="";
		verificaconjunto(conjuntoUniverso,"Universo");
		verificaconjunto(conjuntoA,"A");
		verificaconjunto(conjuntoB,"B");
		verificaconjunto(conjuntoC,"C");
		$('#conjuntoA p').html("{"+conjuntoA+"}");
		$('#conjuntoB p').html("{"+conjuntoB+"}");
		$('#conjuntoC p').html("{"+conjuntoC+"}");
		$('#interCA p').html("{"+interseccion(conjuntoC,conjuntoA)+"}");
		$('#interAB p').html("{"+interseccion(conjuntoB,conjuntoA)+"}");
		$('#interBC p').html("{"+interseccion(conjuntoB,conjuntoC)+"}");
		$('#interABC p').html("{"+interseccion(conjuntoC,interseccion(conjuntoA,conjuntoB))+"}");
		$('body').append("A<sup>c</sup>∩B={"+interseccion(conjuntoB,complemento(conjuntoUniverso,conjuntoA))+"}<br>");
		$('body').append("A<sup>c</sup>UB<sup>c</sup>={"+unir(complemento(conjuntoUniverso,conjuntoA),complemento(conjuntoUniverso,conjuntoB))+"}<br>");
		$('body').append("(A∩B∩C)<sup>c</sup>={"+complemento(conjuntoUniverso,interseccion(conjuntoA,interseccion(conjuntoB,conjuntoC)))+"}<br>");
		if(salida.length>0){
			$('#mensajes').html(salida).children("p").slideDown().delay(5000).slideUp();
		}
	}
	Array.prototype.unique=function(a){
	  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
	});
	function insertionSort( myArr ) {
	  var size = myArr.length,
		  slot,
		  tmp;
	 
	  for ( var item = 0; item < size; item++ ) { // outer loop     
		tmp = myArr[item];
		for ( slot = item - 1; slot >= 0 && myArr[slot] > tmp; slot-- ){ // inner loop
		  myArr[ slot + 1 ] = myArr[slot];
		}
		myArr[ slot + 1 ] = tmp;
	  }
	  return myArr;
	};
	
	function verificaduplicados(conjunto){
		return insertionSort(conjunto.unique());
	}
	function verificaconjunto(conjunto,nombre){
		flag= true;
		if(conjunto.length > 0)
		{
			for(i = 0; i < conjunto.length; i++)
			{
				if(verificaUniverso(conjunto[i])){
					console.log("encontrado"+conjunto[i]);
				}
				else{
					console.log("No encontrado"+conjunto[i]);
					errors += conjunto[i]+",";
					flag = false;
				}
			}
			console.log(nombre+"   ---Bandera says: "+flag);
			if (!flag) {
				salida += "<p>Del conjunto "+ nombre +" los elementos "+ errors +" no estan en el universo.</p>"
				errors ="";
			}
		}
		else
		{
			salida += "<p>El conjunto "+nombre +" no tiene elementos, se tomará como vacio.</p>";
		}
	}
	function verificaUniverso(conjunto){
		var flag1= false;
		for(j = 0; j < conjuntoUniverso.length; j++)
		{			
			if ( conjunto==conjuntoUniverso[j]){
				flag1 = true;
			}
		}
		return flag1;
	}
	function interseccion(primerconjunto,segundoconjunto){
		var interseccions = [];
		for(i = 0; i < primerconjunto.length; i++)
		{
			for(j = 0; j < segundoconjunto.length; j++)
			{
				if(primerconjunto[i]==segundoconjunto[j]){
					interseccions[i]=primerconjunto[i];
				}
			}
		}
	  if(interseccions.length > 0){
		return insertionSort(interseccions.unique());
	  }else{
		return "No hay elementos en común.";
	  }
	}
	function unir(conjunto1, conjunto2){
		return insertionSort(union.concat(conjunto1,conjunto2).unique());
	}
	//conjunto1 - Conjunto2
	function complemento(conjunto1,conjunto2){
		var array = interseccion(conjunto1,conjunto2),temp = [];
		if(array.unique().length > 0){
			for( i = 0; i< conjunto1.length;i++){
				bandera= true;
				for( j = 0; j< array.length;j++){
					if(conjunto1[i]==array[j]){
						bandera=true;
						break;
					}else{
						bandera= false;
					}
				}
				if(!bandera){
					temp[i]= conjunto1[i];
				}
			}
			return insertionSort(temp.unique());
		}else
		{
			return false;
		}
	}