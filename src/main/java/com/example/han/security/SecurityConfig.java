package com.example.han.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity // 启用Spring Security的Web安全支持
@EnableGlobalMethodSecurity(prePostEnabled = true) //在方法中可以使用@PreAuthorize("hasAuthority('admin')")等注解来控制某个方法的权限
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private MyAuthenticationProvider myAuthenticationProvider;
    @Autowired
    private MySecurityMetadataSource mySecurityMetadataSource;
    @Autowired
    private MyAccessDecisionManager myAccessDecisionManager;

    /**
     * 全局的跨域配置
     */
    @Bean
    public WebMvcConfigurer WebMvcConfigurer() {
        return new WebMvcConfigurer() {
            public void addCorsMappings(CorsRegistry corsRegistry) {
                //仅仅让/login可以跨域
                corsRegistry.addMapping("/login").allowCredentials(true).allowedHeaders("*");
                //仅仅让/logout可以跨域
                corsRegistry.addMapping("/logout").allowCredentials(true).allowedHeaders("*");
                //允许所有接口可以跨域访问
                //corsRegistry.addMapping("/**").allowCredentials(true).allowedHeaders("*");

            }
        };

    }

    /**
     * 添加 UserDetailsService， 实现自定义登录校验，数据库查询
     * 这段配置呢, 配置的是认证信息, AuthenticationManagerBuilder 这个类,就是AuthenticationManager的建造者, 我们只需要向这个类中, 配置用户信息,
     * 就能生成对应的AuthenticationManager, 这个类也提过,是用户身份的管理者, 是认证的入口, 因此,我们需要通过这个配置,想security提供真实的用户身份。
     * 还可以使用UserDetailsService来配置用户身份
     * @param auth
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.authenticationProvider(myAuthenticationProvider);
        //配置默认用户认证信息
//            auth.inMemoryAuthentication()
//                    .withUser("admin").password("admin").roles("USER");
    }

    @Override
    public void configure(WebSecurity web) throws Exception{
        //web.ignoring() 用来配置忽略掉的 URL 地址，一般对于静态文件，我们可以采用此操作。
        web.ignoring().antMatchers("/js/**", "/css/**","/images/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        //开启授权认证
        //开启跨域共享，关闭同源策略【允许跨域】
        http.cors()
                //跨域伪造请求=无效，
                .and().csrf().disable(); //禁用跨站攻击(使用自己定义的登录页面时，需要关闭)
        //登录配置
        http.formLogin()
                .loginPage("/login.html")//用户未认证时，转跳到认证的页面
                .loginProcessingUrl("/toLogin")//post登录访问路径
                .defaultSuccessUrl("/main")//认证成功后默认转跳的URL， 第二个参数，如果不写成true，则默认登录成功以后，访问之前被拦截的页面，而非去我们规定的页面
                .failureHandler(new MyFailureHandler());  //登录失败处理
        //登录退出处理
        http.logout()
                .logoutUrl("/logout") //post登出访问路径
//                  .logoutSuccessHandler(new CustomLogoutSuccessHandler())   //成功退出处理
                .clearAuthentication(true).permitAll(); //清除认证信息
        //配置路径拦截规则
        http.authorizeRequests()
                .antMatchers("/login.html","/toLogin", "/toRegister").permitAll()//最后不要忘记将自定义的不需要认证的URL加进来
//                .antMatchers("/user/**").hasAnyAuthority("ROLE_user", "ROLE_admin") //只要有 "user","admin"任意最少一个权限即可访问路径"/user/**"的所有接口
//                .antMatchers("/admin/**", "/vip").hasAuthority("ROLE_admin") //只有权限"admin"才可以访问"/admin/**"所有路径 和 接口 "/vip"
                // 通过withObjectPostProcessor将刚刚创建的mySecurityMetadataSource和 myAccessDecisionManager 注入进来。到时候，请求都会经过刚才的过滤器
                .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                    @Override
                    public <O extends FilterSecurityInterceptor> O postProcess(O o) {
                        o.setSecurityMetadataSource(mySecurityMetadataSource);
                        o.setAccessDecisionManager(myAccessDecisionManager);
                        return o;
                    }
                })
                .anyRequest().authenticated();//所有请求都需要验证,必须要放在antMatchers路径拦截之后，不然拦截失效
        // 路径拦截权限的名称必须与权限列表注册的一样，经过测试，方法级别的注解权限需要ROLE_前缀 ，因此， 路径拦截权限的名称、注解权限名称、数据库存储的权限名称都要加ROLE_前缀最好，避免出现错误，
        // 如果数据库的权限名称不加ROLE_前缀，那么在注册权限列表的时候记得拼接ROLE_前缀

        //异常抛出处理
        http.exceptionHandling()
                .authenticationEntryPoint(new SimpleAuthenticationEntryPoint()) //匿名用户访问无权限资源时的异常
                .accessDeniedHandler(new SimpleAccessDeniedHandler()); //认证过的用户访问无权限资源时的异常

        //session并发管理 ，原理是其缺省实现是将session记录在内存map中，因此不能用于集群环境中，服务器1中记录的信息和服务器2记录的信息并不相同；
        http.sessionManagement()
                .invalidSessionUrl("/login.html") // session 过期退出时调用
                .maximumSessions(1) //指定最大登录数
                .maxSessionsPreventsLogin(false); //是否保留已经登录的用户；为true，新用户无法登录；为 false，旧用户被踢出
//      http.headers().frameOptions().disable(); //解决不允许显示在iframe的问题
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCryptPasswordEncoder：Spring Security 提供的加密工具，可快速实现加密加盐
        return new BCryptPasswordEncoder();
    }

}
