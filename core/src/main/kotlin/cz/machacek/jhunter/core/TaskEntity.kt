package cz.machacek.jhunter.core

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
    val targetDate: LocalDateTime? = null,

    @Column
    var isDone: Boolean? = false,

    @Column
    val note: String? = null
) {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPerson", referencedColumnName = "idPerson")
    open var personEntity: PersonEntity? = null
}