/**
 * mimonode API(JavaScript)
 * @Author: zgwang
 * @Date: 2017.05.02
 */

// var io = require('socket.io-client');
// var socket = null;

var MimoNode = {};

MimoNode['readAll'] = readAll;
MimoNode['readHourAvg'] = readHourAvg;
MimoNode['readDayAvg'] = readDayAvg;
MimoNode['logout'] = logout;

// connect function
function connect(callback){ 

	socket = io.connect("http://118.89.236.53:8886/access");
	// socket = io.connect("http://10.107.30.55:8886/access");
	socket.on('connection',function(){
		callback.connectCallback();
	});
	socket.on('disconnect',function(){
		callback.disconnectCallback();
	});
	socket.on('error',function(object){
		callback.socketErrorCallback(object);
	});
	socket.connect();
};

function readAll(callback){
	connect(callback);
	
	var data = "readAll";

	socket.emit("readAll", data);
	socket.on("readAllSucceed", function(object){
		callback.successCallback(object);
	});
	socket.on("readAllFailed", function(object){
		callback.errorCallback(object);
	});
};
//实时数据获取函数
function readHourAvg(day, callback){
	connect(callback);
	socket.emit("readHourAvg", day);
	socket.on("readHourAvgSucceed", function(object){
		callback.successCallback(object);
	});
	socket.on("readHourAvgFailed", function(object){
		callback.errorCallback(object);
	})
};
//历史数据获取函数
function readDayAvg(day, callback){
	connect(callback);
	socket.emit("readDayAvg", day);
	socket.on("readDayAvgSucceed", function(object){
		callback.successCallback(object);
	});
	socket.on("readDayAvgFailed", function(object){
		callback.errorCallback(object);
	})
};

function logout(){
	socket.disconnect();
};

// module.exports = MimoNode;