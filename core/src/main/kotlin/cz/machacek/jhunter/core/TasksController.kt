package cz.machacek.jhunter.core

import mu.KotlinLogging
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
class TasksController(
    private val taskService: TaskService
) {

    private val logger = KotlinLogging.logger {}

    @GetMapping
    fun getUsersTasks(@AuthenticationPrincipal principal: Jwt): List<TaskEntity> {
        val user = principal.toJhUser()
        logger.info{ "operation=getTasks, username=${user.username}" }
        return taskService.getUsersTasks(user.username)
    }

    @GetMapping("/{idTask}")
    fun getTasksForPerson(@PathVariable idTask:String): List<TaskEntity> {
        logger.info{ "operation=getTasksForPerson, params=[idTask=$idTask]"}
        return taskService.getTasksForPerson(idTask)
    }

    @PatchMapping("/{idTask}/done")
    fun patchTask(@PathVariable idTask:String): TaskEntity {
        logger.info{ "operation=patchTask, params=[idTask=$idTask"}
        return taskService.finishTask(idTask.toLong())
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