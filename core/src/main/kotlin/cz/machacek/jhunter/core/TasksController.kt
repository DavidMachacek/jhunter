package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
class TasksController(
    private val taskService: TaskService
) {

    private val logger = KotlinLogging.logger {}

    @PatchMapping
    fun getTasksForPerson(@PathVariable idPerson:String): List<TaskEntity> {
        logger.info{ "operation=getTasksForPerson, params=[idPerson=$idPerson]"}
        return taskService.getTasksForPerson(idPerson)
    }

    @PatchMapping("/{id}")
    fun patchTask(@PathVariable idTask:String, taskEntity: TaskEntity): TaskEntity {
        logger.info{ "operation=patchTask, params=[idTask=$idTask, taskEntity=$taskEntity]"}
        return taskService.patchTask(idTask, taskEntity)
    }

    @PostMapping
    fun createTask(@RequestBody taskEntity: TaskEntity) {
        logger.info{ "operation=createTask, params=[taskEntity=$taskEntity]"}
        taskService.createTask(taskEntity)
    }

    @DeleteMapping("/{id}")
    fun deleteTaskt(@PathVariable id:String) {
        logger.info{ "operation=deleteTask, params=[id=$id]"}
        taskService.deleteTask(id)
    }
}