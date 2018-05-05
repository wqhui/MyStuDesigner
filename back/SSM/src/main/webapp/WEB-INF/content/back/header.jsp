<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>
<body>
 <%
  request.setCharacterEncoding("utf-8");
   %>
    <div class="header1">
        <div class="header2">
            <div class="logo">
                <strong>后台管理</strong>
            </div>
            <div class="contact">
                <div class="prompt">
                    <span id="today"></span>
                </div>
                <c:if test="${adminDispalyName !=null && adminDispalyName!=''}">
                <div id="headerMenu" class="headerMenu">
                    <ul>
                        <li><a href="#" class="easyui-linkbutton" data-options="plain:true" onclick="exit()">安全退出</a></li>
                        <li><a href="javascript:void(0)" id="mb" class="easyui-menubutton"     
        						data-options="menu:'#mm',iconCls:'icon-man'">个人中心</a></li>                   
                        <li><a  class="easyui-linkbutton" data-options="plain:true" >您好，${adminDispalyName}</a></li>
                    </ul>
                </div>
                 </c:if>
            </div>
        </div>
    </div>
    <div id="mm">   
	    <div id="updatePsw" data-options="iconCls:'icon-import'">修改密码</div> 
	</div>
	<div id="win" data-options="collapsible:false,minimizable:false,maximizable:false,modal:true"></div> 
    <script type="text/javascript">
		//提示
	    function showDialog(content){
	    	$.messager.show({
	    		title:'提示',
	    		msg:content,
	    		timeout:3000,
	    		showType:'slide',
	    	});
	    }
	    $(document).ready( function(){
	    	/*
	    	$.post("${pageContext.request.contextPath}/back/resource/resourceAction_getDate" , function(data)
					{
						$("#today").append(data['date']);
					},
					// 指定服务器响应为JSON数据
					"json");
	    	*/
	    	$('#updatePsw').click(function(){
	    		$('#win').dialog({
	    			width:500,
	    			height:200,
	    			title:'修改密码',
	    			cache:false,
	    			content:'<iframe src="${pageContext.request.contextPath}/back/mv/admin_update" frameborder="0" width="100%" height="100%"/>'			
	    		});		 
	    	});
	    	
	    });

		function exit(){
			$.messager.confirm('确认','您确认想要安全退出吗？',function(r){    
			    if (r){
					var url ='${pageContext.request.contextPath}/admin/logout';
					  $('<form method="post" action="' + url + '"></form>').appendTo('body').submit().remove();
			    	//$.post("${pageContext.request.contextPath}/hazard/exitAction_exit.action");
			    }    
			});
		}
	</script>
</body>
</html>