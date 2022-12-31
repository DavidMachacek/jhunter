package cz.machacek.jhunter.core

import cz.machacek.jhunter.core.experience.ExperienceSeniorityEnum
import cz.machacek.jhunter.core.experience.ExperienceTypeEnum

data class SearchPersonRequest(
    val roles: List<ExperienceTypeEnum>,
    val seniority: List<ExperienceSeniorityEnum>?
)
