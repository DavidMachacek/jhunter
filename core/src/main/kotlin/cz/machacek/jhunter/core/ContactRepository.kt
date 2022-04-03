package cz.machacek.jhunter.core

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ContactRepository: CrudRepository<ContactEntity, Long> {
}