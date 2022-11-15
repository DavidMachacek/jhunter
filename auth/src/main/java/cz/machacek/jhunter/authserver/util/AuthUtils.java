package cz.machacek.jhunter.authserver.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;
import java.util.List;

public class AuthUtils {

    final public static Algorithm JH_ALGORITHM = com.auth0.jwt.algorithms.Algorithm.HMAC256("secret".getBytes());
    final public static String ACCESS_TOKEN = "access_token";
    final public static String REFRESH_TOKEN = "refresh_token";
    final public static String BEARER_HEADER = "Bearer ";
    final public static String ROLE_CLAIM = "roles";

    final public static Integer ACCESS_TOKEN_TIMEOUT = 7 * 10 * 60 * 1000;
    final public static Integer REFRESH_TOKEN_TIMEOUT = 14 * 10 * 60 * 1000;

    public static String createToken( String username, String issuer, List<String> roleList, Integer refreshTimeout) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshTimeout))
                .withIssuer(issuer)
                .withClaim(ROLE_CLAIM, roleList)
                .sign(JH_ALGORITHM);
    }
}
