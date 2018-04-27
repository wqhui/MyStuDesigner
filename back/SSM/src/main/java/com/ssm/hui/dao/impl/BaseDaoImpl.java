package com.ssm.hui.dao.impl;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.ssm.hui.dao.BaseDao;

/** 
 * @author hui 
 * @date 创建时间：2017年9月2日 下午2:25:59 吴清辉新建
 * @version 1.0 
 **/
@Repository("baseDao")
public class BaseDaoImpl implements BaseDao {
	
	@Resource(name="sqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;//获得连接


	/** 
	 * 保存对象 
	 * @param str
	 * @param obj
	 * @return
	 * @throws Exception   
	 * @see com.ssm.hui.dao.BaseDao#save(java.lang.String, java.lang.Object)   
	 */
	@Override
	public Object save(String str, Object obj) throws Exception { 
		return sqlSessionTemplate.insert(str, obj);
	}

	/** 
	 * 更新对象 
	 * @param str
	 * @param obj
	 * @return
	 * @throws Exception   
	 * @see com.ssm.hui.dao.BaseDao#update(java.lang.String, java.lang.Object)   
	 */
	@Override
	public Object update(String str, Object obj) throws Exception {
		return sqlSessionTemplate.update(str, obj);
	}

	/** 
	 * 删除对象 
	 * @param str
	 * @param obj
	 * @return
	 * @throws Exception   
	 * @see com.ssm.hui.dao.BaseDao#delete(java.lang.String, java.lang.Object)   
	 */
	@Override
	public Object delete(String str, Object obj) throws Exception {
		return sqlSessionTemplate.delete(str, obj);
	}

	/** 
	 * 根据条件查询对象
	 * @param str
	 * @param obj
	 * @return
	 * @throws Exception   
	 * @see com.ssm.hui.dao.BaseDao#findForObject(java.lang.String, java.lang.Object)   
	 */
	@Override
	public Object findForObject(String str, Object obj) throws Exception {
		return sqlSessionTemplate.selectOne(str, obj);
	}

	/** 
	 * 根据条件查询列表 
	 * @param str
	 * @param obj
	 * @return
	 * @throws Exception   
	 * @see com.ssm.hui.dao.BaseDao#findForList(java.lang.String, java.lang.Object)   
	 */
	@Override
	public Object findForList(String str, Object obj) throws Exception {
		return sqlSessionTemplate.selectList(str, obj);
	}

	@Override
	public Object findForMap(String sql, Object obj, String key, String value) throws Exception {
		return null;
	}
}
