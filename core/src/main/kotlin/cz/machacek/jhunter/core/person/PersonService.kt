package cz.machacek.jhunter.core.person

import cz.machacek.jhunter.core.SearchPersonRequest
import cz.machacek.jhunter.core.task.TaskService
import cz.machacek.jhunter.core.communication.CommunicationService
import cz.machacek.jhunter.core.experience.ExperienceService
import mu.KotlinLogging
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class PersonService(
    private val personRepository: PersonRepository,
    private val communicationService: CommunicationService,
    private val experienceService: ExperienceService,
    private val taskService: TaskService
) {

    private val logger = KotlinLogging.logger {}

    init {
        createPeople()
        communicationService.createSampleCommunication()
        experienceService.createExp()
        taskService.createTasks()
    }

    @Transactional
    fun createPeople() {
        logger.info { "nahravam data do DB" }
        val human1 = PersonEntity(firstName = "david", lastName = "machacek", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human1)
        val human2 = PersonEntity(firstName = "adam", lastName = "machacek", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human2)
        val human3 = PersonEntity(firstName = "tomas", lastName = "danhel", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human3)
        val human4 = PersonEntity(firstName = "jiri", lastName = "janousek", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human4)
        val human5 = PersonEntity(firstName = "martin", lastName = "prochazka", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human5)
        val human6 = PersonEntity(firstName = "michal", lastName = "lirs", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human6)
        val human7 = PersonEntity(firstName = "vladimir", lastName = "janous", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human7)
        val human8 = PersonEntity(firstName = "jana", lastName = "machacekova", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human8)
        val human9 = PersonEntity(firstName = "adam", lastName = "zlatohlavek", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human9)
        val human10 = PersonEntity(firstName = "oliver", lastName = "scholze", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human10)
        val human11 = PersonEntity(firstName = "jan", lastName = "novak", linkedIn = "https://www.linkedin.com/in/david-machacek/", email = "davido.machacek@gmail.com")
        personRepository.save(human11)
    }

    fun getPeopleFromDB(): List<PersonEntity> {
        logger.info { "velikost DB ${personRepository.findAll().toList()}" }
        return personRepository.findAll().toList()
    }


    fun getPerson(id: String): PersonEntity {
        return personRepository.findById(id.toLong()).get()
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

    fun createPerson(person: PersonEntity) {
        personRepository.save(person)
    }

    fun deletePerson(id: String) {
        personRepository.deleteById(id.toLong())
    }

    fun getPeopleByExp(request: SearchPersonRequest): List<PersonEntity> {
        return if (request.roles.isEmpty()) personRepository.findAll().toList() else personRepository.getPeopleByExp(request.roles)
    }
}