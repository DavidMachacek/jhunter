package cz.machacek.jhunter.core

data class SearchPersonRequest(
    val roles: List<ExperienceTypeEnum>,
    val seniority: List<ExperienceSeniorityEnum>?
)
