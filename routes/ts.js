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

router.get('/:id*', function(req, res, next) {
    async.waterfall([
        function(callback){
            return connection.query('select * from yxxt_user_balance where id=?', [req.params.id],callback);
        },
        function(err,result,callback){
            if(!err[0]){
                err=[{id:"0"}];
            }
            return callback(result,err);
        }
    ],function(err,result){
        res.render('test', { title: '预生成SQL测试',data:result});
    });
});

module.exports = router;