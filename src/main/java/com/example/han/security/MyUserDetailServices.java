package com.example.han.security;

import com.example.han.system.entity.HRole;
import com.example.han.system.entity.HUser;
import com.example.han.system.service.HRoleService;
import com.example.han.system.service.HUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MyUserDetailServices implements UserDetailsService {

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private HUserService hUserService;
    @Autowired
    private HRoleService hRoleService;

    /**
     * 从数据库中获取密码，与前端提交的密码进行对比
     * @param username
     * @return
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        HUser hUser = this.hUserService.getUserByName(username);
        if (null != hUser){
            List<HRole> roles = this.hRoleService.getRolesByUid(hUser.getId());
            hUser.setRoles(roles);
            return hUser;
        }
        throw new UsernameNotFoundException("用户不存在") ;
    }
}
