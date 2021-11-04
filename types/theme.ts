export interface Theme {
    mode: 'light' | 'dark' | 'system';

    background: string;
    text: string;
    link: string;

    textAlign: 'center' | 'right' | 'left' | 'justify';
    lineHeight: number;
    fontSize: number;
    fontFamily: string;

    marginTop: number;
    marginLeft: number;
    marginBottom: number;
    marginRight: number;
}

export const defaultTheme: Theme = {
    mode: 'system',

    background: '#FFF',
    text: '#000',
    link: '#008DD1',

    textAlign: 'justify',
    lineHeight: 1.7,
    fontSize: 25,
    fontFamily: "'Arial', Arimo, Liberation Sans, sans-serif;",

    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    marginLeft: 8
}

export const getEpubStyles = (theme: Theme) => {
    return {
        body: {
            background: theme.background,
            color: theme.text,

            'line-spacing': `${theme.lineHeight} !important`,
            'font-family': `${theme.fontFamily} !important`,
            'text-align': `${theme.textAlign} !important`,
            'font-size': `${theme.fontSize}pt !important`,

            'padding': `${theme.marginTop}px ${theme.marginRight}px ${theme.marginBottom}px ${theme.marginLeft}px`
        },

        p: {
            'font-family': `${theme.fontFamily} !important`,
            'font-size': `${theme.fontSize} !important`
        },

        a: {
            color: `inherit !important`,
        },

        "a:link": {
            color: `${theme.link} !important`,
        },

        "a:link:hover": {
            "background": "rgba(0, 0, 0, 0.1) !important"
        },
        
        "img": {
            "max-width": "100% !important"
        },
    }
}