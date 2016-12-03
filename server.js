var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var products = [
	{
		id : 1,	name: "applicaneA"
	},
	{
		id : 2,	name: "applicaneB"
	}
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());


// app.get('/products', function(req, res){
// 	res.send({products: products});
// });

//GET
app.get('/products', function(req, res) {
    res.send({ products: products });
});

// POST
app.post('/products', function(req, res) {
    var productName = req.body.name;
    currentId++;

    products.push({
    	id: currentId, 
    	name: productName
    });
    res.send('SUCCESS CREATED')
    console.log('done');
});

//PUT
app.put('/products/:id', function(req, res){
	var id = req.params.id,
		newName = req.body.newName,
		found = false;

	products.forEach(function(product, index){
		if(!found && product.id === Number(id)){
			product.name = newName;
		}
	});
	res.send('SUCCESS UPDATED');
});

//DELETE
app.delete('/products/:id', function(req, res){
	var id = req.params.id,
		found = false;

	products.forEach(function(product, index) {
		if(!found && product.id === Number(id)){
			products.splice(index, 1);
		}
	});
	res.send('SUCCESS DELETED');
});


app.listen(PORT, function(){
	console.log('Server listening on ' + PORT);
});







