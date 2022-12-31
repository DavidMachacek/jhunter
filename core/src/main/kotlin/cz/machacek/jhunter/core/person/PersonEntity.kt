package cz.machacek.jhunter.core.person

import cz.machacek.jhunter.core.RoleEnum
import cz.machacek.jhunter.core.experience.ExperienceEntity
import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode
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
) {
        @Fetch(FetchMode.JOIN)
        @OneToMany(fetch = FetchType.LAZY, mappedBy = "personEntity")
        var experiences: MutableList<ExperienceEntity> = mutableListOf();
}