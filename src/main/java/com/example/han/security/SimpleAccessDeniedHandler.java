package com.example.han.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * AccessDeniedHandler 该类用来统一处理 AccessDeniedException 异常（认证过的用户访问无权限资源时的异常）
 */
@Component
public class SimpleAccessDeniedHandler implements AccessDeniedHandler {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException authException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        Map<String, Object> data = new HashMap<>();
        data.put("code", HttpStatus.UNAUTHORIZED.value());
        data.put("timestamp", Calendar.getInstance().getTime());
        data.put("exception", authException.getMessage());
        response.getWriter().println(objectMapper.writeValueAsString(data));
        // 转发到errorPage
//        RequestDispatcher dispatcher = request.getRequestDispatcher("/errorMsg");
//        dispatcher.forward(request, response);
    }
}

