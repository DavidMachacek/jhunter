package cz.machacek.jhunter.core

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository: CrudRepository<TaskEntity, Long> {

    @Query("select task from TaskEntity task where task.personEntity.idPerson=?1")
    fun findAllTasksForPerson(idPerson: String): List<TaskEntity>

    @Query("select task from TaskEntity task where task.createdBy=?1")
    fun findAllTasksOfUser(username: String): List<TaskEntity>
}