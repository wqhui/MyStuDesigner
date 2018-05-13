package com.ssm.hui.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ssm.hui.controller.base.BaseController;
import com.ssm.hui.domain.Admin;
import com.ssm.hui.domain.HelpMsg;

import net.sf.json.JSONArray;
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
	            session.setAttribute("adminLoginName",loginName);
			}		
			
			
            
			jo.put("msg",rV.get("msg"));
			mm.addAttribute("result", jo);
			mm.replace("pd", true);
			//System.out.println(mm);
		}
		return mm;
	}
	
	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpServletRequest request){
		ModelAndView mav=this.getModelAndView();
		HttpSession session=request.getSession();
		Boolean loginPd=this.isLogin(session);
		if(loginPd==false){
			mav.addObject("msg","not login!");
			mav.setViewName("back/login");
			return mav;
		}
		session.removeAttribute("adminDispalyName");
		session.removeAttribute("adminLoginName");
		mav.setViewName("back/login");
		return mav;
	}
	
	@RequestMapping("/getAdminList")
	@ResponseBody
	public Object getAdminList(){
		ModelMap mm=this.getModelMap();	
		JSONArray ja=adminService.getAdminList();
		if(ja==null){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("result",ja);
		return mm;
	}
	
	@RequestMapping("/getAdminPageList")
	@ResponseBody
	public Object getAdminPageList(Integer page,Integer rows){
		ModelMap mm=this.getModelMap();	
		JSONObject jo=adminService.getAdminPageList(page,rows);
		if(jo==null){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("result",jo);
		return mm;
	}
	
	@RequestMapping("/saveOrUpdateAdmin")
	@ResponseBody
	public Object saveOrUpdateAdmin(String adminId,String loginName,String password,String displayName){
		ModelMap mm=this.getModelMap();	
		Admin am=new Admin();
		am.setAdminId(Integer.parseInt(adminId));
		am.setDisplayName(displayName);
		am.setLoginName(loginName);
		am.setPassword(password);
		String msg=adminService.saveOrUpdateAdmin(am);
		if(msg.equals("error")){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
	@RequestMapping("/deleteAdmin")
	@ResponseBody
	public Object deleteAdmin(String adminId,HttpServletRequest request){
		ModelMap mm=this.getModelMap();	
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		if(adminId==null){
			mm.addAttribute("msg","id is null");
			return mm;
		}
		Admin am=new Admin();
		am.setAdminId(Integer.parseInt(adminId));
		String msg=adminService.deleteAdmin(am);
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
	@RequestMapping("/getAdminById")
	@ResponseBody
	public Object getAdminById(String adminId,HttpServletRequest request){		
		ModelMap mm=this.getModelMap();	
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		if(adminId==null){
			mm.addAttribute("msg","id is null");
			return mm;
		}
		Admin am=new Admin();
		am.setAdminId(Integer.parseInt(adminId));
		Admin newAm=adminService.getAdminById(am);
		if(newAm!=null){
			mm.replace("pd", true);
		}		
		mm.addAttribute("result",newAm);
		return mm;
	}
	
	@RequestMapping("/isLoginNameDone")
	@ResponseBody
	public Object isLoginNameDone(String loginName,HttpServletRequest request){		
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			return false;
		}
		if(loginName==null || loginName.equals("root") || loginName.equals("")){
			return false;
		}
		Admin am=new Admin();
		am.setLoginName(loginName);
		Admin newAm=adminService.getAdminById(am);
		if(newAm!=null){//已使用，返回false
			return false;
		}		
		return true;
	}
	
	@RequestMapping("/updateAdminPsw")
	@ResponseBody
	public Object updateAdminPsw(String adminId,String password,HttpServletRequest request){		
		ModelMap mm=this.getModelMap();	
		HttpSession hs=request.getSession();
		String amName=(String) hs.getAttribute("adminLoginName");
		Boolean loginPd=this.isLogin(hs);
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		
		Admin am=new Admin();
		am.setAdminId(Integer.parseInt(adminId));
		am.setPassword(password);
		am.setLoginName(amName);
		Admin newAm=adminService.getAdminById(am);		
		if(newAm==null && !amName.equals("root")){
			mm.addAttribute("msg","is ban!");
			return mm;
		}
		if(adminId==null || adminId.equals("") || Integer.parseInt(adminId)==0){//如果不传入id 代表自身修改，尝试查询的数据			
			if(amName.equals("root")){
				mm.addAttribute("msg","ban");
				return mm;
			}
			am.setAdminId(newAm.getAdminId());
		}
		am.setLoginName("");//防止脏修改
		String msg=adminService.updateAdminPsw(am);
		if(msg.equals("error")){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
}
