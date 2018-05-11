package com.ssm.hui.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.hui.controller.base.BaseController;
import com.ssm.hui.domain.Phone;

import net.sf.json.JSONArray;


/** 
 * @author hui 
 * @date 创建时间：2018年5月5日 下午4:30:56 吴清辉新建
 * @version 1.0 
 **/
@Controller
@RequestMapping("/phone")
public class PhoneController extends BaseController {
	
	@RequestMapping("/getPhoneList")
	@ResponseBody
	public Object getPhoneList(){
		ModelMap mm=this.getModelMap();	
		JSONArray ja=phoneService.getPhoneList();
		if(ja==null){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("result",ja);
		return mm;
	}
	
	@RequestMapping("/saveOrUpdatePhone")
	@ResponseBody
	public Object saveOrUpdatePhone(String phoneId,String phoneName,float phonePrice,String advantage, String disadvantage,String links){
		ModelMap mm=this.getModelMap();	
		Phone am=new Phone();
		am.setPhoneId(Integer.parseInt(phoneId));
		am.setPhoneName(phoneName);
		am.setAdvantage(advantage);
		am.setDisadvantage(disadvantage);
		am.setPhonePrice(phonePrice);
		am.setLinks(links);
		String msg=phoneService.saveOrUpdatePhone(am);
		if(msg.equals("error")){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
	@RequestMapping("/deletePhone")
	@ResponseBody
	public Object deletePhone(String phoneId,HttpServletRequest request){
		ModelMap mm=this.getModelMap();	
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		if(phoneId==null || Integer.parseInt(phoneId)==0){
			mm.addAttribute("msg","id is null");
			return mm;
		}
		Phone am=new Phone();
		am.setPhoneId(Integer.parseInt(phoneId));
		String msg=phoneService.deletePhone(am);
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
	@RequestMapping("/getPhoneById")
	@ResponseBody
	public Object getPhoneById(String phoneId,HttpServletRequest request){		
		ModelMap mm=this.getModelMap();	
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		if(phoneId==null || Integer.parseInt(phoneId)==0){
			mm.addAttribute("msg","id is null");
			return mm;
		}
		Phone am=new Phone();
		am.setPhoneId(Integer.parseInt(phoneId));
		Phone newAm=phoneService.getPhoneById(am);
		if(newAm!=null){
			mm.replace("pd", true);
		}		
		mm.addAttribute("result",newAm);
		return mm;
	}
}
