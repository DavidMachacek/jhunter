package cz.machacek.jhunter.core.person

import cz.machacek.jhunter.core.SearchPersonRequest
import cz.machacek.jhunter.core.toJhUser
import mu.KotlinLogging
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.*

//@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS], maxAge = 3600)
@RestController
@RequestMapping("/api/persons")
@PreAuthorize("hasAnyAuthority('jhuhnter-adminn')")
class PersonController(
        private val personService: PersonService
) {

    private val logger = KotlinLogging.logger {}

    @GetMapping("/{id}")
    fun getPerson(@PathVariable id:String): PersonEntity {
        logger.info{ "operation=getPerson, params=[id=$id]"}
        return personService.getPerson(id)
    }

    @PatchMapping("/{id}")
    fun patchPerson(@PathVariable id:String, @RequestBody person: PersonEntity): PersonEntity {
        logger.info{ "operation=patchPerson, params=[id=$id, person=$person]"}
        return personService.patchPerson(id, person)
    }

    @PostMapping
    fun createPerson(@RequestBody person: PersonEntity) {
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
    fun getPeopleByExp(@RequestBody request: SearchPersonRequest, @AuthenticationPrincipal principal: Jwt): List<PersonEntity> {
        logger.info{ "operation=getPeopleByExp"}
        val user = principal.toJhUser()
        return personService.getPeopleByExp(request)
    }
}