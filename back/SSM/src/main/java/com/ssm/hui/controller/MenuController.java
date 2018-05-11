package com.ssm.hui.controller;

import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.hui.controller.base.BaseController;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
 * @author hui 
 * @date 创建时间：2018年4月26日 下午4:00:32 吴清辉新建
 * @version 1.0 
 **/
@Controller
@RequestMapping("/menu")
public class MenuController  extends BaseController{
	
	@RequestMapping("/getMenu")
	@ResponseBody
	public Object getMenu(HttpServletRequest request){
		ModelMap mm=this.getModelMap();
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;	
		}				
		String menuStringArray= "[{id:\"1\",text:\"管理员管理\",url:\"/back/admin_manager\"},{id:\"2\",text:\"帮助信息管理\",url:\"/back/help_msg\"},{id:\"3\",text:\"手机信息管理\",url:\"/back/phone_manager\"},{id:\"4\",text:\"IP信息管理\",url:\"/back/ip_manager\"}]";
		JSONArray ja=JSONArray.fromObject(menuStringArray);
		mm.replace("pd", true);
		mm.addAttribute("result",ja);
		return mm;	
	}
}
