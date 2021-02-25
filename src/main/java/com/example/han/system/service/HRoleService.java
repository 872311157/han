package com.example.han.system.service;

import com.example.han.system.entity.HRole;
import com.example.han.system.mapper.HRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
