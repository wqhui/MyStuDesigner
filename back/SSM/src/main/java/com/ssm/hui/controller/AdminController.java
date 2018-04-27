package com.ssm.hui.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.hui.controller.base.BaseController;
import com.ssm.hui.domain.Admin;

import net.sf.json.JSONObject;

/** 
 * @author hui 
 * @date 创建时间：2018年4月23日 下午2:32:08 吴清辉新建
 * @version 1.0 
 **/
@Controller
@RequestMapping("/admin")
public class AdminController extends BaseController{
	
	@RequestMapping("/login")
	@ResponseBody
	public Object login(String loginName,String password,HttpServletRequest request){
		ModelMap mm=this.getModelMap();	
		if(null==loginName || null==password || loginName.equals("")||password.equals("")){//为空
			mm.addAttribute("error", "login name or password is null");
			mm.addAttribute("errorParam",""+loginName);
		}else{
			
			Admin am=new Admin();
			am.setLoginName(loginName);
			am.setPassword(password);
			JSONObject rV=adminService.adminLogin(am);
			if(rV.get("msg").equals("error")){
				mm.addAttribute("error", "adminLogin error");
				return mm;
			}
			JSONObject jo=new JSONObject();
			
			if(null!=rV.get("dispalyName")){//不为空存入session
				HttpSession session=request.getSession();
	            session.setAttribute("adminDispalyName",rV.get("dispalyName"));
			}		
			
			
            
			jo.put("msg",rV.get("msg"));
			mm.addAttribute("result", jo);
			mm.replace("pd", true);
			//System.out.println(mm);
		}
		return mm;
	}
}
