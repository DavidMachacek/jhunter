package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
class TasksController(
    private val taskService: TaskService
) {

    private val logger = KotlinLogging.logger {}

    @GetMapping
    fun getTasks(): List<TaskEntity> {
        logger.info{ "operation=getTasks"}
        return taskService.getTasks()
    }

    @GetMapping("/{idTask}")
    fun getTasksForPerson(@PathVariable idTask:String): List<TaskEntity> {
        logger.info{ "operation=getTasksForPerson, params=[idTask=$idTask]"}
        return taskService.getTasksForPerson(idTask)
    }

    @PatchMapping("/{idTask}")
    fun patchTask(@PathVariable idTask:String, taskEntity: TaskEntity): TaskEntity {
        logger.info{ "operation=patchTask, params=[idTask=$idTask, taskEntity=$taskEntity]"}
        return taskService.patchTask(idTask, taskEntity)
    }

    @PostMapping
    fun createTask(@RequestBody taskEntity: TaskEntity) {
        logger.info{ "operation=createTask, params=[taskEntity=$taskEntity]"}
        taskService.createTask(taskEntity)
    }

    @DeleteMapping("/{idTask}")
    fun deleteTaskt(@PathVariable idTask:String) {
        logger.info{ "operation=deleteTask, params=[idTask=$idTask]"}
        taskService.deleteTask(idTask)
    }
}