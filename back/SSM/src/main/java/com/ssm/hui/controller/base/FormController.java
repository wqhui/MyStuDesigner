package com.ssm.hui.controller.base;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/** 
 * 动态页面控制跳转器
 * @author hui 
 * @date 创建时间：2017年9月2日 下午3:58:33 吴清辉新建
 * @version 1.0 
 **/
@Controller
public class FormController extends BaseController{  
	
	@RequestMapping(value="/{jspName}")
	public String skipForm(@PathVariable String jspName){
		return jspName;
	}
	
	@RequestMapping(value="/")
	public String welcomeForm(){
		return "index";
	}
	
	@RequestMapping(value="/back/{jspName}")
	public String skipBackForm(@PathVariable String jspName){
		jspName="/back/"+jspName;		
		return jspName;
	}
	
	@RequestMapping(value="/back/mv/{jspName}")
	public Object skipBackFormById(@PathVariable String jspName,String _id){
		ModelAndView mav=this.getModelAndView();
		mav.addObject("_id", _id);	
		jspName="/back/"+jspName;	
		mav.setViewName(jspName);
				
		return mav;
	}
	
}
