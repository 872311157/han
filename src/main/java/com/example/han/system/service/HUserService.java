package com.example.han.system.service;

import com.example.han.system.entity.HUser;
import com.example.han.system.mapper.HUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HUserService {

    @Autowired
    private HUserMapper hUserMapper;

    public HUser getUserByName(String userName){
        HUser hUser = this.hUserMapper.getUserByName(userName);
        return hUser;
    }

    public Integer save(HUser hUser){
        return this.hUserMapper.save(hUser);
    }

}
