package com.example.han.util;

import java.util.List;

public class EntityBeanSet {
    private Integer pageSize; //页面大小
    private Integer pageNum; //当前页数
    private Integer pageCount; //总页数
    private Integer countNum; //总数
    private List<?> result; //结果集

    public EntityBeanSet(Integer pageSize, Integer pageNum, Integer countNum, List<?> result) {
        this.pageSize = pageSize;
        this.pageNum = pageNum;
        this.pageCount = pageCount;
        this.countNum = countNum;
        this.result = result;
        this.pageCount = (int) Math.ceil((double)countNum/pageSize);
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getPageCount() {
        return (int) Math.ceil((double)countNum/pageSize);
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public Integer getCountNum() {
        return countNum;
    }

    public void setCountNum(Integer countNum) {
        this.countNum = countNum;
    }

    public List<?> getResult() {
        return result;
    }

    public void setResult(List<?> result) {
        this.result = result;
    }
}
