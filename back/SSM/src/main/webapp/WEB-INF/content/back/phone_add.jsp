<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<%@include file="../../public/back_head.jspf"%>

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
		        <input id="phoneName"  type="text" name="phoneName" />   
		    </div>   
		    <div class="form-group">    
		        <input id="phonePrice" type="text" name="phonePrice"/>   
		    </div>
		    <div class="form-group">   
		        <input id="advantage"  type="text" name="advantage" />   
		    </div>   
		    <div class="form-group">    
		        <input id="disadvantage" type="text" name="disadvantage"/>   
		    </div> 
		    <div class="form-group">   
		        <input id="links"  type="text" name="links" />   
		    </div>     
		    <div>
		    	<a id="cancel-btn" href="#" onclick="clearForm()" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">重置</a>
		    	<a id="submit-btn" href="#" onclick="submitForm()" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a>  
		    </div>
		</form>  
	</center> 
   
</body>
<script type="text/javascript">
var IS_NEW=true;
var PHONE_ID = '${_id}' || 0;
if(PHONE_ID!="" && PHONE_ID!=0){
	IS_NEW=false;
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

function getPhoneById(){
	$.ajax({	
    	url:'${pageContext.request.contextPath}/phone/getPhoneById',
    	type:'POST',
    	data:{
			phoneId:PHONE_ID
    	},
    	success:function(data){ 
    		if(data.pd===true){
    			$('#phoneName').textbox("setValue",data.result.phoneName)	
    			$('#phonePrice').textbox("setValue",data.result.phonePrice)	
    			$('#advantage').textbox("setValue",data.result.advantage)	
    			$('#disadvantage').textbox("setValue",data.result.disadvantage)	
    			$('#links').textbox("setValue",data.result.links)	
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
	$('#phoneName').textbox({    
		height:45,
		width:600,
		label: '手机名:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
	})
	$('#phonePrice').numberbox({    
		height:45,
		width:600,
		label: '价格:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
		precision:2,
		filter:function(e){
			var keyCode=e.keyCode;
			console.log(keyCode)
			if(keyCode==46 || (keyCode >=49 && keyCode<=57)){
				return true;
			}
			return false;
		}
	})

	$('#advantage').textbox({    
		height:135,
		width:600,
		label: '优势:' ,               
		labelPosition: 'top',
		multiline:true,
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top'
	})
	
	$('#disadvantage').textbox({    
		height:135,
		width:600,
		label: '劣势:' ,               
		labelPosition: 'top',
		multiline:true,
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
	})	
	
	$('#links').textbox({    
		height:45,
		width:600,
		label: '链接:' ,               
		labelPosition: 'top',
		required:true,
		missingMessage:"不能为空",
		tipPosition:'top',
	})
	
	if(IS_NEW===false){//如果修改
		getPhoneById();		
	}
	
});


function submitForm(){
	$.messager.progress();	// 显示进度条

	$('#ff').form('submit', {    
	    url:"${pageContext.request.contextPath}/phone/saveOrUpdatePhone",  
	    novalidate:true,
	    onSubmit: function(param){   
	    	param.phoneId=PHONE_ID;
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
	    		if(IS_NEW===false){	    			
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