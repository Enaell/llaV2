// import firstPagePict from './ressources/learning-a-foreign-language.jpg'
import firstPagePict from './ressources/learnlanguage.jpg'

export const welcomeSection = {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    zIndex: '1000',
    transitionProperty: 'height',
    transitionDuration: '1s',
    // transitionTimingFunction: 'ease-in-out',
    overflow: 'hidden'
}

export const welcomeSectionLogged = {
    zIndex: '1000',
    height: '250px',
    width: '100%',
    position: 'absolute',
    transitionProperty: 'height',
    transitionDuration: '1s',
    // transitionTimingFunction: 'ease-in-out'
}

export const backgroundImg = {
    height: '100vh',
    width: '100%',
    zIndex: -1,
    position: 'absolute' as "absolute",
    backgroundImage: `url(${firstPagePict})`,
    transitionProperty: 'height',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    backgroundSize: '100% 100%'
}

export const backgroundImgLogged = {
    height: '250px',
    width: '100%',
    zIndex: -1,
    position: 'absolute' as "absolute",
    backgroundImage: `url(${firstPagePict})`,
    filter: 'blur(2px)',
    transitionProperty: 'height',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    backgroundSize: '100% 100%'
}

export const connectionDiv = {
    // top: 'calc((100vh - 516px) / 2)',
    top: '20%',
    position: "absolute" as "absolute",
    // padding: '50px',
    width: '50%',
    maxWidth: '550px',
    backgroundColor: 'transparent',
    // height: '400px',
    transitionProperty: 'padding top width height',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out'
}

export const statusReminderDiv = {
    top: '125px',
    position: "absolute" as "absolute",
    padding: '20px',
    width: '600px',
    backgroundColor: 'white',
    height: '125px',
    borderRadius: '35px',
    border: '#a8c1a3 solid 8px',
    transitionProperty: 'padding top height width',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out'
}

