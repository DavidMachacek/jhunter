package cz.machacek.jhunter.core

import org.springframework.security.oauth2.jwt.Jwt


data class JhUser(
    val id: String,
    val username: String
)

fun Jwt.toJhUser(): JhUser {
    return JhUser(
        id = this.id,
        username = this.claims["preferred_username"].toString()
    )
}