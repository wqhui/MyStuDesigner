package com.ssm.hui.controller;

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
	public Object getMenu(){
		ModelMap mm=this.getModelMap();
		JSONArray ja=new JSONArray();
		for(int i=1;i<3;i++){
			JSONObject jo=new JSONObject();
			jo.put("id", i);
			jo.put("text","node" +i);
			jo.put("url", i);
			
			if(i==1){
				JSONArray ja2=new JSONArray();
				JSONObject jo2=new JSONObject();
				jo2.put("id", i+100);
				jo2.put("text","node" +i);
				jo2.put("url", "/back/help_msg");
				ja2.add(jo2);					
				jo.put("state","closed");
				jo.put("children",ja2);
			}
			  
			ja.add(jo);
		}
		mm.replace("pd", true);
		mm.addAttribute("result",ja);
		return mm;	
	}
}
