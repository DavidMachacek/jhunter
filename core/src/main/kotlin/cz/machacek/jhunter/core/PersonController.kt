package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

//@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS], maxAge = 3600)
@RestController
@RequestMapping("/api/persons")
class PersonController(
        private val personService: PersonService
) {

    private val logger = KotlinLogging.logger {}

    @PatchMapping("/{id}")
    fun patchPerson(@PathVariable id:String, @RequestBody person:PersonEntity): PersonEntity {
        logger.info{ "operation=patchPerson, params=[id=$id, person=$person]"}
        return personService.patchPerson(id, person)
    }

    @PostMapping
    fun createPerson(@RequestBody person:PersonEntity) {
        logger.info{ "operation=createPerson, params=[person=$person]"}
        personService.createPerson(person)
    }

    @DeleteMapping("/{id}")
    fun deletePerson(@PathVariable id:String) {
        logger.info{ "operation=deletePerson, params=[id=$id]"}
        personService.deletePerson(id)
    }
/*
    @GetMapping("/create")
    fun savePeople() {
        peopleService.createPeople()
    }*/

    @GetMapping
    fun getPeopleFromDB(): List<PersonEntity> {
        logger.info{ "operation=getPeopleFromDB"}
        return personService.getPeopleFromDB()
    }

    @PostMapping("/search")
    fun getPeopleByExp(@RequestBody request: SearchPersonRequest): List<PersonEntity> {
        logger.info{ "operation=getPeopleByExp"}
        return personService.getPeopleByExp(request)
    }
}