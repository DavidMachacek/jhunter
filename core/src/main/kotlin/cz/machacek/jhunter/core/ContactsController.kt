package cz.machacek.jhunter.core

import org.springframework.web.bind.annotation.*
import java.util.*

//@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.GET, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS], maxAge = 3600)
@RestController
@RequestMapping("/api/contacts")
class ContactsController(
        private val contactsService: ContactsService
) {

    @PatchMapping("/{id}")
    fun patchContact(@PathVariable id:String, @RequestBody contact:ContactEntity): ContactEntity {
        return contactsService.patchContact(id, contact)
    }

    @PostMapping
    fun createContact(@RequestBody contact:ContactEntity) {
        contactsService.createContact(contact)
    }

    @DeleteMapping("/{id}")
    fun deleteContact(@PathVariable id:String) {
        contactsService.deleteContact(id)
    }
/*
    @GetMapping("/create")
    fun savePeople() {
        peopleService.createPeople()
    }*/

    @GetMapping
    fun getPeopleFromDB(): List<ContactEntity> {
        return contactsService.getPeopleFromDB()
    }
}