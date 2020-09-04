import React, { useRef, useEffect, MutableRefObject } from 'react';
import { useSelector } from 'react-redux'
import { Column } from '../common/Flexbox';

import WelcomeSection from './welcomeSection';
import { SectionPaper } from './SectionPaper';


function scrollToSection(
  refs: React.MutableRefObject<{[key: string]: HTMLDivElement | null;}>
, section: string
) {
  refs.current[section]?.scrollIntoView({behavior: 'smooth'})
}

function scrollToTop() {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
}

export const LandingPage = () => {

  const { discover, sections, section = sections[0] } = useSelector((state: any) => state.landing) as {discover: number, sections: string[], section: string}

  const topRef = useRef(null as unknown) as MutableRefObject<HTMLDivElement>;
  const refs = useRef({} as {[key: string]: HTMLDivElement | null });

  useEffect(()=> {
    if (discover) {
      sections.includes(section) ?  scrollToSection(refs, section) : scrollToTop();
    }
  }, [discover, sections, section]);

  return (
    <>
      <div ref={topRef}/>
      <WelcomeSection position={discover ? 'relative' : 'absolute'} />
      { discover && 
      <>
        { sections.map((section) => (
          <Column width='100%' horizontal='center'>
            <div ref= {element => (refs.current[section] = element)}/>
            <SectionPaper sectionName={section}/>
          </Column>
        ))}
      </>}
    </>
  );
}
