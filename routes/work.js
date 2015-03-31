var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var async = require('async');
var moment=require('moment');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yu',
    database: 'yxxt_fee'
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.post('/',function(req, res, next){
    var ops=("on"==req.body.ops);
    async.parallel([
        // vip
        function(callback){
            if('on'==req.body.vip){
                //res.write('正在功设置成vip……')
                connection.query('update yxxt_user_balance set vip_flag=1 where imsi=?',[req.body.imsi],callback);
            }else{
                //res.write('正在设置成普通用户……')
                connection.query('update yxxt_user_balance set vip_flag=0 where imsi=?',[req.body.imsi],callback);
            }
        },
        function(callback){
            if('on'==req.body.date){
                //res.write('正在将日期设置成2015-01-01……')
                connection.query('update yxxt_user_balance set last_use=? where imsi=?',['2015-01-01',req.body.imsi],callback);
            }else{
                connection.query('update yxxt_user_balance set last_use=now() where imsi=?',[req.body.imsi],callback);
                //res.write('正在将日期设置成今天……')
            }
        },
        function(callback){
            if(ops){
                if('on'==req.body.m10) {
                    //res.write('正在插入10M数据……')
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*10,moment().format("YYYY-MM-DD"),'440'],callback);
                }
            }else{
                if('on'==req.body.m10) {
                    //res.write('正在插入10M数据……')
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*10,moment().format("YYYY-MM-DD"),'460'],callback);
                }
            }
            callback(null,'');
        },
        function(callback){
            if(ops){
                if('on'==req.body.m50) {
                    //res.write('正在插入50M数据……');
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*50,moment().format("YYYY-MM-DD"),'440'],callback);
                }
            }else{
                if('on'==req.body.m50) {
                    //res.write('正在插入50M数据……');
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*50,moment().format("YYYY-MM-DD"),'460'],callback);
                }
            }
            callback(null,'');
        },
        function(callback){
            if(ops){
                if('on'==req.body.m100) {
                    //res.write('正在插入100M数据……')
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*100,moment().format("YYYY-MM-DD"),'440'],callback);
                }
            }else{
                if('on'==req.body.m100) {
                    //res.write('正在插入100M数据……')
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*100,moment().format("YYYY-MM-DD"),'460'],callback);
                }
            }
            callback(null,'');
        },
        function(callback){
            if(ops){
                if('on'==req.body.m500) {
                    //res.write('正在插入500M数据……')
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*500,moment().format("YYYY-MM-DD"),'440'],callback);
                }
            }else{
                if('on'==req.body.m500) {
                    //res.write('正在插入500M数据……')
                    return connection.query('insert into imsi_robot_work_table_2g(imsi,size,zone_date,zone) values(?,?,?,?)',[req.body.imsi,1048576*500,moment().format("YYYY-MM-DD"),'460'],callback);
                }
            }
            callback(null,'');
        }
    ],function(){
        async.parallel([
            function(callback){
                connection.query('select * from yxxt_user_balance where imsi=?',[req.body.imsi],callback);
            },
            function(callback){
                connection.query('select * from imsi_robot_work_table_2g where imsi=?',[req.body.imsi],callback);
            }
        ],function(err,result){
            console.log(result[0][0]);
            console.log(result[1][0]);
            res.render('sqls',{title:'生成数据成功',imsi:req.body.imsi,data:result[0][0],dat:result[1][0]});
        })
    })
});
module.exports = router;
