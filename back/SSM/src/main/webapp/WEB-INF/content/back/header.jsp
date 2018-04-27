<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

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
                <div id="headerMenu" class="headerMenu">
                    <ul>
                        <li><a href="#" class="easyui-linkbutton" data-options="plain:true" onclick="exit()">安全退出</a></li>
                        <li><a href="javascript:void(0)" id="mb" class="easyui-menubutton"     
        						data-options="menu:'#mm',iconCls:'icon-man'">个人中心</a></li>                   
                        <li><a  class="easyui-linkbutton" data-options="plain:true" >您好，${adminDispalyName}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="mm">   
	    <div id="band" data-options="iconCls:'icon-undo'">测试</div> 
	</div>
    <script type="text/javascript">
    /*
	    $(document).ready( function(){
	    	
	    	$.post("${pageContext.request.contextPath}/back/resource/resourceAction_getDate" , function(data)
					{
						$("#today").append(data['date']);
					},
					// 指定服务器响应为JSON数据
					"json");
	    	
	    });
    */
		function exit(){
			$.messager.confirm('确认','您确认想要安全退出吗？',function(r){    
			    if (r){
					var url ='${pageContext.request.contextPath}/back/person/personAction_backExit.action';
					  $('<form method="post" action="' + url + '"></form>').appendTo('body').submit().remove();
			    	//$.post("${pageContext.request.contextPath}/hazard/exitAction_exit.action");
			    }    
			});
		}
	</script>
</body>
</html>