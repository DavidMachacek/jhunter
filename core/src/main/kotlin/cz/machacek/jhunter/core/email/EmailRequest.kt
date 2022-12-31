package cz.machacek.jhunter.core.email

data class EmailRequest(
    val subject: String,
    val payload: String,
    val recipientIds: List<String>
) {
}