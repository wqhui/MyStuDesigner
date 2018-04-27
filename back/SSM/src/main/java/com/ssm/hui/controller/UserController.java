package com.ssm.hui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ssm.hui.controller.base.BaseController;
import com.ssm.hui.domain.User;

/** 
 * @author hui 
 * @date 创建时间：2017年9月2日 下午3:46:21 吴清辉新建
 * @version 1.0 
 **/
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {
	

	/** 
	 * 登录
	 * @param username
	 * @param password
	 * @return 
	 * @returnType Object   
	 */
	@RequestMapping("/login")
	@ResponseBody
	public Object login (String username,String password){
		ModelMap mm=this.getModelMap();
		String msg="";
		if(null==username || null==password || username.equals("")||password.equals("")){//为空
			msg="";
		}else{
			User u=new User();
			u.setUsername(username);
			u.setPassword(password);
			msg=userService.getUserToVer(u);

		}
		mm.addAttribute("msg", msg);
		return mm;
	}   
	
	/** 
	 * 注册
	 * @param username
	 * @param password
	 * @return 
	 * @returnType Object   
	 */
	@RequestMapping("/register")
	@ResponseBody
	public Object register (String username,String password){
		ModelMap mm=this.getModelMap();
		String msg="";
		if(null==username || null==password || username.equals("")||password.equals("")){//为空
			msg="null";
		}else{
			User u=new User();
			u.setUsername(username);
			u.setPassword(password);
			msg=userService.saveUser(u);

		}
		mm.addAttribute("msg", msg);
		return mm;
	}  
}
