package com.example.han.util;

import org.thymeleaf.util.StringUtils;

public class Result {
    private Integer code;
    private String msg;

    public static Result sendSuccess(){
        Result result = new Result();
        result.setCode(200);
        return result;
    }

    public static Result sendError(String msg){
        Result result = new Result();
        result.setCode(401);
        if (StringUtils.isEmpty(msg)){
            result.setMsg("失败!");
        }else{
            result.setMsg(msg);
        }
        return result;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
