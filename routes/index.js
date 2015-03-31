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


function getData(res,d){
    res.render('index', { title: '扣费测试页面',data:d});
}

/* GET home page. */
router.get('/', function(req, res, next) {

    async.waterfall([
        function(callback){
            connection.query('select * from yxxt_user_balance',null,callback);
        },
        function(err,result,callback){
            callback(result,err);
        }
    ],function(err,result){
        res.render('index', { title: '用户详细信息',data:result});
    });
});

module.exports = router;
