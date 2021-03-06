import { Layout } from "react-grid-layout";

export type UserType = {
    _id?: string,
    userBoard?: UserModulesType,
    token?: string,
    email?: string,
    username: string,
    role?: RoleType,
    language: LanguageType,
    targetLanguage: LanguageType,
    levels?: {language: string, rank: number}[]
} 

export type RoleType = 'Admin' | 'Customer' | 'Moderator' | 'Visitor';

export type LanguageType = 'Fr'| 'En' | 'Cn';

export type VisibilityType = 'Visitor' | 'Loggedin' | 'Owner' ;

export type SentencesType = {
    sentence: string,
    translatedSentence: string
}

export type UserBoardType = {
    userModules: UserModulesType;
    updateUserBoard: (userBoard: UserModulesType) => Promise<void>;
    goToPage: (url: string) => void;
    handleBreakpointChange: (bp: BreakpointType) => void;
    marginLeft: number;
}

export type PositionType = {
    x: number; 
    y: number; 
    w: number; 
    h: number;
}

export type ModuleUrlType = 'news' | 'fastExercice' | 'wordOfTheDay' | 'manga' | 'culture';

export type UserModulesType = {
    [key: string]: {
        [bp in BreakpointType]: PositionType;
    }
}

export type BreakpointType = 'lg' | 'md' | 'sm' | 'xs';

export type TranslationType = {
    name: string,
    internationalName: string,
    language: string,
    sentences: SentencesType[],
    rank: number,
    comments?: string,
}

export type WordType= {
    owner?: string,
    name: string,
    internationalName: string,
    language: string,
    subject: string[],
    level: number,
    translations: TranslationType[],
    comments?: string,
    validated: boolean, //(this field is to differenciate cards validated by admin from others)
    visibility: VisibilityType, //(rank of visibility wanted by the card owner)
}

export type HorizontalType= 'center' | 'start' | 'end' | 'stretch' | 'baseline';

export type VariantType= 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'srOnly' | 'inherit';

export type LayoutType = {
    style?: any,
    column?: boolean,
    rowReverse?: boolean,
    columnReverse?: boolean,
    justifyContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly';
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignSelf?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'stretch',
    wrap?: boolean,
    wrapReverse?: boolean,
    flexGrow?: number,
    flexShrink?: number,
    flexBasis?: string,
    flex?: string,
    breakpoints?: any,
    element?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'form' | 'header' | 'main' | 'nav' | 'section',
    componentRef?: any,
    className?: string,
    children: any,
}

export type RowType = {
    style?: any,
    reverse?: boolean,
    vertical?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    horizontal?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    justifyContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignSelf?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'stretch',
    wrap?: boolean,
    wrapReverse?: boolean,
    flex?: string,
    flexGrow?: number,
    flexShrink?: number,
    flexBasis?: string,
    breakpoints?: object,
    element?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'form' | 'header' | 'main' | 'nav' | 'section',
    className?: string,
    children: any
}

export type ColumnType = {
    style?: any,
    reverse?: boolean,
    horizontal?: 'center' | 'start' | 'end' | 'stretch' | 'baseline',
    vertical?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    justifyContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignSelf?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'stretch',
    wrap?: boolean,
    wrapReverse?: boolean,
    flex?: string,
    flexGrow?: number,
    flexShrink?: number,
    flexBasis?: string,
    breakpoints?: any,
    element?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'form' | 'header' | 'main' | 'nav' | 'section',
    className?: string,
    children: any
}
