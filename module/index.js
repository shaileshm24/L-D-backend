import mongoose from 'mongoose';
import {config} from '../config/config';

mongoose.Promise = global.Promise;

let url = "mongodb://";
url+= `${config.dbHost}:${config.dbPort}/${config.dbName}`;

const mongoDb = async () => {
	try {
		await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('Connected to mongo!!!');
	} catch (err) {
		console.log('Could not connect to MongoDB',err);
	}
};

export default mongoDb;