package cz.machacek.jhunter.core

import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "Communications")
data class CommunicationEntity (
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val idCommunication: Long? = null,

    @Column
    @field:CreationTimestamp
    val created : LocalDateTime? = null,

    @Column
    val channel: CommunicationChannelEnum? = null,

    @Column
    val note: String? = null
) {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idContact", referencedColumnName = "idContact")
    open var contactEntity: ContactEntity? = null
}