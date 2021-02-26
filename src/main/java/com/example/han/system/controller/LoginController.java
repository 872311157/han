package com.example.han.system.controller;

import com.example.han.system.entity.HUser;
import com.example.han.system.service.HUserService;
import com.example.han.util.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Controller
public class LoginController {

    Logger log = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private HUserService hUserService;

    @RequestMapping("/main")
    public String login(){
        log.info("登录成功!");
        return "main1";
    }

    /**
     * 实现注册后自动登录
     * @param request
     * @return
     */
    @RequestMapping(value = "/toRegister", method = RequestMethod.POST)
    public String toRegister(HttpServletRequest request){
        try {
            HUser hUser = new HUser();
            String userName = ServletRequestUtils.getStringParameter(request, "userName");
            String passWord = ServletRequestUtils.getStringParameter(request, "passWord");
            // 进行密码的比对
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            String cryptPassword = bCryptPasswordEncoder.encode(passWord);
            hUser.setUserName(userName);
            hUser.setPassWord(cryptPassword);
            hUser.setCreateTime(new Date());
//            this.hUserService.save(hUser);

            //进行授权登录（UsernamePasswordAuthenticationToken继承AbstractAuthenticationToken实现Authentication）
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userName, passWord);
            token.setDetails(new WebAuthenticationDetails(request));
            AuthenticationManager authenticationManager = new AuthenticationManager(){
                @Override
                public Authentication authenticate(Authentication authentication) throws AuthenticationException {
                    return authentication;
                }
            };
            Authentication authenticatedUser = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
            request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
            //log.info();
        } catch (ServletRequestBindingException e) {
            log.error("注册异常： " + e);
        }
        return "redirect:/main";
    }

    @GetMapping("/me")
    @ResponseBody
    public Object getMeDetail() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @RequestMapping("/errorMsg")
    @ResponseBody
    public Result loginError(HttpServletRequest request) {
        AuthenticationException authenticationException = (AuthenticationException) request.getSession().getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
//        log.info("authenticationException={}", authenticationException);
        Result result = new Result();
        result.setCode(201);

        if (authenticationException instanceof UsernameNotFoundException || authenticationException instanceof BadCredentialsException) {
            result.setMsg("用户名或密码错误");
        } else if (authenticationException instanceof DisabledException) {
            result.setMsg("用户已被禁用");
        } else if (authenticationException instanceof LockedException) {
            result.setMsg("账户被锁定");
        } else if (authenticationException instanceof AccountExpiredException) {
            result.setMsg("账户过期");
        } else if (authenticationException instanceof CredentialsExpiredException) {
            result.setMsg("证书过期");
        } else {
            result.setMsg("登录失败");
        }
        return result;
    }
}
