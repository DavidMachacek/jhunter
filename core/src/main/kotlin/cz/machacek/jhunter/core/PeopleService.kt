package cz.machacek.jhunter.core

import org.springframework.stereotype.Service
import java.util.*
import java.util.stream.Collectors
import java.util.stream.StreamSupport

@Service
class PeopleService(
        private val peopleRepository: PeopleRepository
) {

    fun createPeople() {
        val human1 = PeopleEntity(idPeople = 1, firstName = "david", lastName = "machacek")
        val human2 = PeopleEntity(idPeople = 1, firstName = "adam", lastName = "machacek")
        val human3 = PeopleEntity(idPeople = 1, firstName = "tomas", lastName = "danhel")
        val human4 = PeopleEntity(idPeople = 1, firstName = "jiri", lastName = "janousek")
        val human5 = PeopleEntity(idPeople = 1, firstName = "martin", lastName = "prochazka")
        val people = Arrays.asList(human1, human2, human3, human4, human5)
        peopleRepository.saveAll(people)
    }

    fun getPeopleFromDB(): List<PeopleEntity> {
        return StreamSupport.stream(peopleRepository.findAll().spliterator(), true).collect(Collectors.toList())
    }
}