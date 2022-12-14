const express =  require('express');
const app = express();
const path = require('path');
var nodemailer = require('nodemailer');
const multer = require('multer');

const upload = multer({
	storage: multer.diskStorage({
	  destination: function (req, file, cb) {
		cb(null, 'uploads/');
	  },
	  filename: function (req, file, cb) {
		cb(null, file.originalname);
	  }
	}),
	limits: { fileSize: 5 * 1024 * 1024 }
  });
  
// var transporter = nodemailer.createTransport({
// 	service: 'naver',
//     host: 'smtp.naver.com',
//     port: 465,
// 	auth: {
// 		user : 'jaylee8864@naver.com',
// 		pass: ''
// 	}
// });
// var mailOptions = {
// 	from: 'jaylee8864@naver.com',
// 	to: 'izr8809@gmail.com',
// 	subject: 'image',
// 	text: 'that was easy'
// };
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.listen(3000, ()=>{
    console.log('visit http://localhost:3000/');
});


app.post('/upload',upload.array('img'),(req,res) => {
    console.log(req.file)
})

app.get('/12', function(req,res){
    console.log("!");
	// transporter.sendMail(mailOptions, function(error, info){
	// 	if(error){
	// 		console.log(error);
	// 	}else{
	// 		console.log(info.response);
	// 	}
	// });

})
app.post('/12', upload.array('img'), function(req,res){
    console.log("success");
	console.log(req.file);
	console.log(req.body.sese);
})
