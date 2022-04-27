package cz.machacek.jhunter.core

import org.springframework.stereotype.Service

@Service
class ExperienceService(
    private val experienceRepository: ExperienceRepository
) {
    fun getTasksForPerson(idPerson: String): List<ExperienceEntity> {
        return experienceRepository.findAllExperienceForPerson(idPerson)
    }

    fun patchExperience(idExperience: String, experienceEntity: ExperienceEntity): ExperienceEntity {
        TODO("Not yet implemented")
    }

    fun createExperience(experienceEntity: ExperienceEntity) {
        TODO("Not yet implemented")
    }

    fun deleteExperience(id: String) {
        TODO("Not yet implemented")
    }
}