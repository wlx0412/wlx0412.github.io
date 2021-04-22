
let prodUrl = "http://www.wlxwyx.com/testflight";
let devUrl = "http://192.168.1.188:8080/testflight";
let isDev = false;
let intervalId = null;
let countDownTime = 60;

$(".toggle").on("click", function () {
  $(".container").stop().addClass("active");
});

$(".close").on("click", function () {
  $(".container").stop().removeClass("active");
});

function request(path, type, data, callback) {
  $.ajax({
    url: (isDev ? devUrl : prodUrl) + path,
    headers:{'Content-Type':'application/json;charset=utf8'},
    type: type == 1 ? "POST" : "GET",
    data: data,
    success: function(data) {
      callback(data);
    }});
}

$(".verifyCode").on("click", function(){
  if (countDownTime != 60) {
    return;
  }

  let phone = $("#phone").val();
 
  // console.log("phone:", phone, "pwd:", pwd, "code:", code);
    request("/sms", 0, {phone: phone}, function(data){
      alert(data.msg)
      intervalId = setInterval(() => {
        countDown()
      }, 1000);
    })
})

//倒计时
function countDown(){
  if (countDownTime <= 1) {
    countDownTime = 60;
    $(".verifyCode").html("获取验证码");
    clearInterval(intervalId);
    return;
  }
  countDownTime -= 1;
  $(".verifyCode").html(countDownTime + "秒");
}

function register() {
  let phone = $("#phone").val();
  let pwd = $("#register_pwd").val();
  let code = $("#verify_code").val();
  // console.log("phone:", phone, "pwd:", pwd, "code:", code);
  if (phone.length != 11) {
    alert("请输入正确的手机号")
    return;
  }

  if (pwd.length < 6 || pwd.length > 16) {
    alert("密码为6~16位")
    return;
  }

  if (code.length != 4) {
    alert("请输入正确的验证码")
    return;
  }

  $(".container").stop().removeClass("active");
}
