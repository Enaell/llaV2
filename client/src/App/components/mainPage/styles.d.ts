import firstPagePict from './ressources/learning-a-foreign-language.jpg'

export const welcomeSection = {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    zIndex: '1000',
    backgroundImage: `url(${firstPagePict})`
}

export const backgroundImg = {
    height: '100vh',
    width: '100%',
    zIndex: -1,
    position: 'absolute' as "absolute",
    backgroundImage: `url(${firstPagePict})`,
    filter: 'blur(8px)'
}
