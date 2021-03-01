package com.example.han.system.service;

import com.example.han.system.entity.HModule;
import com.example.han.system.mapper.HModuleMapper;
import com.example.han.util.EntityBeanSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HModuleService {
    @Autowired
    private HModuleMapper hModuleMapper;

    /**
     * 分页查询
     * @param param
     * @return
     */
    public EntityBeanSet queryPageList(Map<String, Object> param){
        Integer pageSize = (Integer) param.get("pageSize");
        Integer pageNum = (Integer) param.get("pageNum");

        int count = this.hModuleMapper.queryPageCount(param);
        List<HModule> list = this.hModuleMapper.queryPageList(param);
        EntityBeanSet set = new EntityBeanSet(pageSize, pageNum, count, list);
        return set;
    }

    /**
     * 获取用户菜单列表
     * @param userid
     * @return
     */
    public List<HModule> getModulesByUid(Integer userid){
        List<HModule> firstList = new ArrayList<HModule>();
        List<HModule> childList = new ArrayList<HModule>();
        List<HModule> modules = this.hModuleMapper.getModulesByUid(userid);
        for (HModule module : modules){
            Integer parentId = module.getParentId();
            if (null == parentId){
                //一级菜单
                firstList.add(module);
            }else{
                //所有子菜单
                childList.add(module);
            }
        }
        for (HModule module : firstList){
            this.fullChildModules(module, childList);
        }
        return firstList;
    }

    /**
     * 填充子菜单
     * @param firstModule
     * @param childList
     */
    private void fullChildModules(HModule firstModule, List<HModule> childList){
        //父模型id
        Integer pid = firstModule.getId();
        Iterator<HModule> iterator = childList.iterator();
        while(iterator.hasNext()){
            HModule child = iterator.next();
            Integer parentId = child.getParentId();
            if (pid == parentId){
                iterator.remove();
                Integer type = child.getModuleType();//0--分类,1--引用
                if (0 == type){
                    this.fullChildModules(child, childList);
                }else{
                    firstModule.addChild(child);
                }
            }
        }
    }
}
