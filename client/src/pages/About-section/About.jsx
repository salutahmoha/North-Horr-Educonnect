import React from 'react'
import {AboutContainer, AboutImage, AboutText, AboutHeading, AboutParagraph} from '../../components/StyledComponents/AboutStyled'
import north from '../../assets/north horr.png'
function About() {
  return (
    <AboutContainer>
        <AboutText>
            <AboutHeading>North Horr Constituency</AboutHeading>
            <AboutParagraph>North Horr Constituency is the largest constituency in the Republic of Kenya in terms of the land mass. It forms one of four constituencies in Marsabit County. The constituency was established as part of the 1988 election process. The constituency is neighboured to the South by Laisamis constituency, to the East by Saku constituency and to the North by Moyale constituency and Southern border of Ethiopia. It has a population of 125,744 (Census 2019) and occupies 38,952 square kilometres. The constituency is divided into five electoral wards: Dukana, Maikona, North Horr, Turbi and llleret and four districts: North Horr, Dukana, Marsabit South and Turbi. The Constituency’s main economic activity is livestock production and small proportion of fishing around Lake Turkana region in Illeret ward.
            </AboutParagraph>
        </AboutText>
        
        <AboutImage src={north} alt="" />

    </AboutContainer>
  )
}

export default About