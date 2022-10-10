package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.data.crossstore.ChangeSetPersister
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val personRepository: PersonRepository
) {
    private val logger = KotlinLogging.logger {}

    fun getTasks(): List<TaskEntity> {
        return taskRepository.findAll().toList()
    }

    fun getTasksForPerson(idPerson: String): List<TaskEntity> {
        return taskRepository.findAllTasksForPerson(idPerson)
    }

    fun patchTask(idTask: String, taskEntity: TaskEntity): TaskEntity {
        TODO("Not yet implemented")
    }

    fun createTask(taskEntity: TaskEntity) {
        TODO("Not yet implemented")
    }

    fun deleteTask(id: String) {
        TODO("Not yet implemented")
    }

    fun createTasks() {
        logger.info { "nahravam data do DB" }
        val task1 = TaskEntity(targetDate = LocalDateTime.now(), isDone = false, note = "zavolejt mu")
        task1.personEntity = personRepository.findById(1L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task1)
        val task2 = TaskEntity(targetDate = LocalDateTime.now(), isDone = true, note = "mozna uz dal vypoved - ozvi se")
        task2.personEntity = personRepository.findById(2L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task2)
        val task3 = TaskEntity(targetDate = LocalDateTime.now(), isDone = false, note = "udelej si kafe")
        task3.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task3)
    }
}