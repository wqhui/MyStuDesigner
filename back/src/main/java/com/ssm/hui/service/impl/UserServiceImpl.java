package com.ssm.hui.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.hui.dao.BaseDao;
import com.ssm.hui.domain.User;
import com.ssm.hui.service.UserService;

/** 
 * @author hui 
 * @date 创建时间：2017年9月2日 下午2:22:29 吴清辉新建
 * @version 1.0 
 **/
@Service("userService")
public class UserServiceImpl implements UserService {
	//==注入dao
	
	@Resource(name="baseDao")
	protected BaseDao baseDao;

	/** 
	 * 插入用户 
	 * @param u
	 * @return  插入信息 
	 * @see com.ssm.hui.service.UserService#saveUser(com.ssm.hui.domain.User)   
	 */
	@Override
	public String saveUser(User u) {
		try {
			User ou=(User) baseDao.findForObject("UserMapper.getUserByCondition", u);
			if(null!=ou){//如果不为空，则该账号已经被注册了
				return "exist";
				
			}else{//如果为空，则调用注册方法
				baseDao.save("UserMapper.saveUser", u);
				return "ok";
			}			
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		
	}

	/** 
	 *  
	 * @param u
	 * @return   
	 * @see com.ssm.hui.service.UserService#getUserToVer(com.ssm.hui.domain.User)   
	 */
	@Override
	public String getUserToVer(User u) {
		try {
			User ou=(User) baseDao.findForObject("UserMapper.getUserByCondition", u);
			if(null!=ou){//如果不为空
				if(ou.getPassword().equals(u.getPassword())){//验证密码，如果一样
					return "ok";//密码正确
				}else{
					return "nook";//密码错误
				}
								
			}else{//如果为空，则返回用户不存在				
				return "null";
			}			
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

}
