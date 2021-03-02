package com.example.han.system.mapper;

import com.example.han.system.entity.HModule;
import com.example.han.system.entity.HRole;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface HRoleMapper {

    /**
     * 分页查询
     * @param param
     * @return
     */
    public List<HRole> queryPageList(Map<String, Object> param);
    public int queryPageCount(Map<String, Object> param);

    /**
     * 获取用户角色列表
     * @param id
     * @return
     */
    public List<HRole> getRolesByUid(Integer id);
}
