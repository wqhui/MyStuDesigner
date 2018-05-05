package com.ssm.hui.controller.base;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import com.ssm.hui.service.AdminService;
import com.ssm.hui.service.HelpMsgService;
import com.ssm.hui.service.PhoneService;
import com.ssm.hui.service.UserService;

import net.sf.json.JSONObject;

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
	
	@Resource(name="helpMsgService")
	protected HelpMsgService helpMsgService;
	
	@Resource(name="phoneService")
	protected PhoneService phoneService;
	
	//== 公共部分
	
	/** 
	 * 获得mv
	 * @return 
	 * @returnType ModelAndView   
	 */
	public ModelAndView getModelAndView() {
		ModelAndView mv=new ModelAndView();
		return mv;
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
	
	/**
	 * 
	 * 判断是否登录
	 * @param session
	 * @return 
	 * @returnType Boolean
	 */
	public Boolean isLogin(HttpSession session){
		Object obj=session.getAttribute("adminDispalyName");
		if(obj==null || obj.toString().equals("")){
			return false;
		}		
		return true;
	}
	
	/**
	 * 获得Ip地址
	 * @param request
	 * @return 
	 * @returnType String
	 */
	public String getIpAddr(HttpServletRequest request) {      
        String ip = request.getHeader("x-forwarded-for");      
            if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {     
                ip = request.getHeader("Proxy-Client-IP");      
            }     
            if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {     
                ip = request.getHeader("WL-Proxy-Client-IP");     
            }     
            if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {     
                ip = request.getRemoteAddr();      
            }   
       return ip;     
    }
	
	public JSONObject requestMsgByTL(String text){
		JSONObject jo=new JSONObject();
		jo.put("reqType",0);//输入类型:0-文本(默认)、1-图片、2-音频
		JSONObject inputText=new JSONObject();
		inputText.put("text", text);//文本问题
		JSONObject inputImage=new JSONObject();
		inputImage.put("url", "imageUrl");//图片信息
		JSONObject perception=new JSONObject();//请求问题主体
		perception.put("inputText",inputText);
		perception.put("inputImage", inputImage);
		jo.put("perception",perception);		
		Properties props = new Properties();
		try {
			props=PropertiesLoaderUtils.loadAllProperties("tuling.properties");
			JSONObject userInfo=new JSONObject();
            for(Object key:props.keySet()){             	
            	if(key.equals("url")){
            		jo.put("url", props.get(key));
            	}else{
            		userInfo.put(key, props.get(key));
            	}
            }  
            jo.put("userInfo", userInfo);//用户信息
		} catch (IOException e) {
			
			e.printStackTrace();
		}  
		return jo;
	}
	
	/**
	 * 发送请求
	 * @param strURL 
	 * @param params 
	 * @return 
	 * @returnType String
	 */
    public String httpPost(JSONObject  params) { 
		  CloseableHttpClient client = HttpClients.createDefault();
		  //HttpClient client = new DefaultHttpClient();过时
		  String strURL=params.getString("url");
		  HttpPost post = new HttpPost(strURL);
		  
		  post.setHeader("Content-Type", "application/json");
		  post.addHeader("Authorization", "Basic YWRtaW46");
		  String result = "";
		  
		  try {
		
		      StringEntity s = new StringEntity(params.toString(), "utf-8");
		  s.setContentEncoding(new BasicHeader(HTTP.CONTENT_TYPE,
		          "application/json"));
		  post.setEntity(s);
		
		  // 发送请求
		  HttpResponse httpResponse = client.execute(post);
		
		  // 获取响应输入流
		  InputStream inStream = httpResponse.getEntity().getContent();
		  BufferedReader reader = new BufferedReader(new InputStreamReader(
		          inStream, "utf-8"));
		  StringBuilder strber = new StringBuilder();
		  String line = null;
		  while ((line = reader.readLine()) != null)
		      strber.append(line + "\n");
		  inStream.close();
		
		  result = strber.toString();
		  
		  if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {		  
			  System.out.println("请求服务器成功，做相应处理");		      
		  } else {		      
		      System.out.println("请求服务端失败");		          
		  }
		      
		  client.close();//关闭请求
		  } catch (Exception e) {
		      System.out.println("请求异常");
		      throw new RuntimeException(e);
		  }
		
		  return result;
    }
}    
