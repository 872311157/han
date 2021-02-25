package com.example.han.system.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

//@JsonIgnoreProperties(ignoreUnknown = true)//忽略不认识的属性
public class HUser implements UserDetails {
    private Integer id;
    private Date createTime;
    private String userName;
    private String passWord;
    private List<HRole> roles;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 设置权限和角色
     * 1. 放入角色时需要加前缀ROLE_，而在controller使用时不需要加ROLE_前缀
     * 2. 放入的是权限时，不能加ROLE_前缀，hasAuthority与放入的权限名称对应即可
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
        for (HRole role : roles){
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setRoles(List<HRole> roles) {
        this.roles = roles;
    }

    public List<HRole> getRoles() {
        return roles;
    }

    //账号是否过期
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //账号是否被锁定
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //凭证(密码是否过期)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //是否可用
    @Override
    public boolean isEnabled() {
        return true;
    }
}
