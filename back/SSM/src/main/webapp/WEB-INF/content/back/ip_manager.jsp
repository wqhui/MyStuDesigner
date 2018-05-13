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
 
//删除帮助信息
function deleteIpMsg(id){
	$.ajax({	
    	url:'${pageContext.request.contextPath}/ip/deleteIpMsg',
    	type:'POST',
    	data:{
			ipId:id
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

//修改
function updateIpMsg(ipId,isBan,count){
	if(count==0){//重置次数
		
	}else{
		
	}
	
	$.ajax({	
    	url:'${pageContext.request.contextPath}/ip/saveOrUpdateIpMsg',
    	type:'POST',
    	data:{
			ipId:ipId,
			isBan:isBan,
			ipCount:count			
    	},
    	success:function(data){ 
    		if(data.pd===true){
    			showDialog("操作成功！");
    			reloadData()
    		}else{
    			showDialog("操作失败，请重试！")
    		}
    	},
    	error:function(data){  
			alert("请求出错！")	
    	}
    })
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



//重新加载数据
function reloadData(){
	$('#reForm').datagrid("reload");
}


$(function(){
	$('#reForm').datagrid({    
	    url:'${pageContext.request.contextPath}/ip/getIpMsgPageList',
	    fitColumns:true,
	    fit:true,
	    striped:true,/*斑马线*/
	    nowarp:true,/*数据同一行*/ 
	    loadmsg:'请等待',
	    rownumbers:true,
	    singleSelect:true,
	    rownumbers:true,
	    /*分页*/
		pagination:true,
		pageNumber:1,
		pageSize:15,
		pageList:[15,30,50,100], 
		toolbar:[{
	    	id:'add',
	    	text:'添加封禁IP',
	    	iconCls:'icon-add',
	    	handler:function(){
	    		$('#win').dialog({
	    			width:250,
	    			height:150,
	    			title:'添加封禁IP',
	    			cache:false,
	    			content:'<iframe src="${pageContext.request.contextPath}/back/mv/ip_add" frameborder="0" width="100%" height="100%"/>'
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
	        {field:'ipAddress',title:'IP地址',width:'30%'},
	        {field:'ipCount',title:'访问次数',width:'20%'},
	        {field:'ban',title:'禁止访问',width:'20%',formatter:function(value,row,index){
	        	var str='<input class="easyui-switchbutton" data-options="onText:\'是\',offText:\'否\'"';
	        	if(value==true){
	        		str+='readonly checked>';
	        	}else{
	        		str+='readonly uncheck>';
	        	}
	        	 
	        	return str;
	        }},
	        {field:'otherRemark',title:'操作',width:'30%',align:'center',formatter:function(value,row,index){
	        	var str="<a  href='#' onclick='updateIpMsg("+row.ipId+','+row.ban+','+0+")' class='easyui-linkbutton merger-btn' data-options=iconCls:'icon-reload' style='margin-right:5px'>重置访问次数</a>";
	        	if(row.ban==true){
	        		str+="<a  href='#' onclick='updateIpMsg("+row.ipId+','+false+','+-1+")' class='easyui-linkbutton merger-btn' data-options=iconCls:'icon-ok' style='margin-right:5px'>启用</a>";
	        	}else{
	        		str+="<a  href='#' onclick='updateIpMsg("+row.ipId+','+true+','+-1+")' class='easyui-linkbutton merger-btn' data-options=iconCls:'icon-no' style='margin-right:5px'>禁用</a>";
	        	}
	        	
	        	str+="<a  href='#' onclick='deleteIpMsg("+row.ipId+")' class='easyui-linkbutton delete-btn' data-options=iconCls:'icon-cancel'>删除</a>";
      		  	return str;
      		  		
      	}} 
	    ]],
	    emptyMsg:'<span style="color:red">暂无数据</span>',
	    onLoadSuccess:function(){
	    	$("a.merger-btn").linkbutton(); 
	    	$("a.delete-btn").linkbutton(); 
	    	$("a.search-btn").linkbutton();
	    	$("input.easyui-switchbutton").switchbutton();
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