package cz.machacek.jhunter.core.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:sendgrid.yaml")
public class EmailProperties {

    @Value("${sendgrid.key}")
    public String sendgridKey;
}
