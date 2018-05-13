<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>后台管理</title>
 <%@include file="../../public/back_head.jspf" %>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/layout.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/layout.js" charset="UTF-8"></script>
<script type="text/javascript">
//	$(function(){
//		history.replaceState({},'','/back/main');
//	})
</script>
</head>
<body class="easyui-layout">
    <div id="divHeader" data-options="region:'north',border:false,href:'header'">
    </div>
    <div id="divMenuBar" data-options="region:'west',split:true,collapsed:false,title:'菜单栏',href:'menu'">
    </div>
    <div id="divFooter" data-options="region:'south',border:false,href:'footer'">
    </div>
    <div id="divContent" data-options="region:'center',title:false">
        <div id="tabs" class="easyui-tabs" data-options="fit:true,border:false">
            <div id="divTitleBar" title="默认页面">
            	<center><h1>欢迎进入后台管理页面</h1></center>
            </div>
        </div>
    </div>
</body>
</html>