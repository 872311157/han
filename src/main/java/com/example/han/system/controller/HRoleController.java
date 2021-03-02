package com.example.han.system.controller;

import com.example.han.system.service.HRoleService;
import com.example.han.util.EntityBeanSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/role")
public class HRoleController {

    @Autowired
    private HRoleService hRoleService;

    @RequestMapping("/queryRoleList")
    @ResponseBody
    public EntityBeanSet queryList(HttpServletRequest request){
        EntityBeanSet set = null;
        try {
            Map<String, Object> param = new HashMap<String, Object>();
            Integer pageNum = ServletRequestUtils.getIntParameter(request, "pageNum");
            Integer pageSize = ServletRequestUtils.getIntParameter(request, "pageSize");
            String roleName = ServletRequestUtils.getStringParameter(request, "roleName");
            String roleNameZh = ServletRequestUtils.getStringParameter(request, "roleNameZh");
            param.put("pageNum", pageNum);
            param.put("pageSize", pageSize);
            param.put("roleName", roleName);
            param.put("roleNameZh", roleNameZh);
            set = this.hRoleService.queryPageList(param);
        } catch (ServletRequestBindingException e) {
            e.printStackTrace();
        }
        return set;
    }

}
