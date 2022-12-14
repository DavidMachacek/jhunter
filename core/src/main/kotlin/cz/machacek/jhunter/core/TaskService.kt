package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.data.crossstore.ChangeSetPersister
import org.springframework.stereotype.Service
import java.time.Instant.now
import java.time.LocalDateTime
import java.time.LocalDateTime.now
import java.util.*

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val personRepository: PersonRepository
) {
    private val logger = KotlinLogging.logger {}

    fun getTasks(): List<TaskEntity> {
        return taskRepository.findAll().toList()
    }

    fun getUsersTasks(username: String): List<TaskEntity> {
        return taskRepository.findAllTasksOfUser(username)
    }

    fun getTasksForPerson(idPerson: String): List<TaskEntity> {
        return taskRepository.findAllTasksForPerson(idPerson)
    }

    fun getDueTasksForUser(username: String): List<TaskEntity> {
        val tasks = taskRepository.findAllTasksOfUser(username)
        return tasks.filter { !it.isDone } .filter { it.targetDate.isBefore(LocalDateTime.now())}
    }

    fun finishTask(idTask: Long): TaskEntity {
        val task = taskRepository.findById(idTask).get()
        task.isDone = !task.isDone
        return taskRepository.save(task)
    }

    fun createTask(taskEntity: TaskEntity) {
        TODO("Not yet implemented")
    }

    fun deleteTask(id: String) {
        TODO("Not yet implemented")
    }

    fun createTasks() {
        logger.info { "nahravam data do DB" }
        val task1 = TaskEntity(targetDate = LocalDateTime.now().plusYears(10L), isDone = false, note = "zavolejt mu", createdBy = "david")
        task1.personEntity = personRepository.findById(1L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task1)
        val task2 = TaskEntity(targetDate = LocalDateTime.now().plusYears(10L), isDone = true, note = "mozna uz dal vypoved - ozvi se", createdBy = "janicka")
        task2.personEntity = personRepository.findById(2L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task2)
        val task3 = TaskEntity(targetDate = LocalDateTime.now().plusYears(10L), isDone = false, note = "udelej si kafe", createdBy = "david")
        task3.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task3)
        val task1due = TaskEntity(targetDate = LocalDateTime.now().minusMonths(2), isDone = false, note = "stary task 1", createdBy = "david")
        task1due.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task1due)
        val task2due = TaskEntity(targetDate = LocalDateTime.now().minusMonths(2), isDone = true, note = "stary hotovy task 2", createdBy = "david")
        task2due.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task2due)
        val task3due = TaskEntity(targetDate = LocalDateTime.now().minusMonths(2), isDone = false, note = "stary task 3", createdBy = "david")
        task3due.personEntity = personRepository.findById(3L).orElseThrow{ ChangeSetPersister.NotFoundException() }
        taskRepository.save(task3due)
    }
}