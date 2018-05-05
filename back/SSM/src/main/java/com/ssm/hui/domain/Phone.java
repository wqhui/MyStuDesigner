package com.ssm.hui.domain;
/** 
 * @author hui 
 * @date 创建时间：2018年5月5日 下午3:03:01 吴清辉新建
 * @version 1.0 
 **/
public class Phone {
	private int phoneId;
	private String phoneName;
	private float phonePrice;
	private String advantage;
	private String disadvantage;
	private String links;
	/**
	 * @return the phoneId
	 */
	public int getPhoneId() {
		return phoneId;
	}
	/**
	 * @param phoneId the phoneId to set
	 */
	public void setPhoneId(int phoneId) {
		this.phoneId = phoneId;
	}
	/**
	 * @return the phoneName
	 */
	public String getPhoneName() {
		return phoneName;
	}
	/**
	 * @param phoneName the phoneName to set
	 */
	public void setPhoneName(String phoneName) {
		this.phoneName = phoneName;
	}
	/**
	 * @return the phonePrice
	 */
	public float getPhonePrice() {
		return phonePrice;
	}
	/**
	 * @param phonePrice the phonePrice to set
	 */
	public void setPhonePrice(float phonePrice) {
		this.phonePrice = phonePrice;
	}

	/**
	 * @return the advantage
	 */
	public String getAdvantage() {
		return advantage;
	}
	/**
	 * @param advantage the advantage to set
	 */
	public void setAdvantage(String advantage) {
		this.advantage = advantage;
	}
	/**
	 * @return the disadvantage
	 */
	public String getDisadvantage() {
		return disadvantage;
	}
	/**
	 * @param disadvantage the disadvantage to set
	 */
	public void setDisadvantage(String disadvantage) {
		this.disadvantage = disadvantage;
	}
	/**
	 * @return the links
	 */
	public String getLinks() {
		return links;
	}
	/**
	 * @param links the links to set
	 */
	public void setLinks(String links) {
		this.links = links;
	}
	
	
}
