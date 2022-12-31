package cz.machacek.jhunter.core.task

import cz.machacek.jhunter.core.person.PersonEntity
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "Tasks")
data class TaskEntity (
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val idTask: Long? = null,

    @Column
    @field:CreationTimestamp
    val created : LocalDateTime? = null,

    @Column
    val createdBy : String,

    @Column
    val targetDate: LocalDateTime,

    @Column
    var isDone: Boolean = false,

    @Column
    val note: String? = null
) {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPerson", referencedColumnName = "idPerson")
    open var personEntity: PersonEntity? = null
}