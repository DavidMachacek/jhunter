package cz.machacek.jhunter.core

import org.springframework.stereotype.Service

@Service
class TaskService(
    private val taskRepository: TaskRepository
) {
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

}