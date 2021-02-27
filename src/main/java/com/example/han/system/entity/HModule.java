package com.example.han.system.entity;

import java.util.Date;
import java.util.List;

/**
 * 菜单模型类
 */
public class HModule {
    private Integer id;
    private Date createtime;
    private String moduleName;//模型名称
    private String moduleUrl;//模型url地址
    private Integer moduleType;// 模型类别0-分类，1引用
    private Integer parentId;//父模型id
    private Integer orderNo;//序号
    private List<HModule> childList;//子模型

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getModuleUrl() {
        return moduleUrl;
    }

    public void setModuleUrl(String moduleUrl) {
        this.moduleUrl = moduleUrl;
    }

    public Integer getModuleType() {
        return moduleType;
    }

    public void setModuleType(Integer moduleType) {
        this.moduleType = moduleType;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public List<HModule> getChildList() {
        return childList;
    }

    public void setChildList(List<HModule> childList) {
        this.childList = childList;
    }
}
