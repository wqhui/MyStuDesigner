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
function deletePhone(id){
	$.ajax({	
    	url:'${pageContext.request.contextPath}/phone/deletePhone',
    	type:'POST',
    	data:{
			phoneId:id
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
function updatePhone(phoneId){
	$('#win').dialog({
		width:700,
		height:570,
		title:'修改帮助信息',
		cache:false,
		content:'<iframe src="${pageContext.request.contextPath}/back/mv/phone_add?_id='+phoneId+'" frameborder="0" width="100%" height="100%"/>'			
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
	    url:'${pageContext.request.contextPath}/phone/getPhoneList',
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
	    			width:700,
	    			height:570,
	    			title:'添加帮助信息',
	    			cache:false,
	    			content:'<iframe src="${pageContext.request.contextPath}/back/mv/phone_add" frameborder="0" width="100%" height="100%"/>'
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
	        {field:'phoneName',title:'手机名',width:'15%'},
	        {field:'phonePrice',title:'价格',width:'15%',formatter:function(value,row,index){
	        	var val=value+"";
	        	
	        	var ary=val.split('.');
	        	if(ary.length==1){//没有小数点，
	        		val=val+".00"
	        	}
	        	if(ary.length==2){//有小数点
	        		var ary1=ary[1];
	        		var j=2-ary1.length;//少了几个0
	        		if(j=1){
	        			val+="0";
	        		}
	        	}

	        	return '￥'+val;
	        }},
	        {field:'advantage',title:'优势',width:'20%'},
	        {field:'disadvantage',title:'劣势',width:'20%'},
	        {field:'links',title:'链接',width:'15%'},
	        {field:'otherRemark',title:'操作',width:'15%',align:'center',formatter:function(value,row,index){
      		  return "<a  href='#' onclick='updatePhone("+row.phoneId+")' class='easyui-linkbutton merger-btn' data-options=iconCls:'icon-edit' style='text-decoration:none margin-right:5px'>修改</a>"
      		  		+"<a  href='#' onclick='deletePhone("+row.phoneId+")' class='easyui-linkbutton delete-btn' data-options=iconCls:'icon-cancel' style='text-decoration:none margin-right:5px'>删除</a>"
      				+"<a  href='#' onclick='seeDetailView("+index+")' class='easyui-linkbutton search-btn' data-options=iconCls:'icon-search' style='text-decoration:none'>预览</a>";
      	}} 
	    ]],
	    view: detailview, 
	    detailFormatter: function(rowIndex, rowData){ 
	    return '<table><tr>' + 
	    '<td rowspan=2 style="border:0"></td>' + 
	    '<td style="border:0">' +
	    '<p><strong>优势: </strong>' + rowData.advantage + '</p>' + 
	    '<p><strong>劣势: </strong>' + rowData.disadvantage + '</p>' + 
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