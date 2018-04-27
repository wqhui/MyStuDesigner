package com.ssm.hui.controller;

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
		mm.replace("pd", true);
		mm.addAttribute("result",ja);
		return mm;
	}
	
	@RequestMapping("/saveOrUpdateHelpMsg")
	@ResponseBody
	public Object saveOrUpdateHelpMsg(String helpId,String helpTitle,String helpContent){
		if(helpId!=null){
			
		}
		ModelMap mm=this.getModelMap();	
		HelpMsg hm=new HelpMsg();
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
}
