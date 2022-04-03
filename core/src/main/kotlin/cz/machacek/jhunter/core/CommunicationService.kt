package cz.machacek.jhunter.core

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class CommunicationService(
    private val communicationRepository: CommunicationRepository,
    private val contactRepository: ContactRepository
    ) {

    @Transactional
    fun getCommunication(idContact: String): List<CommunicationEntity> {
        return communicationRepository.findAllByIdContact(idContact.toLong()).toList()
    }

    @Transactional
    fun createCommunication(idContact: String, entity: CommunicationEntity): CommunicationEntity {
        val contactEntity = contactRepository.findById(idContact.toLong()).orElseThrow{ NotFoundException() }
        entity.contactEntity = contactEntity
        return communicationRepository.save(entity)
    }

    @Transactional
    fun createCommunication() {
        val comm1 = CommunicationEntity(channel = CommunicationChannelEnum.EMAIL, note = "poslal se email, clovek neodpovida")
        comm1.contactEntity = contactRepository.findById(1L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm1)
        val comm2 = CommunicationEntity(channel = CommunicationChannelEnum.PHONE, note = "je to debil")
        comm2.contactEntity = contactRepository.findById(1L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm2)
        val comm3 = CommunicationEntity(channel = CommunicationChannelEnum.EMAIL, note = "mozna popremysli")
        comm3.contactEntity = contactRepository.findById(3L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm3)
        val comm4 = CommunicationEntity(channel = CommunicationChannelEnum.EMAIL, note = "bla bla bla bla")
        comm4.contactEntity = contactRepository.findById(3L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm4)
        val comm5 = CommunicationEntity(channel = CommunicationChannelEnum.PHONE, note = "co sem mam napsat?")
        comm5.contactEntity = contactRepository.findById(3L).orElseThrow{ NotFoundException() }
        communicationRepository.save(comm5)
    }
}