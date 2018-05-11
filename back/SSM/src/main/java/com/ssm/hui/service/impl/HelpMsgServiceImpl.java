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
			ja=null;
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
		//System.out.println("hm.get:"+hm.getHelpId());	
		try {
			if(hm.getHelpId()==0){//新增
				baseDao.save("HlepMsgMapper.saveHelpMsg", hm);
			}else{
				baseDao.update("HlepMsgMapper.updateHelpMsgById", hm);
			}
			
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	
	}

	@Override
	public String deleteHelpMsg(HelpMsg hm) {
		try {
			baseDao.delete("HlepMsgMapper.deleteHelpMsg", hm);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public HelpMsg getHelpMsgById(HelpMsg hm) {
		HelpMsg newHm=new HelpMsg();
		try {
			newHm=(HelpMsg) baseDao.findForObject("HlepMsgMapper.getHelpMsgById", hm);
			return newHm;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
			
		}
	}

	@Override
	public String updateHelpMsgById(HelpMsg hm) {
		try {
			baseDao.update("HlepMsgMapper.updateHelpMsgById", hm);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

}
