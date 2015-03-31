var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var async = require('async');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yu',
    database: 'yxxt_fee'
});


router.get('/',function(req,res,next){

});

router.post('/',function(req,res,next){
    async.waterfall([
        function(callback){
            return connection.query('update yxxt_user_balance set ' +
            'balance=?,' +
            'balance_pay=?,' +
            'last_position=?,' +
            'last_use=?,' +
            'balance_data=?,' +
            'last_data=?,' +
            'last_fast_data=?,' +
            'speed_limit=?,' +
            'srv_status=?,vip_flag=? where imsi=?',
                [req.body.balance,
                req.body.balance_pay,
                req.body.last_position,
                req.body.last_use,
                req.body.balance_data,
                req.body.last_data,
                req.body.last_fast_data,
                req.body.speed_limit,
                req.body.srv_status,
                req.body.vip,
                req.body.imsi],
                callback);
        },
        function(err,result,callback){
            return callback(err);
        }
    ],function(err){
        res.render('modify',{id:req.body.id})
    });

});

module.exports = router;