<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<%@include file="../../public/back_head.jspf"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/md5.js"></script>    
<style>
	.form-group{
		margin-bottom:15px;
	}
</style>
</head>
<body>
  	<center>
		<form id="ff" method="post">   
    <div class="form-group">   
        <input id="displayName"  type="text" name="displayName" />   
    </div>   
    <div class="form-group">    
        <input id="loginName" type="text" name="loginName"/>   
    </div>  
    <div class="form-group">    
        <input id="password" type="text" name="password110"/>   
    </div> 
    <div class="form-group">    
        <input id="password2" type="text" name="password120"/>   
    </div>  
    <div>
    	<a id="cancel-btn" href="#" onclick="clearForm()" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">重置</a>
    	<a id="submit-btn" href="#" onclick="submitForm()" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a>  
    </div>
</form>  
	</center> 
   
</body>
<script type="text/javascript">

//extend the 'equals' rule    
$.extend($.fn.validatebox.defaults.rules, {    
    equals: {    
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message: '两次输入密码不一致'   
    }    
});  
var isNew=true;
var adminId = '${_id}' || 0;
if(adminId!="" && adminId!=0){
	isNew=false;
}

//提示
function showDialog(content){
	$.messager.show({
		title:'提示',
		msg:content,
		timeout:3000,
		showType:'slide',
	});
}

function getAdminById(){
	$.ajax({	
    	url:'${pageContext.request.contextPath}/admin/getAdminById',
    	type:'POST',
    	data:{
			adminId:adminId
    	},
    	success:function(data){ 
    		if(data.pd===true){
    			$('#displayName').textbox("setValue",data.result.displayName)	
    			$('#loginName').textbox("setValue",data.result.loginName)	
    		}else{
    			showDialog("未查询到该数据，请确定已经登录！")
    		}
    	},
    	error:function(data){  
			alert("请求出错！")	
    	}
    })	
}

$(function() {
	$('#displayName').textbox({    
		height:45,
		width:470,
		label: '用户名:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
	})

	$('#loginName').textbox({    
		width:470,
		label: '登录名:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
		validType:'remote["${pageContext.request.contextPath}/admin/isLoginNameDone","loginName"]',
		invalidMessage:'登录名已经被使用'
	})	
	
	$('#password').passwordbox({    
		height:45,
		width:470,
		label: '密码:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
	})
	
	$('#password2').passwordbox({    
		height:45,
		width:470,
		label: '重复密码:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		validType:'equals["#password"]', 
		tipPosition:'top',
	})
	
	if(isNew===false){//如果修改
		getAdminById();		
	}
	
});


function submitForm(){
	$.messager.progress();	// 显示进度条

	$('#ff').form('submit', {    
	    url:"${pageContext.request.contextPath}/admin/saveOrUpdateAdmin",  
	    novalidate:true,
	    onSubmit: function(param){   
	    	param.adminId=adminId;	    	
	    	param.password=calcMD5($("#password").val());
	    	var isValid = $(this).form('validate');			
			if (!isValid){
				$.messager.progress('close');	// 如果表单是无效的则隐藏进度条
			}
	    	// return false to prevent submit; 
			return isValid;   
	          
	    },    
	    success:function(data){  
	    	$.messager.progress('close');	// 如果提交成功则隐藏进度条
	    	var dataJson=eval('(' + data + ')')
	    	if(dataJson.pd===true && dataJson.msg=="ok"){		    	
		    	window.parent.showDialog("操作成功！");
		    	window.parent.reloadData();//重新加载
	    		if(isNew===false){	    			
	    			window.parent.closeWin();
	    			return;
	    		}
		    	clearForm();//重置表单
	    	}else if(dataJson.msg=="reject"){
	    		window.parent.showDialog("登录名已被使用！");	
	    	}else{
	    		window.parent.showDialog("操作失败！");
	    	}

	    }    
	}); 	
}

function clearForm(){
	$('#ff').form('clear')
}
 

</script>
</html>