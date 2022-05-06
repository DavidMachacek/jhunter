package cz.machacek.jhunter.core

import org.springframework.data.crossstore.ChangeSetPersister
import org.springframework.stereotype.Service

@Service
class ExperienceService(
    private val experienceRepository: ExperienceRepository,
    private val personRepository: PersonRepository
) {

    fun createExp() {
        val exp1 = ExperienceEntity(note = "sikovnej typek", type = ExperienceTypeEnum.JAVA, years = 20L, seniority = ExperienceSeniorityEnum.SENIOR)
        exp1.personEntity = personRepository.findById(1L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp1)
        val exp2 = ExperienceEntity(note = "typek", type = ExperienceTypeEnum.ANALYST, years = 2L, seniority = ExperienceSeniorityEnum.JUNIOR)
        exp2.personEntity = personRepository.findById(1L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp2)
        val exp3 = ExperienceEntity(note = "umi .net", type = ExperienceTypeEnum.DOTNET, years = 10L, seniority = ExperienceSeniorityEnum.JUNIOR)
        exp3.personEntity = personRepository.findById(2L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp3)
        val exp4 = ExperienceEntity(note = "testeeeer", type = ExperienceTypeEnum.TESTER, years = 3L, seniority = ExperienceSeniorityEnum.MEDIOR)
        exp4.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp4)
        val exp5 = ExperienceEntity(note = "poznamka ke zkusenosti", type = ExperienceTypeEnum.JAVA, years = 3L, seniority = ExperienceSeniorityEnum.SENIOR)
        exp5.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp5)
        val exp6 = ExperienceEntity(note = "poznamka ke zkusenosti", type = ExperienceTypeEnum.ARCHITECT, years = 3L, seniority = ExperienceSeniorityEnum.MEDIOR)
        exp6.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp6)
        val exp7 = ExperienceEntity(note = "poznamka ke zkusenosti", type = ExperienceTypeEnum.JAVA, years = 3L, seniority = ExperienceSeniorityEnum.JUNIOR)
        exp7.personEntity = personRepository.findById(4L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp7)
        val exp8 = ExperienceEntity(note = "poznamka ke zkusenosti", type = ExperienceTypeEnum.TESTER, years = 3L, seniority = ExperienceSeniorityEnum.SENIOR)
        exp8.personEntity = personRepository.findById(5L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp8)
        val exp9 = ExperienceEntity(note = "poznamka ke zkusenosti", type = ExperienceTypeEnum.JAVASCRIPT, years = 3L, seniority = ExperienceSeniorityEnum.MEDIOR)
        exp9.personEntity = personRepository.findById(6L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp9)
        val exp10 = ExperienceEntity(note = "poznamka ke zkusenosti", type = ExperienceTypeEnum.DOTNET, years = 3L, seniority = ExperienceSeniorityEnum.JUNIOR)
        exp10.personEntity = personRepository.findById(7L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        experienceRepository.save(exp10)
    }

    fun getExperienceForPerson(idPerson: String): List<ExperienceEntity> {
        return experienceRepository.findAllExperienceForPerson(idPerson.toLong())
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