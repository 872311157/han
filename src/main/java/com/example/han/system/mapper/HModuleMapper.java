package com.example.han.system.mapper;

import com.example.han.system.entity.HModule;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HModuleMapper {
    /**
     * 查询用户模块权限
     * @param uid
     * @return
     */
    public List<HModule> getModulesByUid(Integer uid);
}
