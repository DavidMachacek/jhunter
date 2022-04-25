package cz.machacek.jhunter.core

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository: CrudRepository<TaskEntity, Long> {

    @Query("select task from TaskEntity task where task.contactEntity.idContact=?1")
    fun findAllTasksForContact(idContact: String): List<TaskEntity>
}