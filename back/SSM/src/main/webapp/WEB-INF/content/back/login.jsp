<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="../../public/website-head.jspf"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/md5.js"></script>    
<title>登录</title>
<script type="text/javascript">
	$(function(){
		history.replaceState({},'','/SSM/back/login');
		var LOGIN = '${adminDispalyName}' || '';
		if(LOGIN!=''){
			error1Msg("已经登录，跳转后台管理");
			location.href="${pageContext.request.contextPath}/back/main";
		}
	})
</script>
</head>
<body>
    <div class="container-fluid login_area">
    	<div class="row top_area" id="topArea">
            <div class="col-xs-12">
				
            </div>    
        </div>
        <div class="row bottom_area" id="bottomArea">
            <div class="col-xs-12">
				
            </div>    
        </div>
     </div> 
    
     <div class="container lr_box login_box" id="loginBox">
     	<div class="row">
            <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 lr_box_content">
            	 <div class="logo-icon"></div>
				<div class="row box_title">
					<div class="col-xs-12">
						<h3>后台登录</h3>
					</div>
				</div>
				<div id="error1" style="display:none">
                        <div><p class="bg-danger" style="padding:5px;"></p>   </div>
                                        
                </div>
				<div class="row box_content">
					<div class="col-xs-12">
						<form>
						  <div class="form-group">
						    <input type="text" class="form-control" id="loginUsername" placeholder="用户名">
						  </div>
						  <div class="form-group">
						    <input type="password" class="form-control" id="loginPassword" placeholder="密码">
						  </div>						  
						</form>	
					</div>
					<!--  
					<div class="col-xs-6">
						<a id="toRegister" class="btn btn-default" role="button">
							<span class="glyphicon glyphicon-chevron-left"></span>前往注册						
						</a>
						<span class="glyphicon glyphicon-ok"></span>
					</div>
					-->
					<div class="col-xs-12">
						<a id="loginBtn" class="btn btn-default rightBtn" role="button">
							登录
						</a>
					</div>
					<div class="col-xs-12" style="text-align:center">
						&copy;Designed by WuQinghui
					</div>
				</div>
            </div>    
        </div>
     </div>  
     
      <div class="container lr_box register_box" id="registerBox">
     	<div class="row">
            <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 lr_box_content">
				<div class="row box_title">
					<div class="col-xs-12">
						<h3>注册</h3>
					</div>
				</div>
				<div id="error2" style="display:none">
                        <div><p class="bg-danger" style="padding:5px;"></p>   </div>
                                        
                </div>
				<div class="row box_content">
					<div class="col-xs-12">
						<form>
						  <div class="form-group">
						    <input type="text" class="form-control" id="registerUsername" placeholder="用户名">
						  </div>
						  <div class="form-group">
						    <input type="password" class="form-control" id="registerPassword" placeholder="密码">
						  </div>						  
						</form>	
					</div>
					<div class="col-xs-6">
						<a id="toLogin" class="btn btn-default" role="button">
							<span class="glyphicon glyphicon-chevron-left"></span>前往登录
						</a>
					</div>
					<div class="col-xs-6">
						<a id="registerBtn" class="btn btn-default rightBtn" role="button">
							注册<span class="glyphicon glyphicon-ok"></span>
						</a>
					</div>
				</div>
            </div>    
        </div>
     </div>
     
</body>

<script type="text/javascript">
	$(function(){
		var h=document.documentElement.clientHeight ;
		$('#topArea').css("height",0.65*h);
		$('#bottomArea').css("height",0.35*h)
		$('.lr_box').css("top",0.4*h)
	})
	
	//==跳转注册框
	$('#toRegister').click(function(){
		  $('#loginBox').css('display','none')//隐藏登录框
		  $('#registerBox').fadeIn('slow');
	});
	
	//==注册
	$('#registerBtn').click(function(){
		var username=$('#registerUsername').val();
		var password=$('#registerPassword').val();
	    if(username=="" || password==""){
	    	error2Msg("密码和用户名不能为空！");//错误提示
	    }else{
			$.ajax({	
		    	url:'${pageContext.request.contextPath}/user/register',
		    	type:'POST',
		    	data:{
					username:username,
					password:calcMD5(password)
		    	},
		    	success:function(data){ 
		    		var msg=data.msg;
					if(msg=="ok"){
						alert("添加成功！")		
					}else if(msg=="exist"){
						error2Msg("用户已存在！");//错误提示	
					}else if(msg=="error"){
						alert("添加出错，请重试！")		
					}	
		    	},
		    	error:function(data){  
					alert("未知错误，请重试！")	
		    	}
		    })	
	    }	 
	});
	
	//==error2 错误提示内容处理
	function error2Msg(content){
    	$("#error2 p").html(content);
    	$('#error2').fadeIn('slow');
		setTimeout(function(){
			$('#error2').fadeOut('slow');
		},2000)	
	}
	
	//==跳转登录框
	$('#toLogin').click(function(){
		  $('#registerBox').css('display','none')//隐藏注册框
		  $('#loginBox').fadeIn('slow');//显示登录框
	});
	
	//回车登录
	$(document).keydown(function(event){
	　　if (event.keyCode == "13") {	　　　　
	　　　　$('#loginBtn').click();
	　　}
	});
	
	//==登录
	$('#loginBtn').click(function(){
		var username=$('#loginUsername').val();
		var password=$('#loginPassword').val();
	    if(username=="" || password==""){
	    	error1Msg("密码和用户名不能为空！");//错误提示
	    }else{
			$.ajax({	
		    	url:'${pageContext.request.contextPath}/admin/login',
		    	type:'POST',
		    	data:{
					loginName:username,
					password:calcMD5(password)
		    	},
		    	success:function(data){ 
		    		var pd=data.pd;
		    		if(pd===true){
		    			var msg= data.result.msg;	
						if(msg=="ok"){
							location.href="${pageContext.request.contextPath}/back/main"
						}else if(msg=="no"){
							error1Msg("用户不存在！");//错误提示	
						}else if(msg=="nook"){
							error1Msg("密码错误，请重试！");//错误提示	
						}else if(msg=="error"){
							alert("出错，请重试！")		
						}	
		    		}else{
		    			error1Msg("出错了："+data.error);//错误提示	
		    		}

		    	},
		    	error:function(data){  
					alert("请求出错！")	
		    	}
		    })	
	    }
	});
	

	
	//==error1 错误提示内容处理
	function error1Msg(content){
    	$("#error1 p").html(content);
    	$('#error1').fadeIn('slow');
		setTimeout(function(){
			$('#error1').fadeOut('slow');
		},2000)	
	}

</script>

</html>