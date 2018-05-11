package com.ssm.hui.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.hui.controller.base.BaseController;
import com.ssm.hui.domain.IpMsg;

import net.sf.json.JSONArray;

/** 
 * @author hui 
 * @date 创建时间：2018年5月9日 下午3:13:25 吴清辉新建
 * @version 1.0 
 **/
@Controller
@RequestMapping("/ip")
public class IpMsgController extends BaseController {
	
	@RequestMapping("/getIpMsgList")
	@ResponseBody
	public Object getIpMsgList(){
		ModelMap mm=this.getModelMap();	
		JSONArray ja=ipMsgService.getIpMsgList();
		mm.replace("pd", true);
		mm.addAttribute("result",ja);
		return mm;
	}
	
	@RequestMapping("/saveOrUpdateIpMsg")
	@ResponseBody
	public Object saveOrUpdateIpMsg(String ipId,String ipAddress,int ipCount,boolean isBan){
		ModelMap mm=this.getModelMap();	
		IpMsg im=new IpMsg();

		
		if(ipId==null || Integer.parseInt(ipId)==0){
			im.setIpId(0);
		}else{
			im.setIpId(Integer.parseInt(ipId));
		}
		
		im.setBan(isBan);
		im.setIpAddress(ipAddress);
		im.setIpCount(ipCount);

		String msg=ipMsgService.saveOrUpdateIpMsg(im);
		if(msg.equals("error")){
			return mm;
		}
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
	
	@RequestMapping("/deleteIpMsg")
	@ResponseBody
	public Object deleteIpMsg(String ipId,HttpServletRequest request){
		ModelMap mm=this.getModelMap();	
		Boolean loginPd=this.isLogin(request.getSession());
		if(loginPd==false){
			mm.addAttribute("msg","not login");
			return mm;
		}
		if(ipId==null || Integer.parseInt(ipId)==0){
			mm.addAttribute("msg","id is null");
			return mm;
		}
		IpMsg im=new IpMsg();
		im.setIpId(Integer.parseInt(ipId));
		String msg=ipMsgService.deleteIpMsg(im);
		mm.replace("pd", true);
		mm.addAttribute("msg",msg);
		return mm;
	}
}
