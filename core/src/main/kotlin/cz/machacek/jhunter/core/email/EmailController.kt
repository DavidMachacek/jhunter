package cz.machacek.jhunter.core.email

import mu.KotlinLogging
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/email")
@PreAuthorize("hasAnyAuthority('jhuhnter-adminn')")
class EmailController(
    private val emailService: EmailService
) {

    private val logger = KotlinLogging.logger {}

    @PostMapping("/send")
    fun sendEmails(@RequestBody emailRequest: EmailRequest) {
        logger.info{ "operation=sendEmails, params=[emailRequest=$emailRequest]"}
        return emailService.sendEmail(emailRequest)
    }

}