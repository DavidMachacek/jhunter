package cz.machacek.jhunter.authserver.service;

import cz.machacek.jhunter.authserver.domain.AppRole;
import cz.machacek.jhunter.authserver.domain.AppUser;

import java.util.List;

public interface UserService {

    AppUser saveUser(AppUser user);
    AppRole saveRole(AppRole role);
    void addRoleToUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> getUsers();

}
