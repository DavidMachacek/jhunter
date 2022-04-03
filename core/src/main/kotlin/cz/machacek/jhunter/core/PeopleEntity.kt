package cz.machacek.jhunter.core

import javax.persistence.*

@Entity
@Table(name = "people")
data class PeopleEntity(
        @Id
        @Column
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val idPeople: Long?,
        @Column
        val firstName: String,
        @Column
        val lastName: String
)