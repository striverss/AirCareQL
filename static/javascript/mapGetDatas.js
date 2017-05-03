window.onload = function () {
	var dataNowHour = [];
	readHourAvg(0, new function(){
		this.successCallback = function(message) {
			dataNowHour = message;
			// console.log(JSON.stringify(dataNowHour));
			mapPageSetDatas (dataNowHour);
		};
		this.errorCallback = function(message) {
			console.log("read now hour data failed: " + message);
		};
	});
};

function mapPageSetDatas (dataNowHour) {
	if (document.getElementById("mapMax")) {
		//存入六个传感器的经纬度信息
		Location = 
			[
				{value: [116.3624120000,39.9662290000]},//sensor1地址
				{value: [116.3672230000,39.9645420000]},//sensor2地址
				{value: [116.3625160000,39.9702660000]},//sensor3地址
				{value: [116.3646720000,39.9646250000]},//sensor4地址
				{value: [116.3667200000,39.9702930000]},//sensor5地址
				{value: [116.3645280000,39.9692980000]},//sensor6地址
		    ];
		//制作map的JSON数据，方法为先建立数组，然后将对象推送进去
		var map = [];
		var today = new Date();
		var z = today.getHours();//获取当前的小时数
		for (var i = 0; i < 6; i++) {
			tip = {};
			for (var j = 0; j < dataNowHour.length; j++) {
				if (dataNowHour[j].hour == z && dataNowHour[j].subspace == "sensor"+(i+1)) {
					tip.name = dataNowHour[j].subspace;
					tip.value = Math.round(dataNowHour[j].value);
				}
			}
			map.push(tip);
		}
        //制作传感器名称对应经纬度对象
		var place ={};
		for (var i = 0; i < Location.length; i++) {
			place["sensor"+(i+1)] = Location[i].value;
		}
		// console.log(JSON.stringify(map));
		//将map画图的一些基本配置在页面加载时进行处理，这样可以实现页面直接加载
		var data = map;
		var geoCoordMap = place;
		//将data与geoCoordMap进行处理，组合成画图要求的格式
		var convertData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var geoCoord = geoCoordMap[data[i].name];
		        if (geoCoord) {
		            res.push({
		                name: data[i].name,
		                value: geoCoord.concat(data[i].value)
		            });
		        }
		    }
		    return res;
		};
		//制作提示框内容
        option.tooltip.formatter = function (params) {//params为点击
        	// console.log(params);
        	var myseries = option.series;
        	var res = "传感器名称：" + params.name + "<br/>";
			// for (var m = 1; m <= myseries[0].data.length; m++) {
			for (var m = 1; m <= data.length; m++) {
				if (params.name == "sensor" + m) {
					res += "PM2.5：" + Math.round(params.data.value[2]) + "<br/>"
		     			   + "传感器坐标：" + [params.data.value[0], params.data.value[1]];
			    return res;
				}
			}
        };
        //将convertData(data)返回标准数组传递至option
		option.series[0].data = convertData(data);
		//echarts画图命令
		if (option && typeof option === "object") {
		    myChart.setOption(option, true);
		}
	}
}