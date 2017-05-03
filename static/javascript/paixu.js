for(let i = 6; i >= 0; i--) {
	Mimonode.readDayAvg(i, new function() {
		this.successCallback = function(message) {
		//alert(JSON.stringify(message));
			for(let j = 0; j < message.length; j++) {
				tempAllData.push(message[j]);
			}
			self.setState({
				dataTest: tempAllData,
			})
		};
		this.errorCallback = function(message) {
			alert("read seven days average data failed: " + message);
		};
	});
}

var arrData = this.state.dataTest;
var arrSensor = [[],[],[],[],[],[]]; //有没有方法适配所有二维数组
var arrTime = [];
for(let i = 0; i < arrData.length; i++) {
	for(let j = i; j < arrData.length; j++) {
		if(arrData[i].date > arrData[j].date) {
			let temp = arrData[j];
			arrData[j] = arrData[i];
			arrData[i] = temp;
	    }
	}
}
//alert(JSON.stringify(arrData[0]))
for(let i in arrData) {
	switch(arrData[i].subspace) {
		case 'sensor1': arrTime.push(arrData[i].date.split('T')[0]);
		arrSensor[0].push(Math.ceil(arrData[i].value)); break;
		case 'sensor2': arrSensor[1].push(Math.ceil(arrData[i].value)); break;
		case 'sensor3': arrSensor[2].push(Math.ceil(arrData[i].value)); break;
		case 'sensor4': arrSensor[3].push(Math.ceil(arrData[i].value)); break;
		case 'sensor5': arrSensor[4].push(Math.ceil(arrData[i].value)); break;
		case 'sensor6': arrSensor[5].push(Math.ceil(arrData[i].value)); break;
		default: break;
	}
}
//alert(JSON.stringify(arrSensor[0]))
this.setState({
	dataTest: arrData,
	sensorTime: arrTime,
	arrSensor: arrSensor,
})