var Database = require('jt400');
var database = new Database();

//query reading with express
var query = require('./mapicsQueries.js');
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//csv reading
var http = require('http');
var csv = require('csv');
var obj = csv();


// Database reading

var config = {
	libpath: __dirname + '/jt400.jar',
	drivername: 'com.ibm.as400.access.AS400JDBCDriver',
	url: 'jdbc:as400://10.10.60.82:8471/APG;translate binary=true;user=APIGEE;password=APIGEE_BE'
};

database.initialize(config);

var MAPICS_SUPPLIERAZURE_QUERY = query.MAPICS_SUPPLIERAZURE_QUERY();


// query reading

app.get('/MAPICS_SUPPLIERAZURE_QUERY', function (req, res) { 

   console.log(r1);
   database.execute(MAPICS_SUPPLIERAZURE_QUERY);

   database.on('execute', function(error, results) {
	if(error) {
		console.log(error);	
	} else {
		console.log(results);
		res.json(results);
	} 
   });

})




// csv Reading

var array = [];

function MyCSV(F1, F2, F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19,F20,F21,F22,F23,F24,F25,F26,F27,F28,F29,F30,F31,F32,F33,F34,F35,F36,F37,F38,F39,F40,F41,F42,F43) {
    this.E2Open     	 		            = F1;
    this.Enterprise_Code                	    = F2;
    this.Supplier_ID	 			    = F3;
    this.Supplier_Description	 	     	    = F4;
    this.DUNS	 			            = F5;
    this.Global_Supplier_ID 			    = F6;
    this.Supplier_Tax_Number 			    = F7;
    this.Supplier_Address_External_Id	            = F8;
    this.Supplier_Address_Descriptor	            = F9;
    this.Supplier_Address_1	                    = F10;
    this.Supplier_Address_2	                    = F11;
    this.Supplier_Address_3                         = F12;	
    this.Supplier_Address_4                         = F13;	
    this.Supplier_Address_5                         = F14;
    this.Supplier_City	                            = F15;
    this.Supplier_County                            = F16;
    this.Supplier_State                             = F17; 
    this.Supplier_Country                           = F18;	
    this.Supplier_Zip                               = F19;	
    this.Remit_To_Address_External_Id               = F20;
    this.Remit_To_Address_Descriptor                = F21;
    this.Remit_To_Address_1			    = F22;	  
    this.Remit_To_Address_2			    = F23;	
    this.Remit_To_Address_3			    = F24;	
    this.Remit_To_Address_4			    = F25; 	
    this.Remit_To_Address_5			    = F26;	
    this.Remit_To_City				    = F27;
    this.Remit_To_County			    = F28;	
    this.Remit_To_State			            = F29;
    this.Remit_To_Country			    = F30;
    this.Remit_To_Zip				    = F31;	
    this.Flex_String_Supplier_01		    = F32;
    this.Flex_String_Supplier_02		    = F33;	
    this.Flex_String_Supplier_03	 	    = F34;	
    this.Flex_String_Supplier_04                    = F35;	
    this.Flex_String_Supplier_05                    = F36;	
    this.Supplier_Promise_Needed                    = F37;	
    this.Supplier_Hold_Flag			    = F38;	
    this.Supplier_Status			    = F39;	
    this.BPO_Remaining_Qty_Tol			    = F40;	
    this.Supplier_Ship_From_Site_Info               = F41;
    this.Supplier_Ship_From_Site_Description        = F42;
    this.Transit_Lead_Time			    = F43;



}; 

// Array storiing the value of csv file
var MyData = []; 

// Reading the csv file

var count = 0;
obj.from.path('../projectSupplierCollaboration/config-file-supplier.csv').to.array(function (data) {
console.log(data.length);
    for (var index = 0; index < data.length; index++) {
        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], data[index][10], data[index][11], data[index][12], data[index][13], data[index][14], data[index][15], data[index][16], data[index][17], data[index][18], data[index][19], data[index][20], data[index][21], data[index][22], data[index][23], data[index][24], data[index][25], data[index][26], data[index][27], data[index][28], data[index][29], data[index][30], data[index][31], data[index][32], data[index][33], data[index][34], data[index][35], data[index][36], data[index][37], data[index][38], data[index][39], data[index][40], data[index][41], data[index][42]));
console.log(MyData);
    }
	
});


var server = http.createServer(function (req, resp) {
    resp.writeHead(200, { 'content-type': 'application/json' });
    resp.end(JSON.stringify(MyData));
});
var Converter = require("csvtojson").Converter;
var fs=require("fs"); 
var csvFileName="../projectSupplierCollaboration/config-file-supplier.csv";
var csvConverter=new Converter({});

csvConverter.on("end_parsed",function(jsonObj){
    console.log(jsonObj); //here is your result json object
});
fs.createReadStream(csvFileName).pipe(csvConverter);

server.listen(8080);

//app.listen(8081);
console.log("Test");


























