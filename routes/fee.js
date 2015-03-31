var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var async = require('async');
var moment=require('moment');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yu',
    database: 'yxxt_fee',
    multipleStatements:true
});


/* GET users listing. */
router.get('/', function(req, res, next) {
    var imsi="call fee('"+req.query.imsi+"');";
    async.waterfall([
        function(callback){
            connection.query(imsi,null,callback)
        }
    ],function(err,result){
        async.parallel([
            function(callback){
            connection.query('select * from yxxt_user_balance where imsi=?',[req.query.imsi],callback)
        },
        function(callback){
            connection.query('select * from speed_limit_conf',null,callback)
        }],function(err,result){
            res.render('fee',{title:'扣费成功',data:result[0][0],fee:result[1][0]});
        })
    })
});

module.exports = router;
