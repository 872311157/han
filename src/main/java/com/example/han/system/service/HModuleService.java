package com.example.han.system.service;

import com.example.han.system.entity.HModule;
import com.example.han.system.mapper.HModuleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HModuleService {
    @Autowired
    private HModuleMapper hModuleMapper;

    public List<HModule> getModulesByUid(Integer userid){
        List<HModule> moduleList = new ArrayList<HModule>();
        Map<Integer, HModule> moduleMap = new HashMap<Integer, HModule>();
        List<HModule> childList = new ArrayList<HModule>();
        List<HModule> modules = this.hModuleMapper.getModulesByUid(userid);
        for (HModule module : modules){
            Integer parentId = module.getParentId();
            if (null == parentId){
                moduleMap.put(module.getId(), module);
            }else{
                childList.add(module);
            }
            Integer type = module.getModuleType();//0--分类,1--引用
        }
        //将子模型存储到父模型
        for (HModule child : childList){

        }

        return moduleList;
    }

}
