package cz.machacek.jhunter.core.email

import com.sendgrid.Method
import com.sendgrid.Request
import com.sendgrid.SendGrid
import com.sendgrid.helpers.mail.Mail
import com.sendgrid.helpers.mail.objects.Content
import com.sendgrid.helpers.mail.objects.Email
import cz.machacek.jhunter.core.communication.CommunicationChannelEnum
import cz.machacek.jhunter.core.communication.CommunicationEntity
import cz.machacek.jhunter.core.communication.CommunicationService
import cz.machacek.jhunter.core.person.PersonService
import org.springframework.stereotype.Service
import java.io.IOException
import java.lang.System.*

@Service
class EmailService(
    val personService: PersonService,
    val communicationService: CommunicationService,
    val emailProperties: EmailProperties
) {

    fun sendEmail(emailRequest: EmailRequest) {
        val recipientIds = emailRequest.recipientIds
        val content = Content("text/plain", emailRequest.payload)
        val subject = emailRequest.subject
        for (recipient in recipientIds) {
            val person = personService.getPerson(recipient)
            val from = Email("jhunter@machackovi.com");
            val to = Email(person.email);
            val mail = Mail(from, subject, to, content);

            val sg = SendGrid(emailProperties.sendgridKey)
            val request = Request();
            println(request);
            println("Sending to " + person.email);
            try {
                request.method = Method.POST;
                request.endpoint = "mail/send";
                request.body = mail.build();
                val response = sg.api(request);
                println(response.statusCode);
                println(response.body);
                println(response.headers);
                val communicationEntity = CommunicationEntity(
                    payload = emailRequest.payload + " - " + emailRequest.payload,
                    channel = CommunicationChannelEnum.EMAIL,
                    note = "jHunter Email Sender"
                )
                communicationService.createCommunication(
                    idPerson = person.idPerson!!,
                    entity = communicationEntity
                )
            } catch (ex: IOException) {
                println(ex);
                throw ex;
            }

        }
    }
}