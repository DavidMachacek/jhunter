package cz.machacek.jhunter.core.communication

import cz.machacek.jhunter.core.person.PersonRepository
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class CommunicationService(
    private val communicationRepository: CommunicationRepository,
    private val personRepository: PersonRepository
    ) {

    @Transactional
    fun getCommunication(idPerson: Long): List<CommunicationEntity> {
        return communicationRepository.findAllByIdPerson(idPerson).toList()
    }

    @Transactional
    fun createCommunication(idPerson: Long, entity: CommunicationEntity): CommunicationEntity {
        val personEntity = personRepository.findById(idPerson).orElseThrow{ NotFoundException() }
        entity.personEntity = personEntity
        return communicationRepository.save(entity)
    }

    @Transactional
    fun createSampleCommunication() {
        val comm1 = CommunicationEntity(channel = CommunicationChannelEnum.EMAIL, note = "poslal se email, clovek neodpovida")
        comm1.personEntity = personRepository.findById(1L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm1)
        val comm2 = CommunicationEntity(channel = CommunicationChannelEnum.PHONE, note = "je to debil")
        comm2.personEntity = personRepository.findById(1L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm2)
        val comm3 = CommunicationEntity(channel = CommunicationChannelEnum.EMAIL, note = "mozna popremysli")
        comm3.personEntity = personRepository.findById(3L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm3)
        val comm4 = CommunicationEntity(channel = CommunicationChannelEnum.EMAIL, note = "bla bla bla bla")
        comm4.personEntity = personRepository.findById(3L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm4)
        val comm5 = CommunicationEntity(channel = CommunicationChannelEnum.PHONE, note = "co sem mam napsat?")
        comm5.personEntity = personRepository.findById(3L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm5)
    }
}