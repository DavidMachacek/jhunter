package cz.machacek.jhunter.authserver;

import cz.machacek.jhunter.authserver.domain.AppRole;
import cz.machacek.jhunter.authserver.domain.AppUser;
import cz.machacek.jhunter.authserver.service.UserService;
import cz.machacek.jhunter.authserver.util.RolesEnum;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

import static cz.machacek.jhunter.authserver.util.RolesEnum.*;

@SpringBootApplication
public class AuthServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServerApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new AppRole(null, JHUNTER_ROLE_ADMIN.name()));
			userService.saveRole(new AppRole(null, JHUNTER_ROLE_WRITER.name()));
			userService.saveRole(new AppRole(null, JHUNTER_ROLE_READER.name()));

			userService.saveUser(new AppUser(null, "David Machacek", "david", "david@david.d", "david", new ArrayList<>()));

			userService.addRoleToUser("david", JHUNTER_ROLE_ADMIN.name());
		};
	}

}
