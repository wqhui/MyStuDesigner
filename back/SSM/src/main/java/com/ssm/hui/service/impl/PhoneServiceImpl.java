package com.ssm.hui.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.hui.dao.BaseDao;
import com.ssm.hui.domain.Phone;
import com.ssm.hui.service.PhoneService;

import net.sf.json.JSONArray;

/** 
 * @author hui 
 * @date 创建时间：2018年5月5日 下午4:25:14 吴清辉新建
 * @version 1.0 
 **/
@Service("phoneService")
public class PhoneServiceImpl implements PhoneService {
	
	//==注入dao	
	@Resource(name="baseDao")
	protected BaseDao baseDao;
	
	@Override
	public JSONArray getPhoneList() {
		Phone p=new Phone();
		JSONArray ja=new JSONArray();
		try {
			List<Phone> PhoneList=(List<Phone>) baseDao.findForList("PhoneMapper.getPhoneList", p);
			
			for(Phone hmo:PhoneList){
				ja.add(hmo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ja;
	}

	@Override
	public String saveOrUpdatePhone(Phone p) {
		try {
			if(p.getPhoneId()==0){//新增
				baseDao.save("PhoneMapper.savePhone", p);
			}else{
				baseDao.update("PhoneMapper.updatePhoneById", p);
			}
			
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public String deletePhone(Phone p) {
		try {
			baseDao.delete("PhoneMapper.deletePhone", p);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public Phone getPhoneById(Phone p) {
		try {
			return (Phone) baseDao.findForObject("PhoneMapper.getPhone", p);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
			
		}
	}

	@Override
	public String updatePhoneById(Phone p) {
		try {
			baseDao.update("PhoneMapper.updatePhoneById", p);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

}
