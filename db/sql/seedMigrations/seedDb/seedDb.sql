--  sample users
INSERT INTO users (id,firstname,lastname,email,password,emailVerified,isActive) VALUES('afc358db-0621-4695-9a0d-4091d560dd01','vinay','blessing','vinay@vin.com','password',false,false);
INSERT INTO users (id,firstname,lastname,email,password,emailVerified,isActive) VALUES('afc358db-0621-4695-9a0d-4091d560dd02','larry','hover','larrt@vin.com','password',true,true);

-- Sample wallets
INSERT INTO wallets (id,type,availableBalance,ledgerBalance,address,userId) VALUES('aac358db-0621-4695-9a0d-4091d560dd01','btc',2.00940000,2.10940000,'address-sample-00001','afc358db-0621-4695-9a0d-4091d560dd01');
INSERT INTO wallets (id,type,availableBalance,ledgerBalance,address,userId) VALUES('aac358db-0621-4695-9a0d-4091d560dd02','usdt',6000,9800,'address-sample-00001','afc358db-0621-4695-9a0d-4091d560dd02');

-- Sample txn
INSERT INTO transactions (id,action,amount,prevBalance,newBalance,fee,spotPrice,walletId,userId) VALUES('aac358db-0621-4695-9a0d-4091d560dd11','buyBtc',200,50000,49800,2,25000,'aac358db-0621-4695-9a0d-4091d560dd02','afc358db-0621-4695-9a0d-4091d560dd02');
INSERT INTO transactions (id,action,amount,prevBalance,newBalance,fee,spotPrice,walletId,userId) VALUES('aac358db-0621-4695-9a0d-4091d560dd12','sellBtc',200,48000,50100,2,26000,'aac358db-0621-4695-9a0d-4091d560dd02','afc358db-0621-4695-9a0d-4091d560dd02');

-- Sample logs
INSERT INTO logs (id,userId,message) VALUES('aac358db-0621-4695-9a0d-4091d560dd21','afc358db-0621-4695-9a0d-4091d560dd02', 'bought btc');
INSERT INTO logs (id,userId,message) VALUES('aac358db-0621-4695-9a0d-4091d560dd22','afc358db-0621-4695-9a0d-4091d560dd02', 'sold btc');

-- Sample settings
INSERT INTO settings (id,name,value) VALUES('aac358db-0621-4695-9a0d-4091d560dd32','buyBtc', '{buyAt:20000}');
INSERT INTO settings (id,name,value) VALUES('aac358db-0621-4695-9a0d-4091d560dd42','sellBtc', '{buyAt:21000}');
