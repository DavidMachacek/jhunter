package cz.machacek.jhunter.core

import kotlinx.coroutines.internal.artificialFrame
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import java.util.*

@RestController
@RequestMapping("/api")
class Controller(
        private val peopleService: PeopleService
) {

    @GetMapping
    fun getPeople(): List<PeopleEntity> {
        return Arrays.asList(PeopleEntity(idPeople = 1, firstName = "david", lastName = "machacek"))
    }

    @GetMapping("/create")
    fun savePeople() {
        peopleService.createPeople()
    }

    @GetMapping("/db")
    fun getPeopleFromDB(): List<PeopleEntity> {
        return peopleService.getPeopleFromDB()
    }
}