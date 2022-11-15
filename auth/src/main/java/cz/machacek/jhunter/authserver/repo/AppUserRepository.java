package cz.machacek.jhunter.authserver.repo;

import cz.machacek.jhunter.authserver.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
