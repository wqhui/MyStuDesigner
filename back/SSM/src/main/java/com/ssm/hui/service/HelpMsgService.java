package com.ssm.hui.service;

import com.ssm.hui.domain.HelpMsg;

import net.sf.json.JSONArray;

/** 
 * @author hui 
 * @date 创建时间：2018年4月26日 下午5:08:08 吴清辉新建
 * @version 1.0 
 **/
public interface HelpMsgService {
	JSONArray getHlepMsgList();
	String saveHelpMsg(HelpMsg hm);
	String saveOrUpdateHelpMsg(HelpMsg hm);
}
