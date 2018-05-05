 <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>main menu</title>	
</head>
<body>
	<ul id="menu">
	</ul>
	<script type="text/javascript">
		$(function() {
			$.ajax({	
		    	url:'${pageContext.request.contextPath}/menu/getMenu',
		    	type:'POST',
		    	data:{

		    	},
		    	success:function(data){ 
		    		if(data.pd===true){
		    			setMenu(data.result)
		    		}
		    		
		    		if(data.pd===false && data.msg){
		    			console.warn(data.msg);
		    			$.messager.confirm('提示','未登录，点击确定登录',function(r){    
		    			    if (r){    
		    			    	location.href="${pageContext.request.contextPath}/back/login"
		    			    }    
		    			});  
		    		}
		    	},
		    	error:function(data){  
					alert("未知错误，请重试！")	
		    	}
		    })			
		});
		
		function setMenu(data){
			$("#menu").tree({
				data: data,
				lines:true,
				onClick : function(node) {
					if (!node.children) {//是叶子节点
						addNewTab(node.text,'${pageContext.request.contextPath}'+ node.url);
					}else{
						$("#menu").tree('toggle',node.target); 
					}
				}
			});
		}
		
	</script>
</body>
</html>