

	export function kelvinToRGB(kelvin) {
    let r, g, b;

    const tmpKelvin = kelvin / 100;

    if (tmpKelvin <= 66) {
        r = 255;
        g = 99.47 * Math.log(tmpKelvin) - 161.120;
        if (tmpKelvin <= 19)
            b = 0;
        else
            b = 138.52 * Math.log(tmpKelvin - 10) - 305.045;
    } else {
        let tmpCalc = tmpKelvin - 60;
        r = 329.70 * Math.pow(tmpCalc, -0.133);
        g = 288.12 * Math.pow(tmpCalc, -0.0755);
        b = 255;
    }

    r = Math.max(0, Math.min(255, Math.round(r)));
    g = Math.max(0, Math.min(255, Math.round(g)));
    b = Math.max(0, Math.min(255, Math.round(b)));

    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
	}
	
	export function changeLightValue(original,value)
	{
		if(!original.startsWith('#'))
			return "#FFFFFF";
		var r = parseInt(original.substr(1, 2), 16);
		var g = parseInt(original.substr(3, 2), 16);
		var b = parseInt(original.substr(5, 2), 16);
		r += value;
		g += value;
		b += value;
		const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		return hex;
	}
