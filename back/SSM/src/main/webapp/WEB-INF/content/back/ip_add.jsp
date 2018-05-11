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
		        <input id="ipAddress"  type="text" name="ipAddress" />   
		    </div>     
		    <div>
		    	<a id="cancel-btn" href="#" onclick="clearForm()" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">重置</a>
		    	<a id="submit-btn" href="#" onclick="submitForm()" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a>  
		    </div>
		</form>  
	</center> 
   
</body>
<script type="text/javascript">

$(function() {
	$('#ipAddress').textbox({    
		height:45,
		width:200,
		label: '封禁IP:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
	})

	
});


function submitForm(){

	$('#ff').form('submit', {    
	    url:"${pageContext.request.contextPath}/ip/saveOrUpdateIpMsg",  
	    novalidate:true,
	    onSubmit: function(param){  
	    	param.ipCount=0;//构造一下
	    	param.isBan=true;//构造一下
	    	var isValid = $(this).form('validate');			
	    	// return false to prevent submit; 
			return isValid;   
	          
	    },    
	    success:function(data){  
	    	var dataJson=eval('(' + data + ')')
	    	if(dataJson.pd===true && dataJson.msg=="ok"){		    	
		    	window.parent.showDialog("操作成功！");
		    	window.parent.reloadData();//重新加载
	    		if(isNew===false){	    			
	    			window.parent.closeWin();
	    			return;
	    		}
		    	clearForm();//重置表单
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