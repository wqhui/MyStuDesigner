package com.ssm.hui.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.hui.controller.base.BaseController;
import com.ssm.hui.domain.HelpMsg;

import net.sf.json.JSONArray;

/** 
 * @author hui 
 * @date 创建时间：2018年4月26日 下午5:11:35 吴清辉新建
 * @version 1.0 
 **/
@Controller
@RequestMapping("/help")
public class HelpMsgController extends BaseController{
	
	@RequestMapping("/getHelpList")
	@ResponseBody
	public Object getHelpList(){
		ModelMap mm=this.getModelMap();	
		JSONArray ja=helpMsgService.getHlepMsgList();
		if(ja==null){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("result",ja);
		return mm;
	}
	
	@RequestMapping("/saveOrUpdateHelpMsg")
	@ResponseBody
	public Object saveOrUpdateHelpMsg(String helpId,String helpTitle,String helpContent){
		ModelMap mm=this.getModelMap();	
		HelpMsg hm=new HelpMsg();
		hm.setHelpId(Integer.parseInt(helpId));
		hm.setHelpTitle(helpTitle);
		hm.setHelpContent(helpContent);		
		String msg=helpMsgService.saveOrUpdateHelpMsg(hm);
		if(msg.equals("error")){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
	@RequestMapping("/deleteHelpMsg")
	@ResponseBody
	public Object deleteHelpMsg(String helpId,HttpServletRequest request){
		ModelMap mm=this.getModelMap();	
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		if(helpId==null){
			mm.addAttribute("msg","id is null");
			return mm;
		}
		HelpMsg hm=new HelpMsg();
		hm.setHelpId(Integer.parseInt(helpId));
		String msg=helpMsgService.deleteHelpMsg(hm);
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
	@RequestMapping("/getHelpMsgById")
	@ResponseBody
	public Object getHelpMsgById(String helpId,HttpServletRequest request){		
		ModelMap mm=this.getModelMap();	
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		if(helpId==null){
			mm.addAttribute("msg","id is null");
			return mm;
		}
		HelpMsg hm=new HelpMsg();
		hm.setHelpId(Integer.parseInt(helpId));
		HelpMsg helpMsg=helpMsgService.getHelpMsgById(hm);
		if(helpMsg!=null){
			mm.replace("pd", true);
		}		
		mm.addAttribute("result",helpMsg);
		return mm;
	}
	
}
