package com.ssm.hui.service;

import com.ssm.hui.domain.User;

/** 
 * @author hui 
 * @date 创建时间：2017年9月2日 下午2:21:23 吴清辉新建
 * @version 1.0 
 **/
public interface UserService {

	String saveUser(User u);

	String getUserToVer(User u);
}
