package com.ssm.hui.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.ssm.hui.dao.BaseDao;
import com.ssm.hui.domain.IpMsg;
import com.ssm.hui.domain.IpMsg;
import com.ssm.hui.service.IpMsgService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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

	/**
	 * 进入前台页面时IP管理 
	 * @param im
	 * @return   
	 * @see com.ssm.hui.service.IpMsgService#linkIpMsg(com.ssm.hui.domain.IpMsg)
	 */
	@Override
	public String linkIpMsg(IpMsg im) {
		
		try {
			IpMsg nip= (IpMsg) baseDao.findForObject("IpMsgMapper.getIpMsg", im);
			if(nip!=null){//该ip已存在，把该IP访问数+1
				im.setIpCount(im.getIpCount()+1);
				baseDao.update("IpMsgMapper.updateIpMsgById", im);
			}else{//不存在则保存
				baseDao.save("IpMsgMapper.saveIpMsg", im);
			}
			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
			
		}
	}

	@Override
	public JSONObject getIpMsgPageList(Integer pageNum, Integer pageSize) {
		RowBounds rb=new RowBounds(pageNum,pageSize);
		JSONObject jo=new JSONObject();
		JSONArray ja=new JSONArray();
		try {
			Page<IpMsg> page=(Page<IpMsg>) baseDao.findForPageList("IpMsgMapper.getIpMsgList", null,rb);
			System.out.println(page);
			
			long total=page.getTotal();
		
			List<IpMsg> IpMsgList=page.getResult() ;			
			for(IpMsg ado:IpMsgList){
				if(ado!=null){
					ja.add(ado);
				}else{
					--total;
				}
			}
			jo.put("total", total);//总页数
			jo.put("rows",ja);
		} catch (Exception e) {
			jo=null;
			e.printStackTrace();
		}		
		return jo;
	}

}
