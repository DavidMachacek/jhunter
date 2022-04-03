package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*
import java.util.*

//@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS], maxAge = 3600)
@RestController
@RequestMapping("/api/contacts")
class ContactsController(
        private val contactsService: ContactsService
) {

    private val logger = KotlinLogging.logger {}

    @PatchMapping("/{id}")
    fun patchContact(@PathVariable id:String, @RequestBody contact:ContactEntity): ContactEntity {
        logger.info{ "operation=patchContact, params=[id=$id, contact=$contact]"}
        return contactsService.patchContact(id, contact)
    }

    @PostMapping
    fun createContact(@RequestBody contact:ContactEntity) {
        logger.info{ "operation=createContact, params=[contact=$contact]"}
        contactsService.createContact(contact)
    }

    @DeleteMapping("/{id}")
    fun deleteContact(@PathVariable id:String) {
        logger.info{ "operation=deleteContact, params=[id=$id]"}
        contactsService.deleteContact(id)
    }
/*
    @GetMapping("/create")
    fun savePeople() {
        peopleService.createPeople()
    }*/

    @GetMapping
    fun getPeopleFromDB(): List<ContactEntity> {
        logger.info{ "operation=getPeopleFromDB"}
        return contactsService.getPeopleFromDB()
    }
}