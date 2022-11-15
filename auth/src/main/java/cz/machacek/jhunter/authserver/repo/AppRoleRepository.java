package cz.machacek.jhunter.authserver.repo;

import cz.machacek.jhunter.authserver.domain.AppRole;
import cz.machacek.jhunter.authserver.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
    AppRole findByName(String name);
}
