package cz.machacek.jhunter.core.communication

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/communication")
class CommunicationsController(
    private val communicationService: CommunicationService
) {

    private val logger = KotlinLogging.logger {}

    @GetMapping("/{idPerson}")
    fun getCommunication(@PathVariable idPerson: Long): List<CommunicationEntity> {
        logger.info{ "operation=getCommunication, params=[idPerson=$idPerson]"}
        return communicationService.getCommunication(idPerson = idPerson)
    }

    @PostMapping("/{idPerson}")
    fun createCommunication(@PathVariable idPerson: Long, @RequestBody communicationEntity: CommunicationEntity): CommunicationEntity {
        logger.info{ "operation=createCommunication, params=[communicationEntity=$communicationEntity]"}
        return communicationService.createCommunication(idPerson, communicationEntity)
    }
}