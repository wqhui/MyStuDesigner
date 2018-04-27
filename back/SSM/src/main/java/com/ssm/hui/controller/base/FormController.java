package com.ssm.hui.controller.base;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/** 
 * 动态页面控制跳转器
 * @author hui 
 * @date 创建时间：2017年9月2日 下午3:58:33 吴清辉新建
 * @version 1.0 
 **/
@Controller
public class FormController {                            
	@RequestMapping(value="/{jspName}")
	public String skipForm(@PathVariable String jspName){
		System.out.println("jspName:"+jspName);
		return jspName;
	}
	@RequestMapping(value="/")
	public String welcomeForm(){
		return "index";
	}
	@RequestMapping(value="/back/{jspName}")
	public String skipBackForm(@PathVariable String jspName){
		jspName="/back/"+jspName;
		System.out.println("jspName:"+jspName);
		return jspName;
	}
}
