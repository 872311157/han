package com.example.han.system.controller;

import com.example.han.system.entity.HModule;
import com.example.han.system.service.HModuleService;
import com.example.han.util.EntityBeanSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/module")
public class HModuleController {

    @Autowired
    private HModuleService hModuleService;

    @RequestMapping("")
    public String toPage(){
        return "system/module/module_list";
    }

    @RequestMapping("queryModuleList")
    @ResponseBody
    public EntityBeanSet queryList(HttpServletRequest request){
        EntityBeanSet set = null;
        try {
            Map<String, Object> param = new HashMap<String, Object>();
            Integer pageNum = ServletRequestUtils.getIntParameter(request, "pageNum");
            Integer pageSize = ServletRequestUtils.getIntParameter(request, "pageSize");
            String moduleType = ServletRequestUtils.getStringParameter(request, "moduleType");
            String moduleName = ServletRequestUtils.getStringParameter(request, "moduleName");
            param.put("pageNum", pageNum);
            param.put("pageSize", pageSize);
            param.put("moduleType", moduleType);
            param.put("moduleName", moduleName);
            set = this.hModuleService.queryPageList(param);
        } catch (ServletRequestBindingException e) {
            e.printStackTrace();
        }
        return set;
    }

    @RequestMapping("/queryModules")
    @ResponseBody
    public List<HModule> getModulesByUid(HttpServletRequest request){
        try {
            Integer userid = ServletRequestUtils.getIntParameter(request, "userid");
            return this.hModuleService.getModulesByUid(userid);
        } catch (ServletRequestBindingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
