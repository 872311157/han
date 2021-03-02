package com.example.han.system.controller;

import com.example.han.system.entity.HModule;
import com.example.han.system.service.HModuleService;
import com.example.han.util.EntityBeanSet;
import com.example.han.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/module")
public class HModuleController {

    @Autowired
    private HModuleService hModuleService;

    /**
     * 保存
     * @param module
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public Result save(@RequestBody HModule module){
        Date createTime = new Date();
        module.setCreateTime(createTime);
        int num = this.hModuleService.save(module);
        if(num <= 0){
            return Result.sendError("保存失败!");
        }
        return Result.sendSuccess();
    }

    /**
     * 修改
     * @param module
     * @return
     */
    @RequestMapping(value = "/modify", method = RequestMethod.POST)
    @ResponseBody
    public Result modify(@RequestBody HModule module){
        int num = this.hModuleService.modify(module);
        if(num <= 0){
            return Result.sendError("修改失败!");
        }
        return Result.sendSuccess();
    }

    /**
     * 删除
     * @param
     * @return
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Result delete(HttpServletRequest request){
        try {
            Integer id = ServletRequestUtils.getIntParameter(request, "id");
            int num = this.hModuleService.delete(id);
            if(num <= 0){
                return Result.sendError("删除失败!");
            }
            return Result.sendSuccess();
        } catch (ServletRequestBindingException e) {
            e.printStackTrace();
        }
        return Result.sendError("删除失败!");
    }

    /**
     * 查询
     * @param request
     * @return
     */
    @RequestMapping("/query")
    @ResponseBody
    public HModule query(HttpServletRequest request){
        try {
            Map<String, Object> param = new HashMap<String, Object>();
            Integer id = ServletRequestUtils.getIntParameter(request, "id");
            param.put("id", id);
            HModule module = this.hModuleService.query(param);
            return module;
        } catch (ServletRequestBindingException e) {
            e.printStackTrace();
        }
        return null;
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
