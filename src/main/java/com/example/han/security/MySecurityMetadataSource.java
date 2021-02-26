package com.example.han.security;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.util.Collection;

/**
 * 通过当前的请求地址，获取该地址需要的用户角色
 * @auther hanlulu
 * @date 2021/01/20 20:24
 */
@Component
public class MySecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
//    @Autowired
//    private MenuMapper menuMapper;

    private AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        //获取请求的url
        String requestUrl = ((FilterInvocation) object).getRequestUrl();
        //这些url不需要角色即可访问
        if(antPathMatcher.match("/login.html",requestUrl) || antPathMatcher.match("/toLogin", requestUrl) || antPathMatcher.match("/toRegister", requestUrl)){
            return null;
        }
        /*else if (antPathMatcher.match("/me",requestUrl)){
            return SecurityConfig.createList("ROLE_USER");
        }else if (antPathMatcher.match("/me2",requestUrl)){
            return SecurityConfig.createList("ROLE_ADMIN");
        }*/
        //获取当前请求需要的角色信息，拿url去menu表中匹配，查看是访问的那个menu下的资源，根据menuId 获取到role信息
//        List<Menu> menuList = menuMapper.findAllMenu();
//        for (Menu menu : menuList) {
//            //如果请求的路径包含在某个menu的url中，且能访问该资源的角色信息存在
//            if (antPathMatcher.match(menu.getUrl(),requestUrl) && menu.getRoles().size() > 0) {
//                List<Role> roles = menu.getRoles();
//                int size = roles.size();
//                //定义一个数组，来接收能访问该资源的角色
//                String[] roleNameArray = new String[size];
//                for (int i = 0; i < size; i++) {
//                    roleNameArray[i] = roles.get(i).getRoleAuthority();
//                }
//                return SecurityConfig.createList(roleNameArray);
//            }
//        }
        //如果遍历完menu之后没有匹配上，说名访问该资源不需要权限信息，设置一个登陆就能访问的角色
        return SecurityConfig.createList("ROLE_def");
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }
}

