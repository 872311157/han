package com.example.han.system.entity;

import java.util.Date;

/**
 * 字典配置
 */
public class HDict {
    private Integer id;
    private Date createTime;//创建时间
    private String dictName;//字典名称
    private String dictValue;//字典值

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getDictName() {
        return dictName;
    }

    public void setDictName(String dictName) {
        this.dictName = dictName;
    }

    public String getDictValue() {
        return dictValue;
    }

    public void setDictValue(String dictValue) {
        this.dictValue = dictValue;
    }
}
