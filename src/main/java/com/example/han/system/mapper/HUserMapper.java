package com.example.han.system.mapper;

import com.example.han.system.entity.HRole;
import com.example.han.system.entity.HUser;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
@Repository
public interface HUserMapper {
    public HUser getUserByName(String userName);
    public Integer save(HUser hUser);
}
