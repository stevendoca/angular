import * as express from 'express';
import * as mongoose from 'mongoose';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { jwtSecret, restApiPort, dbName } from './config';
import { APP_ID } from '@angular/core';

const app = express();

mongoose.connect('mongodb://localhost/' + dbName,
	{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


const userSchema = mongoose.Schema({
	username: { 
        type: String, 
		unique: true,
		required: true 
    },
	passwordHash: {
		type: String,
		required: true
	}
});

const Transaction = mongoose.model('Transaction', {
    date:{
        type: Date,
        default: Date.now(),
    },
    description:{
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    user:{
        type: String,
        require: true,
    }
});

const User = mongoose.model('User', userSchema);

app.get('/create-user', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const user = await User.findOne({ username: (req.query as any).username });
	
	if (!user) {
		try {
			const pwHash = await argon2.hash((req.query as any).password);
			const newUser = new User({
				username: (req.query as any).username,
				passwordHash: pwHash,
			});
			newUser.save((err, obj) => {
				if (err) {
					res.send({ status: 'fail', reason: err });
				} else {
					res.send({ status: 'Create user successfully' });
				}
			});
		} catch (e) {
			res.send({ status: 'fail', reason: e });
		}
	} else {
		return res.send ({ status: 'Username already exists, please choose different one '})
	}
	
});
app.get('/authenticate', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	User.findOne({ username: (req.query as any).username }, async (err, obj) => {
		if (err || !obj) {
			res.send({ status: 'fail', reason: 'no such user' });
		} else if (await argon2.verify(obj.passwordHash, (req.query as any).password)) {
			const token = await jwt.sign({ user: obj.username }, jwtSecret);
			res.send({ status: 'OK', token: token });
		} else {
			res.send({ status: 'fail', reason: 'bad password' });
		}
	});
});
app.get('/get-username', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	try {
		const username = await jwt.verify((req.query as any).token, jwtSecret);
		res.send({ status: 'OK', username: username });
	} catch (e) {
		res.send({ status: 'fail' });
	}
});

app.get('/add-transaction', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	try {

		const username = await jwt.verify((req.query as any).token, jwtSecret);

		const newTransaction = new Transaction({
			date:(req.query as any).date,
			description: (req.query as any).description,
			account: (req.query as any).account,
			credit: (req.query as any).credit,
			user: username.user
		})
		newTransaction.save((err, obj) => {
			if (err) {
				res.send({ status: 'fail in saving', reason: err });
			} else {
				res.send({ status: 'OK' });
			}
		});
	} catch (e) {
		res.send({ status: 'fail in serve' });
	}
});

app.get('/get-transactions', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	try{
		const user = await jwt.verify((req.query as any).token, jwtSecret);
		if (user){
			const transactions = await Transaction.find({user:user.user});
			console.log(transactions[0].credit)
			let debit = 0;
			for(let i = 0; i < transactions.length; i++){
				debit+= transactions[i].credit;
			}
			console.log(debit)
			return res.send({status:'OK', transactions:transactions, debit: debit});
		}else{
			return res.send({status:'no such user'})
		}
	}catch (e){
		return res.send({status:e})
	}
})

app.get('/delete-transaction', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	try{
		const user= await Transaction.findByIdAndRemove((req.query as any).id)
		if (!user){
			console.log('no user')
		}else{
			console.log(user)
		}
	}catch(e){
		console.log('error ' + e)
	}
})

app.listen(restApiPort, () => {
	console.log('REST API listening on ' + restApiPort);
});
