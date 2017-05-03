window.onload = function () {//在页面DOM全部加载完毕之后自动执行的语句
	//一周的历史数据**********************************************
	secondPageSetDatas ();
	//一天的实时数据**********************************************
	var dataNowHour = [];
	readHourAvg(0, new function(){
		this.successCallback = function(message) {
			dataNowHour = message;
			titleSetDatas (dataNowHour);
			if (document.getElementById("home")) {
				document.getElementById("firstPage").innerHTML = firstPageSetDatas (dataNowHour);
			}
		};
		this.errorCallback = function(message) {
			console.log("read now hour data failed: " + message);
		};
	});
};
//home界面数据设置函数
function titleSetDatas (dataNowHour) {
	if (document.getElementById("home")) {
		//主页标题数据*************************************************
		// document.getElementById("loc").innerHTML = "北京市海淀区北京邮电大学明光楼";
		document.getElementById("weaTempe").innerHTML = "20";
		document.getElementById("aqInfo").innerHTML = "110 良";
		document.getElementById("airInfo").innerHTML = "PM2.5";
		// console.log(JSON.stringify(dataNowHour[1].date));
		for (var i = dataNowHour.length - 1; i >= 0; i--) {//将sensor2的最新数据展示在主页面
			if (dataNowHour[i].subspace == "sensor2") {
				document.getElementById("air").innerHTML = Math.round(dataNowHour[i].value);
				break;
			}
		}
	}
}
//实时数据曲线设置函数
function firstPageSetDatas (dataNowHour) {
	if (document.getElementById("firstPage")) {
		//设定坐标轴信息**********************************************
		var label = [];
	    data1.labels = label;//匹配到第一张图的labels
	    var today = new Date();
	    var todayTxt = JSON.stringify(today);
        var z = today.getHours();//获取当前的小时数
	    for (var i = 0; i <= z; i++) {
	    	label.push(todayTxt.substring(6,11)+" "+i+"时")
	    }
	    //将六个传感器当日的实时数据展示出来**************************
	    for (var i = 0; i < 6; i++) {
	    	var row = [];
	    	row.length = z+1;
	    	for (var j = 0; j < z+1; j++) {
	    		row[j] = 0;
		    	for (var k = 0; k < dataNowHour.length; k++) {
		    		if (dataNowHour[k].subspace == "sensor"+(i+1) && dataNowHour[k].hour == j) {
		    			row[j] = Math.round(dataNowHour[k].value);
		    		}
		    	}
		    }
		    data1.datasets[i].data = row;
	    }
	}
}
//历史数据标准格式函数
function dataSet () {
	var today = new Date();//获取今天的时间
    var oneDayBefore = JSON.stringify(new Date(today.getTime()-24*60*60*1000));//获取1天前的日期
    var twoDaysBefore = JSON.stringify(new Date(today.getTime()-2*24*60*60*1000));
    var threeDaysBefore = JSON.stringify(new Date(today.getTime()-3*24*60*60*1000));
    var fourDaysBefore = JSON.stringify(new Date(today.getTime()-4*24*60*60*1000));//获取1天前的日期
    var fiveDaysBefore = JSON.stringify(new Date(today.getTime()-5*24*60*60*1000));
    var sixDaysBefore = JSON.stringify(new Date(today.getTime()-6*24*60*60*1000));
    var sevenDaysBefore = JSON.stringify(new Date(today.getTime()-7*24*60*60*1000));
	var data = [];
	for (var i = 0; i < 42; i++) {
		if (i < 6) {
			data.push({date: sevenDaysBefore, subspace: "sensor"+(i+1), type: "PM2.5"});
		}else if (i<12) {
			data.push({date: sixDaysBefore, subspace: "sensor"+(i+1-6), type: "PM2.5"});
		}else if (i<18) {
			data.push({date: fiveDaysBefore, subspace: "sensor"+(i+1-6*2), type: "PM2.5"});
		}else if (i<24) {
			data.push({date: fourDaysBefore, subspace: "sensor"+(i+1-6*3), type: "PM2.5"});
		}else if (i<30) {
			data.push({date: threeDaysBefore, subspace: "sensor"+(i+1-6*4), type: "PM2.5"});
		}else if (i<36) {
			data.push({date: twoDaysBefore, subspace: "sensor"+(i+1-6*5), type: "PM2.5"});
		}else if (i<42) {
			data.push({date: oneDayBefore, subspace: "sensor"+(i+1-6*6), type: "PM2.5"});
		}
	}
	for (var i = 0; i < data.length; i++) {
		data[i].value = Math.round(Math.random()*150);
	}
	// console.log(data);
	return data;
}
//历史数据曲线设置函数
function secondPageSetDatas () {
	if (document.getElementById("secondPage")) {
		//设定坐标轴信息**********************************************
		var label = [];
	    data2.labels = label;
	    //获取一周的历史日期
	    //循环改！
	    var today = new Date();//获取今天的时间
	    for (var i = 7; i >= 1; i--) {
	    	label.push(JSON.stringify(new Date(today.getTime()-i*24*60*60*1000)).substring(1,11));
	    }
	    //设定数据信息**********************************************	
	    var row = dataSet();
	    for (var i = 0; i < 6; i++) {
	    	var rowSensor = [];
	    	for (var j = 0; j < 7; j++) {
	    		rowSensor.push(row[i+j*6].value);
	    	}
	    	data2.datasets[i].data = rowSensor;
	    }
	    // console.log(row1);


	}
}
