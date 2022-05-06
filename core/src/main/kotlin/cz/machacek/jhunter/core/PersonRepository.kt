package cz.machacek.jhunter.core

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface PersonRepository: CrudRepository<PersonEntity, Long> {

    @Query("select person from PersonEntity person JOIN ExperienceEntity experience on experience.personEntity.idPerson = person.idPerson where experience.type in ?1")
    fun getPeopleByExp(roles: List<ExperienceTypeEnum>): List<PersonEntity>

}