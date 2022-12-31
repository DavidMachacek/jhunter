package cz.machacek.jhunter.core.experience

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/experience")
class ExperienceController(
    private val experienceService: ExperienceService
) {

    private val logger = KotlinLogging.logger {}

    @GetMapping("/{idPerson}")
    fun getExperienceForPerson(@PathVariable idPerson:String): List<ExperienceEntity> {
        logger.info{ "operation=getTasksForContaact, params=[idPerson=$idPerson]"}
        return experienceService.getExperienceForPerson(idPerson)
    }

    @PatchMapping("/{id}")
    fun patchExperience(@PathVariable idExperience:String, experienceEntity: ExperienceEntity): ExperienceEntity {
        logger.info{ "operation=patchTask, params=[idExperience=$idExperience, experienceEntity=$experienceEntity]"}
        return experienceService.patchExperience(idExperience, experienceEntity)
    }

    @PostMapping
    fun createExperience(@RequestBody experienceEntity: ExperienceEntity) {
        logger.info{ "operation=createTask, params=[experienceEntity=$experienceEntity]"}
        experienceService.createExperience(experienceEntity)
    }

    @DeleteMapping("/{id}")
    fun deleteExperience(@PathVariable id:String) {
        logger.info{ "operation=deleteExperience, params=[id=$id]"}
        experienceService.deleteExperience(id)
    }
}