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
        <input id="helpTitle"  type="text" name="helpTitle" />   
    </div>   
    <div class="form-group">    
        <input id="helpContent" type="text" name="helpContent"/>   
    </div>  
    <div>
    	<a id="cancel-btn" href="#" onclick="clearForm()" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">重置</a>
    	<a id="submit-btn" href="#" onclick="submitForm()" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a>  
    </div>
</form>  
	</center> 
   
</body>
<script type="text/javascript">


$('#helpTitle').textbox({    
	height:45,
	width:470,
	label: '标题:' ,               
	labelPosition: 'top',
	required:true
})

$('#helpContent').textbox({    
	height:180,
	width:470,
	label: '内容:' ,               
	labelPosition: 'top',
	multiline:true,
	required:true
})
function submitForm(){
	$.messager.progress();	// 显示进度条

	$('#ff').form('submit', {    
	    url:"${pageContext.request.contextPath}/help/saveOrUpdateHelpMsg",  
	    novalidate:true,
	    onSubmit: function(param){   
	    	var isValid = $(this).form('validate');			
			if (!isValid){
				$.messager.progress('close');	// 如果表单是无效的则隐藏进度条
			}
	    	// return false to prevent submit; 
			return isValid;   
	          
	    },    
	    success:function(data){   
	    	$.messager.show({
	    		title:'提示',
	    		msg:'提交成功！',
	    		timeout:3000,
	    		showType:'slide',
	    	});
	    	$.messager.progress('close');	// 如果提交成功则隐藏进度条
	    	clearForm();//重置表单
	    	window.parent.reloadData();//重新加载

	    }    
	}); 	
}

function clearForm(){
	$('#ff').form('clear')
}
 

</script>
</html>