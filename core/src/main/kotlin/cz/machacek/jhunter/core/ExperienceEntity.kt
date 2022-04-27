package cz.machacek.jhunter.core

import org.hibernate.annotations.CreationTimestamp
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
    val experiencesType: ExperienceTypeEnum? = null,

    @Column
    val years: Long? = null,

    @Column
    val note: String? = null

) {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPerson", referencedColumnName = "idPerson")
    open var personEntity: PersonEntity? = null
}