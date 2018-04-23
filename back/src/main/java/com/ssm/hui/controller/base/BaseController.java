package com.ssm.hui.controller.base;

import javax.annotation.Resource;

import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import com.ssm.hui.service.AdminService;
import com.ssm.hui.service.UserService;

/** 
 * @author hui 
 * @date 创建时间：2017年9月2日 下午3:15:15 吴清辉新建
 * @version 1.0 
 **/
public class BaseController {
	
	//==注入service
	
	@Resource(name="userService")
	protected UserService userService;
	
	@Resource(name="adminService")
	protected AdminService adminService;
	
	//== 公共部分
	
	/** 
	 * 获得mv
	 * @return 
	 * @returnType ModelAndView   
	 */
	public ModelAndView getModelAndView() {
		return new ModelAndView();
	}
	

	/** 
	 * 获得ModelMap
	 * @return 
	 * @returnType ModelMap   
	 */
	public ModelMap getModelMap() {
		ModelMap mm= new ModelMap();
		mm.addAttribute("pd", false);//返回判断，默认为false，表示出错
		return mm;
	}
	
}
