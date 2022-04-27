package cz.machacek.jhunter.core

import javax.persistence.*

@Entity
@Table(name = "persons")
data class PersonEntity(
        @Id
        @Column
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val idPerson: Long? = null,
        @Column
        var firstName: String? = null,
        @Column
        var lastName: String? = null,
        @Column
        var role: RoleEnum = RoleEnum.UNKNOWN,
        @Column
        var email: String? = null,
        @Column
        var phone: String? = null,
        @Column
        var linkedIn: String? = null
)