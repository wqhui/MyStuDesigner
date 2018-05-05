<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<%@include file="../../public/back_head.jspf"%>
<style>
.datagrid-row{
	height:30px;
}
</style>
<script type="text/javascript" >
var ADMIN_NAME = '${adminLoginName}' || ''; 
//删除信息
function deleteAdmin(id){
	$.ajax({	
    	url:'${pageContext.request.contextPath}/admin/deleteAdmin',
    	type:'POST',
    	data:{
			adminId:id
    	},
    	success:function(data){ 
    		if(data.pd===true){
    			showDialog("删除成功！");
    			reloadData()
    		}else{
    			showDialog("删除失败，请确认已经登录后重试！")
    		}
    	},
    	error:function(data){  
			alert("请求出错！")	
    	}
    })
}

//修改信息
function updateAdmin(adminId){
	$('#win').dialog({
		width:500,
		height:200,
		title:'修改密码',
		cache:false,
		content:'<iframe src="${pageContext.request.contextPath}/back/mv/admin_update?_id='+adminId+'" frameborder="0" width="100%" height="100%"/>'			
	});	
}

//关闭修改窗口
function closeWin(){
	$('#win').dialog("close")
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

//展开详情
function seeDetailView(index){
	$('#reForm').datagrid("expandRow",index);
}

//重新加载数据
function reloadData(){
	$('#reForm').datagrid("reload");
}


$(function(){
	$('#reForm').datagrid({    
	    url:'${pageContext.request.contextPath}/admin/getAdminList',
	    fitColumns:true,
	    fit:true,
	    striped:true,/*斑马线*/
	    nowarp:true,/*数据同一行*/ 
	    loadmsg:'请等待',
	    rownumbers:true,
	    singleSelect:true,
	    rownumbers:true,
	    /*分页*/
		//pagination:true,
		//pageNumber:1,
		//pageSize:15,
		//pageList:[15,30,50,100], 
		toolbar:[{
	    	id:'add',
	    	text:'添加',
	    	iconCls:'icon-add',
	    	handler:function(){
	    		//添加帮助信息
	    		$('#win').dialog({
	    			width:500,
	    			height:400,
	    			title:'添加用户信息',
	    			cache:false,
	    			content:'<iframe src="${pageContext.request.contextPath}/back/mv/admin_add" frameborder="0" width="100%" height="100%"/>'
	    		});
	    	}
	    }],
		loadFilter: function(data){
			if (data.pd==true){
				return data.result;
			} else {
				return [];
			}
		},
	    columns:[[
	        {field:'displayName',title:'用户名',width:'25%'},
	        {field:'loginName',title:'登录名',width:'25%'},
	        {field:'password',title:'密码',width:'35%',formatter:function(value,row,index){
	        	return "---"
	        }},
	        {field:'act',title:'操作',width:'15%',align:'center',formatter:function(value,row,index){
	        	var str="<a  href='#' onclick='deleteAdmin("+row.adminId+")' class='easyui-linkbutton delete-btn' data-options=iconCls:'icon-cancel' style='text-decoration:none margin-right:5px'>删除</a>";
	        	if(ADMIN_NAME==="root"){
	        		str="<a  href='#' onclick='updateAdmin("+row.adminId+")' class='easyui-linkbutton merger-btn' data-options=iconCls:'icon-edit' style='text-decoration:none margin-right:5px'>修改密码</a>"+str
	        	}
      		  return str;
      	}} 
	    ]],
	    emptyMsg:'<span style="color:red">暂无数据</span>',
	    onLoadSuccess:function(data){
	    	$("a.merger-btn").linkbutton(); 
	    	$("a.delete-btn").linkbutton(); 
	    }
	    
	    
	    
	    
	    
	});
	
})




</script>
</head>
<body>
   <table id="reForm"></table>
   <div id="win" data-options="collapsible:false,minimizable:false,maximizable:false,modal:true"></div> 
</body>
</html>