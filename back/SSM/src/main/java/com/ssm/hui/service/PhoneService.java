package com.ssm.hui.service;


import com.ssm.hui.domain.Phone;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
 * @author hui 
 * @date 创建时间：2018年5月5日 下午4:22:55 吴清辉新建
 * @version 1.0 
 **/
public interface PhoneService {
	JSONArray getPhoneList();
	String saveOrUpdatePhone(Phone p);
	String deletePhone(Phone p);
	Phone getPhoneById(Phone p);
	String updatePhoneById(Phone p);
	JSONArray getPhoneListByList(JSONArray ja);
	JSONObject getPhonePageList(Integer page, Integer rows);
}
