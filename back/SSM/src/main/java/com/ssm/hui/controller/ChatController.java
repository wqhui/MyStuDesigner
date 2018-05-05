package com.ssm.hui.controller;

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
 * @date 创建时间：2018年5月2日 下午2:31:18 吴清辉新建
 * @version 1.0 
 **/
@Controller
@RequestMapping("/chat")
public class ChatController extends BaseController {
	
	@RequestMapping("/question")
	@ResponseBody
	public Object chatQuestion(String question,HttpServletRequest request){
		ModelMap mm=this.getModelMap();	
		String ip=this.getIpAddr(request);
		JSONObject requestMsgByTL=this.requestMsgByTL("1000");
		String jsonStr=this.httpPost(requestMsgByTL);
		JSONObject jo=JSONObject.fromObject(jsonStr);
		JSONArray ja=(JSONArray) jo.get("results");
		if(ja!=null){
			JSONObject jaResult=(JSONObject) ja.get(0);
			JSONObject jaRjo=(JSONObject) jaResult.get("values");
			String resultStr=jaRjo.get("text").toString();				
			
			if(resultStr.substring(0,1).equals("[") && resultStr.substring(1,2).equals("{")){//是否自定义格式的数组
				JSONArray phoneArray=JSONArray.fromObject(resultStr);
				mm.addAttribute("result",phoneArray);
			}else{
				mm.addAttribute("result",resultStr);
			}
			
		}		
		mm.addAttribute("ip", ip);
		return mm;
	}
}
