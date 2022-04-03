package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/communication")
class CommunicationsController(
    private val communicationService: CommunicationService
) {

    private val logger = KotlinLogging.logger {}

    @GetMapping("/{idContact}")
    fun getCommunication(@PathVariable idContact: String): List<CommunicationEntity> {
        logger.info{ "operation=getCommunication, params=[idContact=$idContact]"}
        return communicationService.getCommunication(idContact = idContact)
    }

    @PostMapping("/{idContact}")
    fun createCommunication(@PathVariable idContact: String, @RequestBody communicationEntity: CommunicationEntity): CommunicationEntity {
        logger.info{ "operation=createCommunication, params=[communicationEntity=$communicationEntity]"}
        return communicationService.createCommunication(idContact, communicationEntity)
    }
}