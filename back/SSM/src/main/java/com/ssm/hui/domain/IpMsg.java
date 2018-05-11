package com.ssm.hui.domain;
/** 
 * @author hui 
 * @date 创建时间：2018年5月9日 下午3:07:46 吴清辉新建
 * @version 1.0 
 **/
public class IpMsg {
	private int ipId;
	private String ipAddress;
	private int ipCount;
	private boolean isBan;
	/**
	 * @return the ipId
	 */
	public int getIpId() {
		return ipId;
	}
	/**
	 * @param ipId the ipId to set
	 */
	public void setIpId(int ipId) {
		this.ipId = ipId;
	}
	/**
	 * @return the ipAddress
	 */
	public String getIpAddress() {
		return ipAddress;
	}
	/**
	 * @param ipAddress the ipAddress to set
	 */
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	/**
	 * @return the ipCount
	 */
	public int getIpCount() {
		return ipCount;
	}
	/**
	 * @param ipCount the ipCount to set
	 */
	public void setIpCount(int ipCount) {
		this.ipCount = ipCount;
	}
	/**
	 * @return the isBan
	 */
	public boolean isBan() {
		return isBan;
	}
	/**
	 * @param isBan the isBan to set
	 */
	public void setBan(boolean isBan) {
		this.isBan = isBan;
	}

}
