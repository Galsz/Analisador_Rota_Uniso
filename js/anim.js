function exibirQuadrado(num, desc) {

	switch (num) {
		case 1:
		case 7:
		case 8:
		case 9:
		case 10:
		case 18:
		case 22:
			$('#quadrado').css('background-color', 'rgb(255, 184, 0)');
			break;
		case 2:
		case 3:
		case 5:
		case 6:
		case 19:
		case 21:
		case 23:
		case 24:
			$('#quadrado').css('background-color', 'rgb(255, 0, 0)');
			break;
		case 4:
		case 13: 
		case 14:
			$('#quadrado').css('background-color', 'rgb(5 213 188)');
			break;
		case 15:
		case 16:
		case 17:
		case 20:
			$('#quadrado').css('background-color', 'rgb(18 120 8)');
			break;
		case 11:
			$('#quadrado').css('background-color', 'rgb(139 4 255)');
			break;
		case 12:
			$('#quadrado').css('background-color', 'rgb(249 5 115)');
			break;
	}

	$('#quadrado').html('<strong>' + num + '.</strong>' + desc);

	$('#quadrado').css('display', 'flex');
}

function esconderQuadrado() {
	$('#quadrado').css('display', 'none');
}