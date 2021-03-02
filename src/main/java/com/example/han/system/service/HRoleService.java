package com.example.han.system.service;

import com.example.han.system.entity.HModule;
import com.example.han.system.entity.HRole;
import com.example.han.system.mapper.HRoleMapper;
import com.example.han.util.EntityBeanSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HRoleService {
    @Autowired
    private HRoleMapper hRoleMapper;

    /**
     * 获取用户所有角色
     * @param id
     * @return
     */
    public List<HRole> getRolesByUid(Integer id){
        return this.hRoleMapper.getRolesByUid(id);
    }

    /**
     * 分页查询
     * @param param
     * @return
     */
    public EntityBeanSet queryPageList(Map<String, Object> param){
        Integer pageSize = (Integer) param.get("pageSize");
        Integer pageNum = (Integer) param.get("pageNum");
        Integer startIndex = (pageNum-1)*pageSize;
        param.put("startIndex", startIndex);
        int count = this.hRoleMapper.queryPageCount(param);
        List<HRole> list = this.hRoleMapper.queryPageList(param);
        EntityBeanSet set = new EntityBeanSet(pageSize, pageNum, count, list);
        return set;
    }
}
