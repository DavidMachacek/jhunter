package cz.machacek.jhunter.core

import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "communications")
data class CommunicationEntity (
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val idCommnication: Long? = null,

    @Column
    @field:CreationTimestamp
    val created : LocalDateTime? = null,

    @Column
    val channel: CommunicationChannelEnum? = null,

    @Column
    val note: String? = null
) {
    @ManyToOne
    @JoinColumn(name = "communication_entity_id_contact")
    open var contactEntity: ContactEntity? = null
}