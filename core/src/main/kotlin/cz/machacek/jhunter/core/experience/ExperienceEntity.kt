package cz.machacek.jhunter.core.experience

import com.fasterxml.jackson.annotation.JsonIgnore
import cz.machacek.jhunter.core.person.PersonEntity
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "Experience")
data class ExperienceEntity (
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val idExperience: Long? = null,

    @Column
    @field:CreationTimestamp
    val created : LocalDateTime? = null,

    @Column
    val type: ExperienceTypeEnum? = null,

    @Column
    val years: Long? = null,

    @Column
    val seniority: ExperienceSeniorityEnum? = null,

    @Column
    val note: String? = null

) {
    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPerson", referencedColumnName = "idPerson")
    @JsonIgnore
    open var personEntity: PersonEntity? = null
}