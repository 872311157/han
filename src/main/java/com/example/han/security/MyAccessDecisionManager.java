package com.example.han.security;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Iterator;

/**
 * 根据 MySecurityMetadataSource获取的url需要的权限，匹配当前用户角色权限
 * @auther hanlulu
 * @date 2021/1/20 21:18
 */
@Component
public class MyAccessDecisionManager implements AccessDecisionManager {
    @Override
    public void decide(Authentication auth, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {
        //configAttributes里存放着MySecurityMetadataSource过滤出来的角色
        Iterator<ConfigAttribute> iterator = configAttributes.iterator();
        while (iterator.hasNext()){
            ConfigAttribute configAttribute = iterator.next();
            //访问该请求url需要的角色信息
            String needRole = configAttribute.getAttribute();
            //如果只是登陆就能访问，即没有匹配到资源信息(默认角色)
            if ("ROLE_def".equals(needRole)){
                //判断是否登陆，没有登陆则authentication是AnonymousAuthenticationToken接口实现类的对象
                if (auth instanceof AnonymousAuthenticationToken){
                    throw new BadCredentialsException("未登录");
                } else return;
            }

            //如果访问的路径在数据库中具有角色就会来到这里， auth存放登陆后的用户所有信息
            Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
            //如果匹配上了资源信息，就拿登陆用户的权限信息来对比是否存在于已匹配的角色集合中
            for (GrantedAuthority authority : authorities) {
                //将账户所拥有的角色和url需要的角色进行比较
                if (authority.getAuthority().equals(needRole)){
                    return;
                }
            }
        }
        //如果没有匹配上，则权限不足
        throw new AccessDeniedException("权限不足");
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}

