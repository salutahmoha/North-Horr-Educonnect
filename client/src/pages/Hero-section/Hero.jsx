import React from "react";
import {
  HeroContainer,
  HeroHeading,
  HeroText,
} from "../../components/StyledComponents/HeroStyled";

function Hero() {
  return (
    <HeroContainer>
      <HeroHeading>North Horr, Kenya</HeroHeading>
      <HeroText>
        North Horr, one of Kenya’s largest and most remote constituencies, faces
        unique challenges in connecting its educational institutions with
        authorities. This platform empowers school principals to share pressing
        issues with leaders and relevant officials, while allowing the public to
        view and comment, bridging the gap for improved support to distant
        schools.
      </HeroText>
    </HeroContainer>
  );
}

export default Hero;
