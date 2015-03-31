/**
 * Created by xkorey on 2015/3/23.
 */
function goto(id){
    window.location.href='/d/'+id;
}


$(function () {
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
})