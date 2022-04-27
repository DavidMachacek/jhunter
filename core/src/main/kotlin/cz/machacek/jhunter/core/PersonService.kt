package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class PersonService(
    private val personRepository: PersonRepository,
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
        val human1 = PersonEntity(firstName = "david", lastName = "machacek")
        personRepository.save(human1)
        val human2 = PersonEntity(firstName = "adam", lastName = "machacek")
        personRepository.save(human2)
        val human3 = PersonEntity(firstName = "tomas", lastName = "danhel")
        personRepository.save(human3)
        val human4 = PersonEntity(firstName = "jiri", lastName = "janousek")
        personRepository.save(human4)
        val human5 = PersonEntity(firstName = "martin", lastName = "prochazka")
        personRepository.save(human5)
    }

    fun getPeopleFromDB(): List<PersonEntity> {
        logger.info { "velikost DB ${personRepository.findAll().toList()}" }
        return personRepository.findAll().toList()
    }

    @Transactional
    fun patchPerson(id: String, personEntity: PersonEntity): PersonEntity {
        val dbPerson = personRepository.findById(id.toLong()).orElseThrow{ NotFoundException() }
        personEntity.firstName?.let {
            dbPerson.firstName = personEntity.firstName
        }
        personEntity.lastName?.let {
            dbPerson.lastName = personEntity.lastName
        }
        personEntity.role?.let {
            dbPerson.role = personEntity.role
        }
        personEntity.phone?.let {
            dbPerson.phone = personEntity.phone
        }
        personEntity.email?.let {
            dbPerson.email = personEntity.email
        }
        return personRepository.save(dbPerson)
    }

    fun createPerson(person:PersonEntity) {
        personRepository.save(person)
    }

    fun deletePerson(id: String) {
        personRepository.deleteById(id.toLong())
    }
}