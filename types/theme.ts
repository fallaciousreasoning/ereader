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

    background: '#FFFFFF',
    text: '#000000',
    link: '#008DD1',

    textAlign: 'justify',
    lineHeight: 1.2,
    fontSize: 16,
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

            'line-height': `${theme.lineHeight} !important`,
            'font-family': `${theme.fontFamily} !important`,
            'text-align': `${theme.textAlign} !important`,
            'font-size': `${theme.fontSize}pt !important`,

            'padding-top': `${theme.marginTop}px !important`,
            'padding-right': `${theme.marginRight}px !important`,
            'padding-bottom': `${theme.marginBottom}px !important`,
            'padding-left': `${theme.marginLeft}px !important`,
        },

        p: {
            'font-family': `${theme.fontFamily} !important`,
            'font-size': `${theme.fontSize}pt !important`
        },

        a: {
            color: `inherit !important`,
        },

        "a:link": {
            color: `${theme.link} !important`,
        },

        "a:link:hover": {
            "opacity": "0.8 !important"
        },
        
        "img": {
            "max-width": "100% !important"
        },
    }
}