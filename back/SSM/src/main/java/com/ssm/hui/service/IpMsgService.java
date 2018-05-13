package com.ssm.hui.service;


import com.ssm.hui.domain.IpMsg;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
 * @author hui 
 * @date 创建时间：2018年5月9日 下午3:10:20 吴清辉新建
 * @version 1.0 
 **/
public interface IpMsgService {
	JSONArray getIpMsgList();
	String saveOrUpdateIpMsg(IpMsg im);
	String deleteIpMsg(IpMsg im);
	IpMsg getIpMsgById(IpMsg im);
	String updateIpMsgById(IpMsg im);
	String linkIpMsg(IpMsg im);
	JSONObject getIpMsgPageList(Integer page, Integer rows);
}	
