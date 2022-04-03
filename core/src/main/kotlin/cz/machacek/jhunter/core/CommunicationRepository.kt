package cz.machacek.jhunter.core

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CommunicationRepository: CrudRepository<CommunicationEntity, Long> {

    @Query("select comm from CommunicationEntity comm where comm.contactEntity.idContact=?1")
    fun findAllByIdContact(idContact: Long): List<CommunicationEntity>

}