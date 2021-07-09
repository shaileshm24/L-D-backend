import express from 'express' ;
import authRouter from './routes/authenticateRoute';
import {emailVerify} from './routes/emailVerify';
import {json, urlencoded} from 'body-parser';
import {config} from './config/config'
import mongoDb from './module/index';

const app = express();
app.use(json({ limit: '50mb', type: 'application/json' }));
app.use(urlencoded({
	limit: '50mb',
	extended: true,
}));

mongoDb();
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Expose-Headers', 'Content-Length');
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, token');
	if (req.method === 'OPTIONS') {
		return res.send(200);
	}
	return next();
});


app.use('/api',authRouter);
app.use('/',emailVerify);

//app.use('/verify',(req,res,next)=>{next()},activateUserRouter)



app.listen(`${process.env.PORT}`,()=>{
    console.log("Server is listening on",`${process.env.PORT}`);
});
 

