###node基础知识点回顾
- ● nodejs不是一个语言，是一个平台。js是语言。和PHP + Apache不同，nodejs即是语言的承接平台又是提供http服务的平台。

- ● nodejs的安装，跨操作系统的，我们写的代码在任何的操作系统中都能运行。但是要装不同的nodejs环境。

- ● nodejs没有根目录，得用http和fs共同配合做顶层路由设计，在原生的开发中，通常用：
```
var server = http.createServer(function(req,res){
	if(req.url == ""){

	}else if(req.url == ""){

	}
});
```

- ● npm要会用，模块的使用。

- ● Express简化了http程序的开发：
```var express = require("exprss");
var app = express();

app.get("/" , function(req,res){
	res.send("<h1>你好</h1>")
});

app.listen(3000);
```
- ● GET请求和POST请求
```
app.get("/" , function(req,res){
	var id = url.parse(req.url , true).query.id;
	res.send("<h1>你好</h1>");
});

app.post("/" , function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){

	});
});
```
- ● params：
```
app.get("/:xuehao" , function(req,res){
	var xuehao = req.params.xuehao;
	res.send("<h1>你好</h1>");
});
```
###TodoList的深入学习
####1 复习回顾
我们有了db.js这个模拟数据库之后，接下来写了一个todo.js的文件，里面有4个函数是操作db.js的。
此时我们说db.js文件是可被预测状态的（predictable）。

####说A文件可被预测状态：
- ① 清晰性：对A文件的所有操作，都罗列出函数了；
- ② 私有性：对A对象的操作，必须通过这些函数；
- ③ 灵活性：对A的操作可以任意插拔，删除一个函数就去掉了一种操作，增加一个函数就增加一个操作。

nodejs中的所有的关于文件的操作，都是异步的。比如：
- fs.readFile();
- fs.writeFile();
- fs.appendFile();
所以他们都提供了回调函数：
fs.write(filepath , function(err , data){

});

`如果再把这个异步函数封装成一个函数，外层函数要接受一个callback回调函数，当fs的readFile执行完毕之后，调用callback通过实参将data传出去。`

```
function read(callback){
	fs.write(filepath , function(err , data){
		callback(JSON.parse(data.toString()));
	});
}


read(function(jsonobj){
	console.log(jsonobj);
});
```
`RESTful接口：`
```
功能	         URL地址	       请求
增加TodO	     /todo	     POST
列出TODO	     /todo	     GET
更改TODO顺序	 /todo	     MOVE
删除TODO	     /todo/id号	 DELETE
更改TODO	     /todo/id号	 PATCH
```
我们将app.js中的中间件的function(req,res)都挪出去：

```
var express = require("express");
var app = express();

//引入控制器
var mainctrl = require("./controllers/mainctrl.js");
//静态化www文件夹
app.use(express.static("www"));

//罗列中间件
app.get("/todo"  		, mainctrl.showTodo);		//列出所有的todo
app.post("/todo" 		, mainctrl.addTodo);		//增加todo
app.delete("/todo/:id"  , mainctrl.removeTodo); 	//删除todo
app.patch("/todo/:id" 	, mainctrl.updateTodo); 	//更改todo
app.move("/todo" 		, mainctrl.moveTodo);		//更改TODO的顺序

//监听端口
app.listen(3000);

```

控制器controllers/mainctrl.js:
```
var formidable = require("formidable");
//引入（就是我们的model）
var todo = require("../models/todo.js");

//列出所有todo
exports.showTodo = function(req,res){
	//当用户访问/todo命令苦工读取数据库
	todo.allTodo(function(data){
		//呈递在页面上
		res.json({"results" : data});
	});
}

//增加todo
exports.addTodo = function(req,res){
	//识别用户传入的title
	var form = new formidable.IncomingForm();

	form.parse(req , function(err , fields , files){
		var title = fields.title;
		todo.addTodo(title , function(){
			res.json({"result" : 1});
		})
	});
}

//删除todo
exports.removeTodo = function(req,res){
	var id = req.params.id;

	//删除
	todo.removeTodo(id , function(){
		res.json({"result" : 1});
	});
}
//更改todo
exports.updateTodo = function(req,res){
	var id = req.params.id;

	var form = new formidable.IncomingForm();

	form.parse(req , function(err , fields , files){
		todo.updateTodo(id , fields.k , fields.v , function(){
			res.json({"result" : 1});
		});
	});
}


//移动todo
exports.moveTodo =  function(req,res){
	var form = new formidable.IncomingForm();

	form.parse(req , function(err , fields , files){
		var startidx = fields.startidx;
		var endidx = fields.endidx;

		todo.moveTodo(startidx , endidx , function(){
			res.json({"result" : 1});
		});
	});
}

```


