package com.ssm.hui.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.hui.dao.BaseDao;
import com.ssm.hui.domain.HelpMsg;
import com.ssm.hui.service.HelpMsgService;

import net.sf.json.JSONArray;

/** 
 * @author hui 
 * @date 创建时间：2018年4月26日 下午5:10:16 吴清辉新建
 * @version 1.0 
 **/
@Service("helpMsgService")
public class HelpMsgServiceImpl implements HelpMsgService {
	
	//==注入dao	
	@Resource(name="baseDao")
	protected BaseDao baseDao;
	
	@Override
	public JSONArray getHlepMsgList() {
		HelpMsg hm=new HelpMsg();
		JSONArray ja=new JSONArray();
		try {
			List<HelpMsg> helpMsgList=(List<HelpMsg>) baseDao.findForList("HlepMsgMapper.getHelpList", hm);
			
			for(HelpMsg hmo:helpMsgList){
				ja.add(hmo);
			}
			//return helpMsgList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ja;
	}

	@Override
	public String saveHelpMsg(HelpMsg hm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String saveOrUpdateHelpMsg(HelpMsg hm) {
		if(hm.getHelpId()==0){//新增
			try {
				baseDao.save("HlepMsgMapper.saveHelpMsg", hm);
				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return "error";
				
			}
		}

		return null;
	}

}
