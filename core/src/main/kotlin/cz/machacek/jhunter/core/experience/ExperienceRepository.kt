package cz.machacek.jhunter.core.experience

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ExperienceRepository: CrudRepository<ExperienceEntity, Long> {

    @Query("select exp from ExperienceEntity exp where exp.personEntity.idPerson=?1")
    fun findAllExperienceForPerson(idPerson: Long): List<ExperienceEntity>
}