package com.example.han.system.mapper;

import com.example.han.system.entity.HRole;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HRoleMapper {
    /**
     * 获取用户角色列表
     * @param id
     * @return
     */
    public List<HRole> getRolesByUid(Integer id);
}
