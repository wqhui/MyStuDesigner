package com.ssm.hui.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.hui.dao.BaseDao;
import com.ssm.hui.domain.IpMsg;
import com.ssm.hui.service.IpMsgService;

import net.sf.json.JSONArray;

/** 
 * @author hui 
 * @date 创建时间：2018年5月9日 下午3:12:23 吴清辉新建
 * @version 1.0 
 **/
@Service("ipMsgService")
public class IpMsgServiceImpl implements IpMsgService {
	
	
	//==注入dao	
	@Resource(name="baseDao")
	protected BaseDao baseDao;
	
	@Override
	public JSONArray getIpMsgList() {
		IpMsg im=new IpMsg();
		JSONArray ja=new JSONArray();
		try {
			List<IpMsg> IpMsgList=(List<IpMsg>) baseDao.findForList("IpMsgMapper.getIpMsgList", im);
			
			for(IpMsg hmo:IpMsgList){
				ja.add(hmo);
			}
		} catch (Exception e) {
			ja=null;
			e.printStackTrace();
		}
		return ja;
	}

	@Override
	public String saveOrUpdateIpMsg(IpMsg im) {
		try {
			if(im.getIpId()==0){//新增
				baseDao.save("IpMsgMapper.saveIpMsg", im);
			}else{
				System.out.println(im.getIpCount());
				baseDao.update("IpMsgMapper.updateIpMsgById", im);
			}
			
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public String deleteIpMsg(IpMsg im) {
		try {
			baseDao.delete("IpMsgMapper.deleteIpMsg", im);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public IpMsg getIpMsgById(IpMsg im) {
		try {
			return (IpMsg) baseDao.findForObject("IpMsgMapper.getIpMsg", im);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
			
		}
	}

	@Override
	public String updateIpMsgById(IpMsg im) {
		try {
			baseDao.update("IpMsgMapper.updateIpMsgById", im);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

}
