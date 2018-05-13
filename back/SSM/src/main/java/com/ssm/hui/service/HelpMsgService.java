package com.ssm.hui.service;

import com.ssm.hui.domain.HelpMsg;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
 * @author hui 
 * @date 创建时间：2018年4月26日 下午5:08:08 吴清辉新建
 * @version 1.0 
 **/
public interface HelpMsgService {
	JSONArray getHlepMsgList();
	String saveHelpMsg(HelpMsg hm);
	String saveOrUpdateHelpMsg(HelpMsg hm);
	String deleteHelpMsg(HelpMsg hm);
	HelpMsg getHelpMsgById(HelpMsg hm);
	String updateHelpMsgById(HelpMsg hm);
	JSONObject getHelpPageList(Integer page, Integer rows);
}
