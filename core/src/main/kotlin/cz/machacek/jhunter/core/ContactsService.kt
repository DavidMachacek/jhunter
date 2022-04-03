package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class ContactsService(
        private val contactRepository: ContactRepository,
        private val communicationService: CommunicationService
) {

    private val logger = KotlinLogging.logger {}

    init {
        createPeople()
        communicationService.createCommunication()
    }

    @Transactional
    fun createPeople() {
        logger.info { "nahravam data do DB" }
        val human1 = ContactEntity(firstName = "david", lastName = "machacek")
        contactRepository.save(human1)
        val human2 = ContactEntity(firstName = "adam", lastName = "machacek")
        contactRepository.save(human2)
        val human3 = ContactEntity(firstName = "tomas", lastName = "danhel")
        contactRepository.save(human3)
        val human4 = ContactEntity(firstName = "jiri", lastName = "janousek")
        contactRepository.save(human4)
        val human5 = ContactEntity(firstName = "martin", lastName = "prochazka")
        contactRepository.save(human5)
    }

    fun getPeopleFromDB(): List<ContactEntity> {
        logger.info { "velikost DB ${contactRepository.findAll().toList()}" }
        return contactRepository.findAll().toList()
    }

    @Transactional
    fun patchContact(id: String, contactEntity: ContactEntity): ContactEntity {
        val dbContact = contactRepository.findById(id.toLong()).orElseThrow{ NotFoundException() }
        contactEntity.firstName?.let {
            dbContact.firstName = contactEntity.firstName
        }
        contactEntity.lastName?.let {
            dbContact.lastName = contactEntity.lastName
        }
        contactEntity.role?.let {
            dbContact.role = contactEntity.role
        }
        contactEntity.phone?.let {
            dbContact.phone = contactEntity.phone
        }
        contactEntity.email?.let {
            dbContact.email = contactEntity.email
        }
        return contactRepository.save(dbContact)
    }

    fun createContact(contact:ContactEntity) {
        contactRepository.save(contact)
    }

    fun deleteContact(id: String) {
        contactRepository.deleteById(id.toLong())
    }
}