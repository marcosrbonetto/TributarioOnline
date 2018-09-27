export const stringToFloat = (str, decimales, opciones) => {
	if(opciones && opciones.permitirVacio && str == ""){
		return str;
	}

	if(str==undefined || str=="")
		return 0;

	//alert(str)
	if(str.toString().indexOf(",") > 0)
	{
		var n = str.toString().replace(/\./g,"");
		n = n.toString().replace(",",".");
		if(!(!isNaN(parseFloat(n)) && isFinite(n)))
			return 0;
		else
		{
			if(!decimales)
				return parseFloat(n);
			else
				return Math.round(parseFloat(n) * Math.pow(10,decimales)) / Math.pow(10,decimales);
		}
	}
	else
	{

		if(!(!isNaN(parseFloat(str)) && isFinite(str))) {
			return 0;
		}
		else{
			if(!decimales)
				return parseFloat(str);
			else
				return Math.round(parseFloat(str) * Math.pow(10,decimales)) / Math.pow(10,decimales);
		}
	}
};

export const agregoCero = (num) => {
	if(num <= 9)
		return "0"+num;
	else
		return num;
};

export const dateToString = (date, format) => {
    const day =  agregoCero(date.getDate());
    const month =  agregoCero(parseInt(date.getMonth()) + 1);
    const year =  date.getFullYear();

    return format.replace('DD',day).replace('MM',month).replace('YYYY',year);
};


