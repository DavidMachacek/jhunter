package cz.machacek.jhunter.core

import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CommonsRequestLoggingFilter


@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http.cors()
            .and()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests { configurer ->
                configurer
                    .antMatchers("/error")
                    .permitAll()
                    .anyRequest()
                    /*.hasRole("jhuhnter-admin")*/
                    .authenticated()
            }
            .oauth2ResourceServer().jwt()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("http://localhost:3000", "http://localhost:3001")
        configuration.allowedMethods = listOf("GET", "POST", "PATCH", "PUT", "OPTIONS", "DELETE")
        configuration.allowedHeaders = listOf("content-type", "authorization")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }


/*    @Bean
    fun logFilter(): CommonsRequestLoggingFilter? {
        val filter = CommonsRequestLoggingFilter()
        filter.setIncludeQueryString(true)
        filter.setIncludePayload(true)
        filter.setMaxPayloadLength(10000)
        filter.setIncludeHeaders(true)
        filter.setAfterMessagePrefix("REQUEST DATA : ")
        return filter
    }*/
}