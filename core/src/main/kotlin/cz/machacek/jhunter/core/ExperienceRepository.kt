package cz.machacek.jhunter.core

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ExperienceRepository: CrudRepository<ExperienceEntity, Long> {

    @Query("select exp from ExperienceEntity exp where exp.contactEntity.idContact=?1")
    fun findAllExperienceForContact(idContact: String): List<ExperienceEntity>
}