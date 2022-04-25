package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/experience")
class ExperienceController(
    private val experienceService: ExperienceService
) {

    private val logger = KotlinLogging.logger {}

    @PatchMapping
    fun getExperienceForContaact(@PathVariable idContact:String): List<ExperienceEntity> {
        logger.info{ "operation=getTasksForContaact, params=[idContact=$idContact]"}
        return experienceService.getTasksForContact(idContact)
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