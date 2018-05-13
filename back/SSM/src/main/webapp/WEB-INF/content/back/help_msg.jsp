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
function deleteHelpMsg(id){
	$.ajax({	
    	url:'${pageContext.request.contextPath}/help/deleteHelpMsg',
    	type:'POST',
    	data:{
			helpId:id
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

//修改帮助信息
function updateHelpMsg(helpId){
	$('#win').dialog({
		width:500,
		height:400,
		title:'修改帮助信息',
		cache:false,
		content:'<iframe src="${pageContext.request.contextPath}/back/mv/help_msg_add?_id='+helpId+'" frameborder="0" width="100%" height="100%"/>'			
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
	    url:'${pageContext.request.contextPath}/help/getHelpPageList',
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
	    	text:'添加',
	    	iconCls:'icon-add',
	    	handler:function(){
	    		//添加帮助信息
	    		$('#win').dialog({
	    			width:500,
	    			height:400,
	    			title:'添加帮助信息',
	    			cache:false,
	    			content:'<iframe src="${pageContext.request.contextPath}/back/mv/help_msg_add" frameborder="0" width="100%" height="100%"/>'
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
	        {field:'helpTitle',title:'标题',width:'35%'},
	        {field:'helpContent',title:'内容',width:'50%'},
	        {field:'otherRemark',title:'操作',width:'15%',align:'center',formatter:function(value,row,index){
      		  return "<a  href='#' onclick='updateHelpMsg("+row.helpId+")' class='easyui-linkbutton merger-btn' data-options=iconCls:'icon-edit' style='text-decoration:none margin-right:5px'>修改</a>"
      		  		+"<a  href='#' onclick='deleteHelpMsg("+row.helpId+")' class='easyui-linkbutton delete-btn' data-options=iconCls:'icon-cancel' style='text-decoration:none margin-right:5px'>删除</a>"
      				+"<a  href='#' onclick='seeDetailView("+index+")' class='easyui-linkbutton search-btn' data-options=iconCls:'icon-search' style='text-decoration:none'>预览</a>";
      	}} 
	    ]],
	    view: detailview, 
	    detailFormatter: function(rowIndex, rowData){ 
	    return '<table><tr>' + 
	    '<td rowspan=2 style="border:0"></td>' + 
	    '<td style="border:0">' +
	    '<p><strong>标题: </strong>' + rowData.helpTitle + '</p>' + 
	    '<p><strong>内容: </strong>' + rowData.helpContent + '</p>' + 
	    '</td>' + 
	    '</tr></table>'; 
	    }, 
	    emptyMsg:'<span style="color:red">暂无数据</span>',
	    onLoadSuccess:function(){
	    	$("a.merger-btn").linkbutton(); 
	    	$("a.delete-btn").linkbutton(); 
	    	$("a.search-btn").linkbutton();
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