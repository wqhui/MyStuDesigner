package com.ssm.hui.domain;

import java.io.Serializable;

/** 
 * @author hui 
 * @date 创建时间：2017年9月2日 下午2:15:55 吴清辉新建
 * @version 1.0 
 **/
public class User implements Serializable{
	private int id;
	private String username;
	private String password;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
